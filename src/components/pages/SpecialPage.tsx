import { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

interface SpecialPageProps {
  onNext: () => void;
}

interface QualityCard {
  icon: string;
  title: string;
  description: string;
}

const QUALITIES: QualityCard[] = [
  {
    icon: '💖',
    title: 'Your Sweet Smile',
    description: 'Your smile makes my entire day brighter and happier.',
  },
  {
    icon: '🤍',
    title: 'Your Caring Heart',
    description: 'You always take care of me and make me feel so safe.',
  },
  {
    icon: '🌷',
    title: 'Your Warm Hugs',
    description: 'Being around you is my absolute favorite place in the world.',
  },
  {
    icon: '✨',
    title: 'My Favorite Person',
    description: 'You are my best friend and the biggest blessing in my life.',
  },
];

export function SpecialPage({ onNext }: SpecialPageProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setActiveCard(idx);
    sound.playChime();
  };

  return (
    <div className="min-h-[78vh] flex flex-col items-center justify-center text-center px-4 py-6 max-w-lg mx-auto">
      {/* Subtitle / Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-1"
      >
        <span className="text-[11px] font-semibold tracking-[0.22em] text-pink-300/80 uppercase">
          What I love about you
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-serif text-white font-normal tracking-tight mb-2"
      >
        Why you're so special
      </motion.h2>

      {/* Short & Sweet Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="text-slate-300/80 text-sm md:text-[15px] leading-relaxed max-w-sm mx-auto mb-5 font-light"
      >
        Just a few little things about you that make me love you more every day.
      </motion.p>

      {/* 2x2 Grid of dark glass cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
        {QUALITIES.map((item, idx) => {
          const isSelected = activeCard === idx;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.07, duration: 0.3 }}
              onClick={() => handleCardClick(idx)}
              className={`text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-purple-900/40 border-pink-500/60 ring-1 ring-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.25)] scale-[1.02]'
                  : 'glass-panel-interactive'
              }`}
            >
              <div className="text-2xl mb-2 select-none flex items-center justify-center">
                <span className={`inline-block transition-transform duration-300 ${isSelected ? 'scale-125' : ''}`}>
                  {item.icon}
                </span>
              </div>

              <h3 className="text-base font-serif text-white font-normal mb-1">
                {item.title}
              </h3>

              <p className="text-xs text-purple-200/80 leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="w-full flex justify-center"
      >
        <button
          onClick={onNext}
          type="button"
          className="px-8 py-3 rounded-full text-white text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:-translate-y-0.5 cursor-pointer max-w-xs w-full border border-white/20"
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
          }}
        >
          <span>See little reminders</span>
          <span className="ml-2">➜</span>
        </button>
      </motion.div>
    </div>
  );
}
