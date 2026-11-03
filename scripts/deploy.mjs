import { execFile, spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const execute = promisify(execFile);
const activeStates = new Set(["INITIALIZING", "QUEUED", "BUILDING"]);
const commitSha = (deployment) => deployment.meta?.githubCommitSha;

export function matchingGitBuilds(deployments, sha) {
  return deployments.filter((deployment) =>
    deployment.source === "git" &&
    deployment.target === "production" &&
    deployment.meta?.githubCommitRef === "main" &&
    commitSha(deployment) === sha &&
    activeStates.has(deployment.readyState ?? deployment.state),
  );
}

export function isLiveCommit(deployment, sha) {
  return deployment.readyState === "READY" && commitSha(deployment) === sha &&
    deployment.meta?.digitangelsVerifiedCommit === sha;
}

async function output(command, args) {
  const result = await execute(command, args, { cwd: root, maxBuffer: 8 * 1024 ** 2 });
  return result.stdout.trim();
}

async function interactive(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} failed (${signal ?? code}).`));
    });
  });
}

async function main() {
  const flags = new Set(process.argv.slice(2));
  for (const flag of flags) {
    if (!["--ship", "--check", "--yes"].includes(flag)) {
      throw new Error(`Unsupported option: ${flag}`);
    }
  }
  if (await output("git", ["branch", "--show-current"]) !== "main") {
    throw new Error("Production releases must use main.");
  }
  if (await output("git", ["status", "--porcelain"])) {
    throw new Error("Commit the working changes before releasing.");
  }
  const sha = await output("git", ["rev-parse", "HEAD"]);
  const link = JSON.parse(await readFile(resolve(root, ".vercel/project.json"), "utf8"));
  if (!link.projectId || !link.orgId) throw new Error("Link this repository to its Vercel project first.");
  const api = async (endpoint, method) => JSON.parse(await output("vercel", [
    "api", endpoint, "--scope", link.orgId,
    ...(method ? ["--method", method] : []),
  ]));
  const pending = async () => matchingGitBuilds((await api(
    `/v6/deployments?projectId=${encodeURIComponent(link.projectId)}&target=production&limit=20`,
  )).deployments, sha);
  // Resolve the serving domain: project.targets.production may point to a job still building.
  const live = await api("/v13/deployments/www.digitangels.com");
  if (live.projectId !== link.projectId) throw new Error("Production domain belongs to a different project.");

  if (flags.has("--check")) {
    console.log(`Commit: ${sha}`);
    console.log(`Live: ${live.url} (${live.readyState})`);
    console.log(`Matching pending Git builds: ${(await pending()).length}`);
    console.log(isLiveCommit(live, sha) ? "Already live; no rebuild needed." : "A direct deployment is needed.");
    return;
  }

  if (flags.has("--ship")) await interactive("git", ["push", "-u", "origin", "main"]);

  async function cancelDuplicates() {
    const jobs = await pending();
    for (const job of jobs) {
      try {
        await api(`/v12/deployments/${job.uid}/cancel`, "PATCH");
        console.log(`Cancelled duplicate Git build: ${job.url}`);
      } catch (error) {
        // The job may have completed between listing and cancellation.
        const current = await api(`/v13/deployments/${job.uid}`);
        if (activeStates.has(current.readyState)) throw error;
      }
    }
    return jobs.length;
  }

  let cancelled = await cancelDuplicates();
  // The push webhook can arrive just after git push returns. Catch it before it
  // occupies the build slot; leave unrelated commits and CLI deployments alone.
  if (flags.has("--ship") && !cancelled && !isLiveCommit(live, sha)) {
    console.log("Checking for the Git push deployment before releasing directly...");
    for (let attempt = 0; attempt < 5 && !cancelled; attempt++) {
      await delay(1000);
      cancelled = await cancelDuplicates();
    }
  }

  if (isLiveCommit(live, sha)) {
    console.log(`Commit ${sha.slice(0, 7)} is already live at https://www.digitangels.com; skipped rebuilding.`);
  } else {
    if (await output("git", ["rev-parse", "HEAD"]) !== sha || await output("git", ["status", "--porcelain"])) {
      throw new Error("Working tree changed during release; commit changes and release again.");
    }
    await interactive("vercel", [
      "deploy", "--prod", "--yes", "--project", link.projectId, "--scope", link.orgId,
      "--meta", `digitangelsVerifiedCommit=${sha}`,
    ]);
  }
  // Also catch a delayed webhook after the direct deployment has completed.
  await cancelDuplicates();
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.stderr?.trim() || error.message);
    process.exitCode = 1;
  });
}
