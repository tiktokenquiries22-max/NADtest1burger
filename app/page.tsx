'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import RangeRoverHeroScroll from '../components/RangeRoverHeroScroll';
import Services from '../components/Services';
import AboutGarage from '../components/AboutGarage';
import VehicleAnatomyExplorer from '../components/VehicleAnatomyExplorer';
import Reviews from '../components/Reviews';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import ContactCTA from '../components/ContactCTA';
import { ShieldCheck, Cpu, Activity, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-garage-dark text-white selection:bg-garage-accent/30">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Single Page Content */}
      <main className="relative">
        {/* EXPERIENCE 1 — CINEMATIC HERO SCROLL ANIMATION */}
        <RangeRoverHeroScroll />

        {/* Engineering Intro Statement Section */}
        <section className="py-20 bg-garage-studio border-y border-white/5 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-white/10 bg-white/5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-garage-accent">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE BELL AUTOMOTIVE PROMISE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              ENGINEERING INTEGRITY FOR LAND ROVER &amp; 4X4 VEHICLES.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto">
              Modern Range Rovers are complex technical masterworks. At Bell Automotive, we combine dealer-level Autologic diagnostic software with over 20 years of hands-on mechanical experience to diagnose, service, and repair your vehicle with complete clarity.
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-white/10 pt-8 font-mono">
              <div className="p-3">
                <div className="text-xl sm:text-2xl font-bold text-white">20+</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Years Experience</div>
              </div>
              <div className="p-3">
                <div className="text-xl sm:text-2xl font-bold text-white">AUTOLOGIC</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Dealer Diagnostics</div>
              </div>
              <div className="p-3">
                <div className="text-xl sm:text-2xl font-bold text-white">OEM</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Genuine Parts</div>
              </div>
              <div className="p-3">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">5.0 ★</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Google Rated</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <Services />

        {/* About Bell Automotive */}
        <AboutGarage />

        {/* EXPERIENCE 2 — INTERACTIVE ANATOMY EXPLORER */}
        <VehicleAnatomyExplorer />

        {/* Customer Reviews Section */}
        <Reviews />

        {/* Final Cinematic Call to Action */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
