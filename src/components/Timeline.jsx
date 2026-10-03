import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config/content';

export default function Timeline() {
  const { heading, subtitle, entries } = config.timeline;

  return (
    <section 
      id="timeline" 
      className="relative min-h-screen w-full bg-almostBlack text-ivory py-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-burgundy/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1 }}
            className="font-serif italic text-sm tracking-widest text-blush/70 uppercase block mb-3"
          >
            Milestones & Moments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ivory tracking-tight"
          >
            {heading}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-sans text-sm sm:text-base text-champagne/70 font-light mt-3"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-12 h-[1px] bg-burgundy/50 mx-auto mt-6"
          />
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-burgundy/50 to-transparent" />

          <div className="space-y-12 sm:space-y-16">
            {entries.map((entry, index) => {
              const isEven = index % 2 === 0;
              const isSpecial = index === entries.length - 1 || index === entries.length - 2;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{
                    duration: 1.1,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node with Iris motif */}
                  <div className="absolute left-4 sm:left-1/2 top-2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-almostBlack border-2 border-blush flex items-center justify-center shadow-lg shadow-burgundy/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-burgundy" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-10 w-full">
                    <div className={`p-6 sm:p-7 rounded-2xl bg-almostBlack-card/75 border border-blush/10 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-blush/30 ${
                      isSpecial ? 'bg-gradient-to-br from-almostBlack-card to-burgundy-deep/20 border-blush/25' : ''
                    } ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                      
                      {/* Tag / Chapter */}
                      <span className="font-serif italic text-xs tracking-widest text-blush/60 uppercase block mb-1">
                        {entry.tag}
                      </span>

                      {/* Entry Title */}
                      <h3 className={`font-serif text-xl sm:text-2xl font-normal tracking-wide mb-2 ${
                        isSpecial ? 'text-blush' : 'text-ivory'
                      }`}>
                        {entry.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-sm text-champagne/75 leading-relaxed font-light">
                        {entry.description}
                      </p>

                      {/* Optional Photo if provided */}
                      {entry.photo && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-blush/15 aspect-[16/9]">
                          <img
                            src={entry.photo}
                            alt={entry.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section bottom note / Missing Her couplet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center mt-20 max-w-md mx-auto"
        >
          {config.timeline.poetry && (
            <div className="py-4 px-6 rounded-2xl bg-almostBlack-card/85 border border-blush/20 shadow-xl mb-4">
              <p className="font-serif italic text-lg sm:text-xl text-champagne leading-relaxed tracking-wide whitespace-pre-line">
                "{config.timeline.poetry}"
              </p>
            </div>
          )}
          <span className="font-serif italic text-sm sm:text-base text-champagne/50">
            "And you still mean the world to me."
          </span>
        </motion.div>
      </div>
    </section>
  );
}
