import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CoverPageProps {
  onOpen: () => void;
}

export function CoverPage({ onOpen }: CoverPageProps) {
  const handleOpen = () => {
    sound.playChime();
    if (!sound.getIsPlaying()) {
      sound.play();
    }
    onOpen();
  };

  return (
    <div className="min-h-[78vh] flex flex-col items-center justify-center text-center px-6 py-6 max-w-lg mx-auto relative">
      {/* Floating gentle heart icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="w-13 h-13 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center shadow-xs mx-auto animate-float">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-100/70 stroke-[1.8]" />
        </div>
      </motion.div>

      {/* Subtitle / Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-center gap-1.5 mb-2"
      >
        <span className="text-[11px] font-semibold tracking-[0.22em] text-[#9a5b7e] uppercase">
          A little surprise with lots of love
        </span>
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
      </motion.div>

      {/* Main Title: For you, Sahil. */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="text-5xl md:text-6xl font-serif text-[#2a1b38] font-normal tracking-tight leading-[1.12] mb-3"
      >
        <span>For you, </span>
        <br />
        <span className="italic font-serif bg-gradient-to-r from-[#b84a75] via-[#a251a8] to-[#7c3aed] bg-clip-text text-transparent font-medium">
          Sahil.
        </span>
      </motion.h1>

      {/* Sweet & Basic English Text */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-[#594564] text-base md:text-[17px] leading-relaxed max-w-sm mx-auto mb-6 font-light"
      >
        Today is your special day! Take a moment, smile, and open this little world made just for you with all my love. ♡
      </motion.p>

      {/* Primary Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-col items-center gap-3 w-full"
      >
        <button
          onClick={handleOpen}
          type="button"
          className="group relative px-9 py-3.5 rounded-full text-white text-[15px] font-medium tracking-wide shadow-md shadow-pink-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>Open your surprise</span>
            <span className="text-amber-200 group-hover:rotate-12 transition-transform duration-300">
              ✨
            </span>
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        </button>

        <span className="text-xs text-[#8c7396] font-light">
          Made with all my heart by Aditi · Tap balloons to pop them 🎈
        </span>
      </motion.div>
    </div>
  );
}
