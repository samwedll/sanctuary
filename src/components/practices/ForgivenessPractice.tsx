import { useState, useEffect } from 'react';

/**
 * Teaching cards paraphrased from Thich Nhat Hanh's writings and dharma talks
 * on forgiveness, drawing from "Anger," "Fear," "The Heart of the Buddha's
 * Teaching," and the Plum Village practice of Beginning Anew.
 *
 * Each card has:
 * - front: the concept name
 * - back: the teaching explained
 * - practice: a concrete exercise to try right now
 */
type Card = { front: string; back: string; practice: string };

const CHAPTERS: { name: string; cards: Card[] }[] = [
  {
    name: 'Forgiving Yourself',
    cards: [
      {
        front: 'The Wounded Child Within',
        back: 'Inside you is a small child who was once hurt and never fully consoled. That child still speaks — sometimes through your sharpest reactions. Forgiveness begins when you turn toward this child with tenderness instead of shame.',
        practice:
          'Close your eyes. Picture yourself at the age you first remember being deeply hurt. Silently say: "I see you. I am here now. You are not alone."',
      },
      {
        front: 'You Did What You Could',
        back: 'When you look back on the harm you caused — to yourself or to others — you can see you acted from the understanding you had at the time. With today\'s awareness you would choose differently. That awareness itself is the seed of self-forgiveness.',
        practice:
          'Name one thing you still blame yourself for. Ask honestly: "Given what I knew then, and the pain I was carrying, could I truly have chosen otherwise?"',
      },
      {
        front: 'Holding Your Own Suffering',
        back: 'You cannot offer to others what you have not first offered to yourself. If you have not learned to hold your own pain with tenderness, you will have nothing to give the one who hurt you. Self-compassion is not the end of the path — it is the gate.',
        practice:
          'Place both hands over your heart. Breathe slowly and say inwardly: "This hurts, and I am here. This hurts, and I will not abandon myself."',
      },
    ],
  },
  {
    name: 'Looking Deeply',
    cards: [
      {
        front: 'Do Not Skip the Wound',
        back: 'Forgiveness that bypasses pain is not forgiveness — it is denial wearing a peaceful mask. Before you can release a hurt, you must let yourself know how much it hurts. The wound must first be witnessed.',
        practice:
          'Sit quietly for three minutes with a hurt you usually push away. Say inwardly: "I see you. I know you are there. I will not rush you."',
      },
      {
        front: 'Breathing With Pain',
        back: 'When an old hurt surfaces, you do not have to do anything with it. You only have to breathe with it. Mindful breath creates a space large enough to hold the pain without drowning in it.',
        practice:
          'Breathing in: "I know the hurt is here." Breathing out: "I am here for my hurt." Five breaths. No agenda, no fixing.',
      },
      {
        front: 'The Wound Is Not Solid',
        back: 'When you look closely, the hurt is not one solid thing. It is made of memories, sensations, beliefs, and stories that arise and pass. Seeing its impermanence is the first loosening of its grip on you.',
        practice:
          'Notice a familiar hurt. Ask: "Does this feel exactly the same as it did a year ago? A day ago? A minute ago?" Watch it shift as you watch it.',
      },
    ],
  },
  {
    name: 'Seeing the Other',
    cards: [
      {
        front: 'They Were Hurt First',
        back: 'The person who wounded you was once a small child, too. Someone — or something — hurt them before they ever met you. They passed on the suffering they could not transform. This does not excuse the harm. It explains where it came from.',
        practice:
          'Picture the person who hurt you as a child of five years old. What might they have needed then, that they did not receive?',
      },
      {
        front: 'Where Compassion Becomes Understanding',
        back: 'You cannot will yourself to forgive. But when you let your heart open toward another\'s suffering, something softens on its own. Compassion comes first — and understanding follows, not as an idea but as a felt truth.',
        practice:
          'Think of someone you struggle to forgive. Without trying to excuse them, silently ask: "What pain is this person living inside of?" Let the question rest.',
      },
      {
        front: 'No Separate Self',
        back: 'We like to imagine ourselves as separate from those who hurt us — them over there, us over here. But we are made of each other. The anger in them has also been in you. The tenderness in you is also in them, somewhere, waiting.',
        practice:
          'Hold your two hands in front of you. Wiggle the left fingers, then the right. Ask: "Whose hands are these, really?" Sit with the question a moment longer than feels comfortable.',
      },
    ],
  },
  {
    name: 'Beginning Anew',
    cards: [
      {
        front: 'Flower Watering',
        back: 'The first step of Beginning Anew: before addressing any hurt, speak to the good. Name the qualities you genuinely appreciate in the other person. Not flattery — specific, true recognition. This waters the seeds of what is already right between you.',
        practice:
          'Write three specific things you appreciate about someone you are in conflict with. Begin each one with: "I notice that you..."',
      },
      {
        front: 'Expressing Regret',
        back: 'The second step: acknowledge where you yourself fell short. Even if their harm was greater, you always have something of your own to own. Beginning with your own regret disarms defensiveness — in the other person, and in your own heart.',
        practice:
          'Name one thing you have done in the conflict that you regret. Say it aloud to yourself, gently: "I am sorry I ___."',
      },
      {
        front: 'Expressing Hurt',
        back: 'The third step: share the hurt — without blame, without attack. Say "when this happened, I felt this way" rather than "you always" or "you never." You are revealing pain, not assigning guilt. The goal is to be understood, not to wound in return.',
        practice:
          'Draft one sentence in this form: "When ___ happened, I felt ___, because I needed ___." Speak it slowly, just once, to yourself.',
      },
      {
        front: 'Asking for Support',
        back: 'The fourth step: ask for help. Tell the other how they can support your healing and your growth. This turns the conflict from a wound into a shared practice. You are no longer adversaries. You are two people, beginning again.',
        practice:
          'Complete this sentence for someone you hope to repair with: "It would help me if you could ___." Notice how it feels to ask instead of demand.',
      },
    ],
  },
];

const JOURNAL_PROMPTS = [
  'What am I still unable to forgive myself for? If I met that younger version of me today, what would I want them to hear?',
  'Whose suffering am I being asked to see? Can I picture them as a child of five?',
  'Where in my life am I mistaking denial for forgiveness — rushing past a wound that still needs to be witnessed?',
  'Name a resentment I have carried for years. What has it cost me to keep holding it?',
  'If I could water three good seeds in someone I am in conflict with, what would they be?',
  'What part of me is afraid that forgiving would mean saying what happened was okay?',
  'When did I last feel the softening that comes when I truly understand another person? What opened it?',
  'What would I need to say — to myself or to someone else — in order to begin again?',
];

export default function ForgivenessPractice() {
  const [chapter, setChapter] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [view, setView] = useState<'cards' | 'journal'>('cards');
  const [journalIndex, setJournalIndex] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [fadeIn, setFadeIn] = useState(true);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setJournalIndex(Math.floor(Math.random() * JOURNAL_PROMPTS.length));
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const chapterCards = CHAPTERS[chapter].cards;

  const transition = (cb: () => void) => {
    setFadeIn(false);
    setTimeout(() => {
      setFlipped(false);
      setShowPractice(false);
      cb();
      setFadeIn(true);
    }, 250);
  };

  const nextCard = () =>
    transition(() => {
      if (currentCard + 1 >= chapterCards.length) {
        setChapter((ch) => (ch + 1) % CHAPTERS.length);
        setCurrentCard(0);
      } else {
        setCurrentCard((c) => c + 1);
      }
    });

  const prevCard = () =>
    transition(() => {
      if (currentCard - 1 < 0) {
        const prevCh = (chapter - 1 + CHAPTERS.length) % CHAPTERS.length;
        setChapter(prevCh);
        setCurrentCard(CHAPTERS[prevCh].cards.length - 1);
      } else {
        setCurrentCard((c) => c - 1);
      }
    });

  const selectChapter = (idx: number) => {
    if (idx === chapter) return;
    transition(() => {
      setChapter(idx);
      setCurrentCard(0);
    });
  };

  const card = chapterCards[currentCard];

  return (
    <div className="forgiveness-root">
      <style>{`
        .forgiveness-root {
          min-height: 100vh;
          background: linear-gradient(170deg, var(--color-earth-deep) 0%, var(--color-earth-dark) 40%, var(--color-earth-deep) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 16px 40px;
          position: relative;
          overflow: hidden;
        }

        .forgiveness-orb {
          position: fixed;
          top: 20%;
          left: calc(50% - 200px);
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--color-sand-faint) 0%, transparent 70%);
          animation: breathe 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .forgiveness-header { text-align: center; margin-bottom: 12px; position: relative; z-index: 1; }

        .forgiveness-tabs { display: flex; gap: 8px; margin-bottom: 28px; position: relative; z-index: 1; }
        .forgiveness-tab {
          background: none; border: none; padding: 10px 20px; cursor: pointer;
          font-family: var(--font-body); font-size: 15px; letter-spacing: 1.5px;
          text-transform: uppercase; transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .forgiveness-tab[data-active='true'] { color: var(--color-sand); }
        .forgiveness-tab[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .forgiveness-chapters {
          display: flex; gap: 4px; margin-bottom: 16px; position: relative; z-index: 1;
          flex-wrap: wrap; justify-content: center;
        }
        .forgiveness-chapter-btn {
          background: none; border: none; padding: 6px 12px; cursor: pointer;
          font-family: var(--font-display); font-size: 18px; font-weight: 400;
          transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .forgiveness-chapter-btn[data-active='true'] { color: var(--color-sand); }
        .forgiveness-chapter-btn[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .forgiveness-content {
          display: flex; flex-direction: column; align-items: center; gap: 20px;
          position: relative; z-index: 1; width: 100%; max-width: 420px; padding: 0 16px;
        }

        .card-container { perspective: 1000px; width: 100%; min-height: 300px; cursor: pointer; }
        .card-inner {
          position: relative; width: 100%; min-height: 300px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .card-inner[data-flipped='true'] { transform: rotateY(180deg); }
        .card-face {
          position: absolute; top: 0; left: 0; width: 100%; min-height: 300px;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
          border-radius: var(--radius-lg);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 36px 28px;
        }
        .card-front {
          background: var(--bg-card-front);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(196,164,116,0.1);
        }
        .card-back {
          background: var(--bg-card-back);
          border: 1px solid rgba(196,164,116,0.3);
          transform: rotateY(180deg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .nav-btn {
          background: none; border: 1px solid var(--border-subtle);
          color: var(--color-sand); width: 44px; height: 44px; border-radius: 50%;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; font-size: 18px;
        }
        .nav-btn:hover { background: rgba(196,164,116,0.1); border-color: rgba(196,164,116,0.5); }

        .action-btn {
          background: none; border: 1px solid var(--border-subtle);
          color: var(--color-sand); padding: 8px 18px; border-radius: var(--radius-full);
          cursor: pointer; font-family: var(--font-body); font-size: 14px;
          letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s;
        }
        .action-btn:hover { background: rgba(196,164,116,0.1); }

        .practice-box {
          animation: fadeUp 0.4s ease-out;
          background: rgba(44,36,23,0.6); border: 1px solid var(--border-faint);
          border-radius: var(--radius-md); padding: 20px 24px; width: 100%;
        }

        .journal-area {
          width: 100%; min-height: 180px;
          background: rgba(44,36,23,0.4); border: 1px solid var(--border-faint);
          border-radius: var(--radius-md); padding: 20px;
          color: var(--text-primary); font-family: var(--font-display);
          font-size: 20px; line-height: 1.7; resize: vertical; outline: none;
          transition: border-color 0.3s;
        }
        .journal-area:focus { border-color: rgba(196,164,116,0.5); }
        .journal-area::placeholder { color: var(--text-muted); font-style: italic; }

        .fade-transition { transition: opacity 0.25s ease; }
        .fade-out { opacity: 0; }
        .fade-in { opacity: 1; }

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
          font-size: 18px;
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

        .card-nav-row {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (min-width: 900px) {
          .forgiveness-root {
            padding: 40px 16px;
            justify-content: center;
            min-height: 100vh;
          }

          .forgiveness-header { margin-bottom: 20px; }

          .forgiveness-content { max-width: var(--stage-max-width-desktop); }

          .forgiveness-orb {
            position: absolute;
            top: calc(50% - 310px);
            left: calc(50% - 310px);
            width: 620px;
            height: 620px;
          }

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
            font-size: 20px;
          }

          .nav-btn {
            width: 52px;
            height: 52px;
            font-size: 22px;
          }

          .action-btn {
            padding: 10px 22px;
            font-size: 15px;
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
        }
      `}</style>

      <div className="forgiveness-orb" aria-hidden="true" />

      <div className="forgiveness-header">
        <span className="label">Thich Nhat Hanh</span>
        <h1 className="heading-lg" style={{ marginTop: 8 }}>Forgiveness</h1>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300,
          color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 4,
        }}>
          Where compassion becomes understanding
        </p>
      </div>

      <div className="forgiveness-tabs">
        <button className="forgiveness-tab" data-active={view === 'cards'} onClick={() => setView('cards')}>
          Flashcards
        </button>
        <button className="forgiveness-tab" data-active={view === 'journal'} onClick={() => setView('journal')}>
          Reflect
        </button>
      </div>

      {view === 'cards' ? (
        <div className="forgiveness-content">
          <div className="forgiveness-chapters">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.name}
                className="forgiveness-chapter-btn"
                data-active={chapter === i}
                onClick={() => selectChapter(i)}
              >
                {ch.name}
              </button>
            ))}
          </div>

          <span className="label">{currentCard + 1} / {chapterCards.length}</span>

          <div
            className={`card-container fade-transition ${fadeIn ? 'fade-in' : 'fade-out'}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="card-inner" data-flipped={flipped}>
              <div className="card-face card-front">
                <div style={{ width: 40, height: 1, background: 'var(--border-subtle)', marginBottom: 28 }} />
                <span className="heading-md">{card.front}</span>
                <div style={{ width: 40, height: 1, background: 'var(--border-subtle)', marginTop: 28 }} />
                <span className="label" style={{ marginTop: 20 }}>{canHover ? 'click to reveal' : 'tap to reveal'}</span>
              </div>
              <div className="card-face card-back">
                <p>{card.back}</p>
              </div>
            </div>
          </div>

          <div className="card-nav-row">
            <button className="nav-btn" onClick={prevCard} aria-label="Previous card">←</button>
            <button className="action-btn" onClick={() => {
              setShowPractice(!showPractice);
              if (!flipped) setFlipped(true);
            }}>
              {showPractice ? 'Hide' : 'Try It'}
            </button>
            <button className="nav-btn" onClick={nextCard} aria-label="Next card">→</button>
          </div>

          {showPractice && (
            <div className="practice-box">
              <span className="label" style={{ display: 'block', marginBottom: 10 }}>Practice</span>
              <p>{card.practice}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="forgiveness-content journal-view" style={{ animation: 'fadeUp 0.5s ease-out' }}>
          <span className="label">Today's Reflection</span>
          <p>{JOURNAL_PROMPTS[journalIndex]}</p>
          <textarea
            className="journal-area"
            placeholder="Begin writing here..."
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
          />
          <button className="action-btn" onClick={() =>
            setJournalIndex((journalIndex + 1) % JOURNAL_PROMPTS.length)
          }>
            New Prompt
          </button>
          <span className="label" style={{ textAlign: 'center', lineHeight: 1.6, marginTop: 8 }}>
            This space is just for you. Nothing is saved or stored.
          </span>
        </div>
      )}

      <footer style={{
        marginTop: 'auto', paddingTop: 60, textAlign: 'center',
        fontSize: 14, color: 'var(--text-muted)', position: 'relative', zIndex: 1,
      }}>
        Based on teachings from Thich Nhat Hanh
      </footer>
    </div>
  );
}
