import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Upload, Sparkles } from 'lucide-react';
import { config } from '../config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState(config.musicFile);
  const [songTitle, setSongTitle] = useState('Ruposh');
  const [needsGesturePrompt, setNeedsGesturePrompt] = useState(false);
  
  const audioRef = useRef(null);

  // Check saved custom song title if any
  useEffect(() => {
    try {
      const savedTitle = localStorage.getItem('anab_song_title');
      if (savedTitle) setSongTitle(savedTitle);
    } catch (e) {
      console.warn("Storage check:", e);
    }
  }, []);

  // Safe play function with comprehensive error handling
  const playAudio = useCallback(() => {
    if (!audioRef.current) return Promise.reject(new Error("No audio element"));
    
    // Ensure volume is up
    audioRef.current.volume = 1.0;
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          setIsPlaying(true);
          setNeedsGesturePrompt(false);
        })
        .catch((err) => {
          console.log("Autoplay waiting for user gesture:", err?.message || err);
          setIsPlaying(false);
          setNeedsGesturePrompt(true);
          throw err;
        });
    }
    return Promise.resolve();
  }, []);

  // Set up interaction listeners if browser autoplay policy blocks immediate sound
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Attempt immediate autoplay
    playAudio().catch(() => {
      // 2. If blocked by browser autoplay policy, listen for first real user interaction
      // Note: Only real user activation events count in modern browsers (NOT scroll/wheel)
      const activationEvents = ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown'];

      const handleUserGesture = () => {
        playAudio()
          .then(() => {
            // Remove listeners once audio successfully starts playing
            activationEvents.forEach(evt => {
              window.removeEventListener(evt, handleUserGesture, true);
              document.removeEventListener(evt, handleUserGesture, true);
            });
          })
          .catch(() => {
            // Keep listeners active if still blocked
          });
      };

      activationEvents.forEach(evt => {
        window.addEventListener(evt, handleUserGesture, { once: false, capture: true });
        document.addEventListener(evt, handleUserGesture, { once: false, capture: true });
      });

      return () => {
        activationEvents.forEach(evt => {
          window.removeEventListener(evt, handleUserGesture, true);
          document.removeEventListener(evt, handleUserGesture, true);
        });
      };
    });

    // 3. Listen for global explicit play triggers (e.g. from Hero "Open it ♡" button)
    const handleGlobalStart = () => {
      playAudio().catch(console.warn);
    };
    window.addEventListener('start-music', handleGlobalStart);

    return () => {
      window.removeEventListener('start-music', handleGlobalStart);
    };
  }, [playAudio]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio().catch(console.warn);
    }
  };

  const handleCustomAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSource(url);
      
      const cleanName = file.name.replace(/\.[^/.]+$/, "").slice(0, 18);
      setSongTitle(cleanName);
      try {
        localStorage.setItem('anab_song_title', cleanName);
      } catch (err) {}

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          playAudio().catch(console.warn);
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Native HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={audioSource}
        loop
        autoPlay
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Fixed top controls bar */}
      <div className="fixed top-6 left-6 z-40 flex items-center gap-2">
        {/* Main Music Toggle Button */}
        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-blush/20 text-ivory text-xs sm:text-sm font-serif tracking-wider shadow-lg hover:border-blush/40 transition-all cursor-pointer"
          aria-label="Toggle background music"
        >
          <span className="text-blush">♪</span>
          <span className="font-light tracking-widest text-champagne/90 group-hover:text-ivory max-w-[120px] truncate">
            {isPlaying ? (songTitle === 'Music' ? 'Playing' : songTitle) : songTitle}
          </span>

          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3 ml-1">
              <span className="w-[2px] bg-blush h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-[2px] bg-blush h-2/3 animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
              <span className="w-[2px] bg-blush h-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-champagne/40 ml-1" />
          )}
        </motion.button>

        {/* Choose Song Button */}
        <label
          htmlFor="custom-song-upload"
          className="px-2.5 py-2 rounded-full glass-panel border border-blush/20 hover:border-blush/50 text-champagne/70 hover:text-ivory text-xs font-sans flex items-center gap-1 cursor-pointer transition-all shadow-md"
          title="Choose another audio file (.mp3, .m4a, .wav) from your computer"
        >
          <Upload className="w-3.5 h-3.5 text-blush" />
          <span className="hidden sm:inline text-[11px] tracking-wider font-light">Change</span>
          <input
            id="custom-song-upload"
            type="file"
            accept="audio/*"
            onChange={handleCustomAudioUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Floating Gentle Invitation Prompt if browser autoplay is waiting for interaction */}
      <AnimatePresence>
        {!isPlaying && needsGesturePrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.8 }}
            onClick={() => playAudio().catch(console.warn)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 cursor-pointer"
          >
            <div className="px-5 py-2.5 rounded-full bg-almostBlack/85 border border-blush/30 shadow-2xl backdrop-blur-md flex items-center gap-2.5 hover:border-blush/60 transition-all group">
              <span className="w-2 h-2 rounded-full bg-blush animate-ping" />
              <span className="font-serif italic text-xs sm:text-sm text-champagne tracking-wide group-hover:text-ivory">
                Tap anywhere to start music ♡
              </span>
              <Volume2 className="w-3.5 h-3.5 text-blush/80" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
