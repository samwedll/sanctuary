import { useState, useEffect } from 'react';

/**
 * Teaching cards for Thich Nhat Hanh's "Anger: Wisdom for Cooling the Flames"
 *
 * Each card has:
 * - front: the concept name
 * - back: the teaching explained
 * - practice: a concrete exercise to try right now
 */
const CARDS = [
  {
    front: 'Embrace Your Anger',
    back: "When anger arises, don't fight or suppress it. Recognize it like a mother picking up a crying baby — hold it with tenderness and mindful breathing.",
    practice:
      'Next time you feel anger, silently say: "Hello, my anger. I know you are there. I will take care of you."',
  },
  {
    front: 'Mindful Breathing',
    back: 'Breathing in, I know anger is in me. Breathing out, I am taking care of my anger. This simple practice creates space between stimulus and reaction.',
    practice:
      'Practice 10 mindful breaths right now. Inhale for 4 counts, exhale for 6. Notice what shifts.',
  },
  {
    front: 'The Roots of Anger',
    back: 'Our anger is often rooted in old seeds — past hurts, unmet needs, and wrong perceptions. The other person is a secondary cause; the primary cause lives in us.',
    practice:
      'Think of a recent frustration. Ask yourself: "What old wound might this be touching?"',
  },
  {
    front: 'Cooking Your Anger',
    back: "Anger is like a raw potato — you can't eat it raw. Mindfulness is the fire that cooks it. You don't throw it away; you transform it into something nourishing.",
    practice:
      'Sit with a difficult feeling for 5 minutes today without trying to fix or escape it.',
  },
  {
    front: 'Deep Listening',
    back: "When someone speaks from anger, listen to understand their suffering — not to reply. Deep listening can defuse the bomb in the other person's heart.",
    practice:
      'In your next conversation, pause 3 seconds before responding. Just listen.',
  },
  {
    front: 'Loving Speech',
    back: 'Speak only when you are calm enough to use loving speech. If anger is still strong, tell the other person: "I am suffering. I need your help."',
    practice:
      'Replace one complaint today with an expression of what you need, starting with "I feel..." or "I need..."',
  },
  {
    front: 'The Peace Treaty',
    back: 'Agree with loved ones: when anger arises, you will both practice mindful breathing. Within 24 hours, express your hurt — not to punish, but to heal together.',
    practice:
      'Draft a personal peace agreement with someone you trust. What would you include?',
  },
  {
    front: 'Watering Good Seeds',
    back: 'Every consciousness holds seeds of anger AND compassion. What you water is what grows. Choose to water the seeds of understanding, joy, and forgiveness daily.',
    practice:
      'Name 3 "good seeds" someone in your life has watered for you. Can you water one for someone today?',
  },
  {
    front: 'No Blame',
    back: 'When you suffer, it\'s tempting to believe the other person caused it. But your suffering comes from within — from your own seeds. Blaming keeps you stuck.',
    practice:
      'Recall a blame thought from this week. Rewrite it as: "I am hurting because I need ___."',
  },
  {
    front: 'Walking Meditation',
    back: 'Walk as though you are kissing the earth with your feet. Each step brings you home to the present moment, where anger cannot take root.',
    practice:
      'Take a 5-minute walk today. With each step, say "I have arrived" on the in-breath, "I am home" on the out-breath.',
  },
  {
    front: 'Looking Deeply',
    back: 'When you look deeply into your anger, you see the suffering of the person who triggered it. Understanding their pain transforms your anger into compassion.',
    practice:
      'Visualize someone who frustrated you recently. Imagine their childhood. What suffering might they carry?',
  },
  {
    front: 'You Are Not Your Anger',
    back: 'Anger is a visitor, not your identity. Like a cloud passing through the sky, it arises, stays for a while, and passes. You are the sky — vast and open.',
    practice:
      'When a strong emotion comes, practice saying: "A feeling of ___ is present in me" instead of "I am ___."',
  },
];

const JOURNAL_PROMPTS = [
  'What triggered my anger today? What was the deeper need underneath it?',
  'When I sit with my anger quietly, what does it want to tell me?',
  'Who in my life could I practice deeper listening with this week?',
  'What "seeds" have I been watering — in myself and in others?',
  'Where am I holding blame? Can I rewrite it as a need or a wish?',
  'What would my anger look like if I held it like a baby?',
  'How did I respond to difficulty today — with reactivity or with space?',
];

export default function AngerPractice() {
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

  const transition = (cb: () => void) => {
    setFadeIn(false);
    setTimeout(() => {
      setFlipped(false);
      setShowPractice(false);
      cb();
      setFadeIn(true);
    }, 250);
  };

  const nextCard = () => transition(() => setCurrentCard((c) => (c + 1) % CARDS.length));
  const prevCard = () => transition(() => setCurrentCard((c) => (c - 1 + CARDS.length) % CARDS.length));

  const card = CARDS[currentCard];

  return (
    <div className="anger-root">
      <style>{`
        .anger-root {
          min-height: 100vh;
          background: linear-gradient(170deg, var(--color-earth-deep) 0%, var(--color-earth-dark) 40%, var(--color-earth-deep) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 16px 40px;
          position: relative;
          overflow: hidden;
        }

        .anger-orb {
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

        .anger-header { text-align: center; margin-bottom: 12px; position: relative; z-index: 1; }

        .anger-tabs { display: flex; gap: 8px; margin-bottom: 28px; position: relative; z-index: 1; }
        .anger-tab {
          background: none; border: none; padding: 10px 20px; cursor: pointer;
          font-family: var(--font-body); font-size: 13px; letter-spacing: 1.5px;
          text-transform: uppercase; transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .anger-tab[data-active='true'] { color: var(--color-sand); }
        .anger-tab[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .anger-content {
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
          cursor: pointer; font-family: var(--font-body); font-size: 12px;
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
          font-size: 17px; line-height: 1.7; resize: vertical; outline: none;
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

        .card-nav-row {
          display: flex;
          align-items: center;
          gap: 24px;
        }

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
            font-size: 18px;
          }

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
        }
      `}</style>

      <div className="anger-orb" aria-hidden="true" />

      <div className="anger-header">
        <span className="label">Thich Nhat Hanh</span>
        <h1 className="heading-lg" style={{ marginTop: 8 }}>Anger</h1>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 300,
          color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 4,
        }}>
          Wisdom for Cooling the Flames
        </p>
      </div>

      <div className="anger-tabs">
        <button className="anger-tab" data-active={view === 'cards'} onClick={() => setView('cards')}>
          Flashcards
        </button>
        <button className="anger-tab" data-active={view === 'journal'} onClick={() => setView('journal')}>
          Reflect
        </button>
      </div>

      {view === 'cards' ? (
        <div className="anger-content">
          <span className="label">{currentCard + 1} / {CARDS.length}</span>

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
        <div className="anger-content journal-view" style={{ animation: 'fadeUp 0.5s ease-out' }}>
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
        fontSize: 11, color: 'var(--text-muted)', position: 'relative', zIndex: 1,
      }}>
        Based on teachings from Thich Nhat Hanh
      </footer>
    </div>
  );
}
