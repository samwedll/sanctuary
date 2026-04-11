# Sanctuary Desktop Readability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Sanctuary comfortably readable on laptop and desktop viewports without changing the mobile experience.

**Architecture:** CSS-only responsive pass using one breakpoint (`@media (min-width: 900px)`) plus minimal JSX prep work. Three files touched: `src/styles/global.css` (tokens + contrast), `src/pages/index.astro` (coming-soon restyle), `src/components/practices/AngerPractice.tsx` (style extraction, className hooks, pointer-aware reveal label, desktop breakpoint). No structural refactor, no new components.

**Tech Stack:** Astro 5, React 19, Cloudflare Pages. No test runner — verification is browser-based using the `claude-in-chrome` MCP tools.

**Source spec:** `docs/superpowers/specs/2026-04-10-sanctuary-desktop-readability-design.md`

**Verification baseline.** Before starting Task 1, capture four screenshots of the live site or current `npm run dev` build and save them as reference:
- `/` at 1440×900 (desktop)
- `/` at 390×844 (mobile)
- `/practices/anger/` at 1440×900 (desktop)
- `/practices/anger/` at 390×844 (mobile)

These are the "before" images. Mobile screenshots must remain visually identical after every task. Desktop screenshots should progressively improve.

---

## Task 1: Update global tokens in `global.css`

**Files:**
- Modify: `src/styles/global.css:8-58` (the `:root` block)

**What this does.** Raises the contrast of muted text and subtle borders sitewide — this alone fixes the worst of the "hard to read" complaint on the landing page and the practice page labels. Also introduces the new desktop-only tokens that later tasks reference.

- [ ] **Step 1: Open `src/styles/global.css` and locate the `:root` block (lines 8–58).**

- [ ] **Step 2: Change the two contrast values.**

Find:
```css
--color-sand-muted: rgba(196, 164, 116, 0.25);
--color-sand-ghost: rgba(196, 164, 116, 0.35);
```

Replace with:
```css
--color-sand-muted: rgba(196, 164, 116, 0.35);
--color-sand-ghost: rgba(196, 164, 116, 0.58);
```

Note: `--text-muted` already derives from `--color-sand-ghost` and `--border-subtle` from `--color-sand-muted`, so updating the base tokens cascades everywhere — no other lines need to change.

- [ ] **Step 3: Add the new desktop tokens.**

Find the `/* Radii */` comment block. Immediately **above** it, add:

```css
  /* Responsive stage */
  --stage-max-width-desktop: 680px;
  --card-text-mobile: 17px;
  --card-text-desktop: 20px;
  --heading-card-desktop: clamp(2rem, 2.6vw, 2.6rem);

```

(Leading two-space indent to match the existing file, trailing blank line before `/* Radii */`.)

- [ ] **Step 4: Verify the dev server still builds.**

If a dev server isn't already running, start one:
```bash
npm run dev
```
Expected: Astro logs `Local: http://localhost:4321/` with no build errors.

- [ ] **Step 5: Browser-verify contrast bump on the landing page.**

Open the local dev URL in the chrome tool at 1440×900. Visit `/`. Expected changes vs. the baseline screenshot:
- Anger branch's "THICH NHAT HANH" source line is visibly readable (not squinting).
- The three coming-soon branches' subtitles and "Coming soon" tags are visibly readable (layout is still unfixed — we tackle that in Task 2).

Take a screenshot for the task record.

- [ ] **Step 6: Verify mobile is unchanged.**

Resize the chrome window to 390×844 and reload. Compare against the mobile baseline. The muted text may look slightly brighter — that's expected (contrast bump is global). Otherwise the layout must be pixel-identical.

- [ ] **Step 7: Commit.**

```bash
git add src/styles/global.css
git commit -m "styles: bump muted contrast, add desktop stage tokens"
```

---

## Task 2: Restyle coming-soon branches in `index.astro`

**Files:**
- Modify: `src/pages/index.astro` — the three coming-soon `<div class="branch branch--coming">` blocks (lines ~28–45) and the `.branch--coming` / `.branch-tag` CSS (lines ~142–179).

**What this does.** Makes the three unfinished branches read as intentional placeholders: dashed border, transparent background, a pill-shaped "Coming soon" tag, and fully-readable titles. Removes the flat `opacity: 0.4` that was making them illegible.

- [ ] **Step 1: Add `aria-disabled` to the three coming-soon wrappers.**

Find each of these three blocks in `src/pages/index.astro`:

```astro
        <div class="branch branch--coming">
          <span class="branch-title">Fear</span>
```

Change each opening tag to:

```astro
        <div class="branch branch--coming" aria-disabled="true">
          <span class="branch-title">Fear</span>
```

Do the same for the Silence and Love blocks.

- [ ] **Step 2: Replace the `.branch--coming` CSS rule.**

Find the existing rule in the `<style>` block:
```css
  .branch--coming {
    opacity: 0.4;
    cursor: default;
  }
```

Replace with:
```css
  .branch--coming {
    border: 1px dashed var(--border-subtle);
    background: transparent;
    cursor: default;
  }

  .branch--coming .branch-title {
    color: var(--text-secondary);
  }

  .branch--coming .branch-subtitle {
    color: var(--text-muted);
  }
```

- [ ] **Step 3: Restyle `.branch-tag` as a pill.**

Find the existing `.branch-tag` rule:
```css
  .branch-tag {
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-top: var(--space-sm);
  }
```

Replace with:
```css
  .branch-tag {
    align-self: flex-start;
    margin-top: var(--space-md);
    padding: 4px 10px;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
  }
```

`align-self: flex-start` makes the pill hug the left edge of the card (the branch is a flex column) rather than stretching full-width.

- [ ] **Step 4: Browser-verify landing page at 1440×900.**

Reload `/` in the chrome tool. Expected:
- Anger branch is unchanged.
- Fear / Silence / Love: dashed border, transparent fill, titles clearly readable in sand color, subtitles readable in the newly-bumped muted color, a small pill-shaped "COMING SOON" tag hugging the left edge.
- Hovering a coming-soon branch does NOT lift it or change its border color (because the existing `.branch:not(.branch--coming):hover` rule excludes them).
- The Anger branch still lifts on hover.

Take a screenshot.

- [ ] **Step 5: Browser-verify landing page at 390×844.**

Resize to 390×844 and reload. Expected: same restyle visible on mobile (dashed border, pill tag) — the coming-soon cards should look intentionally unfinished on mobile too. The Anger branch unchanged.

- [ ] **Step 6: Commit.**

```bash
git add src/pages/index.astro
git commit -m "landing: restyle coming-soon branches as intentional placeholders"
```

---

## Task 3: Extract inline font styles to class-based CSS in `AngerPractice.tsx`

**Files:**
- Modify: `src/components/practices/AngerPractice.tsx` — inline `<style>` block (lines ~126–234), JSX for card-back `<p>` (~273–279), practice-box `<p>` (~297–304), journal prompt `<p>` (~310–316).

**What this does.** This is a pure refactor — the rendered output should be pixel-identical to before. It moves font sizes and related typography off inline `style` props and into class-based rules inside the component's existing `<style>` block. This is a prerequisite for the desktop breakpoint: inline styles beat media-query selectors, so leaving them inline would silently defeat the desktop overrides in Tasks 6–8.

- [ ] **Step 1: Add three new rules to the inline `<style>` block (base/mobile).**

In `src/components/practices/AngerPractice.tsx`, find the end of the existing `<style>{`` block — the last rule is:

```css
        .fade-transition { transition: opacity 0.25s ease; }
        .fade-out { opacity: 0; }
        .fade-in { opacity: 1; }
```

Immediately **after** `.fade-in { opacity: 1; }` and **before** the closing `` `} ``, add:

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

Match the 8-space indent used elsewhere in the template literal.

- [ ] **Step 2: Remove the inline style from the card-back paragraph.**

Find this JSX (inside `<div className="card-face card-back">`):

```tsx
              <div className="card-face card-back">
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 400,
                  color: 'var(--text-inverse)', textAlign: 'center', lineHeight: 1.65,
                }}>
                  {card.back}
                </p>
              </div>
```

Replace with:

```tsx
              <div className="card-face card-back">
                <p>{card.back}</p>
              </div>
```

- [ ] **Step 3: Remove the inline style from the practice-box paragraph.**

Find:

```tsx
            <div className="practice-box">
              <span className="label" style={{ display: 'block', marginBottom: 10 }}>Practice</span>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: 16,
                color: 'var(--text-primary)', lineHeight: 1.65, fontStyle: 'italic',
              }}>
                {card.practice}
              </p>
            </div>
```

Replace with:

```tsx
            <div className="practice-box">
              <span className="label" style={{ display: 'block', marginBottom: 10 }}>Practice</span>
              <p>{card.practice}</p>
            </div>
```

- [ ] **Step 4: Remove the inline style from the journal prompt paragraph.**

Find (inside the `view === 'journal'` branch):

```tsx
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400,
            color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.55,
            fontStyle: 'italic', maxWidth: 380,
          }}>
            {JOURNAL_PROMPTS[journalIndex]}
          </p>
```

Replace with:

```tsx
          <p>{JOURNAL_PROMPTS[journalIndex]}</p>
```

**Note:** the `.journal-view > p` CSS rule added in Step 1 requires the journal container to actually have the `journal-view` class. We add that in Task 4. Between Tasks 3 and 4, the journal prompt will briefly lose its styling (no class means no rule matches). That's fine — Task 4 is the immediate next commit.

- [ ] **Step 5: Verify the card-back and practice-box still look correct at mobile width.**

Reload `/practices/anger/` in the chrome tool at 390×844. Click/tap the card to flip it. Expected: the back text and the practice box text look pixel-identical to the mobile baseline screenshot.

(Do NOT verify the journal view yet — it's expected to look unstyled until Task 4.)

- [ ] **Step 6: Commit.**

```bash
git add src/components/practices/AngerPractice.tsx
git commit -m "anger: extract inline font styles to classes"
```

---

## Task 4: Add className hooks to `AngerPractice.tsx` JSX

**Files:**
- Modify: `src/components/practices/AngerPractice.tsx` — journal container div, button row div.

**What this does.** Adds two new classNames (`journal-view` and `card-nav-row`) so later CSS rules can target them. Drops the inline `maxWidth: 460` from the journal container so it inherits from `.anger-content`. Restores styling to the journal prompt paragraph (which lost it in Task 3 Step 4).

- [ ] **Step 1: Add `journal-view` className and drop inline maxWidth.**

Find the journal container in the `view === 'journal'` branch:

```tsx
        <div className="anger-content" style={{ maxWidth: 460, animation: 'fadeUp 0.5s ease-out' }}>
```

Replace with:

```tsx
        <div className="anger-content journal-view" style={{ animation: 'fadeUp 0.5s ease-out' }}>
```

- [ ] **Step 2: Add `card-nav-row` className to the button row.**

Find the button row inside the `view === 'cards'` branch:

```tsx
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <button className="nav-btn" onClick={prevCard} aria-label="Previous card">←</button>
```

Replace the opening `<div>` only (keep the children untouched):

```tsx
          <div className="card-nav-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <button className="nav-btn" onClick={prevCard} aria-label="Previous card">←</button>
```

The inline `style` stays — we're only adding the className. Mobile still uses the inline style; the desktop breakpoint in Task 8 will override the gap via the `.card-nav-row` selector.

- [ ] **Step 3: Verify the journal view now looks correct at mobile width.**

Reload `/practices/anger/` at 390×844. Click the REFLECT tab. Expected: the prompt paragraph looks pixel-identical to the mobile baseline (italic, centered, max-width 380px). The textarea and button look unchanged.

- [ ] **Step 4: Verify the flashcard row is unchanged.**

Click back to FLASHCARDS. The nav buttons + TRY IT button row should look pixel-identical to the mobile baseline.

- [ ] **Step 5: Commit.**

```bash
git add src/components/practices/AngerPractice.tsx
git commit -m "anger: add className hooks for journal view and nav row"
```

---

## Task 5: Pointer-aware "click/tap to reveal" label

**Files:**
- Modify: `src/components/practices/AngerPractice.tsx` — add state + effect (near top of component), update the card-front label text.

**What this does.** Detects once on mount whether the device has a fine pointer with hover (desktops/laptops) and swaps the label text from "tap to reveal" to "click to reveal". Default is `false` so server-rendered HTML matches the touch-first fallback and hydration swaps the label on hover-capable devices.

- [ ] **Step 1: Add the `canHover` state and detection effect.**

In `src/components/practices/AngerPractice.tsx`, find this block near the top of the component (around line 100–107):

```tsx
  const [view, setView] = useState<'cards' | 'journal'>('cards');
  const [journalIndex, setJournalIndex] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setJournalIndex(Math.floor(Math.random() * JOURNAL_PROMPTS.length));
  }, []);
```

Replace with:

```tsx
  const [view, setView] = useState<'cards' | 'journal'>('cards');
  const [journalIndex, setJournalIndex] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [fadeIn, setFadeIn] = useState(true);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setJournalIndex(Math.floor(Math.random() * JOURNAL_PROMPTS.length));
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);
```

- [ ] **Step 2: Use `canHover` in the card-front label.**

Find the card-front label inside `<div className="card-face card-front">`:

```tsx
                <span className="label" style={{ marginTop: 20 }}>tap to reveal</span>
```

Replace with:

```tsx
                <span className="label" style={{ marginTop: 20 }}>{canHover ? 'click to reveal' : 'tap to reveal'}</span>
```

- [ ] **Step 3: Verify on desktop.**

Reload `/practices/anger/` at 1440×900 in the chrome tool. The card-front should now say "CLICK TO REVEAL".

- [ ] **Step 4: Verify on mobile simulated viewport.**

Resize to 390×844 and reload. The label should still say "TAP TO REVEAL".

Note: some laptops have touchscreens and may report both hover AND pointer-fine — `matchMedia('(hover: hover) and (pointer: fine)')` returns true only when the **primary** input is a fine pointer with hover, so touch-only devices and touch-primary tablets get "tap". This matches the intent.

- [ ] **Step 5: Commit.**

```bash
git add src/components/practices/AngerPractice.tsx
git commit -m "anger: pointer-aware reveal label"
```

---

## Task 6: Desktop breakpoint — root layout and orb anchoring

**Files:**
- Modify: `src/components/practices/AngerPractice.tsx` — inline `<style>` block, append desktop breakpoint rules.

**What this does.** First desktop-facing visual change. Centers the practice page content vertically in the viewport, bumps `.anger-content` to the new desktop stage width, and anchors the breathing orb to the content instead of to a fixed viewport position. After this task the card will still look the same size, but its position and framing will improve significantly at 1440×900.

- [ ] **Step 1: Append the desktop breakpoint block to the inline `<style>`.**

In `src/components/practices/AngerPractice.tsx`, find the end of the inline `<style>{`` template literal (just before `` `} ``). This should now be right after the three class-based rules added in Task 3 Step 1.

Immediately after `.journal-view > p { ... }` (the last rule) and before the closing `` `} ``, add:

```css
        @media (min-width: 900px) {
          .anger-root {
            padding: 40px 16px;
            justify-content: center;
            min-height: 100vh;
          }

          .anger-header { margin-bottom: 20px; }

          .anger-content { max-width: var(--stage-max-width-desktop); }

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

- [ ] **Step 2: Verify at 1440×900.**

Reload `/practices/anger/`. Expected:
- The whole Anger header + tabs + card + buttons column is vertically centered in the viewport (not pinned to the top).
- The breathing orb is centered behind the card, pulsing in sync with its current position, framing the content instead of floating off above it.
- The card itself is still roughly its old size (we scale it up in Task 7) — max-width jumped from 420 to 680 so the content column is wider, but the card's min-height and padding haven't changed yet.

Take a screenshot.

- [ ] **Step 3: Verify at 390×844.**

Resize to 390×844 and reload. Expected: pixel-identical to the mobile baseline. The `@media (min-width: 900px)` rules must not affect viewports below 900px.

- [ ] **Step 4: Commit.**

```bash
git add src/components/practices/AngerPractice.tsx
git commit -m "anger: center practice page and anchor orb on desktop"
```

---

## Task 7: Desktop breakpoint — card sizing and typography

**Files:**
- Modify: `src/components/practices/AngerPractice.tsx` — inline `<style>` block, extend desktop breakpoint rules.

**What this does.** The second desktop visual change. Grows the flashcard itself (min-height and padding), scales up the front heading to a new desktop-sized heading token, and bumps the card-back body text and practice-box text to readable desktop sizes with a 52ch line length cap.

- [ ] **Step 1: Extend the desktop breakpoint with card rules.**

Find the `@media (min-width: 900px) { ... }` block added in Task 6. **Inside** that block, after the `.anger-orb { ... }` rule and before the closing `}`, add:

```css
          .card-container, .card-inner { min-height: 420px; }

          .card-face {
            padding: 56px 48px;
            min-height: 420px;
          }

          .card-face .heading-md {
            font-size: var(--heading-card-desktop);
          }

          .card-back p {
            font-size: var(--card-text-desktop);
            line-height: 1.6;
            max-width: 52ch;
          }

          .practice-box p {
            font-size: 18px;
          }
```

The final media-query block should now contain all of: `.anger-root`, `.anger-header`, `.anger-content`, `.anger-orb`, `.card-container`, `.card-inner`, `.card-face`, `.card-face .heading-md`, `.card-back p`, `.practice-box p`.

- [ ] **Step 2: Verify at 1440×900.**

Reload `/practices/anger/`. Expected:
- The flashcard is noticeably larger — visually filling a meaningful portion of the viewport centered under "Anger".
- Card-front heading "Embrace Your Anger" is larger (was clamp 1.5–2rem, now clamp 2–2.6rem).
- Click the card to flip it. Back text is bigger, line length wraps at ~52 characters, clearly readable without leaning in.
- Click "TRY IT". Practice box text is at 18px and readable.

Take a screenshot with the card flipped and practice box visible.

- [ ] **Step 3: Verify at 390×844.**

Resize, reload. Flip the card, show the practice box. Expected: pixel-identical to the mobile baseline.

- [ ] **Step 4: Commit.**

```bash
git add src/components/practices/AngerPractice.tsx
git commit -m "anger: scale card and typography for desktop"
```

---

## Task 8: Desktop breakpoint — nav buttons, action button, journal view

**Files:**
- Modify: `src/components/practices/AngerPractice.tsx` — inline `<style>` block, extend desktop breakpoint rules.

**What this does.** Final desktop visual change. Bumps the nav buttons and action button to proportions that match the larger card, widens the button-row gap, and scales up the Reflect (journal) view: prompt size, textarea min-height, padding, and font-size.

- [ ] **Step 1: Extend the desktop breakpoint with remaining rules.**

Find the end of the `@media (min-width: 900px) { ... }` block (just before its closing `}`). Append:

```css
          .nav-btn {
            width: 52px;
            height: 52px;
            font-size: 22px;
          }

          .action-btn {
            padding: 10px 22px;
            font-size: 13px;
          }

          .card-nav-row { gap: 32px; }

          .journal-view > p {
            font-size: clamp(1.4rem, 2vw, 1.75rem);
            max-width: 52ch;
          }

          .journal-area {
            min-height: 240px;
            padding: 28px;
            font-size: var(--card-text-desktop);
          }
```

- [ ] **Step 2: Verify FLASHCARDS view at 1440×900.**

Reload `/practices/anger/`. Expected:
- Nav arrow buttons are larger circles (52px vs 44px).
- TRY IT button is slightly larger.
- The gap between the ← button, TRY IT, and → button is visibly wider.

- [ ] **Step 3: Verify REFLECT view at 1440×900.**

Click the REFLECT tab. Expected:
- Prompt paragraph is larger (clamp 1.4rem–1.75rem) with a readable line length.
- Textarea is taller (min-height 240px vs 180px) and wider (inherits 680px from `.anger-content`) and text inside is 20px.
- NEW PROMPT button looks proportional to the rest.
- Clicking back to FLASHCARDS: vertical position does NOT jump — both views should feel anchored to the same vertical centerline.

Take a screenshot of each view.

- [ ] **Step 4: Verify at 390×844.**

Resize, reload, switch between FLASHCARDS and REFLECT. Expected: both views pixel-identical to the mobile baseline.

- [ ] **Step 5: Commit.**

```bash
git add src/components/practices/AngerPractice.tsx
git commit -m "anger: scale nav, action, and journal for desktop"
```

---

## Task 9: Full verification pass

**Files:** None modified.

**What this does.** Runs the verification checklist from the spec at multiple viewports, captures screenshots, and catches any regressions before declaring the work done.

- [ ] **Step 1: 1440×900 desktop — landing page.**

Resize chrome to 1440×900, load `/`. Checks:
- [ ] "THICH NHAT HANH" under Anger is readable at a glance.
- [ ] Fear / Silence / Love titles readable in sand color.
- [ ] Fear / Silence / Love subtitles readable.
- [ ] "COMING SOON" pill tags readable, left-aligned.
- [ ] Dashed borders visible on the coming-soon branches.
- [ ] Hovering Anger lifts the card; hovering a coming-soon branch does not.

- [ ] **Step 2: 1440×900 desktop — practice page.**

Load `/practices/anger/`. Checks:
- [ ] Header + card + buttons vertically centered in the viewport.
- [ ] Breathing orb anchored behind the card (not drifting to the top of the viewport).
- [ ] Card front heading is large and readable ("Embrace Your Anger").
- [ ] Card-front label reads "CLICK TO REVEAL".
- [ ] "1 / 12" counter is readable.
- [ ] Click the card — it flips smoothly.
- [ ] Back text is 20px, comfortable line length.
- [ ] Click TRY IT — practice box appears, text at 18px.
- [ ] ← and → nav buttons work and cycle cards.
- [ ] Click REFLECT tab — journal view appears, vertically anchored at the same centerline (no jump).
- [ ] Prompt text is large and italic.
- [ ] Textarea is tall (min 240px) and wide (680px parent).
- [ ] NEW PROMPT rotates the prompt.
- [ ] Click SANCTUARY back-link — navigates to `/`.

- [ ] **Step 3: 1024×768 small laptop.**

Resize to 1024×768. Reload `/` and `/practices/anger/`. Checks:
- [ ] Desktop layout is active (breakpoint is 900px, so yes).
- [ ] Nothing clips, overflows, or looks broken at the narrow-desktop edge.
- [ ] Card fits comfortably within the viewport.
- [ ] Orb still centered behind the card.

- [ ] **Step 4: 768×1024 tablet portrait.**

Resize to 768×1024. Reload `/` and `/practices/anger/`. Checks:
- [ ] Mobile layout is shown (below the 900px breakpoint).
- [ ] Landing page coming-soon pills still look correct (Task 2 applies at all widths).
- [ ] Practice page looks like the mobile baseline.

- [ ] **Step 5: 390×844 iPhone 14.**

Resize to 390×844. Reload `/` and `/practices/anger/`. Checks:
- [ ] Landing page: Anger branch unchanged from baseline. Coming-soon branches now show dashed borders + pill tags (this is an intentional improvement that applies at all widths).
- [ ] Practice page: layout matches the mobile baseline — card size, typography, orb position, buttons all unchanged.

- [ ] **Step 6: No console errors.**

In the chrome tool, open `read_console_messages` for the practice page tab at 1440×900. Expected: no errors. Warnings from external fonts or the breathing orb animation are acceptable; React/hydration errors are not.

- [ ] **Step 7: Tag the verification commit (no code change).**

If everything passes, no code commit is needed — the feature is already done in Tasks 1–8. Just announce completion and link the screenshots captured during verification.

If a check fails, add a fix task and return to that task's file.

---

## Non-Goals (explicit)

These are intentionally NOT part of this plan:

- No refactor that moves inline `<style>` out of `AngerPractice.tsx` into a CSS module or separate file.
- No `<PracticeStage>` or other shared-layout component.
- No new practice pages, no Fear/Silence/Love content.
- No changes to the CARDS or JOURNAL_PROMPTS constants.
- No persistence, analytics, telemetry, or subscribe-to-branch feature.
- No additional responsive breakpoints beyond 900px.
- No changes to the flashcard flip interaction (click-to-flip is verified as a regression check only).
- No changes to `src/layouts/BaseLayout.astro`, `src/pages/practices/anger/index.astro`, or any routing/config.
