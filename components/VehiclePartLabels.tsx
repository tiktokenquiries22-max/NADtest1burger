'use client';

import React from 'react';
import { VehiclePart } from '../data/vehicleParts';
import { motion } from 'framer-motion';

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
            {/* Interactive Pulse Hotspot Button */}
            <button
              onClick={() => onSelectPart(part)}
              onMouseEnter={() => onHoverPart(part.id)}
              onMouseLeave={() => onHoverPart(null)}
              onFocus={() => onHoverPart(part.id)}
              onBlur={() => onHoverPart(null)}
              className="relative group focus:outline-none focus:ring-2 focus:ring-garage-accent p-2 cursor-pointer"
              aria-label={`Inspect ${part.name}`}
            >
              {/* Outer Pulse Ring */}
              <span
                className={`block w-6 h-6 rounded-full border border-garage-accent/60 transition-all duration-300 ${
                  isHovered ? 'scale-150 bg-garage-accent/30 border-garage-accent' : 'animate-ping opacity-40'
                }`}
              />

              {/* Inner Core Dot */}
              <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-garage-accent scale-125 shadow-[0_0_15px_#22d3ee]' : 'bg-white'
                }`}
              />
            </button>

            {/* Label Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute left-8 top-1/2 -translate-y-1/2 w-48 sm:w-64 glass-panel p-3 border text-left transition-all duration-300 pointer-events-auto cursor-pointer ${
                isHovered
                  ? 'border-garage-accent bg-garage-studio/95 shadow-[0_0_25px_rgba(34,211,238,0.25)] scale-105 z-30'
                  : 'border-white/15 bg-black/60 hover:border-white/30'
              }`}
              onClick={() => onSelectPart(part)}
              onMouseEnter={() => onHoverPart(part.id)}
              onMouseLeave={() => onHoverPart(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono text-garage-accent uppercase tracking-widest">
                  {part.category}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase">
                  CLICK TO INSPECT
                </span>
              </div>

              <h4 className="text-xs font-bold text-white uppercase tracking-wide truncate">
                {part.name}
              </h4>

              <p className="text-[11px] text-neutral-300 font-light mt-1 line-clamp-2 leading-tight">
                {part.shortDescription}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
