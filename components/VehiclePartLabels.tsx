'use client';

import React from 'react';
import { VehiclePart } from '../data/vehicleParts';
import { motion, AnimatePresence } from 'framer-motion';

interface VehiclePartLabelsProps {
  parts: VehiclePart[];
  hoveredPartId: string | null;
  onHoverPart: (id: string | null) => void;
  onSelectPart: (part: VehiclePart) => void;
}

export default function VehiclePartLabels({
  parts,
  hoveredPartId,
  onHoverPart,
  onSelectPart,
}: VehiclePartLabelsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {parts.map((part) => {
        const isHovered = hoveredPartId === part.id;

        return (
          <div
            key={part.id}
            style={{
              left: `${part.hotspot.x}%`,
              top: `${part.hotspot.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            {/* Hotspot Target Button (Dot & Pulse Ring) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // On mobile / click: if not currently hovered, reveal details on hover state; if already hovered, open modal panel
                if (!isHovered) {
                  onHoverPart(part.id);
                } else {
                  onSelectPart(part);
                }
              }}
              onMouseEnter={() => onHoverPart(part.id)}
              onMouseLeave={() => onHoverPart(null)}
              onFocus={() => onHoverPart(part.id)}
              onBlur={() => onHoverPart(null)}
              className="relative group focus:outline-none focus:ring-2 focus:ring-garage-accent p-3 cursor-pointer"
              aria-label={`Inspect ${part.name}`}
            >
              {/* Outer Pulse Ring */}
              <span
                className={`block w-7 h-7 rounded-full border border-garage-accent/70 transition-all duration-300 ${
                  isHovered ? 'scale-150 bg-garage-accent/30 border-garage-accent shadow-[0_0_20px_#22d3ee]' : 'animate-ping opacity-50'
                }`}
              />

              {/* Inner Core Dot */}
              <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-garage-accent scale-125 shadow-[0_0_15px_#22d3ee]' : 'bg-white'
                }`}
              />
            </button>

            {/* Information Card — Revealed ONLY on hover or tap */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute left-10 top-1/2 -translate-y-1/2 w-56 sm:w-72 glass-panel p-4 border border-garage-accent bg-garage-studio/95 shadow-[0_0_30px_rgba(34,211,238,0.3)] z-40 text-left pointer-events-auto cursor-pointer"
                  onClick={() => onSelectPart(part)}
                  onMouseEnter={() => onHoverPart(part.id)}
                  onMouseLeave={() => onHoverPart(null)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-garage-accent uppercase tracking-widest bg-garage-accent/10 px-2 py-0.5 border border-garage-accent/30">
                      {part.category}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                      TAP FOR DETAILS →
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    {part.name}
                  </h4>

                  <p className="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed">
                    {part.shortDescription}
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-garage-accent">
                    <span>Diagnostic Support Available</span>
                    <span className="underline">View Specs &amp; Contact</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
