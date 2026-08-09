'use client';

import React from 'react';
import ContactCTA from './ContactCTA';
import { ShieldCheck, MapPin, Award, Clock, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutGarage() {
  const highlights = [
    {
      icon: Award,
      title: '20+ Years Experience',
      desc: 'Decades of specialized mechanical engineering dedicated to Land Rover and 4x4 vehicles.',
    },
    {
      icon: ShieldCheck,
      title: 'Autologic Equipment',
      desc: 'Full dealer-grade diagnostic software and module coding capabilities.',
    },
    {
      icon: Clock,
      title: 'Family-Run Service',
      desc: 'Direct, honest communication with the mechanics working on your vehicle.',
    },
    {
      icon: MapPin,
      title: 'Queensferry & Deeside',
      desc: 'Proudly serving Flintshire, Chester, Wrexham, the Wirral, and surrounding areas.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-garage-studio relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 mb-4 border border-white/10 bg-white/5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-300">
              ABOUT BELL AUTOMOTIVE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              SPECIALIST KNOWLEDGE. <br />
              <span className="text-neutral-400">HANDS-ON EXPERIENCE.</span>
            </h2>

            <p className="mt-6 text-base text-neutral-300 font-light leading-relaxed">
              At <strong className="text-white font-semibold">Bell Automotive</strong>, we believe every Range Rover and 4x4 deserves to be understood down to its finest component. Based at <strong className="text-white font-semibold">The Forge in Queensferry</strong>, our family-run garage has spent over two decades diagnosing, repairing, and optimizing Land Rover vehicles.
            </p>

            <p className="mt-4 text-sm text-neutral-400 font-light leading-relaxed">
              Equipped with official <strong className="text-neutral-200 font-semibold">Autologic diagnostic systems</strong>, we deliver dealership-grade mechanical depth—from complex engine rebuilds and ZF transmission service to air suspension calibration and electrical fault tracing—without the main-dealer markup.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-4 glass-panel border border-white/5 flex items-start gap-3">
                    <Icon className="w-5 h-5 text-garage-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 font-light mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <ContactCTA label="Talk to Our Garage" variant="primary" size="md" />
              <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-garage-accent" />
                <span>Call Direct: 01244 813 321</span>
              </div>
            </div>
          </div>

          {/* Graphical Blueprint Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 glass-panel metal-border rounded-sm overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                SPEC-ID // BELL-4X4-DEESIDE
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    BELL AUTOMOTIVE
                  </h3>
                  <p className="text-xs font-mono text-garage-accent uppercase">
                    Queensferry, Deeside CH5 1SZ
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono text-neutral-300 border-t border-white/10 pt-4">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-500">EXPERIENCE</span>
                  <span>20+ YEARS</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-500">SPECIALISM</span>
                  <span>LAND ROVER & 4X4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-500">DIAGNOSTICS</span>
                  <span>AUTOLOGIC DEALER LEVEL</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-500">LOCATION</span>
                  <span>QUEENSFERRY, WALES</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">CUSTOMER RATING</span>
                  <span className="text-amber-400 font-bold">★★★★★ (5.0 GOOGLE)</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 border border-white/10 text-center">
                <p className="text-[11px] text-neutral-300 italic">
                  &ldquo;Honest advice, fair prices, and technical competence you can rely on.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
