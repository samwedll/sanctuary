# Fear & Silence Branches

**Date:** 2026-04-11
**Status:** Approved
**Scope:** Two new practice branches following the chaptered LovePractice pattern

## Overview

Build out the Fear and Silence stub branches on the homepage into full practice pages. Both follow the LovePractice.tsx chaptered component pattern — flashcards organized by chapter, plus a journal view. Content is paraphrased from Thich Nhat Hanh's published works, following the content guidelines in `src/content/teachings/README.md`.

## Fear Branch

**Source:** Thich Nhat Hanh, *Fear: Essential Wisdom for Getting Through the Storm*
**Subtitle:** "Essential wisdom for getting through the storm"
**Component:** `src/components/practices/FearPractice.tsx`
**Page:** `src/pages/practices/fear/index.astro`

### Chapters & Cards

#### Chapter 1: Recognizing Fear — *Abhaya*

```json
[
  {
    "front": "Original Fear",
    "back": "We are all born with fear — the fear of being alone, of not surviving. This original fear lives deep in our consciousness and colors how we respond to the world, often without our knowing.",
    "practice": "Sit quietly for one minute. Ask yourself: \"What am I afraid of right now?\" Don't judge the answer. Simply notice what arises."
  },
  {
    "front": "The Habit of Running",
    "back": "When fear arises, our first instinct is to run — into busyness, distraction, consumption, anything to avoid feeling it. But running only strengthens fear's grip. Turning toward it is the first act of courage.",
    "practice": "Notice one thing you reach for today when discomfort arises — your phone, food, work. Pause before reaching. Breathe three times instead."
  },
  {
    "front": "Fear and Desire",
    "back": "Fear and desire are two sides of the same coin. We crave what we think will protect us from fear — security, approval, control. Understanding this link frees you from being pulled by either.",
    "practice": "Think of something you strongly want right now. Ask: \"What fear lives underneath this desire?\" Sit with whatever answer comes."
  }
]
```

#### Chapter 2: Embracing Fear — *Sati*

```json
[
  {
    "front": "Holding Fear Tenderly",
    "back": "Mindfulness allows you to hold your fear the way a parent holds a frightened child — not pushing it away, not drowning in it, but cradling it with awareness and warmth until it calms.",
    "practice": "Place both hands on your belly. Breathe in and say \"Hello, my fear.\" Breathe out and say \"I am here for you.\" Continue for ten breaths."
  },
  {
    "front": "Breathing Through Fear",
    "back": "Your breath is an anchor when fear pulls you into the storm. Each conscious breath brings you back to the present moment, where fear loses its power over you.",
    "practice": "Practice square breathing: inhale 4 counts, hold 4, exhale 4, hold 4. Repeat four rounds. Notice how your body responds."
  },
  {
    "front": "Naming What You Feel",
    "back": "When you can name your fear — \"I am afraid of being rejected,\" \"I am afraid of failing\" — it shrinks. Naming transforms a vague dread into something you can meet face to face.",
    "practice": "Complete this sentence three times with whatever comes: \"I am afraid of _____.\" Read them back. Which one surprised you?"
  }
]
```

#### Chapter 3: Looking Deeply — *Vipashyana*

```json
[
  {
    "front": "The Inner Child",
    "back": "Inside every adult is a frightened child who still carries old wounds. Many of our present fears are echoes of that child's experiences. Healing begins when you acknowledge and comfort them.",
    "practice": "Close your eyes. Picture yourself as a small child. Say to them: \"I see you. You are safe now. I will take care of you.\""
  },
  {
    "front": "Reconciling with the Past",
    "back": "Fear often roots in unresolved pain — things that happened to you, things you witnessed, things you were told. Looking deeply does not mean reliving the pain, but understanding its hold on you.",
    "practice": "Write down one fear you have carried since childhood. Ask: \"Is this fear still protecting me, or is it only limiting me?\""
  },
  {
    "front": "Understanding Impermanence",
    "back": "Much of our fear comes from clinging to what will inevitably change — our health, our relationships, our lives. When you truly accept impermanence, fear transforms into a deep appreciation for now.",
    "practice": "Look at something beautiful near you. Acknowledge silently: \"This will not last forever.\" Let that truth deepen your appreciation rather than your anxiety."
  }
]
```

#### Chapter 4: Freedom from Fear — *Vimukti*

```json
[
  {
    "front": "No Fear",
    "back": "Fearlessness is not the absence of fear. It is the presence of understanding. When you have looked deeply into impermanence, when you know that nothing can truly be lost, fear has nowhere to land.",
    "practice": "Recall a fear you once had that no longer controls you. What did you understand that set you free? Carry that understanding into a current fear."
  },
  {
    "front": "Walking Through Fear",
    "back": "Each step can be an act of courage. Walking meditation lets you practice moving through the world without running from it — arriving fully in each moment, fear and all.",
    "practice": "Take a slow five-minute walk. With each step, say silently: \"I am here. I am safe. I am free.\" Let each word land in your body."
  },
  {
    "front": "Fear as a Teacher",
    "back": "Fear is not your enemy. It carries information about what matters to you, where you have been hurt, what you long to protect. When you stop fighting it, it becomes a wise guide.",
    "practice": "Think of your deepest fear. Ask it: \"What are you trying to teach me?\" Write down whatever answer comes, without editing."
  }
]
```

### Journal Prompts

```json
[
  "What fear have I been avoiding looking at? What would happen if I turned toward it gently?",
  "When was the last time fear stopped me from doing something I cared about? What would I do differently now?",
  "What did I learn about fear as a child? Which of those lessons still serve me, and which ones hold me back?",
  "If I could speak to my fear without judgment, what would it tell me it needs?",
  "Where in my body do I feel fear most strongly? What happens when I breathe into that place?",
  "What is one small act of courage I can take today — not to overcome fear, but to walk beside it?",
  "Think of someone who seems fearless. What might they be afraid of that you cannot see?",
  "What would my life look like if I made decisions from love instead of fear?"
]
```

## Silence Branch

**Source:** Thich Nhat Hanh, *Silence: The Power of Quiet in a World Full of Noise*
**Subtitle:** "The power of quiet in a world full of noise"
**Component:** `src/components/practices/SilencePractice.tsx`
**Page:** `src/pages/practices/silence/index.astro`

### Chapters & Cards

#### Chapter 1: The Noise Inside — *Vitakka*

```json
[
  {
    "front": "Radio NST",
    "back": "Inside each of us plays a radio — Radio Non-Stop Thinking. It broadcasts worries, plans, judgments, and commentary all day long. Most of us have forgotten we can turn it off.",
    "practice": "For the next sixty seconds, simply notice your thoughts without following them. Count how many arise. No judgment — just notice the volume of Radio NST."
  },
  {
    "front": "The Noise We Consume",
    "back": "We fill every gap with noise — music, podcasts, news, conversation — because silence feels uncomfortable. But this constant consumption feeds our restlessness and drowns out the voice of wisdom within.",
    "practice": "Choose one routine activity today — commuting, eating, walking — and do it in complete silence. No headphones, no screens. Notice what arises."
  },
  {
    "front": "Thinking Without Purpose",
    "back": "Most of our thinking is not productive — it is repetitive rumination, rehearsal of conversations, or replaying the past. This kind of thinking consumes enormous energy and creates suffering without solving anything.",
    "practice": "Set a gentle timer for three minutes. Each time you catch yourself lost in thought, note \"thinking\" and return to your breath. See how many times you come back."
  }
]
```

#### Chapter 2: Cultivating Quiet — *Samatha*

```json
[
  {
    "front": "The Practice of Stopping",
    "back": "Before you can find silence, you must practice stopping — pausing the momentum of doing, planning, and reacting. Stopping is not laziness. It is the most courageous act in a world addicted to speed.",
    "practice": "Right now, stop everything. Put down what you are holding. Let your hands rest. Take five breaths with no agenda at all."
  },
  {
    "front": "Mindful Breathing",
    "back": "Your breath is always available as a doorway to silence. You do not need a quiet room or a meditation cushion. One conscious breath is enough to create a moment of peace in any circumstance.",
    "practice": "Breathe in and know you are breathing in. Breathe out and know you are breathing out. Do this for ten breaths, giving each one your full attention."
  },
  {
    "front": "Noble Silence",
    "back": "Noble silence is not simply refraining from speech. It is quieting the noise in your mind, your body, and your heart. In noble silence, you give yourself the space to heal and to hear deeply.",
    "practice": "Commit to thirty minutes of noble silence today — no speaking, no texting, no reading. Simply be present with whatever you are doing."
  }
]
```

#### Chapter 3: Deep Listening — *Shruti*

```json
[
  {
    "front": "Listening Without Agenda",
    "back": "Most of us listen while composing our reply. True listening requires inner silence — putting aside your own thoughts, judgments, and desire to fix, so you can truly receive what another person is sharing.",
    "practice": "In your next conversation, practice listening without planning your response. When they finish, pause for two breaths before speaking."
  },
  {
    "front": "Listening to Yourself",
    "back": "We are so busy listening to the world that we forget to listen to ourselves. Beneath the noise of daily life, your body and heart are speaking — about what you need, what hurts, what brings you alive.",
    "practice": "Sit quietly and ask yourself: \"What do I need right now?\" Wait in silence. Let the answer come from your body, not your mind."
  },
  {
    "front": "The Sound of Silence",
    "back": "When you sit in true silence, you begin to hear what was always there — your heartbeat, the wind, the hum of life itself. These sounds are not interruptions to silence. They are its voice.",
    "practice": "Close your eyes for two minutes. Listen for the quietest sound you can detect. Let your awareness rest on it gently, like a leaf settling on water."
  }
]
```

#### Chapter 4: Thundering Silence — *Ananda*

```json
[
  {
    "front": "Insight from Stillness",
    "back": "The deepest insights do not come from thinking harder. They arise when the mind is quiet enough to reflect reality clearly — like a still lake that mirrors the sky perfectly.",
    "practice": "Think of a problem you have been struggling with. Instead of analyzing it, sit in silence for five minutes and let it be. Notice if any clarity arises on its own."
  },
  {
    "front": "The Joy of Quiet",
    "back": "There is a profound joy in silence — not the excitement of stimulation, but the deep contentment of simply being. This joy is available in any moment you choose to stop and arrive fully.",
    "practice": "Find a comfortable spot. Do nothing for three minutes — no meditation technique, no focus point. Simply be. Notice what kind of feeling arises in the absence of doing."
  },
  {
    "front": "Silence as Nourishment",
    "back": "Just as food nourishes the body, silence nourishes the spirit. Without regular periods of quiet, we become depleted, reactive, and disconnected from what matters most. Silence is not a luxury. It is essential.",
    "practice": "Before you sleep tonight, sit at the edge of your bed for two minutes in silence. Let the day settle. Offer yourself this small nourishment."
  }
]
```

### Journal Prompts

```json
[
  "When was the last time I sat in complete silence? What did I notice — or what did I avoid noticing?",
  "What noise do I use to fill uncomfortable silences? What might I hear if I stopped?",
  "Think of a time when insight came to you unexpectedly. What conditions made that possible?",
  "What would a \"silent morning\" look like for me? What am I afraid I would feel without the noise?",
  "Who in my life do I truly listen to? Who do I only half-listen to, and why?",
  "What is my body telling me right now that I have been too busy to hear?",
  "If I committed to ten minutes of silence each day, what would I have to give up? Is it worth it?",
  "What is the difference between loneliness and solitude in my life?"
]
```

## Implementation

Both components follow the LovePractice.tsx pattern exactly:
- Chaptered flashcards with chapter navigation pills
- Card flip interaction with practice reveal
- Journal view with random prompt and ephemeral textarea
- Same CSS structure, responsive behavior, and design tokens
- Font sizes match the recent readability bump (not the old smaller sizes)

### Files to Create

1. `src/components/practices/FearPractice.tsx` — copy LovePractice.tsx, swap content and class prefixes (love → fear)
2. `src/components/practices/SilencePractice.tsx` — same pattern, silence prefixes
3. `src/pages/practices/fear/index.astro` — copy love/index.astro, swap component import
4. `src/pages/practices/silence/index.astro` — same pattern

### Files to Modify

5. `src/pages/index.astro` — change Fear and Silence from `branch--coming` divs to active `<a>` links
