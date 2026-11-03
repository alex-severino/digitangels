import assert from "node:assert/strict";
import test from "node:test";
import { isLiveCommit, matchingGitBuilds, releaseSucceeded } from "./deploy.mjs";

const sha = "current-commit";
const job = {
  uid: "git-job",
  source: "git",
  target: "production",
  readyState: "BUILDING",
  meta: { githubCommitSha: sha, githubCommitRef: "main" },
};

test("only cancel pending Git production builds of the exact main commit", () => {
  const others = [
    { ...job, source: "cli" },
    { ...job, target: "preview" },
    { ...job, meta: { ...job.meta, githubCommitSha: "another-commit" } },
    { ...job, meta: { ...job.meta, githubCommitRef: "feature" } },
    ...["READY", "ERROR", "CANCELED"].map((readyState) => ({ ...job, readyState })),
    { ...job, meta: undefined },
  ];
  assert.deepEqual(matchingGitBuilds([job, ...others], sha), [job]);
});

test("queued and initializing duplicates are cancelled before occupying the build slot", () => {
  for (const state of ["INITIALIZING", "QUEUED", "BUILDING"]) {
    const candidate = { ...job, readyState: undefined, state };
    assert.deepEqual(matchingGitBuilds([candidate], sha), [candidate]);
  }
});

test("a pending project target must not count as a live release", () => {
  assert.equal(isLiveCommit(job, sha), false);
  assert.equal(isLiveCommit({ ...job, readyState: "READY" }, "another-commit"), false);
  assert.equal(isLiveCommit({ ...job, readyState: "READY", meta: undefined }, sha), false);
  // An older CLI deploy can contain uncommitted files with the same Git SHA.
  assert.equal(isLiveCommit({ ...job, readyState: "READY" }, sha), false);
  assert.equal(isLiveCommit({ ...job, readyState: "READY", meta: {
    ...job.meta, digitangelsVerifiedCommit: "another-commit",
  } }, sha), false);
  assert.equal(isLiveCommit({ ...job, readyState: "READY", meta: {
    ...job.meta, digitangelsVerifiedCommit: sha,
  } }, sha), true);
});

test("success requires a READY verified serving deployment and no leftover Git jobs", () => {
  const live = {
    ...job,
    readyState: "READY",
    meta: { ...job.meta, digitangelsVerifiedCommit: sha },
  };
  assert.equal(releaseSucceeded(live, sha, 0), true);
  assert.equal(releaseSucceeded(live, sha, 1), false);
  assert.equal(releaseSucceeded(job, sha, 0), false);
});
