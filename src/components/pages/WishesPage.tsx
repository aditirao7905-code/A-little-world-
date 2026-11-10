import { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

interface WishesPageProps {
  onNext: () => void;
}

interface WishCard {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const WISHES: WishCard[] = [
  {
    id: 'happiness',
    title: 'Endless Happiness',
    icon: '☀️',
    description: 'May every day give you countless reasons to laugh and smile from your heart.',
  },
  {
    id: 'achievements',
    title: 'Huge Success',
    icon: '✨',
    description: 'May all your hard work and dreams turn into big achievements this year.',
  },
  {
    id: 'love',
    title: 'Always Together',
    icon: '🤍',
    description: 'May our bond grow stronger every day and our love stay sweet forever.',
  },
];

export function WishesPage({ onNext }: WishesPageProps) {
  const [blessed, setBlessed] = useState<Record<string, boolean>>({});

  const handleBless = (id: string) => {
    sound.playChime();
    setBlessed((prev) => ({ ...prev, [id]: true }));
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
          My wishes for your year ahead
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-serif text-white font-normal tracking-tight mb-4"
      >
        A few sweet wishes
      </motion.h2>

      {/* Stack of 3 Cards in dark glass */}
      <div className="flex flex-col gap-3 w-full mb-5">
        {WISHES.map((item, idx) => {
          const isBlessed = blessed[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + idx * 0.07, duration: 0.3 }}
              onClick={() => handleBless(item.id)}
              className={`text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                isBlessed
                  ? 'bg-amber-950/40 border-amber-400/60 ring-1 ring-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.15)] scale-[1.01]'
                  : 'glass-panel-interactive'
              }`}
            >
              <h3 className="text-lg font-serif text-white font-normal mb-1 flex items-center justify-center gap-2">
                <span>{item.title}</span>
                <span className={`inline-block transition-transform duration-300 ${isBlessed ? 'rotate-12 scale-125' : ''}`}>
                  {item.icon}
                </span>
              </h3>

              <p className="text-xs text-purple-200/80 leading-relaxed max-w-xs mx-auto font-light">
                {item.description}
              </p>

              {isBlessed && (
                <div className="mt-1.5 text-[10px] font-medium text-amber-300 flex items-center justify-center gap-1">
                  <span>✨</span>
                  <span>Wish sealed with love</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
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
          <span>One last thing, Sahil</span>
          <span className="ml-2">➜</span>
        </button>
      </motion.div>
    </div>
  );
}
