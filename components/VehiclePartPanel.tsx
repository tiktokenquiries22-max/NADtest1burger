'use client';

import React, { useEffect } from 'react';
import { VehiclePart } from '../data/vehicleParts';
import ContactCTA from './ContactCTA';
import { X, ShieldAlert, CheckCircle2, Wrench, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VehiclePartPanelProps {
  part: VehiclePart | null;
  onClose: () => void;
}

export default function VehiclePartPanel({ part, onClose }: VehiclePartPanelProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {part && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dark Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-garage-studio border-l border-white/10 h-full overflow-y-auto z-10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              {/* Header / Close Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-garage-accent uppercase bg-garage-accent/10 px-2.5 py-1 border border-garage-accent/30">
                    {part.category}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  aria-label="Close component details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Short Desc */}
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                {part.name}
              </h2>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {part.description}
              </p>

              {/* Why It Matters */}
              <div className="mb-6 p-4 glass-panel border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2">
                  <Info className="w-4 h-4 text-garage-accent" />
                  <span>Why It Matters</span>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {part.whyItMatters}
                </p>
              </div>

              {/* Common Diagnostic Issues */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-3">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Common Diagnostic Issues</span>
                </div>
                <ul className="space-y-2">
                  {part.commonIssues.map((issue, i) => (
                    <li key={i} className="text-xs text-neutral-300 font-light flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Garage Support */}
              <div className="mb-8 p-4 bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Bell Automotive Garage Support</span>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {part.serviceDescription}
                </p>
              </div>
            </div>

            {/* Bottom Contact CTA Box */}
            <div className="pt-6 border-t border-white/10 bg-garage-studio">
              <div className="mb-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Need help with this component?
                </h4>
                <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                  Speak directly with our Land Rover specialists in Queensferry.
                </p>
              </div>

              <ContactCTA
                label="Contact the Garage"
                variant="primary"
                size="md"
                className="w-full text-center justify-center"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
