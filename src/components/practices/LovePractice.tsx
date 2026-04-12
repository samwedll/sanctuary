import { useState, useEffect } from 'react';

type Card = { front: string; back: string; practice: string };

const CHAPTERS: { name: string; pali: string; cards: Card[] }[] = [
  {
    name: 'Loving-Kindness',
    pali: 'Maitri',
    cards: [
      {
        front: 'The Capacity to Love',
        back: 'True love begins with understanding your own suffering. When you know how to care for yourself with tenderness, you gain the capacity to offer genuine happiness to another.',
        practice: 'Place your hand on your heart. Breathe in and say "May I be happy." Breathe out and say "May I be at peace." Repeat for one minute.',
      },
      {
        front: 'Understanding Is Love',
        back: 'To love someone is to understand them. Without understanding, love is impossible. Look deeply to see what the other person truly needs — not what you assume they need.',
        practice: 'Think of someone you care about. Ask yourself: "What are they struggling with right now that I may not have noticed?"',
      },
      {
        front: 'Being Present',
        back: 'The most precious gift you can give someone is your full presence. When you are truly there, the person you love feels seen, heard, and valued.',
        practice: 'In your next interaction with a loved one, put away all devices. Offer them your full attention for five uninterrupted minutes.',
      },
    ],
  },
  {
    name: 'Compassion',
    pali: 'Karuna',
    cards: [
      {
        front: 'Listening to Suffering',
        back: 'Compassion is born when you are willing to be present with suffering — your own and others\'. You do not need to fix the pain. Being there is already enough.',
        practice: 'Sit quietly and recall a moment of difficulty from today. Instead of analyzing it, simply acknowledge: "This was hard."',
      },
      {
        front: 'Compassion for Yourself',
        back: 'You cannot pour from an empty cup. Self-compassion is not selfishness — it is the foundation that makes it possible to be compassionate toward others without burning out.',
        practice: 'Write down one harsh thing you said to yourself this week. Now rewrite it as you would say it to a dear friend.',
      },
      {
        front: 'Transforming Suffering Together',
        back: 'When someone you love is suffering, do not try to talk them out of their pain. Sit beside them, breathe with them, and let them know they are not alone.',
        practice: 'Think of someone who is going through a hard time. Send them a simple message today — not advice, just presence: "I\'m here if you need me."',
      },
    ],
  },
  {
    name: 'Joy',
    pali: 'Mudita',
    cards: [
      {
        front: 'Joy Contains Peace',
        back: 'True joy is not excitement or exhilaration. It is a quiet contentment that comes from being fully alive in the present moment, free from craving and anxiety.',
        practice: 'Step outside or look out a window. Notice one thing that is beautiful right now — light, sound, a color. Let yourself enjoy it without needing anything else.',
      },
      {
        front: 'Shared Joy',
        back: 'When you love someone, their happiness becomes your happiness. There is no jealousy in true love — only gratitude that joy exists, even when it is not yours alone.',
        practice: 'Recall a recent moment when someone you care about was happy. Close your eyes and let yourself feel their joy as if it were your own.',
      },
      {
        front: 'Nourishing Joy Daily',
        back: 'Joy is not something to wait for. It can be cultivated through small, daily practices — a mindful meal, a moment of gratitude, a walk where you truly notice the world.',
        practice: 'Before your next meal, pause for three breaths. Look at the food and consider the rain, the soil, and the hands that brought it to you.',
      },
    ],
  },
  {
    name: 'Equanimity',
    pali: 'Upeksha',
    cards: [
      {
        front: 'Love Without Possession',
        back: 'True love does not seek to possess or control. It offers freedom. When you love with equanimity, you accept the other person as they are, not as you wish them to be.',
        practice: 'Think of someone whose choices you struggle to accept. Silently say: "You are on your own path. I respect your journey."',
      },
      {
        front: 'Including All Beings',
        back: 'Equanimity means your love is not limited to a small circle. Like the sun, true love shines on everyone without discrimination — not just those who please you.',
        practice: 'During a walk today, look at three strangers and silently wish each one well: "May you be happy. May you be safe."',
      },
      {
        front: 'Non-Attachment',
        back: 'Attachment disguises itself as love but creates suffering for both people. True love holds gently — like water cradling a boat — supporting without grasping.',
        practice: 'Identify one expectation you hold about someone you love. Ask yourself: "Can I love them fully even if this expectation is never met?"',
      },
    ],
  },
];

const CARDS: Card[] = CHAPTERS.flatMap((ch) => ch.cards);

const JOURNAL_PROMPTS = [
  'What does love look like in my life today — and where am I withholding it?',
  'When was the last time I felt truly seen by someone? What made that moment different?',
  'Where in my life am I confusing attachment with love? What would letting go look like?',
  'What is one small act of loving-kindness I can offer myself right now?',
  'Think of someone difficult. What suffering might they be carrying that I cannot see?',
  'When did I last feel genuine joy for another person\'s happiness?',
  'How do I respond when someone I love makes choices I disagree with? Is there more freedom I can offer?',
  'What would change if I treated myself with the same compassion I offer my closest friend?',
];

export default function LovePractice() {
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
    <div className="love-root">
      <style>{`
        .love-root {
          min-height: 100vh;
          background: linear-gradient(170deg, var(--color-earth-deep) 0%, var(--color-earth-dark) 40%, var(--color-earth-deep) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 16px 40px;
          position: relative;
          overflow: hidden;
        }

        .love-orb {
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

        .love-header { text-align: center; margin-bottom: 12px; position: relative; z-index: 1; }

        .love-tabs { display: flex; gap: 8px; margin-bottom: 28px; position: relative; z-index: 1; }
        .love-tab {
          background: none; border: none; padding: 10px 20px; cursor: pointer;
          font-family: var(--font-body); font-size: 13px; letter-spacing: 1.5px;
          text-transform: uppercase; transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .love-tab[data-active='true'] { color: var(--color-sand); }
        .love-tab[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .love-chapters {
          display: flex; gap: 4px; margin-bottom: 16px; position: relative; z-index: 1;
          flex-wrap: wrap; justify-content: center;
        }
        .love-chapter-btn {
          background: none; border: none; padding: 6px 12px; cursor: pointer;
          font-family: var(--font-display); font-size: 13px; font-weight: 400;
          transition: all 0.3s; position: relative;
          color: var(--text-muted);
        }
        .love-chapter-btn[data-active='true'] { color: var(--color-sand); }
        .love-chapter-btn[data-active='true']::after {
          content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 1px;
          background: var(--color-sand);
        }

        .love-content {
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
          .love-root {
            padding: 40px 16px;
            justify-content: center;
            min-height: 100vh;
          }

          .love-header { margin-bottom: 20px; }

          .love-content { max-width: var(--stage-max-width-desktop); }

          .love-orb {
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

      <div className="love-orb" aria-hidden="true" />

      <div className="love-header">
        <span className="label">Thich Nhat Hanh</span>
        <h1 className="heading-lg" style={{ marginTop: 8 }}>Love</h1>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 300,
          color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 4,
        }}>
          How to Love
        </p>
      </div>

      <div className="love-tabs">
        <button className="love-tab" data-active={view === 'cards'} onClick={() => setView('cards')}>
          Flashcards
        </button>
        <button className="love-tab" data-active={view === 'journal'} onClick={() => setView('journal')}>
          Reflect
        </button>
      </div>

      {view === 'cards' ? (
        <div className="love-content">
          <div className="love-chapters">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.pali}
                className="love-chapter-btn"
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
        <div className="love-content journal-view" style={{ animation: 'fadeUp 0.5s ease-out' }}>
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
