<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Releases

After committing changes on `main`, use `npm run ship` to push and deploy. It replaces pending Git builds for that exact commit with the cached direct deployment and skips rebuilding a commit already live. Bare Git pushes still deploy automatically, with the slower repository clone.

Preserve original media quality and keep media in Git. Do not add a storage service or apply lossy compression.
