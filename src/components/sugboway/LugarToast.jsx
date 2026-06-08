import { useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

// Programmatic Web Audio API synthesizer for the "soft ping" chime
export function playProximityChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    
    // Create double-note chime (E6 -> A6) for a soft ping sound
    const now = audioCtx.currentTime;
    
    // Note 1
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1318.51, now); // E6
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Note 2 (slightly delayed)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1760.00, now + 0.08); // A6
    gain2.gain.setValueAtTime(0.08, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.48);
    
  } catch (err) {
    console.warn('Audio chime failed to play:', err);
  }
}

export default function LugarToast({ stopName, distance, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      playProximityChime();
      
      // Auto close after 6 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, stopName, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-24 md:bottom-28 left-4 right-4 md:left-auto md:right-8 md:w-[380px] z-[9999] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800 rounded-2xl shadow-2xl p-5 flex flex-col gap-3"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="font-mono text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                Approach Alert
              </span>
            </div>
            
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              aria-label="Dismiss alert"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-headline font-bold text-lg text-black dark:text-white leading-tight">
              Approaching {stopName}
            </h4>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              Distance: ~{Math.round(distance)}m
            </p>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-900 pt-3">
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans italic">
              <strong>Cebuano Etiquette:</strong> "Lugar lang" — politely call out to the driver or ask fellow passengers to make way as you approach your stop.
            </p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
