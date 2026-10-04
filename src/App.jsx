import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Intro from './components/Intro';
import EyeSection from './components/EyeSection';
import WhatISaid from './components/WhatISaid';
import Memories from './components/Memories';
import Timeline from './components/Timeline';
import ThingsISaid from './components/ThingsISaid';
import Actions from './components/Actions';
import TimeSection from './components/TimeSection';
import Letter from './components/Letter';
import FinalQuestion from './components/FinalQuestion';
import { config } from './config/content';

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [experienceOpened, setExperienceOpened] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-almostBlack text-ivory selection:bg-burgundy selection:text-ivory">
      {/* Global subtle film grain texture overlay */}
      <div className="fixed inset-0 grain-overlay z-40 pointer-events-none" />

      {/* Atmospheric Cursor Glow for desktop */}
      <CursorGlow />

      {/* Initial cinematic loading sequence */}
      {!hasLoaded && <LoadingScreen onLoaded={() => setHasLoaded(true)} />}

      {/* Fixed top UI controls */}
      <MusicPlayer />
      <Navigation />

      {/* Main Narrative Experience */}
      <main className="relative w-full">
        {/* Page 1: Cinematic Intro with Eye reveal */}
        <Hero 
          onOpenExperience={() => setExperienceOpened(true)} 
          isOpened={experienceOpened} 
        />

        {/* Page 2: Before Anything Else */}
        <Intro />

        {/* Page 3: The Eye Section */}
        <EyeSection />

        {/* Page 4: What I Should Have Understood */}
        <WhatISaid />

        {/* Page 5: Our Little World (Editorial Photo Gallery) */}
        <Memories />

        {/* Page 6: Our Timeline */}
        <Timeline />

        {/* Page 7: Things I Don't Say Enough */}
        <ThingsISaid />

        {/* Page 8: This Is Not A Promise (Words -> Actions -> Consistency) */}
        <Actions />

        {/* Page 9: If You Need Time */}
        <TimeSection />

        {/* Page 10: The Letter */}
        <Letter />

        {/* Page 11: The Final Question & Respectful Choices */}
        <FinalQuestion />
      </main>

      {/* Minimal respectful footer */}
      <footer className="relative py-12 bg-almostBlack-deep text-center border-t border-burgundy/15">
        <p className="font-serif italic text-sm text-champagne/50 tracking-widest">
          for {config.herName} ♡
        </p>
        <p className="font-sans text-[11px] text-champagne/30 tracking-widest uppercase mt-2">
          private & confidential
        </p>
      </footer>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
