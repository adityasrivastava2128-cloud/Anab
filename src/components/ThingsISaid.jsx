import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config/content';

export default function ThingsISaid() {
  const { heading, cards } = config.thingsIDontSayEnough;

  return (
    <section 
      id="things-i-dont-say-enough" 
      className="relative min-h-screen w-full bg-ivory text-almostBlack py-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-champagne/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blush/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1 }}
            className="font-serif italic text-sm tracking-widest text-burgundy/70 uppercase block mb-3"
          >
            Gratitude & Apology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-almostBlack tracking-tight"
          >
            {heading}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-12 h-[1px] bg-burgundy/40 mx-auto mt-6"
          />
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((card, index) => {
            const isApology = card.isApology;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 1.1,
                  delay: (index % 2) * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-8 sm:p-10 rounded-2xl cursor-default transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                  isApology
                    ? 'md:col-span-2 bg-gradient-to-br from-burgundy to-burgundy-deep text-ivory shadow-2xl shadow-burgundy/30 border border-blush/30'
                    : 'bg-white/85 text-almostBlack shadow-lg shadow-almostBlack/5 border border-champagne/50 hover:shadow-xl hover:border-blush/40'
                }`}
              >
                {/* Subtle top shimmer */}
                <div className={`absolute top-0 inset-x-0 h-[2px] ${
                  isApology ? 'bg-gradient-to-r from-transparent via-blush/60 to-transparent' : 'bg-gradient-to-r from-transparent via-burgundy/20 to-transparent'
                }`} />

                <div>
                  {/* Pre-heading */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-serif italic text-base sm:text-lg tracking-wider ${
                      isApology ? 'text-blush' : 'text-burgundy'
                    }`}>
                      {card.pre}
                    </span>
                    {isApology ? (
                      <Heart className="w-5 h-5 text-blush fill-blush/40" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-burgundy/30" />
                    )}
                  </div>

                  {/* Message */}
                  <p className={`font-serif text-xl sm:text-2xl font-light leading-relaxed tracking-wide ${
                    isApology ? 'text-ivory font-normal' : 'text-almostBlack/90'
                  }`}>
                    {card.message}
                  </p>
                </div>

                {isApology && (
                  <div className="mt-8 pt-4 border-t border-blush/20 flex items-center justify-between">
                    <span className="font-sans text-xs tracking-widest uppercase text-blush/75">
                      Sincerely, from the bottom of my heart
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
