'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroTextOverlaysProps {
  progress: MotionValue<number>;
}

export default function HeroTextOverlays({ progress }: HeroTextOverlaysProps) {
  // Timeline transform maps for text section opacities and vertical translations
  // Stage 1: [0.0 to 0.22]
  const opacity1 = useTransform(progress, [0, 0.05, 0.18, 0.24], [1, 1, 1, 0]);
  const y1 = useTransform(progress, [0, 0.05, 0.18, 0.24], [0, 0, -20, -40]);

  // Stage 2: [0.24 to 0.48]
  const opacity2 = useTransform(progress, [0.22, 0.27, 0.42, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.22, 0.27, 0.42, 0.48], [30, 0, 0, -30]);

  // Stage 3: [0.48 to 0.75]
  const opacity3 = useTransform(progress, [0.47, 0.52, 0.70, 0.76], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.47, 0.52, 0.70, 0.76], [30, 0, 0, -30]);

  // Stage 4: [0.76 to 1.0]
  const opacity4 = useTransform(progress, [0.75, 0.82, 0.95, 1], [0, 1, 1, 0]);
  const y4 = useTransform(progress, [0.75, 0.82, 0.95, 1], [30, 0, 0, -20]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center text-center px-4">
      {/* Stage 1: Initial Reveal */}
      <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 mb-4 border border-white/20 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-300">
          BELL AUTOMOTIVE SPECIALIST SHOWROOM
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
          THE RANGE ROVER
        </h1>
        <p className="mt-4 text-base sm:text-xl md:text-2xl font-light tracking-widest text-neutral-300 uppercase">
          Engineered to be understood.
        </p>
      </motion.div>

      {/* Stage 2: 360 Rotation */}
      <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 mb-4 border border-garage-accent/30 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-garage-accent">
          360° ARCHITECTURAL PRECISION
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
          PRECISION IN EVERY LAYER.
        </h2>
        <p className="mt-3 text-sm sm:text-lg text-neutral-300 font-light tracking-wide">
          Every bolt, strut, and power module has a defined purpose.
        </p>
      </motion.div>

      {/* Stage 3: Exploded Dissection */}
      <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 mb-4 border border-white/20 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-300">
          EXPLODED ANATOMY VISUALIZATION
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
          LOOK BENEATH THE SURFACE.
        </h2>
        <p className="mt-3 text-sm sm:text-lg text-neutral-300 font-light tracking-wide">
          Explore the engineering that makes legendary 4x4 capability possible.
        </p>
      </motion.div>

      {/* Stage 4: Full Dissection State */}
      <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 mb-4 border border-white/20 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white">
          SPECIALIST DIAGNOSTICS & SERVICING
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
          NOW, SEE IT FROM THE INSIDE.
        </h2>
        <p className="mt-3 text-sm sm:text-lg text-neutral-300 font-light tracking-wide">
          Scroll down to discover our specialist garage services and explore individual components.
        </p>
      </motion.div>
    </div>
  );
}
