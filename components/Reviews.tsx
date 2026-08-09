'use client';

import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, ExternalLink, Quote, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Reviews() {
  const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=bell+automotive+queensferry+reviews";

  return (
    <section id="reviews" className="py-24 bg-garage-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-amber-500/30 bg-amber-500/10 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>VERIFIED CUSTOMER REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="mt-3 text-base text-neutral-400 font-light">
            Trusted by Land Rover and 4x4 owners across Queensferry, Deeside, Chester, and North Wales.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="mt-6 inline-flex items-center gap-4 px-6 py-3 glass-panel border border-white/10">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-white font-mono">5.0 / 5.0</span>
            <span className="text-xs text-neutral-400 font-mono">| Google Reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 flex flex-col justify-between relative group hover:border-white/20 transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 group-hover:text-white/10 transition-colors" />

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {review.author}
                  </h4>
                  {review.vehicleModel && (
                    <p className="text-[11px] font-mono text-garage-accent mt-0.5">
                      {review.vehicleModel}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    {review.date}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> {review.source}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* External Google Review Link CTA */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-300 hover:text-white hover:underline transition-all"
          >
            <span>See More Reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-garage-accent" />
          </a>
        </div>
      </div>
    </section>
  );
}
