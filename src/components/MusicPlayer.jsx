import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Upload } from 'lucide-react';
import { config } from '../config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState(config.musicFile);
  const [songTitle, setSongTitle] = useState('Ruposh');
  const [useSynthFallback, setUseSynthFallback] = useState(false);
  
  const audioRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Check saved title if any
  useEffect(() => {
    try {
      const savedTitle = localStorage.getItem('anab_song_title');
      if (savedTitle) setSongTitle(savedTitle);
    } catch (e) {
      console.warn("Storage check:", e);
    }
  }, []);

  // Web Audio ambient soothing piano fallback
  const playPianoChord = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const chords = [
        [277.18, 349.23, 415.30, 523.25], // Db maj7
        [233.08, 277.18, 349.23, 440.00], // Bb min7
        [207.65, 261.63, 311.13, 392.00], // Ab dom7
        [246.94, 311.13, 369.99, 466.16], // B maj7
      ];

      const chord = chords[Math.floor(Math.random() * chords.length)];
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        const startTime = ctx.currentTime + (i * 0.12);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 5.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 6.0);
      });
    } catch (e) {
      console.warn("Ambient audio error:", e);
    }
  };

  const startSynth = () => {
    playPianoChord();
    if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    synthIntervalRef.current = setInterval(playPianoChord, 4800);
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Play function that handles browser Autoplay policies automatically
  const startPlaying = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setUseSynthFallback(false);
          stopSynth();
        })
        .catch(() => {
          // If browser policy blocks zero-interaction audio, listen for first touch/click/scroll
          const playOnGesture = () => {
            if (audioRef.current) {
              audioRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                  setUseSynthFallback(false);
                  stopSynth();
                })
                .catch(() => {
                  setUseSynthFallback(true);
                  startSynth();
                  setIsPlaying(true);
                });
            }
            window.removeEventListener('click', playOnGesture);
            window.removeEventListener('touchstart', playOnGesture);
            window.removeEventListener('scroll', playOnGesture);
            window.removeEventListener('keydown', playOnGesture);
          };

          window.addEventListener('click', playOnGesture, { once: true });
          window.addEventListener('touchstart', playOnGesture, { once: true });
          window.addEventListener('scroll', playOnGesture, { once: true });
          window.addEventListener('keydown', playOnGesture, { once: true });
        });
    }
  };

  // Automatically start playback on load & register global triggers
  useEffect(() => {
    startPlaying();

    const handleGlobalStart = () => startPlaying();
    window.addEventListener('start-music', handleGlobalStart);

    return () => {
      window.removeEventListener('start-music', handleGlobalStart);
      stopSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current && !useSynthFallback) {
        audioRef.current.pause();
      }
      stopSynth();
      setIsPlaying(false);
    } else {
      startPlaying();
    }
  };

  const handleCustomAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSource(url);
      setUseSynthFallback(false);
      
      const cleanName = file.name.replace(/\.[^/.]+$/, "").slice(0, 18);
      setSongTitle(cleanName);
      try {
        localStorage.setItem('anab_song_title', cleanName);
      } catch (err) {}

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play().then(() => {
            stopSynth();
            setIsPlaying(true);
          }).catch(console.warn);
        }
      }, 100);
    }
  };

  return (
    <div className="fixed top-6 left-6 z-40 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={audioSource}
        loop
        autoPlay
        preload="auto"
        onError={() => setUseSynthFallback(true)}
      />

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
  );
}
