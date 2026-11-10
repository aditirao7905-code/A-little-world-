import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireBirthdayConfetti } from '../../utils/confetti';

interface CakePageProps {
  onNext: () => void;
}

export function CakePage({ onNext }: CakePageProps) {
  const [candles, setCandles] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const [wished, setWished] = useState(false);

  const litCount = candles.filter(Boolean).length;
  const allBlownOut = litCount === 0;

  const handleCandleClick = (index: number) => {
    if (!candles[index]) return;
    sound.playBlowSound();

    const newCandles = [...candles] as [boolean, boolean, boolean];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.filter(Boolean).length === 0) {
      triggerCelebration();
    }
  };

  const handleBlowAll = () => {
    sound.playBlowSound();
    setCandles([false, false, false]);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    setWished(true);
    setTimeout(() => {
      sound.playCelebrationPop();
      fireBirthdayConfetti();
    }, 200);
  };

  return (
    <div className="min-h-[78vh] flex flex-col items-center justify-center text-center px-4 py-6 max-w-lg mx-auto">
      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-1"
      >
        <span className="text-[11px] font-semibold tracking-[0.22em] text-[#9c5177] uppercase">
          It's your special day
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-serif text-[#2a1a38] font-normal tracking-tight mb-2"
      >
        Happy Birthday, Sahil! 🎂
      </motion.h2>

      {/* Simple, Sweet English */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="text-[#644d70] text-sm md:text-[15px] leading-relaxed max-w-sm mx-auto mb-4 font-normal"
      >
        A whole new year of sweet memories, smiles, and big dreams begins today.
        Close your eyes and make a special wish!
      </motion.p>

      {/* Cake Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-7 border border-pink-200/80 shadow-md shadow-pink-900/5 relative overflow-hidden"
      >
        {/* Cake Graphic */}
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="relative w-44 h-38 flex items-center justify-center">
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-sm">
              <ellipse cx="100" cy="155" rx="80" ry="14" fill="#fae8e0" />
              <ellipse cx="100" cy="152" rx="74" ry="11" fill="#fff" />

              <path
                d="M 40 115 Q 40 145 100 145 Q 160 145 160 115 L 160 90 Q 100 110 40 90 Z"
                fill="#f472b6"
              />
              <path
                d="M 40 90 Q 100 110 160 90 L 160 85 Q 100 105 40 85 Z"
                fill="#db2777"
              />

              <path
                d="M 50 85 Q 50 110 100 110 Q 150 110 150 85 L 150 65 Q 100 80 50 65 Z"
                fill="#fdf2f8"
              />

              <path
                d="M 50 65 C 55 75, 60 75, 65 67 C 70 77, 80 77, 85 68 C 95 78, 105 78, 115 68 C 120 77, 130 77, 135 68 C 140 76, 145 74, 150 65 Q 100 52 50 65 Z"
                fill="#ffffff"
              />

              <circle cx="70" cy="62" r="7" fill="#ef4444" />
              <circle cx="90" cy="65" r="7" fill="#ef4444" />
              <circle cx="110" cy="65" r="7" fill="#ef4444" />
              <circle cx="130" cy="62" r="7" fill="#ef4444" />
              <circle cx="100" cy="55" r="8" fill="#dc2626" />
            </svg>

            {/* Interactive Candles */}
            <div className="absolute top-2 left-0 right-0 flex justify-center items-end gap-5">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => handleCandleClick(idx)}
                  className="flex flex-col items-center cursor-pointer group focus:outline-hidden"
                  title={candles[idx] ? 'Tap candle to blow it' : 'Blown out'}
                  aria-label={`Candle ${idx + 1}`}
                >
                  <div className="h-7 flex items-end justify-center relative">
                    {candles[idx] ? (
                      <div className="candle-flame relative w-4 h-6">
                        <div className="w-4 h-6 bg-gradient-to-t from-amber-500 via-yellow-300 to-transparent rounded-full" />
                        <div className="absolute bottom-0.5 left-1.5 w-1 h-3 bg-white rounded-full opacity-95" />
                        <div className="absolute -inset-1.5 bg-amber-300/40 rounded-full blur-xs" />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -16, scale: 1.4 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs text-slate-400 select-none"
                      >
                        💨
                      </motion.div>
                    )}
                  </div>

                  <div className="w-[1.5px] h-2 bg-neutral-600" />

                  <div
                    className={`w-3.5 h-9 rounded-t-xs transition-all duration-300 shadow-xs ${
                      candles[idx] ? 'opacity-100' : 'opacity-40 grayscale'
                    }`}
                    style={{
                      background:
                        idx === 0
                          ? 'linear-gradient(to bottom, #f472b6, #db2777)'
                          : idx === 1
                          ? 'linear-gradient(to bottom, #fbbf24, #d97706)'
                          : 'linear-gradient(to bottom, #c084fc, #9333ea)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wish Heading */}
        <h3 className="text-xl font-serif text-[#2a1a38] font-normal mb-1">
          Make a birthday wish
        </h3>
        <p className="text-xs text-[#735882] mb-4 max-w-xs mx-auto">
          Tap each candle to blow it out, or blow all together!
        </p>

        {/* Status boxes */}
        <div className="flex items-center justify-center gap-3 mb-5">
          {candles.map((isLit, idx) => (
            <button
              key={idx}
              onClick={() => handleCandleClick(idx)}
              className={`w-12 h-13 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                isLit
                  ? 'bg-amber-50 border-amber-300/80 shadow-xs hover:border-amber-400'
                  : 'bg-purple-50/50 border-purple-200/60 opacity-50'
              }`}
            >
              <span className={`text-sm transition-transform ${isLit ? 'animate-bounce' : 'grayscale opacity-50'}`}>
                🕯️
              </span>
              <span className="text-[10px] mt-0.5 text-[#6c5478] font-medium">
                {isLit ? 'Lit' : 'Blown'}
              </span>
            </button>
          ))}
        </div>

        {/* Action Button */}
        {allBlownOut ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-1">
              ✨ Yay! Wish made. Let me show you why you're so special to me!
            </div>
            <button
              onClick={onNext}
              type="button"
              className="px-7 py-3 rounded-full text-white text-sm font-medium tracking-wide shadow-md shadow-pink-500/25 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer w-full max-w-xs"
              style={{
                background: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
              }}
            >
              <span>Why you're so special to me</span>
              <span className="ml-1.5">➜</span>
            </button>
          </motion.div>
        ) : (
          <button
            onClick={handleBlowAll}
            type="button"
            className="px-7 py-3 rounded-full text-white text-sm font-medium tracking-wide shadow-md shadow-pink-500/25 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer w-full max-w-xs"
            style={{
              background: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
            }}
          >
            <span className="flex items-center justify-center gap-1.5">
              <span>Blow the candles</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </span>
          </button>
        )}
      </motion.div>
    </div>
  );
}
