import { useState, useEffect } from 'react';

/**
 * Teaching cards for Thich Nhat Hanh's teachings on silence
 * Organized around the Four Aspects of Quiet Practice
 *
 * Each card has:
 * - front: the concept name
 * - back: the teaching explained
 * - practice: a concrete exercise to try right now
 */
type Card = { front: string; back: string; practice: string };

const CHAPTERS: { name: string; pali: string; cards: Card[] }[] = [
  {
    name: 'The Noise Inside',
    pali: 'Vitakka',
    cards: [
      {
        front: 'Radio NST',
        back: 'Inside each of us plays a radio — Radio Non-Stop Thinking. It broadcasts worries, plans, judgments, and commentary all day long. Most of us have forgotten we can turn it off.',
        practice: 'For the next sixty seconds, simply notice your thoughts without following them. Count how many arise. No judgment — just notice the volume of Radio NST.',
      },
      {
        front: 'The Noise We Consume',
        back: 'We fill every gap with noise — music, podcasts, news, conversation — because silence feels uncomfortable. But this constant consumption feeds our restlessness and drowns out the voice of wisdom within.',
        practice: 'Choose one routine activity today — commuting, eating, walking — and do it in complete silence. No headphones, no screens. Notice what arises.',
      },
      {
        front: 'Thinking Without Purpose',
        back: 'Most of our thinking is not productive — it is repetitive rumination, rehearsal of conversations, or replaying the past. This kind of thinking consumes enormous energy and creates suffering without solving anything.',
        practice: 'Set a gentle timer for three minutes. Each time you catch yourself lost in thought, note "thinking" and return to your breath. See how many times you come back.',
      },
    ],
  },
  {
    name: 'Cultivating Quiet',
    pali: 'Samatha',
    cards: [
      {
        front: 'The Practice of Stopping',
        back: 'Before you can find silence, you must practice stopping — pausing the momentum of doing, planning, and reacting. Stopping is not laziness. It is the most courageous act in a world addicted to speed.',
        practice: 'Right now, stop everything. Put down what you are holding. Let your hands rest. Take five breaths with no agenda at all.',
      },
      {
        front: 'Mindful Breathing',
        back: 'Your breath is always available as a doorway to silence. You do not need a quiet room or a meditation cushion. One conscious breath is enough to create a moment of peace in any circumstance.',
        practice: 'Breathe in and know you are breathing in. Breathe out and know you are breathing out. Do this for ten breaths, giving each one your full attention.',
      },
      {
        front: 'Noble Silence',
        back: 'Noble silence is not simply refraining from speech. It is quieting the noise in your mind, your body, and your heart. In noble silence, you give yourself the space to heal and to hear deeply.',
        practice: 'Commit to thirty minutes of noble silence today — no speaking, no texting, no reading. Simply be present with whatever you are doing.',
      },
    ],
  },
  {
    name: 'Deep Listening',
    pali: 'Shruti',
    cards: [
      {
        front: 'Listening Without Agenda',
        back: 'Most of us listen while composing our reply. True listening requires inner silence — putting aside your own thoughts, judgments, and desire to fix, so you can truly receive what another person is sharing.',
        practice: 'In your next conversation, practice listening without planning your response. When they finish, pause for two breaths before speaking.',
      },
      {
        front: 'Listening to Yourself',
        back: 'We are so busy listening to the world that we forget to listen to ourselves. Beneath the noise of daily life, your body and heart are speaking — about what you need, what hurts, what brings you alive.',
        practice: 'Sit quietly and ask yourself: "What do I need right now?" Wait in silence. Let the answer come from your body, not your mind.',
      },
      {
        front: 'The Sound of Silence',
        back: 'When you sit in true silence, you begin to hear what was always there — your heartbeat, the wind, the hum of life itself. These sounds are not interruptions to silence. They are its voice.',
        practice: 'Close your eyes for two minutes. Listen for the quietest sound you can detect. Let your awareness rest on it gently, like a leaf settling on water.',
      },
    ],
  },
  {
    name: 'Thundering Silence',
    pali: 'Ananda',
    cards: [
      {
        front: 'Insight from Stillness',
        back: 'The deepest insights do not come from thinking harder. They arise when the mind is quiet enough to reflect reality clearly — like a still lake that mirrors the sky perfectly.',
        practice: 'Think of a problem you have been struggling with. Instead of analyzing it, sit in silence for five minutes and let it be. Notice if any clarity arises on its own.',
      },
      {
        front: 'The Joy of Quiet',
        back: 'There is a profound joy in silence — not the excitement of stimulation, but the deep contentment of simply being. This joy is available in any moment you choose to stop and arrive fully.',
        practice: 'Find a comfortable spot. Do nothing for three minutes — no meditation technique, no focus point. Simply be. Notice what kind of feeling arises in the absence of doing.',
      },
      {
        front: 'Silence as Nourishment',
        back: 'Just as food nourishes the body, silence nourishes the spirit. Without regular periods of quiet, we become depleted, reactive, and disconnected from what matters most. Silence is not a luxury. It is essential.',
        practice: 'Before you sleep tonight, sit at the edge of your bed for two minutes in silence. Let the day settle. Offer yourself this small nourishment.',
      },
    ],
  },
];

const JOURNAL_PROMPTS = [
  'When was the last time I sat in complete silence? What did I notice — or what did I avoid noticing?',
  'What noise do I use to fill uncomfortable silences? What might I hear if I stopped?',
  'Think of a time when insight came to me unexpectedly. What conditions made that possible?',
  'What would a "silent morning" look like for me? What am I afraid I would feel without the noise?',
  'Who in my life do I truly listen to? Who do I only half-listen to, and why?',
  'What is my body telling me right now that I have been too busy to hear?',
  'If I committed to ten minutes of silence each day, what would I have to give up? Is it worth it?',
  'What is the difference between loneliness and solitude in my life?',
];

export default function SilencePractice() {
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
    <div className="silence-root">
      <style>{`
        .silence-root {
          min-height: 100vh;
          background: linear-gradient(170deg, var(--color-earth-deep) 0%, var(--color-earth-dark) 40%, var(--color-earth-deep) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 16px 40px;
          position: relative;
          overflow: hidden;
        }

        .silence-orb {
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

        .silence-header { text-align: center; margin-bottom: 12px; position: relative; z-index: 1; }

        .silence-tabs { display: flex; gap: 8px; margin-bottom: 28px; position: relative; z-index: 1; }
        .silence-tab {
          background: none; border: none; padding: 10px 20px; cursor: pointer;
          font-family: var(--font-body); font-size: 15px; letter-spacing: 1.5px;
          text-transform: uppercase; transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .silence-tab[data-active='true'] { color: var(--color-sand); }
        .silence-tab[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .silence-chapters {
          display: flex; gap: 4px; margin-bottom: 16px; position: relative; z-index: 1;
          flex-wrap: wrap; justify-content: center;
        }
        .silence-chapter-btn {
          background: none; border: none; padding: 6px 12px; cursor: pointer;
          font-family: var(--font-display); font-size: 18px; font-weight: 400;
          transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .silence-chapter-btn[data-active='true'] { color: var(--color-sand); }
        .silence-chapter-btn[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .silence-content {
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
          .silence-root {
            padding: 40px 16px;
            justify-content: center;
            min-height: 100vh;
          }

          .silence-header { margin-bottom: 20px; }

          .silence-content { max-width: var(--stage-max-width-desktop); }

          .silence-orb {
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

      <div className="silence-orb" aria-hidden="true" />

      <div className="silence-header">
        <span className="label">Thich Nhat Hanh</span>
        <h1 className="heading-lg" style={{ marginTop: 8 }}>Silence</h1>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300,
          color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 4,
        }}>
          The Power of Quiet in a World Full of Noise
        </p>
      </div>

      <div className="silence-tabs">
        <button className="silence-tab" data-active={view === 'cards'} onClick={() => setView('cards')}>
          Flashcards
        </button>
        <button className="silence-tab" data-active={view === 'journal'} onClick={() => setView('journal')}>
          Reflect
        </button>
      </div>

      {view === 'cards' ? (
        <div className="silence-content">
          <div className="silence-chapters">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.pali}
                className="silence-chapter-btn"
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
        <div className="silence-content journal-view" style={{ animation: 'fadeUp 0.5s ease-out' }}>
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
