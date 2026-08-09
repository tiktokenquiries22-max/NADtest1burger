'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactCTA from './ContactCTA';
import { Menu, X, Shield, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Vehicle Anatomy', href: '#anatomy' },
    { name: 'Services', href: '#services' },
    { name: 'About Garage', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Garage Identifier */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-neutral-800 to-black border border-white/20 flex items-center justify-center group-hover:border-garage-accent/50 transition-colors">
              <Shield className="w-5 h-5 text-white group-hover:text-garage-accent transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-wider uppercase text-white leading-tight">
                BELL AUTOMOTIVE
              </span>
              <span className="text-[10px] tracking-widest font-mono text-neutral-400 group-hover:text-garage-accent transition-colors uppercase">
                Land Rover & 4x4 Specialists
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-neutral-300 hover:text-white transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-garage-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:01244813321"
              className="text-xs font-mono text-neutral-300 hover:text-garage-accent flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded border border-white/10 hover:border-garage-accent/40"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>01244 813 321</span>
            </a>
            <ContactCTA label="Contact Garage" size="sm" variant="primary" />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:01244813321"
              className="p-2 text-neutral-300 hover:text-white"
              aria-label="Call Bell Automotive"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-garage-dark/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase text-neutral-200 hover:text-garage-accent transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:01244813321"
                  className="w-full text-center py-3 text-xs font-mono text-neutral-200 border border-white/10 rounded flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-garage-accent" />
                  <span>01244 813 321</span>
                </a>
                <ContactCTA
                  label="Contact the Garage"
                  size="md"
                  variant="primary"
                  className="w-full text-center justify-center"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
