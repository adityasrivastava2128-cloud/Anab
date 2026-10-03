import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { config } from '../config/content';

export default function Hero({ onOpenExperience, isOpened }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: "for you. ♡"
    // Stage 1: Reveal eye image blur to sharp
    const t1 = setTimeout(() => setStage(1), 1400);
    // Stage 2: "Hey, you."
    const t2 = setTimeout(() => setStage(2), 2600);
    // Stage 3: "I made something for you." & small text & button
    const t3 = setTimeout(() => setStage(3), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleOpenClick = () => {
    // Direct audio play within the synchronous user gesture context
    try {
      const audio = document.querySelector('audio');
      if (audio) {
        audio.play().catch(console.warn);
      }
    } catch (e) {
      console.warn("Audio trigger error:", e);
    }
    window.dispatchEvent(new CustomEvent('start-music'));
    if (onOpenExperience) {
      onOpenExperience();
    }
    const nextSection = document.getElementById('before-anything');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-almostBlack text-ivory px-6 select-none"
    >
      {/* Background Eye Image Container with soft blur-to-sharp & subtle slow zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(28px)', scale: 1.14 }}
          animate={{
            opacity: stage >= 1 ? 0.38 : 0,
            filter: stage >= 1 ? 'blur(0px)' : 'blur(28px)',
            scale: stage >= 1 ? 1.04 : 1.14,
          }}
          transition={{
            opacity: { duration: 2.8, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 3.2, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 18, ease: 'easeOut' },
          }}
          className="relative w-full h-full"
        >
          <img
            src={config.eyePhoto}
            alt="Anab's eyes"
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover object-center transform transition-transform duration-1000"
          />
          {/* Subtle gradient vignette to blend eye into dark atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-almostBlack via-almostBlack/60 to-almostBlack/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-almostBlack/80 via-transparent to-almostBlack/80" />
          <div className="absolute inset-0 radial-vignette opacity-80" />
        </motion.div>
      </div>

      {/* Atmospheric lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-burgundy/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center pt-8 pb-12">
        {/* Step 0: "for you. ♡" */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-almostBlack/60 border border-blush/15 backdrop-blur-md"
        >
          <span className="font-serif italic text-sm tracking-widest text-champagne/90">
            {config.intro.subtitle}
          </span>
          <Heart className="w-3.5 h-3.5 text-blush fill-blush/40 animate-pulse" />
        </motion.div>

        {/* Step 2: "Hey, you." */}
        <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center">
          <AnimatePresence>
            {stage >= 2 && (
              <motion.h1
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide text-ivory drop-shadow-sm"
              >
                {config.intro.greeting}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Step 3: "I made something for you." & Note & Button */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center mt-3"
          >
            <h2 className="font-serif italic text-2xl sm:text-3xl text-blush/90 font-light tracking-wide mb-4">
              {config.intro.heading}
            </h2>

            {/* Opening Poetic Couplet */}
            {config.intro.poetry && (
              <div className="my-4 py-3 px-6 rounded-2xl bg-almostBlack/60 border border-blush/20 backdrop-blur-md shadow-lg">
                <p className="font-serif italic text-lg sm:text-xl text-champagne leading-relaxed tracking-wide whitespace-pre-line">
                  "{config.intro.poetry}"
                </p>
              </div>
            )}

            <div className="w-12 h-[1px] bg-burgundy/40 my-2" />

            <p className="font-sans text-sm sm:text-base text-champagne/75 max-w-md leading-relaxed whitespace-pre-line font-light mt-3 mb-10 tracking-wide">
              {config.intro.note}
            </p>

            {/* Interactive "Open it ♡" Button with magnetic glow & hover animation */}
            <motion.button
              onClick={handleOpenClick}
              whileHover={{ 
                scale: 1.04, 
                boxShadow: '0 0 35px rgba(232, 180, 184, 0.28)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-burgundy/85 to-burgundy-dark/95 border border-blush/30 text-ivory text-base tracking-widest font-serif uppercase shadow-lg shadow-burgundy/30 cursor-pointer overflow-hidden"
            >
              {/* Subtle light sweep animation */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <span className="relative z-10 tracking-widest font-medium">
                {config.intro.buttonText}
              </span>
              <Heart className="relative z-10 w-4 h-4 text-blush fill-blush/50 group-hover:scale-125 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Gentle scroll indicator */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          onClick={handleOpenClick}
          className="absolute bottom-6 z-10 flex flex-col items-center gap-1 cursor-pointer text-champagne/50 hover:text-champagne transition-colors"
        >
          <span className="text-[11px] tracking-widest uppercase font-sans font-light">scroll gently</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
}
