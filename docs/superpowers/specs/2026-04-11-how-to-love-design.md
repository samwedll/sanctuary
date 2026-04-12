# How to Love — Design Spec

## Overview

Add the "How to Love" branch to Sanctuary — a practice page rooted in Thich Nhat Hanh's teachings on love, organized around the Four Aspects of True Love (the Four Brahmaviharas). Follows the established flashcard + journal pattern from the Anger branch, with one structural addition: a chapter selector that groups cards by aspect.

## Content structure

### Source material

Thich Nhat Hanh's teachings on love, drawn primarily from *How to Love* and *True Love*. All content paraphrased (never quoted), attributed, focused on concrete practice, and written with compassion per the content guidelines in `src/content/teachings/README.md`.

### Four chapters (~3 cards each, 12 total)

| Chapter         | Pali    | Core idea                                              |
| --------------- | ------- | ------------------------------------------------------ |
| Loving-Kindness | Maitri  | The intention and capacity to offer happiness           |
| Compassion      | Karuna  | The intention and capacity to relieve suffering          |
| Joy             | Mudita  | Happiness that contains peace; not excitement            |
| Equanimity      | Upeksha | Love without possessiveness or discrimination            |

Each card follows the existing schema:

```ts
{ front: string, back: string, practice: string }
```

- `front` — concept name (2-5 words)
- `back` — paraphrased teaching (2-3 sentences)
- `practice` — something the reader can do right now (1-2 sentences)

### Journal prompts

7-8 reflection prompts spanning all four aspects, not grouped by chapter. Same ephemeral textarea — nothing saved or stored.

## Component architecture

### LovePractice.tsx

A single React component in `src/components/practices/LovePractice.tsx`, mirroring `AngerPractice.tsx` with these modifications:

**Data constants (top of file):**

- `CHAPTERS` — array of `{ name: string, pali: string, cards: Card[] }`, four entries
- `CARDS` — flat array derived from `CHAPTERS` for easy indexing
- `JOURNAL_PROMPTS` — string array, 7-8 entries

**State:**

All state from AngerPractice, plus:

- `chapter` (number, default 0) — index into the four chapters

**UI layout (top to bottom):**

1. **Header block**
   - Label (`.label`): "Thich Nhat Hanh"
   - Title (`.heading-lg`): "Love"
   - Subtitle (italic): "How to Love"

2. **Tab row** — "Flashcards" / "Reflect", same as Anger

3. **Chapter selector** (visible in Flashcards view only)
   - Horizontal row of four labels: "Loving-Kindness", "Compassion", "Joy", "Equanimity"
   - Active chapter gets underline/highlight treatment matching the tab row visual language
   - Clicking a chapter resets to its first card, clears flip state and practice box

4. **Card area** — identical 3D flip card
   - Counter shows position within current chapter (e.g., "1 / 3")
   - Navigation arrows wrap within the chapter
   - Reaching the last card and pressing next advances to the next chapter's first card (wraps from Equanimity back to Loving-Kindness)

5. **"Try It" button + practice box** — same as Anger

6. **Journal view** — identical to Anger (prompt display, textarea, "New Prompt" button, privacy footer)

7. **Breathing orb** — same ambient background element as Anger

**Styling:**

- All styles inline in `<style>` blocks within the component
- References global CSS custom properties exclusively (no new colors, fonts, or keyframes)
- Chapter selector reuses the visual language of the tab row (muted text, underline on active)
- Responsive breakpoints match Anger (900px desktop threshold)

## Page and routing

### New: src/pages/practices/love/index.astro

Same structure as `src/pages/practices/anger/index.astro`:

- Imports `BaseLayout` with title `"Love — Sanctuary"` and description referencing Thich Nhat Hanh's love teachings
- `<main class="practice-page">` with nav bar containing back link to "← Sanctuary"
- `<LovePractice client:load />`
- Same inline styles for page wrapper and nav as Anger page

### Edit: src/pages/index.astro

Swap the Love branch from coming-soon to active:

- Change `<div class="branch branch--coming" aria-disabled="true">` to `<a href="/practices/love/" class="branch">`
- Remove the "Coming soon" tag
- Keep subtitle "How to love" and source "Thich Nhat Hanh"

## Files touched

| Action | Path                                          |
| ------ | --------------------------------------------- |
| New    | `src/components/practices/LovePractice.tsx`   |
| New    | `src/pages/practices/love/index.astro`        |
| Edit   | `src/pages/index.astro`                       |

## Design constraints

- **No new tokens.** Use the existing earth/sand/cream palette, Cormorant Garamond / DM Sans fonts, and global keyframes.
- **No storage.** Journal textarea is ephemeral. No localStorage, cookies, analytics, or telemetry.
- **Content integrity.** All teachings paraphrased from attributed published works. Card practices must be immediately actionable.
- **Breathing orb.** Present and functional as an ambient mindfulness element.
