import { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface HeaderProps {
  onRestart?: () => void;
  currentPage: number;
}

export function Header({ onRestart, currentPage }: HeaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isDark = currentPage >= 2;

  useEffect(() => {
    const unsub = sound.subscribe((active) => {
      setIsPlaying(active);
    });
    return unsub;
  }, []);

  const handleToggleMusic = () => {
    sound.toggle();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-3.5 backdrop-blur-xl max-w-4xl mx-auto transition-all duration-500 border-b ${
        isDark
          ? 'bg-[#0a0514]/75 border-white/[0.08]'
          : 'bg-[#fbf8f5]/80 border-purple-200/50'
      }`}
    >
      {/* Brand */}
      <button
        onClick={onRestart}
        className={`group flex items-center gap-1.5 text-left text-[16px] md:text-lg font-serif transition-colors cursor-pointer ${
          isDark
            ? 'text-white hover:text-rose-300'
            : 'text-[#2e1d3b] hover:text-rose-600'
        }`}
        title="Go to beginning"
      >
        <span className="font-medium tracking-tight">a little world</span>
        <span className="text-rose-400 group-hover:scale-125 transition-transform inline-block drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">
          ♡
        </span>
      </button>

      {/* Music Toggle */}
      <button
        onClick={handleToggleMusic}
        type="button"
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer border ${
          isPlaying
            ? isDark
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)] ring-1 ring-rose-400/40'
              : 'bg-rose-100 text-rose-700 border-rose-300 shadow-sm ring-1 ring-rose-200'
            : isDark
            ? 'bg-white/[0.06] text-purple-200/80 border-white/10 hover:bg-white/[0.12] hover:text-white'
            : 'bg-white/80 text-[#543b60] border-purple-200 hover:bg-white hover:text-purple-900 shadow-xs'
        }`}
      >
        <span
          className={`inline-block ${
            isPlaying ? 'animate-bounce text-rose-500' : 'text-purple-400'
          }`}
        >
          ♫
        </span>
        <span className="tracking-wide">
          {isPlaying ? 'Pause music' : 'Play birthday music'}
        </span>
      </button>
    </header>
  );
}
