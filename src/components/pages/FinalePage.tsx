import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Award, Check } from 'lucide-react';
import { sound } from '../../utils/audio';
import { fireGrandCelebration, fireBirthdayConfetti } from '../../utils/confetti';

interface FinalePageProps {
  onRestart: () => void;
}

export function FinalePage({ onRestart }: FinalePageProps) {
  const [giftOpened, setGiftOpened] = useState(false);
  const [tokenClaimed, setTokenClaimed] = useState(false);

  useEffect(() => {
    sound.playCelebrationPop();
    fireGrandCelebration();
  }, []);

  const handleOpenGift = () => {
    sound.playGiftUnbox();
    fireBirthdayConfetti();
    setGiftOpened(true);
  };

  const handleClaimToken = () => {
    sound.playCelebrationPop();
    fireGrandCelebration();
    setTokenClaimed(true);
  };

  const handleCelebrateAgain = () => {
    sound.playCelebrationPop();
    fireGrandCelebration();
    setTimeout(() => {
      onRestart();
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-6 max-w-lg mx-auto">
      {/* Floating Outline Heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <div className="w-13 h-13 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)] mx-auto animate-float">
          <Heart className="w-6 h-6 text-rose-400 stroke-[1.8] drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        </div>
      </motion.div>

      {/* Subtitle / Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-1"
      >
        <span className="text-[11px] font-semibold tracking-[0.22em] text-pink-300/80 uppercase">
          One last thing, my love
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-4xl md:text-5xl font-serif text-white font-normal tracking-tight leading-[1.18] mb-3 max-w-md"
      >
        Never stop being wonderful.
      </motion.h2>

      {/* Simple, Loving Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-slate-300/80 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-4 font-light"
      >
        You deserve all the love, happiness, and peace in the world. I am so
        lucky to have you in my life. Have the best birthday ever, Sahil!
      </motion.p>

      {/* Happy Birthday! 🎂 Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="text-3xl md:text-4xl font-serif text-rose-400 font-medium mb-5 flex items-center justify-center gap-2 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]"
      >
        <span>Happy Birthday, My Love!</span>
        <span className="text-3xl animate-bounce">🎂</span>
      </motion.div>

      {/* SPECIAL SURPRISE GIFT BOX SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full mb-5"
      >
        {!giftOpened ? (
          <button
            onClick={handleOpenGift}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/40 hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group shadow-[0_0_25px_rgba(251,191,36,0.15)] hover:shadow-[0_0_35px_rgba(251,191,36,0.3)]"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gift className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                Tap to unlock Aditi's Special Surprise 🎁
              </h4>
              <p className="text-[11px] text-purple-200/70">
                A special love keepsake prepared just for you
              </p>
            </div>
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 via-purple-950/60 to-slate-900/90 border border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.25)] text-center relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[11px] font-semibold text-amber-300 uppercase tracking-widest mb-2.5">
                <Award className="w-3.5 h-3.5" />
                <span>Special Love Award</span>
              </div>

              <h4 className="text-xl font-serif text-white mb-1">
                The Best Person in the World Award 🏆
              </h4>
              <p className="text-xs text-amber-200/90 italic font-serif mb-3">
                “Presented to Sahil: The most caring, handsome, and loving person who has Aditi's whole heart.”
              </p>

              <div className="flex justify-center gap-3 text-[11px] text-slate-300 font-medium mb-3">
                <span>✦ Forever Mine</span>
                <span>✦ My Safe Place</span>
                <span>✦ Truly Loved</span>
              </div>

              {!tokenClaimed ? (
                <button
                  onClick={handleClaimToken}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-xs font-semibold hover:shadow-md hover:shadow-amber-400/30 transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Claim Aditi's Love Token ❤️</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                  <Check className="w-3.5 h-3.5" />
                  <span>Token Claimed · Loved by Aditi Forever & Always!</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Celebrate Again Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full flex flex-col items-center gap-4"
      >
        <button
          onClick={handleCelebrateAgain}
          type="button"
          className="group px-8 py-3 rounded-full text-white text-sm font-medium tracking-wide shadow-[0_0_25px_rgba(236,72,153,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(236,72,153,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer max-w-xs w-full border border-white/20"
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <span>Celebrate again</span>
            <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
          </span>
        </button>

        {/* Footer Text Dedicated from Aditi */}
        <div className="pt-3 border-t border-white/[0.08] w-full text-center">
          <p className="text-[12px] text-pink-300/70 font-light">
            Made with all my love for Sahil ♡ by Aditi
          </p>
        </div>
      </motion.div>
    </div>
  );
}
