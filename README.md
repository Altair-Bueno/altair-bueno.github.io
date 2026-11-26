# [altair-bueno.github.io](https://altair-bueno.github.io)

My personal landing page, built with Astro, Svelte and Tailwind CSS and deployed on GitHub Pages.

The page is a static shell. Visitors' browsers load the résumé from [`Altair-Bueno/Altair-Bueno/data.json`](https://github.com/Altair-Bueno/Altair-Bueno/blob/master/data.json) (via `raw.githubusercontent.com`) and the activity feed from the GitHub API. Nothing is baked in at build time, so edits to `data.json` show up without a rebuild.

```shell
pnpm install
pnpm dev     # dev server
pnpm test    # unit tests
pnpm build   # type-check + production build
```
