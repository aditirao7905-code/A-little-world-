import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audio';
import { fireHeartBurst } from '../../utils/confetti';

interface LetterPageProps {
  onNext: () => void;
}

export function LetterPage({ onNext }: LetterPageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    sound.playEnvelopeOpenSound();
    if (!isOpen) {
      fireHeartBurst();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-[78vh] flex flex-col items-center justify-center text-center px-4 py-5 max-w-lg mx-auto">
      {/* Subtitle / Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-1"
      >
        <span className="text-[11px] font-semibold tracking-[0.22em] text-pink-300/80 uppercase">
          From Aditi's Heart to Yours
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-serif text-white font-normal tracking-tight mb-1 flex items-center justify-center gap-2"
      >
        <span>A love letter for you</span>
        <span className="text-2xl">💌</span>
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="text-slate-300/80 text-sm md:text-[15px] leading-relaxed max-w-sm mx-auto mb-4 font-light"
      >
        A sweet note from Aditi, who loves you more than words can say.
      </motion.p>

      {/* Envelope Interactive Box */}
      <div className="w-full flex flex-col items-center my-1">
        <motion.div
          onClick={handleToggle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-48 h-32 md:w-54 md:h-34 cursor-pointer select-none group"
        >
          {/* Dark Luxury Envelope */}
          <div className="w-full h-full bg-[#180f24] rounded-2xl border-2 border-rose-400/50 shadow-[0_0_25px_rgba(244,63,94,0.2)] flex items-center justify-center relative overflow-hidden group-hover:border-rose-400">
            <svg viewBox="0 0 200 130" className="w-full h-full absolute inset-0">
              <line x1="0" y1="130" x2="80" y2="70" stroke="rgba(244,114,182,0.4)" strokeWidth="2" />
              <line x1="200" y1="130" x2="120" y2="70" stroke="rgba(244,114,182,0.4)" strokeWidth="2" />

              {isOpen ? (
                <polygon points="0,0 100,50 200,0" fill="#241438" stroke="rgba(244,114,182,0.6)" strokeWidth="2" />
              ) : (
                <polygon points="0,0 100,75 200,0" fill="#1b1129" stroke="rgba(244,114,182,0.6)" strokeWidth="2" />
              )}
            </svg>

            {/* Heart Wax Seal */}
            <div className={`absolute z-10 transition-transform duration-300 ${isOpen ? 'scale-75 translate-y-3 opacity-60' : 'scale-100'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.6)] border border-white/20">
                <span className="text-white text-base select-none">❤️</span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-[11px] font-semibold tracking-widest text-pink-300/80 uppercase group-hover:text-pink-200 transition-colors">
            {isOpen ? 'Tap to fold letter' : 'Tap to open Aditi\'s letter'}
          </div>
        </motion.div>
      </div>

      {/* Unfolded Letter Content in Simple, Loving English */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full glass-panel rounded-3xl p-5 md:p-6 text-left my-3 relative overflow-hidden"
          >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500" />

            <div className="space-y-3 text-slate-200 font-serif text-[14px] md:text-[15px] leading-relaxed">
              <p className="font-semibold text-base text-white flex items-center gap-2">
                <span>Dear Sahil,</span>
                <span className="text-red-400">❤️</span>
              </p>

              <p className="font-light text-slate-200">
                Happy Birthday to my favorite person in the whole world! I want
                you to know how deeply and truly I love you. You bring so much
                peace, pure happiness, and warmth into my life just by being you.
              </p>

              <p className="font-light text-slate-200">
                Your sweet laugh, your caring heart, and the gentle way you
                take care of me are my favorite things. You make ordinary days
                feel magical, and having you in my life is the greatest blessing
                I could ever ask for.
              </p>

              <p className="font-light text-slate-200">
                On your birthday, I pray that all your dreams come true, you
                get all the success you work hard for, and your beautiful face
                keeps smiling always. No matter where life takes us, I promise
                to always stand by you and love you with all my heart.
              </p>

              <p className="font-sans font-medium text-xs md:text-sm text-pink-300">
                Keep shining, my handsome boy. I love you so much, forever and always! ❤️
              </p>

              <div className="pt-2 text-right">
                <span className="text-xs text-purple-300/70 font-sans block mb-0.5">
                  With all my love & hugs,
                </span>
                <span className="italic font-script text-2xl text-rose-300">
                  Yours always, Aditi ♡
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-2 w-full flex justify-center"
      >
        <button
          onClick={onNext}
          type="button"
          className="px-8 py-3 rounded-full text-white text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:-translate-y-0.5 cursor-pointer max-w-xs w-full border border-white/20"
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
          }}
        >
          <span>See my sweet wishes for you</span>
          <span className="ml-2">➜</span>
        </button>
      </motion.div>
    </div>
  );
}
