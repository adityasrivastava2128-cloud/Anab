import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { config } from '../config/content';

export default function Memories() {
  const { tag, title, subtitle, quote, details } = config.thePhoto;

  return (
    <section 
      id="memories" 
      className="relative min-h-screen w-full bg-ivory text-almostBlack py-32 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-champagne/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blush/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-burgundy/60" />
            <span className="font-serif italic text-sm tracking-widest text-burgundy/70 uppercase">
              {tag}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-almostBlack tracking-tight"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-almostBlack/70 font-light mt-4"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-12 h-[1px] bg-burgundy/40 mx-auto mt-6"
          />
        </div>

        {/* Editorial Presentation Centered on Her Real Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Her Circular Photo Frame with Ambient Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            <div className="relative p-3 sm:p-4 bg-white rounded-3xl shadow-2xl shadow-almostBlack/10 border border-champagne/40 w-full max-w-md">
              
              {/* Photo Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-almostBlack shadow-inner group">
                <img
                  src={config.eyePhoto}
                  alt="Anab's eye"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                
                {/* Subtle vignette border */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="pt-4 pb-2 px-2 text-center">
                <p className="font-handwriting text-2xl sm:text-3xl text-burgundy tracking-wide">
                  "the picture of you I held onto."
                </p>
                <p className="font-serif italic text-xs text-almostBlack/50 tracking-widest uppercase mt-1">
                  a quiet glimpse · anab sofie
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Three Intimate Reflections */}
          <div className="lg:col-span-6 space-y-8">
            {details.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 1.1,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-6 rounded-2xl bg-white/70 border border-champagne/50 shadow-sm hover:shadow-md hover:border-blush/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-burgundy" />
                  <h3 className="font-serif text-xl sm:text-2xl text-almostBlack font-normal tracking-wide">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-sm sm:text-base text-almostBlack/75 font-light leading-relaxed pl-3.5">
                  {item.description}
                </p>
              </motion.div>
            ))}

            {/* Poetic Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-burgundy/10 to-blush/15 border-l-4 border-burgundy"
            >
              <p className="font-serif italic text-base sm:text-lg text-burgundy font-normal leading-relaxed">
                "{quote}"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
