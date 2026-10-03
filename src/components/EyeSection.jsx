import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config/content';
import FloatingParticles from './FloatingParticles';

export default function EyeSection() {
  const { line1, line2, line3 } = config.eyeSection;

  return (
    <section 
      id="eye-section" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-almostBlack text-ivory py-24 px-6 overflow-hidden select-none"
    >
      {/* Subtle floating particles in the atmosphere */}
      <FloatingParticles count={24} color="rgba(232, 180, 184, 0.3)" />

      {/* Ambient background glow behind eye frame */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-burgundy/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] bg-blush/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Vignette borders */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-almostBlack via-transparent to-almostBlack" />

      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Intro poetic line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-champagne/85 font-light tracking-wide mb-12 sm:mb-16"
        >
          {line1}
        </motion.p>

        {/* Central Eye Display with Iris Concentric Rings and Luxury Frame */}
        <div className="relative my-4 flex items-center justify-center">
          
          {/* Subtle concentric iris lines (aperture/iris motif) */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute -inset-8 sm:-inset-12 rounded-full border border-blush/20 pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ duration: 2.6, ease: 'easeOut' }}
            className="absolute -inset-16 sm:-inset-24 rounded-full border border-burgundy/30 pointer-events-none"
          />

          {/* Eye Photo Container with soft cinematic zoom & shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-72 sm:w-96 aspect-square rounded-full overflow-hidden shadow-2xl shadow-almostBlack/90 border-2 border-blush/30 bg-almostBlack/60 group p-1"
          >
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <motion.img
                src={config.eyePhoto}
                alt="Anab's eyes"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Subtle luxury edge vignette */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-almostBlack/40 via-transparent to-almostBlack/20 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Revealing poetic text below eye */}
        <div className="mt-14 sm:mt-18 space-y-6 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl sm:text-3xl text-ivory font-light leading-relaxed tracking-wide"
          >
            {line2}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-lg sm:text-xl text-blush/80 font-light tracking-wider"
          >
            {line3}
          </motion.p>

          {/* Her Eyes Poetic Couplet */}
          {config.eyeSection.poetry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.75 }}
              className="mt-6 py-4 px-6 rounded-2xl bg-almostBlack-card/85 border border-blush/30 shadow-2xl backdrop-blur-md"
            >
              <p className="font-serif italic text-xl sm:text-2xl text-champagne leading-relaxed tracking-wide whitespace-pre-line">
                "{config.eyeSection.poetry}"
              </p>
            </motion.div>
          )}
        </div>

        {/* Minimal accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="w-12 h-[1px] bg-burgundy/40 mt-14"
        />
      </div>
    </section>
  );
}
