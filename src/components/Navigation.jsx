import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Beginning', target: 'hero' },
    { label: 'Before Anything', target: 'before-anything' },
    { label: 'The Eyes', target: 'eye-section' },
    { label: 'What I Learned', target: 'what-i-should-have-understood' },
    { label: 'Her Photo', target: 'memories' },
    { label: 'Our Story', target: 'timeline' },
    { label: 'Things I Don’t Say', target: 'things-i-dont-say-enough' },
    { label: 'Not A Promise', target: 'not-a-promise' },
    { label: 'If You Need Time', target: 'need-time' },
    { label: 'Letter', target: 'letter' },
    { label: 'Pardon & Peace', target: 'final-question' },
  ];

  const handleScrollTo = (targetId) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="fixed top-6 right-6 z-40">
      {/* Heart Menu Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-11 h-11 rounded-full glass-panel border border-blush/25 flex items-center justify-center text-blush shadow-lg hover:border-blush/50 transition-all cursor-pointer group"
        aria-label="Navigation menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-4 h-4 text-champagne" />
            </motion.div>
          ) : (
            <motion.div
              key="heart"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Heart className="w-4 h-4 text-blush fill-blush/40 group-hover:scale-110 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Glassmorphism Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-56 p-3 rounded-2xl glass-panel border border-blush/20 shadow-2xl backdrop-blur-2xl"
          >
            <div className="px-3 py-2 border-b border-blush/10 mb-2">
              <span className="font-serif italic text-xs tracking-widest text-champagne/60 uppercase">
                Chapters
              </span>
            </div>

            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScrollTo(item.target)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs sm:text-sm font-serif tracking-wider text-ivory/80 hover:text-ivory hover:bg-burgundy/25 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] text-blush transition-opacity font-sans">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
