"use client";

import { useState } from "react";
import { Flame, Send, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black font-mono tracking-wider uppercase text-white">
                STACKHOUSE
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm font-light leading-relaxed">
              Burgers Worth Scrolling For. Double smash-seared Aged British beef, molten cheese, house smoked sauce, and artisan toasted brioche buns. Made to order, delivered hot.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="p-2.5 rounded-xl glass-pill text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl glass-pill text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl glass-pill text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Explore Menu
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              <li><a href="#buy-section" className="hover:text-orange-400 transition-colors">The Signature Firestack</a></li>
              <li><a href="#buy-section" className="hover:text-orange-400 transition-colors">The Smoked Truffle Beast</a></li>
              <li><a href="#buy-section" className="hover:text-orange-400 transition-colors">The Inferno Diablo</a></li>
              <li><a href="#craft-story" className="hover:text-orange-400 transition-colors">Craft & Sear Secrets</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Sides & Loaded Fries</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Support & Info
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Store Locations</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Thermal Delivery Radius</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Allergen & Nutrition Guide</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Kitchen Team</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Get Hungry With Us.
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Subscribe for secret drops, pop-up locations, and exclusive burger passes.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 font-mono">
                  ✓ Welcome to the STACKHOUSE Club!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Allergen Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} STACKHOUSE Burgers Inc. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300">Allergen Notice</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
