import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Heart } from 'lucide-react';
import { config } from '../config/content';

/**
 * =========================================================================
 * THE LETTER COMPONENT
 * =========================================================================
 * You can also edit the letter content in `/src/config/content.js`
 * or modify the letter paragraphs directly below!
 */

export default function Letter() {
  const { heading, salutation, body, signoff, sender } = config.letter;

  return (
    <section 
      id="letter" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-almostBlack-deep text-almostBlack py-32 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-burgundy/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Feather className="w-4 h-4 text-blush/80" />
            <span className="font-serif italic text-sm tracking-widest text-blush/80 uppercase">
              From the heart
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ivory tracking-tight"
          >
            {heading}
          </motion.h2>
          <div className="w-12 h-[1px] bg-burgundy/50 mx-auto mt-6" />
        </div>

        {/* Luxury Stationery Paper Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative paper-texture rounded-3xl p-8 sm:p-14 md:p-18 text-almostBlack shadow-2xl border border-champagne-dark/30 overflow-hidden"
        >
          {/* Subtle vintage stamp or wax seal accent in corner */}
          <div className="absolute top-8 right-8 flex items-center justify-center w-12 h-12 rounded-full border border-burgundy/30 bg-burgundy/5 shadow-inner">
            <Heart className="w-5 h-5 text-burgundy/70 fill-burgundy/20" />
          </div>

          {/* Letter Content Container */}
          <div className="max-w-xl mx-auto space-y-6">
            
            {/* Salutation */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif text-2xl sm:text-3xl text-burgundy font-normal tracking-wide pt-2 pb-4 border-b border-burgundy/15"
            >
              {salutation}
            </motion.p>

            {/* Letter Body - Each paragraph flows with natural breathing space */}
            <div className="space-y-5 font-serif text-lg sm:text-xl text-almostBlack/90 font-light leading-relaxed tracking-wide pt-2">
              {/* ============================================================== */}
              {/* YOU CAN REPLACE THIS ENTIRE LETTER BODY WITH YOUR OWN MESSAGE: */}
              {/* ============================================================== */}
              {body.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: index * 0.08 }}
                  className="leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Sign-off & Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="pt-10 mt-8 border-t border-burgundy/15 flex flex-col items-end"
            >
              <span className="font-serif italic text-base text-almostBlack/60">
                {signoff}
              </span>
              <span className="font-handwriting text-3xl sm:text-4xl text-burgundy font-medium mt-1">
                {sender}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Small footer note */}
        <p className="text-center font-sans text-xs text-champagne/40 tracking-wider uppercase mt-8">
          A private letter for Anab Sofie
        </p>
      </div>
    </section>
  );
}
