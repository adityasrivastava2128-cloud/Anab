import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config/content';

export default function TimeSection() {
  const { heading, statements, conclusion } = config.ifYouNeedTime;

  return (
    <section 
      id="need-time" 
      className="relative min-h-[85vh] w-full flex flex-col items-center justify-center bg-ivory text-almostBlack py-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* Gentle ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-champagne/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto w-full text-center">
        
        {/* Subtle Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <span className="font-serif italic text-sm tracking-widest text-burgundy/60 uppercase">
            No pressure
          </span>
          <div className="w-8 h-[1px] bg-burgundy/25 mx-auto mt-2" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-almostBlack tracking-tight mb-16"
        >
          {heading}
        </motion.h2>

        {/* Condition / Reaction pairs */}
        <div className="space-y-8 mb-16">
          {statements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.15 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 font-serif text-xl sm:text-2xl text-almostBlack/90 font-light"
            >
              <span>{item.condition}</span>
              <span className="italic text-burgundy font-normal">{item.reaction}</span>
            </motion.div>
          ))}
        </div>

        {/* Calm conclusion text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="pt-10 border-t border-burgundy/15"
        >
          <p className="font-sans text-base sm:text-lg text-almostBlack/75 font-light leading-relaxed whitespace-pre-line max-w-md mx-auto">
            {conclusion}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
