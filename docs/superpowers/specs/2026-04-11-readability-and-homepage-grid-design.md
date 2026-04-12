# Readability & Homepage Grid Redesign

**Date:** 2026-04-11
**Status:** Approved
**Scope:** Comprehensive — homepage, global styles, both practice components

## Problem

Text across the site is too small for comfortable reading. Secondary/tertiary text (labels, subtitles, button text, tab labels) ranges from 10–14px against a low-contrast dark background with muted sand colors. The homepage uses a narrow single-column card stack (max 480px) that underutilizes wider screens.

## Decisions

- **No font size toggle.** The text is objectively too small — the fix is to make it bigger, not to offer a choice. A toggle would also require localStorage, violating the site's no-persistence rule.
- **Approach A (bump in-place)** chosen over centralizing a type scale. The site has 2 practice components and a homepage — premature to abstract. Type scale tokens can be extracted later when more branches exist.
- **Option B (confident bump, +3–4px)** chosen over a modest bump. Readability on dark backgrounds with muted colors needs generous sizing.

## Design

### 1. Homepage — 2x2 Grid Layout

CSS-only change, no HTML modifications.

- `.tree` max-width widens from 480px to ~720px
- `.branches` becomes `display: grid; grid-template-columns: 1fr 1fr` at `min-width: 768px`
- Cards get increased vertical padding and a min-height for visual weight in the grid
- Below 768px: single-column stack (current behavior with bigger text)

### 2. Font Size Bumps

#### Global styles (`global.css`)

| Element | Current | New |
|---------|---------|-----|
| `.label` | 11px | 14px |
| `.body-text` | 17px | 20px |
| `--card-text-mobile` | 17px | 20px |
| `--card-text-desktop` | 20px | 23px |

#### Homepage (`index.astro`)

| Element | Current | New |
|---------|---------|-----|
| `.branch-subtitle` | 14px | 18px |
| `.branch-source` | 11px | 13px |
| `.branch-tag` | 10px | 13px |
| `.landing-footer` | 12px | 14px |
| `.landing-subtitle` | 18px | 20px |

#### Practice components (AngerPractice.tsx, LovePractice.tsx)

| Element | Current | New |
|---------|---------|-----|
| Tab labels | 13px | 15px |
| Chapter pills (Love) | 13px | 15px |
| Button text ("Begin Journal") | 12px | 14px |
| Desktop button text | 13px | 15px |
| Practice box text (desktop) | 18px | 20px |
| Textarea | 17px | 20px |

Card headings, card body text, and journal prompts use CSS variables or `clamp()` and scale up through the global token changes.

### 3. Responsive Behavior

- Grid breakpoint: `@media (min-width: 768px)` for the 2x2 homepage grid
- Practice components already have `@media (min-width: 700px)` — no breakpoint changes, just font size values within existing queries
- No structural HTML changes anywhere

## Files Modified

1. `src/styles/global.css` — token values and utility class sizes
2. `src/pages/index.astro` — grid layout + homepage font sizes
3. `src/components/practices/AngerPractice.tsx` — component font sizes
4. `src/components/practices/LovePractice.tsx` — component font sizes

## Future

Once Fear and Silence branches are built, extract a centralized type scale (`--text-xs`, `--text-sm`, etc.) into `global.css` and replace all hardcoded px values site-wide (Approach B).
