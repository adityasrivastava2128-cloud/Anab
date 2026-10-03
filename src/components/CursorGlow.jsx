import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsPointerDevice(true);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  if (!isPointerDevice) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30 w-72 h-72 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 filter blur-3xl mix-blend-screen"
      style={{
        left: cursorX,
        top: cursorY,
        background: 'radial-gradient(circle, rgba(232, 180, 184, 0.4) 0%, rgba(107, 39, 55, 0.15) 50%, transparent 70%)',
      }}
    />
  );
}
