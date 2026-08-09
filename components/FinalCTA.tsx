'use client';

import React from 'react';
import ContactCTA from './ContactCTA';
import { Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-28 bg-garage-studio relative border-t border-white/10 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-garage-dark to-black pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-white/20 bg-white/5 backdrop-blur-md text-xs font-mono uppercase tracking-[0.3em] text-white">
          <ShieldCheck className="w-4 h-4 text-garage-accent" />
          <span>BELL AUTOMOTIVE QUEENSFERRY</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
          YOUR RANGE ROVER DESERVES <br />
          <span className="text-neutral-400">TO BE UNDERSTOOD.</span>
        </h2>

        <p className="mt-6 text-base sm:text-xl text-neutral-300 font-light max-w-3xl mx-auto leading-relaxed">
          Whether it&apos;s routine servicing, Autologic diagnostics, suspension calibration, or a complex issue you can&apos;t quite put your finger on, speak directly with our garage team.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ContactCTA
            label="Contact the Garage"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          />
          <a
            href="tel:01244813321"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-garage-card border border-white/20 text-white font-mono text-sm font-semibold uppercase hover:border-garage-accent transition-all"
          >
            <Phone className="w-4 h-4 text-garage-accent" />
            <span>Call 01244 813 321</span>
          </a>
        </div>

        {/* Quick Contact Footer Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono text-neutral-400">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-garage-accent" />
            <span>The Forge, Dundas St, Queensferry CH5 1SZ</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-garage-accent" />
            <span>01244 813 321 / 07901 983 474</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-garage-accent" />
            <span>gbellcars@hotmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
