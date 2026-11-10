import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

interface Balloon {
  id: number;
  left: string;
  size: number;
  color: string;
  glow: string;
  speed: number;
  delay: number;
}

const INITIAL_BALLOONS: Balloon[] = [
  { id: 1, left: '6%', size: 48, color: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)', glow: 'rgba(244, 114, 182, 0.4)', speed: 18, delay: 0 },
  { id: 2, left: '18%', size: 42, color: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)', glow: 'rgba(192, 132, 252, 0.4)', speed: 22, delay: 2 },
  { id: 3, left: '78%', size: 52, color: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)', glow: 'rgba(252, 211, 77, 0.4)', speed: 20, delay: 1 },
  { id: 4, left: '88%', size: 40, color: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)', glow: 'rgba(251, 113, 133, 0.4)', speed: 19, delay: 3 },
  { id: 5, left: '48%', size: 44, color: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)', glow: 'rgba(96, 165, 250, 0.35)', speed: 23, delay: 4 },
];

export function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>(INITIAL_BALLOONS);
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());

  const handlePop = (id: number) => {
    sound.playBalloonPop();
    setPoppedIds((prev) => new Set(prev).add(id));

    // Respawn balloon after 5 seconds
    setTimeout(() => {
      setPoppedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 5000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {balloons.map((b) => {
          if (poppedIds.has(b.id)) return null;

          return (
            <motion.div
              key={b.id}
              initial={{ y: '110vh', x: 0 }}
              animate={{
                y: '-20vh',
                x: [0, 15, -15, 0],
              }}
              transition={{
                y: {
                  duration: b.speed,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: b.delay,
                },
                x: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              style={{
                position: 'absolute',
                left: b.left,
                bottom: 0,
                width: b.size,
                pointerEvents: 'auto',
              }}
              className="cursor-pointer group select-none"
              onClick={() => handlePop(b.id)}
              title="Tap to pop! 🎈"
            >
              {/* Balloon Body */}
              <div
                style={{
                  width: b.size,
                  height: b.size * 1.25,
                  background: b.color,
                  boxShadow: `0 8px 20px ${b.glow}, inset 4px 4px 10px rgba(255,255,255,0.45)`,
                  borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                }}
                className="relative transition-transform duration-200 group-hover:scale-110 active:scale-95"
              >
                {/* Shiny highlight reflection */}
                <div
                  className="absolute top-2 left-2.5 w-2 h-4 rounded-full bg-white/60 blur-[0.6px] rotate-[-25deg]"
                />

                {/* Knot */}
                <div
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-xs"
                  style={{ background: b.color }}
                />

                {/* String */}
                <svg
                  className="absolute top-[98%] left-1/2 -translate-x-1/2 w-3 h-12 overflow-visible stroke-white/40"
                  fill="none"
                  viewBox="0 0 10 40"
                >
                  <path d="M 5 0 Q 8 10 3 20 T 6 40" strokeWidth="1" />
                </svg>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
