interface BackgroundAuraProps {
  currentPage: number;
}

interface PageTheme {
  bg: string;
  glow1: string;
  glow2: string;
  glow3: string;
}

const PAGE_THEMES: PageTheme[] = [
  // Page 0: Light & Airy Ivory Champagne
  {
    bg: '#fbf8f5',
    glow1: 'radial-gradient(circle, rgba(254, 205, 220, 0.7) 0%, rgba(252, 231, 243, 0.3) 50%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(243, 232, 255, 0.8) 0%, rgba(250, 245, 255, 0.3) 60%, transparent 80%)',
    glow3: 'radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(255, 237, 213, 0.3) 50%, transparent 70%)',
  },
  // Page 1: Soft Sunset Twilight (Light-Medium)
  {
    bg: '#f3e6ee',
    glow1: 'radial-gradient(circle, rgba(244, 114, 182, 0.45) 0%, rgba(251, 207, 232, 0.25) 50%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, rgba(233, 213, 255, 0.2) 60%, transparent 80%)',
    glow3: 'radial-gradient(circle, rgba(251, 146, 60, 0.35) 0%, transparent 70%)',
  },
  // Page 2: Medium Velvet Mauve & Berry
  {
    bg: '#331d42',
    glow1: 'radial-gradient(circle, rgba(219, 39, 119, 0.45) 0%, rgba(131, 24, 67, 0.25) 50%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(88, 28, 135, 0.2) 60%, transparent 80%)',
    glow3: 'radial-gradient(circle, rgba(244, 63, 94, 0.35) 0%, transparent 70%)',
  },
  // Page 3: Deep Twilight Amethyst
  {
    bg: '#211235',
    glow1: 'radial-gradient(circle, rgba(192, 132, 252, 0.35) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(126, 34, 206, 0.45) 0%, transparent 80%)',
    glow3: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
  },
  // Page 4: Royal Midnight Plum
  {
    bg: '#180d26',
    glow1: 'radial-gradient(circle, rgba(225, 29, 72, 0.4) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(107, 33, 168, 0.45) 0%, transparent 80%)',
    glow3: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
  },
  // Page 5: Celestial Midnight Indigo
  {
    bg: '#0f142b',
    glow1: 'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 80%)',
    glow3: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, transparent 70%)',
  },
  // Page 6: Ultra Celebration Obsidian Dark
  {
    bg: '#0a0514',
    glow1: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(147, 51, 234, 0.45) 0%, transparent 80%)',
    glow3: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)',
  },
];

export function BackgroundAura({ currentPage }: BackgroundAuraProps) {
  const theme = PAGE_THEMES[currentPage] || PAGE_THEMES[0];
  const isDark = currentPage >= 2;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-700"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Top right aura */}
      <div
        className="absolute -top-[12%] -right-[12%] w-[480px] md:w-[680px] h-[480px] md:h-[680px] rounded-full blur-[110px] transition-all duration-700 opacity-60"
        style={{ background: theme.glow1 }}
      />

      {/* Middle left aura */}
      <div
        className="absolute top-[32%] -left-[15%] w-[420px] md:w-[620px] h-[420px] md:h-[620px] rounded-full blur-[120px] transition-all duration-700 opacity-55"
        style={{ background: theme.glow2 }}
      />

      {/* Bottom warm aura */}
      <div
        className="absolute -bottom-[12%] right-[12%] w-[440px] md:w-[580px] h-[440px] md:h-[580px] rounded-full blur-[110px] transition-all duration-700 opacity-50"
        style={{ background: theme.glow3 }}
      />

      {/* Delicate starry grid for dark pages */}
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 transition-opacity duration-700" />
      )}

      {/* Subtle floating symbols */}
      <div
        className={`absolute top-[15%] left-[10%] text-lg animate-float select-none transition-colors duration-700 ${
          isDark ? 'text-pink-400/30' : 'text-rose-400/40'
        }`}
      >
        ♡
      </div>
      <div
        className={`absolute top-[45%] right-[8%] text-xs animate-pulse select-none transition-colors duration-700 ${
          isDark ? 'text-purple-400/35' : 'text-purple-400/40'
        }`}
      >
        ✦
      </div>
      <div
        className={`absolute top-[72%] left-[12%] text-xs animate-float select-none transition-colors duration-700 ${
          isDark ? 'text-amber-300/30' : 'text-amber-400/40'
        }`}
        style={{ animationDelay: '2s' }}
      >
        ✧
      </div>
    </div>
  );
}
