import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config/content';

export default function WhatISaid() {
  const { heading, cards } = config.whatIShouldHaveUnderstood;

  return (
    <section 
      id="what-i-should-have-understood" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-almostBlack text-ivory py-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1 }}
            className="font-serif italic text-sm tracking-widest text-blush/70 uppercase block mb-3"
          >
            Reflections & Realizations
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
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-12 h-[1px] bg-burgundy/50 mx-auto mt-6"
          />
        </div>

        {/* 4 Cards appearing one by one */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{
                duration: 1.1,
                delay: (index % 2) * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, borderColor: 'rgba(232, 180, 184, 0.35)' }}
              className="group relative p-8 sm:p-10 rounded-2xl bg-almostBlack-card/80 border border-blush/15 backdrop-blur-md shadow-xl shadow-almostBlack/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle card top gradient accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-burgundy/40 to-transparent group-hover:via-blush/60 transition-all duration-500" />
              
              <div>
                {/* Index numbering */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-sm text-champagne/40 tracking-wider">
                    {card.number}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-burgundy/40 group-hover:bg-blush transition-colors duration-500" />
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal tracking-wide mb-4 leading-snug">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-sm sm:text-base text-champagne/75 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              {/* Decorative bottom corner subtle glow */}
              <div className="w-24 h-24 bg-burgundy/5 rounded-full blur-xl absolute -bottom-10 -right-10 pointer-events-none group-hover:bg-burgundy/15 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
