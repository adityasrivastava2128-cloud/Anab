import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { config } from '../config/content';

export default function Actions() {
  const { heading, paragraphs, progression, closing } = config.notAPromise;

  return (
    <section 
      id="not-a-promise" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-burgundy-deep via-burgundy to-almostBlack text-ivory py-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* Deep atmospheric shadows */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        
        {/* Subtitle tag */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1 }}
          className="font-serif italic text-sm tracking-widest text-blush/75 uppercase block mb-4"
        >
          An honest intention
        </motion.span>

        {/* Large Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight leading-tight mb-16"
        >
          {heading}
        </motion.h2>

        {/* Body Paragraphs */}
        <div className="space-y-6 max-w-xl mx-auto mb-20 font-sans text-base sm:text-lg text-champagne/85 font-light leading-relaxed">
          {paragraphs.map((para, index) => {
            const isHighlight = index === paragraphs.length - 1;
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 1.1,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={isHighlight ? 'font-serif text-2xl sm:text-3xl text-blush font-normal italic pt-4' : ''}
              >
                {para}
              </motion.p>
            );
          })}
        </div>

        {/* WORDS -> ACTIONS -> CONSISTENCY Animated Sequence */}
        <div className="py-12 my-6 flex flex-col items-center justify-center space-y-6">
          {progression.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 1.3,
                  delay: index * 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center"
              >
                <div className="px-8 py-3 rounded-full bg-almostBlack/50 border border-blush/25 backdrop-blur-md shadow-xl">
                  <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-ivory font-light uppercase">
                    {item.step}
                  </span>
                </div>
                <span className="font-serif italic text-xs sm:text-sm text-champagne/60 tracking-wider mt-2">
                  {item.note}
                </span>
              </motion.div>

              {index < progression.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 0.7, height: 28 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.35 + 0.2 }}
                  className="flex flex-col items-center text-blush/60"
                >
                  <ArrowDown className="w-5 h-5 animate-pulse" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Final Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 pt-10 border-t border-blush/20 max-w-lg mx-auto"
        >
          <p className="font-serif italic text-xl sm:text-2xl text-champagne font-light leading-relaxed mb-3">
            "{closing[0]}"
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-ivory font-normal leading-relaxed">
            "{closing[1]}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
