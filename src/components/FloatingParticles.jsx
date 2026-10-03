import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles({ count = 18, color = 'rgba(232, 180, 184, 0.25)' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 14 + 12,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 60,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: ['0px', '-80px', '0px'],
            x: ['0px', `${p.drift}px`, '0px'],
            opacity: [0.15, 0.65, 0.15],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
