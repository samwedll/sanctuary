# Sanctuary — Desktop Readability Pass

**Date:** 2026-04-10
**Status:** Design approved, ready for implementation plan
**Scope:** Visual/readability improvements to the live site (desertsanctuary.org) for desktop and laptop viewports. Mobile is unchanged.

## Problem

The site is designed mobile-first and never adapts to wider viewports:

- At 1440×900, the Anger practice flashcard is ~440px wide in the upper-middle of the screen, with a large empty void below. It reads as unfinished rather than spacious.
- Muted text (labels, card counters, "tap to reveal", back-links, coming-soon tags) uses `rgba(196,164,116,0.35)` on dark earth backgrounds. At that opacity it sits below the "is that text rendered?" threshold on laptops.
- The landing page's "Fear", "Silence", "Love" coming-soon branches are nearly illegible — they read as broken, not as an intentional roadmap.
- Card body text is hardcoded at 17px and doesn't scale with viewport.
- The breathing orb is `position: fixed` to the viewport, so on a centered desktop layout it drifts above/away from the card it's meant to frame.

## Goals

1. Practice page card is the dominant element of the viewport at 1440×900, vertically centered, with comfortable body text.
2. Muted text is readable at a glance without leaning in.
3. Coming-soon branches look intentional.
4. Mobile (≤430px) is visually identical to today.
5. Click-to-flip still works at the new desktop sizes.

## Non-Goals

- No structural refactor. Inline `<style>` stays in `AngerPractice.tsx`.
- No new components, no `<PracticeStage>` primitive. That's the right move when the second practice branch ships, not now.
- No content changes to cards or prompts.
- No new features (persistence, analytics, subscribe-to-branch).
- No fluid scaling above 900px. The dark surrounding void is part of the design at any width.

## Approach

CSS-only responsive pass using a single breakpoint at `@media (min-width: 900px)`. All changes live in three files:

- `src/styles/global.css` — token changes, additive desktop tokens.
- `src/pages/index.astro` — `.branch--coming` restyle.
- `src/components/practices/AngerPractice.tsx` — desktop rules appended to the existing inline `<style>` block, plus one line of React state for pointer-type detection.

### Why one breakpoint

Below 900px: iPad portrait (768), half-screen laptops, phones — the current mobile layout works. Above 900px: full-size laptops and desktops get desktop treatment. One number shared between `global.css` and `AngerPractice.tsx` keeps the responsive surface small.

### Why fixed sizes above 900px

The design target is "comfortable on a laptop," not "fills an ultrawide." A 680px card at 1440px feels right; at 2560px it still feels right because the dark void around it is the design.

## Detailed Changes

### 1. `src/styles/global.css` — token changes

**Contrast bump (affects every muted surface simultaneously):**

```css
--text-muted: rgba(196, 164, 116, 0.58);      /* was 0.35 */
--border-subtle: rgba(196, 164, 116, 0.35);   /* was 0.25 */
```

`--text-primary`, `--text-secondary`, `--border-faint` unchanged.

**Additive desktop tokens (mobile unaffected):**

```css
--stage-max-width-mobile: 420px;
--stage-max-width-desktop: 680px;
--card-text-mobile: 17px;
--card-text-desktop: 20px;
--heading-card-mobile: clamp(1.5rem, 3vw, 2rem);
--heading-card-desktop: clamp(2rem, 2.6vw, 2.6rem);
```

No new utility classes. Everything remains token-based.

### 2. `src/pages/index.astro` — coming-soon branch restyle

Restyle `.branch--coming` so the branches read as intentional placeholders:

- **Border:** `1px dashed var(--border-subtle)` (currently solid).
- **Background:** fully transparent.
- **Title:** `color: var(--text-secondary)` — fully readable, not muted. The title is the promise.
- **Subtitle:** `color: var(--text-muted)` (now at the new 0.58 contrast). Readable, quiet.
- **Status pill:** replace the existing "Coming soon" text with a small pill element:
  ```css
  border: 1px solid var(--border-subtle);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 10px;
  ```
- **Cursor:** `default` (not pointer). No hover lift, no hover state change.
- **No source attribution.** Only the Anger branch claims a source (Thich Nhat Hanh) until the coming-soon branches have real content.
- **Accessibility:** add `aria-disabled="true"` on the wrapper.

The branches list stays as a single-column stack. Grid layouts and richer treatments are out of scope.

### 3. `src/components/practices/AngerPractice.tsx` — desktop breakpoint

A single `@media (min-width: 900px) { … }` block appended to the existing inline `<style>` string. No mobile rules are touched. No new DOM. No new classes.

**Root layout and viewport centering:**

```css
@media (min-width: 900px) {
  .anger-root {
    padding: 40px 16px;
    justify-content: center;
    min-height: 100vh;
  }

  .anger-header { margin-bottom: 20px; }

  .anger-content { max-width: var(--stage-max-width-desktop); }
}
```

`.anger-root` is already `display: flex; flex-direction: column; align-items: center` — adding `justify-content: center` and `min-height: 100vh` vertically centers the column. `.practice-box` and the journal container inherit the new max-width from `.anger-content`.

**Orb anchoring (fixes the lonely-orb problem):**

```css
@media (min-width: 900px) {
  .anger-orb {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 620px;
    height: 620px;
  }
}
```

Anchors the orb to `.anger-root` (which is already `position: relative`) so it stays centered with the now-centered card. The `breathe` keyframe animation is untouched.

**Card sizing and typography:**

**JSX prerequisite:** inline `style={{ fontSize, lineHeight, ... }}` values on the card-back `<p>`, practice-box `<p>`, and journal prompt `<p>` must be moved into class-based CSS rules. Inline styles beat media-query selectors, so leaving them inline would silently defeat the desktop overrides.

1. Card-back paragraph: drop inline `fontSize: 17, fontFamily, fontWeight, color, textAlign, lineHeight` and move them to `.card-back p` in the mobile base CSS.
2. Practice-box paragraph: drop inline `fontSize: 16, fontFamily, color, lineHeight, fontStyle` and move them to `.practice-box p`.
3. Journal prompt paragraph: drop inline `fontSize: 20, fontFamily, fontWeight, color, textAlign, lineHeight, fontStyle, maxWidth` and move to `.journal-view > p`.

Base (mobile) rules added to the inline `<style>` block — these preserve current mobile appearance pixel-for-pixel:

```css
.card-back p {
  font-family: var(--font-display);
  font-size: var(--card-text-mobile);
  font-weight: 400;
  color: var(--text-inverse);
  text-align: center;
  line-height: 1.65;
}

.practice-box p {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-primary);
  line-height: 1.65;
  font-style: italic;
}

.journal-view > p {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.55;
  font-style: italic;
  max-width: 380px;
}
```

Then the desktop breakpoint overrides:

```css
@media (min-width: 900px) {
  .card-container, .card-inner { min-height: 420px; }
  .card-face { padding: 56px 48px; min-height: 420px; }

  .card-face .heading-md {
    font-size: var(--heading-card-desktop);
  }

  .card-back p {
    font-size: var(--card-text-desktop);
    line-height: 1.6;
    max-width: 52ch;
  }

  .practice-box p { font-size: 18px; }
}
```

`max-width: 52ch` keeps line length readable at the wider card width.

**Nav and action buttons:**

Give the current inline-styled button row an explicit `className="card-nav-row"` in the JSX (in addition to its existing inline styles, which stay untouched for mobile). Then:

```css
@media (min-width: 900px) {
  .nav-btn { width: 52px; height: 52px; font-size: 22px; }
  .action-btn { padding: 10px 22px; font-size: 13px; }
  .card-nav-row { gap: 32px; }
}
```

The className is the single JSX change on that element — no other structural change.

**Reflect (journal) view:**

Add a conditional className to the journal view container so it can be targeted in CSS. In the JSX, the `view === 'journal'` branch currently renders:

```tsx
<div className="anger-content" style={{ maxWidth: 460, ... }}>
```

Change to:

```tsx
<div className="anger-content journal-view" style={{ animation: 'fadeUp 0.5s ease-out' }}>
```

The inline `maxWidth: 460` is dropped so the container inherits `.anger-content`'s max-width (420px mobile, 680px desktop via the section-4 rule). Then the desktop breakpoint adds:

```css
@media (min-width: 900px) {
  .journal-view > p {
    font-size: clamp(1.4rem, 2vw, 1.75rem);
    max-width: 52ch;
  }

  .journal-area {
    min-height: 240px;
    padding: 28px;
    font-size: var(--card-text-desktop);
  }
}
```

The `.journal-view > p` selector targets the prompt paragraph specifically (first child `<p>` in the journal container), not the footer label or the "New Prompt" button.

**Pointer-aware reveal label:**

One line of React state detects hover-capable devices on mount:

```tsx
const [canHover, setCanHover] = useState(false);
useEffect(() => {
  setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
}, []);
```

Then the card-front label reads:

```tsx
<span className="label" style={{ marginTop: 20 }}>
  {canHover ? 'click to reveal' : 'tap to reveal'}
</span>
```

Default is `false` so server-rendered HTML matches the touch-first default and hydration swaps it on mount for hover-capable devices. No layout shift risk since the label is the same length.

## Verification Plan

Before declaring done, capture browser screenshots at each viewport and compare against current production:

1. **1440×900 desktop** — landing page: branches readable, coming-soon reads as intentional. Practice page: card vertically centered, body text comfortable, orb framing the card.
2. **1024×768 small laptop** — same checks, no breakage at the breakpoint's low end.
3. **768×1024 tablet portrait** — mobile layout still shown (breakpoint is 900, so this falls under mobile).
4. **390×844 iPhone 14** — visually identical to current production.
5. **Click-to-flip** at 1440×900 — regression check.
6. **Tab switch Flashcards ↔ Reflect** at 1440×900 — vertical position should not jump.
7. **Hover states** — nav buttons, action button, Anger branch — still work.

## Rollout

Single PR, single commit. No feature flag. CSS + one `useState`/`useEffect` pair. Rollback is `git revert`.

## Open Questions

None. All decisions made during brainstorming are captured above.
