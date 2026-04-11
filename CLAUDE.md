# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Astro dev server (local)
npm run build     # Static build to dist/ (includes Cloudflare _worker.js)
npm run preview   # Build, then serve via wrangler dev
npm run deploy    # Build, then wrangler deploy (Cloudflare)
npm run cf-typegen  # Regenerate Cloudflare env types from wrangler.jsonc
```

There is no test runner, linter, or formatter configured. Do not invent one.

## Architecture

Astro 5 static-first site with React 19 islands, deployed as a Cloudflare Worker via `@astrojs/cloudflare`. The build output in `dist/` contains both static assets and a `_worker.js` entry that `wrangler.jsonc` points to.

**Island model.** All interactivity lives in React components under `src/components/practices/`, mounted from `.astro` pages with `client:load` (see `src/pages/practices/anger/index.astro`). The rest of the site is static Astro. `src/layouts/BaseLayout.astro` is the shared document shell and imports `src/styles/global.css`.

**Tree of Knowledge.** The content model is a set of "branches" (Anger, Fear, Silence, Love, …). Each branch is a practice page under `src/pages/practices/<branch>/` backed by one React component in `src/components/practices/`. The landing page (`src/pages/index.astro`) hand-lists branches in the `.branches` nav — adding a branch means editing that file, adding the page + component, and linking it.

**Content location — important divergence.** `src/content/teachings/README.md` describes a planned JSON schema (`teachings/<branch>/cards.json`, `prompts.json`), but no JSON files exist yet. The real content for the Anger branch is **hardcoded as `CARDS` and `JOURNAL_PROMPTS` constants at the top of `src/components/practices/AngerPractice.tsx`**. When editing teaching text, edit the component. When adding a new branch, follow the existing inline-constants pattern unless you are deliberately migrating to the JSON schema (in which case migrate Anger too).

**Design system.** `src/styles/global.css` defines the full token set as CSS custom properties: an earth/sand/cream palette (`--color-earth-*`, `--color-sand-*`), semantic tokens (`--bg-*`, `--text-*`, `--border-*`), typography (`--font-display` Cormorant Garamond, `--font-body` DM Sans), spacing, radii, and easing. Practice components reference these tokens directly from inline `<style>` blocks — keep new components on the same tokens rather than introducing new colors or fonts. Utility classes `.label`, `.heading-lg`, `.heading-md`, `.body-text` and keyframes `breathe`, `fadeUp`, `fadeIn` are defined globally.

**Privacy posture.** Per the README, the site has no ads, tracking, or persistence. The journal textarea is intentionally ephemeral — do not add storage (localStorage, cookies, analytics, telemetry) without explicit instruction.

## Content guidelines

From `src/content/teachings/README.md`: teachings must be paraphrased (not quoted) from attributed published works, focused on concrete practice exercises, and written with compassion. The card shape is `{ front, back, practice }` — a concept name, its teaching, and something the reader can do right now.
