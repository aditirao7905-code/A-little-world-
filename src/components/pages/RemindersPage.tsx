import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audio';
import { fireBirthdayConfetti } from '../../utils/confetti';

interface RemindersPageProps {
  onNext: () => void;
}

interface ReminderItem {
  id: string;
  icon: string;
  title: string;
  revealedText: string;
}

const REMINDERS: ReminderItem[] = [
  {
    id: 'kindness',
    icon: '🌸',
    title: 'Your Kindness',
    revealedText: 'You treat me with so much gentleness, care, and pure love.',
  },
  {
    id: 'understanding',
    icon: '🪻',
    title: 'Your Understanding',
    revealedText: 'You always understand my feelings without me having to explain.',
  },
  {
    id: 'efforts',
    icon: '💌',
    title: 'Your Sweet Efforts',
    revealedText: 'The little things you do for us mean the whole world to me.',
  },
  {
    id: 'heart',
    icon: '🌙',
    title: 'My Safe Place',
    revealedText: 'Talking to you makes all my worries disappear. I feel so at home with you.',
  },
];

export function RemindersPage({ onNext }: RemindersPageProps) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    sound.playChime();
    setRevealed((prev) => {
      const nextState = { ...prev, [id]: !prev[id] };
      const allDone = REMINDERS.every((r) => nextState[r.id]);
      if (allDone && !prev[id]) {
        setTimeout(() => fireBirthdayConfetti(), 300);
      }
      return nextState;
    });
  };

  const revealedCount = Object.values(revealed).filter(Boolean).length;

  return (
    <div className="min-h-[78vh] flex flex-col items-center justify-center text-center px-4 py-6 max-w-lg mx-auto">
      {/* Subtitle / Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-1"
      >
        <span className="text-[11px] font-semibold tracking-[0.22em] text-pink-300/80 uppercase">
          Little Reminders
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-serif text-white font-normal tracking-tight mb-2"
      >
        Things I love about you
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="text-slate-300/80 text-sm md:text-[15px] leading-relaxed max-w-sm mx-auto mb-5 font-light"
      >
        Tap each card to reveal sweet little reminders of how loved you are.
      </motion.p>

      {/* Cards stack */}
      <div className="flex flex-col gap-2.5 w-full mb-5">
        {REMINDERS.map((item, idx) => {
          const isRevealed = !!revealed[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + idx * 0.06 }}
              onClick={() => toggleReveal(item.id)}
              className={`text-left p-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isRevealed
                  ? 'bg-purple-950/60 border-pink-500/50 ring-1 ring-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                  : 'glass-panel-interactive'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl select-none">{item.icon}</span>
                  <div>
                    <h3 className="text-sm md:text-base font-medium text-white">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-purple-300/60 font-light">
                      {isRevealed ? 'Tap to close' : 'Tap to reveal'}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.06] text-purple-200 font-medium border border-white/10">
                  {isRevealed ? 'Revealed ✨' : 'Reveal'}
                </div>
              </div>

              {/* Revealed Content Drawer */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-white/10 pt-2"
                  >
                    <p className="text-xs md:text-[13px] text-pink-200 leading-relaxed italic bg-pink-500/10 p-2.5 rounded-xl border border-pink-500/20">
                      "{item.revealedText}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="w-full flex flex-col items-center gap-1.5"
      >
        <button
          onClick={onNext}
          type="button"
          className="px-8 py-3 rounded-full text-white text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:-translate-y-0.5 cursor-pointer max-w-xs w-full border border-white/20"
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
          }}
        >
          <span>Open love letter from Aditi</span>
          <span className="ml-2">💌</span>
        </button>
        {revealedCount < REMINDERS.length && (
          <span className="text-[10px] text-purple-300/50">
            {revealedCount} of {REMINDERS.length} revealed
          </span>
        )}
      </motion.div>
    </div>
  );
}
