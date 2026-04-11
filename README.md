# Sanctuary

A digital sanctuary for healing and finding peace. Free, open source practice tools rooted in mindfulness teachings.

## What is this?

Sanctuary is a quiet corner of the internet — a collection of interactive practice tools drawn from wisdom traditions. No ads, no tracking, no monetization. Just tools for sitting with what's hard.

The first branch of the **Tree of Knowledge** focuses on **Anger**, based on the teachings of Thich Nhat Hanh. More branches are planned: Fear, Silence, Love, and beyond.

## Features

- **Flashcards** — Tap-to-flip teaching cards with concrete practice exercises
- **Reflection Journal** — Guided prompts for contemplative writing (nothing is saved or stored)
- **Tree of Knowledge** — A growing library of practice tools organized by theme

## Tech Stack

- [Astro](https://astro.build) — Static-first framework with island architecture
- [React](https://react.dev) — Interactive practice components
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com) (or any static host)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/OWNER/sanctuary.git
cd sanctuary

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
sanctuary/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   └── practices/   # Interactive React components (islands)
│   ├── content/
│   │   └── teachings/   # Teaching data (cards, prompts) by branch
│   ├── layouts/         # Astro page layouts
│   ├── pages/
│   │   ├── index.astro  # Landing page & Tree of Knowledge
│   │   └── practices/   # Practice pages by branch
│   └── styles/          # Design system & global styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Contributing

We welcome contributions — new branches, practice tools, translations, accessibility improvements.

See `src/content/teachings/README.md` for content guidelines.

### Adding a New Branch

1. Add teaching data in `src/content/teachings/<branch>/`
2. Create a practice component in `src/components/practices/`
3. Create a page in `src/pages/practices/<branch>/`
4. Add the branch to the tree on the landing page

## Philosophy

This project exists because healing tools should be free. The teachings here are paraphrased from published works with attribution. We encourage everyone to read the original books.

Sanctuary is not a substitute for professional mental health support. If you're in crisis, please reach out to a qualified professional or contact the [988 Suicide & Crisis Lifeline](https://988lifeline.org/).

## License

[MIT](LICENSE) — Fork it, adapt it, make it yours. Build your own sanctuary.
