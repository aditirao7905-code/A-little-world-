import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  canProceed?: boolean;
}

const PAGE_TITLES = [
  'Welcome',
  'Make a Wish',
  'Standout Traits',
  'Highlights',
  'Letter for You',
  'The Year Ahead',
  'Special Surprise & Finale',
];

export function PageNavigation({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  canProceed = true,
}: PageNavigationProps) {
  const isDark = currentPage >= 2;

  return (
    <nav
      aria-label="Page navigation"
      className={`fixed bottom-0 left-0 right-0 z-40 pt-6 pb-4 px-4 transition-all duration-500 bg-gradient-to-t ${
        isDark
          ? 'from-[#0a0514] via-[#0a0514]/90 to-transparent'
          : 'from-[#fbf8f5] via-[#fbf8f5]/90 to-transparent'
      }`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
            currentPage === 0
              ? 'opacity-0 pointer-events-none'
              : isDark
              ? 'text-purple-200/80 bg-white/[0.08] border border-white/10 hover:bg-white/[0.15] hover:text-white shadow-xs'
              : 'text-[#4e365b] bg-white/90 border border-purple-200 hover:bg-white hover:text-purple-900 shadow-xs'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        {/* Step dots */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xs transition-colors duration-500 ${
            isDark
              ? 'bg-white/[0.06] backdrop-blur-md border-white/10'
              : 'bg-white/80 backdrop-blur-md border-purple-200'
          }`}
        >
          {Array.from({ length: totalPages }).map((_, idx) => (
            <span
              key={idx}
              title={PAGE_TITLES[idx]}
              className={`block rounded-full transition-all duration-300 ${
                idx === currentPage
                  ? 'w-5 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-sm'
                  : idx < currentPage
                  ? isDark
                    ? 'w-2 h-2 bg-purple-400/60'
                    : 'w-2 h-2 bg-purple-300'
                  : isDark
                  ? 'w-2 h-2 bg-white/20'
                  : 'w-2 h-2 bg-purple-100'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1 || !canProceed}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
            currentPage === totalPages - 1
              ? 'opacity-0 pointer-events-none'
              : 'text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 shadow-md shadow-pink-500/25 hover:shadow-pink-500/40'
          }`}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}
