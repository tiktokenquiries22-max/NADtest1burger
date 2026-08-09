'use client';

import React from 'react';
import Link from 'next/link';
import ContactCTA from './ContactCTA';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-garage-dark border-t border-white/10 text-neutral-400 text-xs py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-wider uppercase text-white leading-tight">
                  BELL AUTOMOTIVE
                </span>
                <span className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase">
                  Land Rover & 4x4 Specialists
                </span>
              </div>
            </Link>

            <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
              Family-run garage based in Queensferry, Wales. Over 20 years of dedicated Land Rover, Range Rover, and 4x4 diagnostic, repair, and servicing excellence.
            </p>

            <div className="pt-2">
              <ContactCTA label="Contact the Garage" size="sm" variant="primary" />
            </div>
          </div>

          {/* Nav Links Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              GARAGE
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#anatomy" className="hover:text-white transition-colors">
                  Vehicle Anatomy Explorer
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Specialist Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Bell Automotive
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              SUPPORT & ENQUIRIES
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Page
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-white transition-colors">
                  Service FAQs
                </Link>
              </li>
              <li>
                <a
                  href="https://www.google.com/search?q=bell+automotive+queensferry+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Google Business Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Col */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              QUEENSFERRY GARAGE
            </h4>
            <div className="space-y-2 text-[11px] text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-garage-accent shrink-0 mt-0.5" />
                <span>
                  The Forge, Dundas St, <br />
                  Queensferry, Deeside CH5 1SZ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-garage-accent shrink-0" />
                <a href="tel:01244813321" className="hover:text-white">
                  01244 813 321 / 07901 983 474
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-garage-accent shrink-0" />
                <a href="mailto:gbellcars@hotmail.com" className="hover:text-white">
                  gbellcars@hotmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-500">
          <p>© {new Date().getFullYear()} Bell Automotive. All rights reserved.</p>
          <p>Range Rover Dissection Interactive Showroom | Engineered in Queensferry, Wales</p>
        </div>
      </div>
    </footer>
  );
}
