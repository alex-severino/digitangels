<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Releases

Ordinary editing is not permission to release. Follow requests such as "commit only" or "do not deploy" exactly. If the user says **push**, that means commit on `main`, push the commit to GitHub, and deploy it to Vercel with `npm run ship` — not a GitHub-only `git push`. Do not run `npm run ship` or `npm run deploy` unless they asked to push, ship, or deploy.

Production is `main` on `origin` (`git@github.com:realbenfica/digitangels.git`). The Vercel project is `digitangels` (`prj_Jq7Pi8PaVgztYsS7rocrNPLE0kAz`) in team `realbenficas-projects` (`team_dqNNxoCGVQ7vXBIVDF620yrb`). The serving domain is `https://www.digitangels.com`. Use npm.

After committing on `main`, inspect `scripts/deploy.mjs`, then use `npm run ship`. It pushes that exact commit, cancels only pending Git production builds for it, deploys through the cached Vercel CLI path, and verifies the live site before reporting success. A commit already live with the `digitangelsVerifiedCommit` marker is not rebuilt. `npm run deploy` is the same without pushing. `npm run deploy -- --check` is read-only. `npm run test:deploy` checks the cancellation safeguards.

Bare Git pushes still deploy automatically via Vercel Git integration, with the slower repository clone. Do not disable that. Do not force-push or rewrite history as a speed optimisation.

Preserve original media quality and keep media in Git. Do not add a storage service or apply lossy compression.
