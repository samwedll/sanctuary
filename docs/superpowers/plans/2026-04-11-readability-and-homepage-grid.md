# Readability & Homepage Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve text readability site-wide (+3–4px on all secondary/tertiary text) and switch the homepage branch cards from a single-column stack to a 2×2 grid on wider screens.

**Architecture:** CSS-only changes across 4 files. No HTML or component logic changes. Font size values are bumped in-place (no new abstractions). The homepage grid uses a media query at 768px.

**Tech Stack:** Astro 5, React 19, CSS custom properties, no test runner — verify with `npm run build`

**Spec:** `docs/superpowers/specs/2026-04-11-readability-and-homepage-grid-design.md`

---

### Task 1: Bump global CSS tokens and utility classes

**Files:**
- Modify: `src/styles/global.css:56-57` (CSS custom properties)
- Modify: `src/styles/global.css:114-118` (`.label` utility)
- Modify: `src/styles/global.css:138-143` (`.body-text` utility)

- [ ] **Step 1: Bump CSS custom property values**

In `src/styles/global.css`, change lines 56–57:

```css
/* Before */
  --card-text-mobile: 17px;
  --card-text-desktop: 20px;

/* After */
  --card-text-mobile: 20px;
  --card-text-desktop: 23px;
```

- [ ] **Step 2: Bump `.label` font-size**

In `src/styles/global.css`, change line 115:

```css
/* Before */
  font-size: 11px;

/* After */
  font-size: 14px;
```

- [ ] **Step 3: Bump `.body-text` font-size**

In `src/styles/global.css`, change line 139:

```css
/* Before */
  font-size: 17px;

/* After */
  font-size: 20px;
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "style: bump global font tokens and utility sizes for readability"
```

---

### Task 2: Homepage grid layout and font sizes

**Files:**
- Modify: `src/pages/index.astro:105-119` (`.tree` and `.branches` styles)
- Modify: `src/pages/index.astro:122-132` (`.branch` card padding)
- Modify: `src/pages/index.astro:155-178` (branch element font sizes)
- Modify: `src/pages/index.astro:180-191` (`.branch-tag` font size)
- Modify: `src/pages/index.astro:193-214` (footer font size)
- Modify: `src/pages/index.astro:95-103` (`.landing-subtitle` font size)

- [ ] **Step 1: Widen `.tree` max-width and convert `.branches` to grid-ready**

In `src/pages/index.astro`, replace the `.tree` block (lines 105–113):

```css
  .tree {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 720px;
  }
```

Replace the `.branches` block (lines 115–120):

```css
  .branches {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    width: 100%;
  }
```

- [ ] **Step 2: Add 768px media query for 2×2 grid**

Add this at the end of the `<style>` block (before the closing `</style>` tag, after the `.landing-footer a:hover` rule):

```css
  @media (min-width: 768px) {
    .branches {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .branch {
      padding: var(--space-xl) var(--space-lg);
      min-height: 180px;
    }
  }
```

- [ ] **Step 3: Bump `.landing-subtitle` font-size**

In `src/pages/index.astro`, change line 97:

```css
/* Before */
    font-size: 18px;

/* After */
    font-size: 20px;
```

- [ ] **Step 4: Bump `.branch-subtitle` font-size**

In `src/pages/index.astro`, change line 166:

```css
/* Before */
    font-size: 14px;

/* After */
    font-size: 18px;
```

- [ ] **Step 5: Bump `.branch-source` font-size**

In `src/pages/index.astro`, change line 173:

```css
/* Before */
    font-size: 11px;

/* After */
    font-size: 13px;
```

- [ ] **Step 6: Bump `.branch-tag` font-size**

In `src/pages/index.astro`, change line 188:

```css
/* Before */
    font-size: 10px;

/* After */
    font-size: 13px;
```

- [ ] **Step 7: Bump `.landing-footer` font-size**

In `src/pages/index.astro`, change line 199:

```css
/* Before */
    font-size: 12px;

/* After */
    font-size: 14px;
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 9: Commit**

```bash
git add src/pages/index.astro
git commit -m "style: 2x2 homepage grid at 768px+ and bump branch card font sizes"
```

---

### Task 3: Bump AngerPractice font sizes

**Files:**
- Modify: `src/components/practices/AngerPractice.tsx:158` (tab label)
- Modify: `src/components/practices/AngerPractice.tsx:210` (action button)
- Modify: `src/components/practices/AngerPractice.tsx:226` (journal textarea)
- Modify: `src/components/practices/AngerPractice.tsx:247` (practice-box p mobile)
- Modify: `src/components/practices/AngerPractice.tsx:307` (practice-box p desktop)
- Modify: `src/components/practices/AngerPractice.tsx:318` (action-btn desktop)

- [ ] **Step 1: Bump tab label font-size**

In `AngerPractice.tsx` line 158, change:

```
font-size: 13px;
```
to:
```
font-size: 15px;
```

- [ ] **Step 2: Bump action button font-size (mobile)**

In `AngerPractice.tsx` line 210, change:

```
font-size: 12px;
```
to:
```
font-size: 14px;
```

- [ ] **Step 3: Bump journal textarea font-size**

In `AngerPractice.tsx` line 226, change:

```
font-size: 17px;
```
to:
```
font-size: 20px;
```

- [ ] **Step 4: Bump practice-box p font-size (mobile)**

In `AngerPractice.tsx` line 247, change:

```
font-size: 16px;
```
to:
```
font-size: 18px;
```

- [ ] **Step 5: Bump practice-box p font-size (desktop)**

In `AngerPractice.tsx` line 307, change:

```
font-size: 18px;
```
to:
```
font-size: 20px;
```

- [ ] **Step 6: Bump action-btn font-size (desktop)**

In `AngerPractice.tsx` line 318, change:

```
font-size: 13px;
```
to:
```
font-size: 15px;
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/practices/AngerPractice.tsx
git commit -m "style: bump AngerPractice font sizes for readability"
```

---

### Task 4: Bump LovePractice font sizes

**Files:**
- Modify: `src/components/practices/LovePractice.tsx:203` (tab label)
- Modify: `src/components/practices/LovePractice.tsx:219` (chapter pills)
- Modify: `src/components/practices/LovePractice.tsx:271` (action button)
- Modify: `src/components/practices/LovePractice.tsx:287` (journal textarea)
- Modify: `src/components/practices/LovePractice.tsx:308` (practice-box p mobile)
- Modify: `src/components/practices/LovePractice.tsx:368` (practice-box p desktop)
- Modify: `src/components/practices/LovePractice.tsx:379` (action-btn desktop)

- [ ] **Step 1: Bump tab label font-size**

In `LovePractice.tsx` line 203, change:

```
font-size: 13px;
```
to:
```
font-size: 15px;
```

- [ ] **Step 2: Bump chapter pill font-size**

In `LovePractice.tsx` line 219, change:

```
font-size: 13px;
```
to:
```
font-size: 15px;
```

- [ ] **Step 3: Bump action button font-size (mobile)**

In `LovePractice.tsx` line 271, change:

```
font-size: 12px;
```
to:
```
font-size: 14px;
```

- [ ] **Step 4: Bump journal textarea font-size**

In `LovePractice.tsx` line 287, change:

```
font-size: 17px;
```
to:
```
font-size: 20px;
```

- [ ] **Step 5: Bump practice-box p font-size (mobile)**

In `LovePractice.tsx` line 308, change:

```
font-size: 16px;
```
to:
```
font-size: 18px;
```

- [ ] **Step 6: Bump practice-box p font-size (desktop)**

In `LovePractice.tsx` line 368, change:

```
font-size: 18px;
```
to:
```
font-size: 20px;
```

- [ ] **Step 7: Bump action-btn font-size (desktop)**

In `LovePractice.tsx` line 379, change:

```
font-size: 13px;
```
to:
```
font-size: 15px;
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 9: Commit**

```bash
git add src/components/practices/LovePractice.tsx
git commit -m "style: bump LovePractice font sizes for readability"
```

---

### Task 5: Final build verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Clean build, zero errors, zero warnings about the changed files.

- [ ] **Step 2: Spot-check output**

Confirm the built output exists and the changed files were included:

```bash
ls -la dist/
```
