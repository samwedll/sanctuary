# Content Architecture

This directory holds the structured content for each branch of the Tree of Knowledge.

## Structure

```
teachings/
├── anger/          # Thich Nhat Hanh — Anger
│   ├── cards.json  # Flashcard data
│   └── prompts.json # Reflection prompts
├── fear/           # Thich Nhat Hanh — Fear (planned)
├── silence/        # Thich Nhat Hanh — Silence (planned)
├── love/           # Thich Nhat Hanh — How to Love (planned)
└── ...
```

## Adding a New Branch

1. Create a directory under `teachings/` with the branch slug
2. Add `cards.json` with the flashcard data (see `anger/cards.json` for schema)
3. Add `prompts.json` with reflection prompts
4. Create a practice component in `src/components/practices/`
5. Create a page in `src/pages/practices/<slug>/index.astro`
6. Add the branch to the tree on the landing page

## Card Schema

```json
{
  "front": "Concept name",
  "back": "Teaching explanation",
  "practice": "A concrete exercise the reader can try right now"
}
```

## Contributing Content

We welcome contributions of practice tools from any wisdom tradition.
Please ensure all content is:

- Rooted in published, attributed teachings
- Focused on practice (not just information)
- Written with compassion and clarity
- Free of copyright concerns (paraphrased, not quoted)
