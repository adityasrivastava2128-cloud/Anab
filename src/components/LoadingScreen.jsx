import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onLoaded }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 0: Initial text "made with a little courage..."
    const timer1 = setTimeout(() => {
      setStep(1); // Step 1: "and a lot of feelings."
    }, 1800);

    const timer2 = setTimeout(() => {
      setStep(2); // Step 2: Complete loading and fade out
    }, 3800);

    const timer3 = setTimeout(() => {
      onLoaded();
    }, 4600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: step === 2 ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-almostBlack text-ivory px-6 pointer-events-none"
    >
      <div className="relative text-center max-w-md">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="courage"
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 0.85, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="font-serif italic text-lg sm:text-xl tracking-wider text-champagne/80"
            >
              made with a little courage...
            </motion.p>
          )}

          {step === 1 && (
            <motion.div
              key="feelings"
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 0.95, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="space-y-2"
            >
              <p className="font-serif italic text-base sm:text-lg tracking-wider text-champagne/50">
                made with a little courage...
              </p>
              <p className="font-serif text-xl sm:text-2xl tracking-widest text-ivory font-light">
                and a lot of feelings.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal breathing indicator line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: step >= 0 ? 1 : 0, opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-[1px] bg-blush/40 mx-auto mt-8"
        />
      </div>
    </motion.div>
  );
}
