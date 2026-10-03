import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config/content';

export default function Intro() {
  const { heading, paragraphs } = config.beforeAnything;

  return (
    <section 
      id="before-anything" 
      className="relative min-h-screen w-full flex items-center justify-center bg-ivory text-almostBlack py-28 px-6 sm:px-10 overflow-hidden"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-champagne/25 rounded-full blur-2xl pointer-events-none" />
      
      {/* Subtle border line on top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-burgundy/15 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-6"
        >
          <span className="font-serif italic text-sm tracking-widest text-burgundy/70 uppercase">
            A quiet word
          </span>
          <div className="w-8 h-[1px] bg-burgundy/30 mx-auto mt-2" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-almostBlack font-normal text-center mb-16 tracking-tight leading-tight"
        >
          {heading}
        </motion.h2>

        {/* Paragraphs with gentle staggered scroll animations */}
        <div className="space-y-8 font-sans text-base sm:text-lg text-almostBlack/85 leading-relaxed font-light">
          {paragraphs.map((para, index) => {
            const isCallout = para.includes('No excuses') || para === 'Just me.';
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ 
                  duration: 1.1, 
                  delay: index * 0.12, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`relative ${
                  isCallout 
                    ? 'pl-6 py-2 border-l-2 border-burgundy/40 italic font-serif text-xl sm:text-2xl text-burgundy font-normal' 
                    : ''
                }`}
              >
                <p className="whitespace-pre-line">
                  {para}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Subtle separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="w-16 h-[1px] bg-burgundy mx-auto mt-20"
        />
      </div>
    </section>
  );
}
