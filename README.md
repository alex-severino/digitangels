# Digitangels

Next.js 16 portfolio, deployed to Vercel from `main`.

## Development and checks

```sh
npm ci
npm run dev
npm run build
npm run start
npm run audit:assets -- --verify-originals
```

Read the relevant bundled documentation in `node_modules/next/dist/docs/` before changing Next.js configuration or APIs.

## Media quality and storage

Public media keeps its original bytes, dimensions, frame rates and audio. Do not resize, reduce frame rates or apply lossy compression to save deployment time. `docs/media-originals.json` records SHA-256 hashes and sizes for the 216 public assets at commit `e279b2b`; the verification command above checks them against the working files.

The Giclée e-commerce gallery reuses its existing full-resolution thumbnail for its second video. SHA-256 comparison against the original Shopify video confirms they are identical; the previous gallery path pointed to a missing file.

Geist Mono is bundled from the existing Google Fonts Latin variable font, with its SIL Open Font License in `src/assets/fonts/`. All fonts load locally, so production builds do not need to download fonts from Google.

For local disk cleanup, stop the development server before deleting `.next/dev`. It is a regenerable cache. `git lfs prune --verify-remote` removes unused LFS cache only after checking remote copies; it does not remove the original public media or rewrite Git history.

## Deployment speed

Turbopack's production filesystem cache is enabled in `next.config.ts` so subsequent Vercel builds can reuse `.next/cache`. Keep Vercel's normal build cache enabled. `.vercelignore` excludes local tooling and audit records from CLI uploads.

The deployment of `e279b2b` took about 82 seconds: 41 seconds cloning the repository, 33 seconds building and packaging, and 6 seconds deploying outputs. The original public assets total approximately 1.16 GB. Vercel's shallow clone includes recent history, so reducing local Git caches does not itself reduce remote clone time. A 30-second end-to-end Git deployment cannot be guaranteed while every deployment clones these originals.

For code updates, commit changes on `main`, then run `npm run ship`. It pushes `main`, cancels pending automatic Git builds for that exact commit, and deploys through the cached Vercel CLI path. It checks `https://www.digitangels.com`, skips a rebuild when a verified release of that commit is already live, and verifies the serving deployment before reporting success. Other commits and CLI deployments are not cancelled. `npm run deploy` provides the same checks and direct deployment without pushing. Both commands require a clean working tree and an installed, authenticated Vercel CLI. Follow "commit only" or "do not deploy" instead of shipping.

Use `npm run deploy -- --check` for a read-only release check. Run `npm run test:deploy` to verify duplicate cancellation safeguards.

The first CLI deployment uploads the original media; subsequent deployments reuse uploaded files. The measured code-only direct release took 41.6 seconds end to end, including a 21-second Vercel build. New or changed large media still needs uploading. Automatic Git deployments remain enabled if someone runs a plain `git push`, with their slower repository clone; saying **push** in chat still means `npm run ship` so GitHub and Vercel stay in lockstep and duplicate Git jobs are cancelled.

The build keeps TypeScript validation enabled. `npm run lint` currently reports pre-existing React ref and purity errors in the legacy Designwise page and media/contact components; these are independent of the deployment optimisation.
