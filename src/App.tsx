import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { BackgroundAura } from './components/BackgroundAura';
import { FloatingBalloons } from './components/FloatingBalloons';
import { PageNavigation } from './components/PageNavigation';
import { CoverPage } from './components/pages/CoverPage';
import { CakePage } from './components/pages/CakePage';
import { SpecialPage } from './components/pages/SpecialPage';
import { RemindersPage } from './components/pages/RemindersPage';
import { LetterPage } from './components/pages/LetterPage';
import { WishesPage } from './components/pages/WishesPage';
import { FinalePage } from './components/pages/FinalePage';

const TOTAL_PAGES = 7;

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const isDark = currentPage >= 2;

  const goToPage = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= TOTAL_PAGES) return;
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      goToPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  const handleRestart = () => {
    goToPage(0);
  };

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (currentPage < TOTAL_PAGES - 1) handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (currentPage > 0) handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden transition-colors duration-700 ${
        isDark ? 'text-[#f1ecf7]' : 'text-[#2a1b38]'
      }`}
    >
      {/* Dynamic Background Aura (Transitions from Light to Medium to Dark) */}
      <BackgroundAura currentPage={currentPage} />

      {/* Interactive Floating Balloons (Tap to pop!) */}
      <FloatingBalloons />

      {/* Top Header */}
      <Header onRestart={handleRestart} currentPage={currentPage} />

      {/* Main Container with interactive transitions */}
      <main className="flex-1 flex flex-col justify-center items-center w-full max-w-xl mx-auto px-4 pt-20 pb-32 md:pb-24 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col items-center justify-center"
          >
            {currentPage === 0 && <CoverPage onOpen={handleNext} />}
            {currentPage === 1 && <CakePage onNext={handleNext} />}
            {currentPage === 2 && <SpecialPage onNext={handleNext} />}
            {currentPage === 3 && <RemindersPage onNext={handleNext} />}
            {currentPage === 4 && <LetterPage onNext={handleNext} />}
            {currentPage === 5 && <WishesPage onNext={handleNext} />}
            {currentPage === 6 && <FinalePage onRestart={handleRestart} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Page Stepper & Nav Controls */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
