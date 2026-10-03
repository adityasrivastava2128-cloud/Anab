import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { config } from '../config/content';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function FinalQuestion() {
  const [responseState, setResponseState] = useState(null); // 'yes' | 'time' | null
  const { 
    prompt1, 
    prompt2, 
    mainQuestion, 
    subtext, 
    yesButtonText, 
    timeButtonText,
    yesResponse,
    timeResponse 
  } = config.finalQuestion;

  const handleOpenContact = (platform) => {
    let url = config.contact.whatsapp;
    if (platform === 'instagram') {
      url = config.contact.instagram;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="final-question" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-almostBlack text-ivory py-32 px-6 overflow-hidden select-none"
    >
      {/* Her eye photo appearing very faintly in the background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={config.eyePhoto}
          alt=""
          className="w-full h-full object-cover object-center opacity-10 filter blur-[8px] scale-105"
        />
        <div className="absolute inset-0 bg-radial-gradient from-almostBlack/40 via-almostBlack/80 to-almostBlack" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        <AnimatePresence mode="wait">
          {responseState === null && (
            <motion.div
              key="question-box"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
              className="flex flex-col items-center"
            >
              {/* "So..." */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1 }}
                className="font-serif italic text-2xl sm:text-3xl text-champagne/70 font-light mb-4"
              >
                {prompt1}
              </motion.p>

              {/* "Bas ek guzarish hai—" */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="font-serif italic text-lg sm:text-xl text-champagne/60 font-light mb-2"
              >
                {prompt2}
              </motion.p>

              {/* Final Question Poetic Couplet */}
              {config.finalQuestion.poetry && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="my-6 py-4 px-6 rounded-2xl bg-almostBlack-card/85 border border-blush/25 max-w-lg shadow-xl"
                >
                  <p className="font-serif italic text-xl sm:text-2xl text-champagne leading-relaxed tracking-wide whitespace-pre-line">
                    "{config.finalQuestion.poetry}"
                  </p>
                </motion.div>
              )}

              {/* "Can we talk?" / Main Question */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight drop-shadow-md mb-8"
              >
                {mainQuestion}
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.7 }}
                className="font-sans text-sm sm:text-base text-champagne/70 font-light max-w-md leading-relaxed whitespace-pre-line mb-16"
              >
                {subtext}
              </motion.p>

              {/* Two respectful buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
              >
                {/* YES BUTTON */}
                <motion.button
                  onClick={() => setResponseState('yes')}
                  whileHover={{ 
                    scale: 1.04, 
                    boxShadow: '0 0 30px rgba(232, 180, 184, 0.3)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-burgundy to-burgundy-light border border-blush/40 text-ivory text-base tracking-widest font-serif shadow-lg shadow-burgundy/40 cursor-pointer flex items-center justify-center gap-3"
                >
                  <span>{yesButtonText}</span>
                  <Heart className="w-4 h-4 text-blush fill-blush" />
                </motion.button>

                {/* NEED TIME BUTTON */}
                <motion.button
                  onClick={() => setResponseState('time')}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(23, 19, 21, 0.9)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-almostBlack/60 border border-champagne/25 text-champagne/80 hover:text-ivory text-base tracking-wide font-sans font-light backdrop-blur-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-champagne/60" />
                  <span>{timeButtonText}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* TRANSITION IF SHE CLICKS "♡ I'll talk to you" */}
          {responseState === 'yes' && (
            <motion.div
              key="yes-response"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-14 rounded-3xl bg-almostBlack-card/90 border border-blush/30 shadow-2xl backdrop-blur-xl flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-burgundy/20 border border-blush/30 flex items-center justify-center mb-8">
                <Heart className="w-8 h-8 text-blush fill-blush/40 animate-pulse" />
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl text-ivory font-normal tracking-wide mb-4">
                {yesResponse.title}
              </h3>

              <p className="font-serif italic text-xl sm:text-2xl text-blush/90 font-light mb-10">
                {yesResponse.subtitle}
              </p>

              {/* Action Buttons to open WhatsApp or Instagram */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                <motion.button
                  onClick={() => handleOpenContact('whatsapp')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-400/40 text-ivory text-sm tracking-wider font-sans uppercase flex items-center justify-center gap-3 cursor-pointer shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>{yesResponse.actionText} (WhatsApp)</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={() => handleOpenContact('instagram')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-4 rounded-full bg-almostBlack/70 hover:bg-burgundy/40 border border-blush/25 text-champagne text-sm tracking-wider font-sans uppercase flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <InstagramIcon className="w-4 h-4 text-blush" />
                  <span>Instagram</span>
                </motion.button>
              </div>

              {/* Final Screen Poetic Couplet */}
              {config.finalQuestion.finalScreenPoetry && (
                <div className="my-6 py-3.5 px-6 rounded-2xl bg-almostBlack/60 border border-blush/25 text-center max-w-md shadow-lg">
                  <p className="font-serif italic text-lg sm:text-xl text-champagne leading-relaxed tracking-wide whitespace-pre-line">
                    "{config.finalQuestion.finalScreenPoetry}"
                  </p>
                </div>
              )}

              <p className="font-sans text-xs text-champagne/50 tracking-wider">
                {yesResponse.footnote}
              </p>

              {/* Option to go back if clicked by mistake */}
              <button
                onClick={() => setResponseState(null)}
                className="mt-8 inline-flex items-center gap-1.5 text-xs text-champagne/40 hover:text-champagne/80 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Change response</span>
              </button>
            </motion.div>
          )}

          {/* TRANSITION IF SHE CLICKS "I need some time" */}
          {responseState === 'time' && (
            <motion.div
              key="time-response"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-14 rounded-3xl bg-almostBlack-card/85 border border-champagne/20 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center max-w-lg"
            >
              <div className="w-14 h-14 rounded-full bg-almostBlack border border-champagne/20 flex items-center justify-center mb-8">
                <Clock className="w-6 h-6 text-champagne/70" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light mb-3">
                {timeResponse.line1}
              </h3>

              <p className="font-serif italic text-xl sm:text-2xl text-champagne/90 font-light mb-3">
                {timeResponse.line2}
              </p>

              <p className="font-sans text-base text-champagne/70 font-light mb-8">
                {timeResponse.line3}
              </p>

              <div className="w-12 h-[1px] bg-burgundy/40 my-2" />

              <p className="font-serif text-xl sm:text-2xl text-blush font-light mt-6 leading-relaxed">
                "{timeResponse.line4}"
              </p>

              {/* Final Screen Poetic Couplet */}
              {config.finalQuestion.finalScreenPoetry && (
                <div className="my-6 py-3.5 px-6 rounded-2xl bg-almostBlack/60 border border-champagne/20 text-center max-w-md shadow-lg">
                  <p className="font-serif italic text-lg sm:text-xl text-champagne leading-relaxed tracking-wide whitespace-pre-line">
                    "{config.finalQuestion.finalScreenPoetry}"
                  </p>
                </div>
              )}

              {/* Reset button */}
              <button
                onClick={() => setResponseState(null)}
                className="mt-6 inline-flex items-center gap-1.5 text-xs text-champagne/40 hover:text-champagne/80 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Return to question</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
