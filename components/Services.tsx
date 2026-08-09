'use client';

import React from 'react';
import ContactCTA from './ContactCTA';
import { 
  Cpu, 
  Wrench, 
  Settings2, 
  ShieldCheck, 
  Gauge, 
  Activity, 
  Flame, 
  PackageCheck 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const servicesList = [
    {
      icon: Cpu,
      title: 'Autologic Dealer Diagnostics',
      description: 'Official Autologic dealer-level diagnostic scanning, fault tracing, module programming, and software adaptations for all Range Rover & Land Rover models.',
    },
    {
      icon: Wrench,
      title: 'Land Rover Servicing',
      description: 'Comprehensive manufacturer-schedule servicing using genuine Land Rover parts and approved oils to maintain factory warranties and resale value.',
    },
    {
      icon: Settings2,
      title: 'Engine & Gearbox Rebuilds',
      description: 'Specialist reconditioning of Supercharged V8, Ingenium engines, ZF 8-speed automatic transmissions, and transfer boxes by experienced engineers.',
    },
    {
      icon: Activity,
      title: 'Air Suspension & Ride Height',
      description: 'Leak detection, height sensor calibration, compressor replacement, and electronic damper overhaul to preserve legendary magic-carpet ride comfort.',
    },
    {
      icon: Gauge,
      title: 'Braking Systems & EPB',
      description: 'Brembo multi-piston caliper overhauls, high-performance disc replacement, electronic park brake actuator recalibration, and ABS module servicing.',
    },
    {
      icon: Flame,
      title: 'Welding, Bodywork & Pre-MOT',
      description: 'Structural chassis welding, aluminum panel alignment, pre-MOT testing, and full MOT defect rectifications for 4x4 vehicles.',
    },
    {
      icon: ShieldCheck,
      title: 'ECU Upgrades & Tuning',
      description: 'Engine ECU remapping, transmission shift pattern optimization, and electronic module upgrades designed specifically for heavy-duty 4x4 capability.',
    },
    {
      icon: PackageCheck,
      title: 'Genuine Land Rover Parts',
      description: 'Direct access to official Land Rover OEM components, heavy-duty off-road accessories, differential units, and specialist mechanical hardware.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-garage-dark relative overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-garage-dark to-garage-dark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-3 border border-white/10 bg-white/5 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-garage-accent">
            BELL AUTOMOTIVE SERVICES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            SPECIALISTS IN WHAT’S BENEATH THE SURFACE.
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-light leading-relaxed">
            Over 20 years of hands-on Land Rover & 4x4 expertise in Queensferry. Dealership-quality mechanical engineering without main-dealer overheads.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel glass-panel-hover p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-garage-accent/50 group-hover:bg-garage-accent/10 transition-colors">
                    <Icon className="w-6 h-6 text-neutral-300 group-hover:text-garage-accent transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-2 group-hover:text-garage-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <ContactCTA
                    label="Discuss Your Vehicle"
                    variant="glass"
                    size="sm"
                    className="w-full text-center justify-center text-[11px]"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
