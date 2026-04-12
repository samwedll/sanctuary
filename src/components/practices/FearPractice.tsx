import { useState, useEffect } from 'react';

/**
 * Teaching cards for Thich Nhat Hanh's teachings on fear
 * Organized around the journey from recognizing fear to freedom from it
 *
 * Each card has:
 * - front: the concept name
 * - back: the teaching explained
 * - practice: a concrete exercise to try right now
 */
type Card = { front: string; back: string; practice: string };

const CHAPTERS: { name: string; pali: string; cards: Card[] }[] = [
  {
    name: 'Recognizing Fear',
    pali: 'Abhaya',
    cards: [
      {
        front: 'Original Fear',
        back: 'We are all born with fear — the fear of being alone, of not surviving. This original fear lives deep in our consciousness and colors how we respond to the world, often without our knowing.',
        practice: 'Sit quietly for one minute. Ask yourself: "What am I afraid of right now?" Don\'t judge the answer. Simply notice what arises.',
      },
      {
        front: 'The Habit of Running',
        back: 'When fear arises, our first instinct is to run — into busyness, distraction, consumption, anything to avoid feeling it. But running only strengthens fear\'s grip. Turning toward it is the first act of courage.',
        practice: 'Notice one thing you reach for today when discomfort arises — your phone, food, work. Pause before reaching. Breathe three times instead.',
      },
      {
        front: 'Fear and Desire',
        back: 'Fear and desire are two sides of the same coin. We crave what we think will protect us from fear — security, approval, control. Understanding this link frees you from being pulled by either.',
        practice: 'Think of something you strongly want right now. Ask: "What fear lives underneath this desire?" Sit with whatever answer comes.',
      },
    ],
  },
  {
    name: 'Embracing Fear',
    pali: 'Sati',
    cards: [
      {
        front: 'Holding Fear Tenderly',
        back: 'Mindfulness allows you to hold your fear the way a parent holds a frightened child — not pushing it away, not drowning in it, but cradling it with awareness and warmth until it calms.',
        practice: 'Place both hands on your belly. Breathe in and say "Hello, my fear." Breathe out and say "I am here for you." Continue for ten breaths.',
      },
      {
        front: 'Breathing Through Fear',
        back: 'Your breath is an anchor when fear pulls you into the storm. Each conscious breath brings you back to the present moment, where fear loses its power over you.',
        practice: 'Practice square breathing: inhale 4 counts, hold 4, exhale 4, hold 4. Repeat four rounds. Notice how your body responds.',
      },
      {
        front: 'Naming What You Feel',
        back: 'When you can name your fear — "I am afraid of being rejected," "I am afraid of failing" — it shrinks. Naming transforms a vague dread into something you can meet face to face.',
        practice: 'Complete this sentence three times with whatever comes: "I am afraid of _____." Read them back. Which one surprised you?',
      },
    ],
  },
  {
    name: 'Looking Deeply',
    pali: 'Vipashyana',
    cards: [
      {
        front: 'The Inner Child',
        back: 'Inside every adult is a frightened child who still carries old wounds. Many of our present fears are echoes of that child\'s experiences. Healing begins when you acknowledge and comfort them.',
        practice: 'Close your eyes. Picture yourself as a small child. Say to them: "I see you. You are safe now. I will take care of you."',
      },
      {
        front: 'Reconciling with the Past',
        back: 'Fear often roots in unresolved pain — things that happened to you, things you witnessed, things you were told. Looking deeply does not mean reliving the pain, but understanding its hold on you.',
        practice: 'Write down one fear you have carried since childhood. Ask: "Is this fear still protecting me, or is it only limiting me?"',
      },
      {
        front: 'Understanding Impermanence',
        back: 'Much of our fear comes from clinging to what will inevitably change — our health, our relationships, our lives. When you truly accept impermanence, fear transforms into a deep appreciation for now.',
        practice: 'Look at something beautiful near you. Acknowledge silently: "This will not last forever." Let that truth deepen your appreciation rather than your anxiety.',
      },
    ],
  },
  {
    name: 'Freedom from Fear',
    pali: 'Vimukti',
    cards: [
      {
        front: 'No Fear',
        back: 'Fearlessness is not the absence of fear. It is the presence of understanding. When you have looked deeply into impermanence, when you know that nothing can truly be lost, fear has nowhere to land.',
        practice: 'Recall a fear you once had that no longer controls you. What did you understand that set you free? Carry that understanding into a current fear.',
      },
      {
        front: 'Walking Through Fear',
        back: 'Each step can be an act of courage. Walking meditation lets you practice moving through the world without running from it — arriving fully in each moment, fear and all.',
        practice: 'Take a slow five-minute walk. With each step, say silently: "I am here. I am safe. I am free." Let each word land in your body.',
      },
      {
        front: 'Fear as a Teacher',
        back: 'Fear is not your enemy. It carries information about what matters to you, where you have been hurt, what you long to protect. When you stop fighting it, it becomes a wise guide.',
        practice: 'Think of your deepest fear. Ask it: "What are you trying to teach me?" Write down whatever answer comes, without editing.',
      },
    ],
  },
];

const JOURNAL_PROMPTS = [
  'What fear have I been avoiding looking at? What would happen if I turned toward it gently?',
  'When was the last time fear stopped me from doing something I cared about? What would I do differently now?',
  'What did I learn about fear as a child? Which of those lessons still serve me, and which ones hold me back?',
  'If I could speak to my fear without judgment, what would it tell me it needs?',
  'Where in my body do I feel fear most strongly? What happens when I breathe into that place?',
  'What is one small act of courage I can take today — not to overcome fear, but to walk beside it?',
  'Think of someone who seems fearless. What might they be afraid of that you cannot see?',
  'What would my life look like if I made decisions from love instead of fear?',
];

export default function FearPractice() {
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
    <div className="fear-root">
      <style>{`
        .fear-root {
          min-height: 100vh;
          background: linear-gradient(170deg, var(--color-earth-deep) 0%, var(--color-earth-dark) 40%, var(--color-earth-deep) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 16px 40px;
          position: relative;
          overflow: hidden;
        }

        .fear-orb {
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

        .fear-header { text-align: center; margin-bottom: 12px; position: relative; z-index: 1; }

        .fear-tabs { display: flex; gap: 8px; margin-bottom: 28px; position: relative; z-index: 1; }
        .fear-tab {
          background: none; border: none; padding: 10px 20px; cursor: pointer;
          font-family: var(--font-body); font-size: 15px; letter-spacing: 1.5px;
          text-transform: uppercase; transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .fear-tab[data-active='true'] { color: var(--color-sand); }
        .fear-tab[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .fear-chapters {
          display: flex; gap: 4px; margin-bottom: 16px; position: relative; z-index: 1;
          flex-wrap: wrap; justify-content: center;
        }
        .fear-chapter-btn {
          background: none; border: none; padding: 6px 12px; cursor: pointer;
          font-family: var(--font-display); font-size: 18px; font-weight: 400;
          transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .fear-chapter-btn[data-active='true'] { color: var(--color-sand); }
        .fear-chapter-btn[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .fear-content {
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
          .fear-root {
            padding: 40px 16px;
            justify-content: center;
            min-height: 100vh;
          }

          .fear-header { margin-bottom: 20px; }

          .fear-content { max-width: var(--stage-max-width-desktop); }

          .fear-orb {
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

      <div className="fear-orb" aria-hidden="true" />

      <div className="fear-header">
        <span className="label">Thich Nhat Hanh</span>
        <h1 className="heading-lg" style={{ marginTop: 8 }}>Fear</h1>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300,
          color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 4,
        }}>
          Essential Wisdom for Getting Through the Storm
        </p>
      </div>

      <div className="fear-tabs">
        <button className="fear-tab" data-active={view === 'cards'} onClick={() => setView('cards')}>
          Flashcards
        </button>
        <button className="fear-tab" data-active={view === 'journal'} onClick={() => setView('journal')}>
          Reflect
        </button>
      </div>

      {view === 'cards' ? (
        <div className="fear-content">
          <div className="fear-chapters">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.pali}
                className="fear-chapter-btn"
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
        <div className="fear-content journal-view" style={{ animation: 'fadeUp 0.5s ease-out' }}>
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
