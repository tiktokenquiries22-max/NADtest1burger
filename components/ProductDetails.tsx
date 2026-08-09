"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { Play, CheckCircle2, Flame, ShieldCheck, Clock, Sparkles } from "lucide-react";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section id="craft-story" className="relative py-24 sm:py-36 bg-zinc-950/90 text-white overflow-hidden border-t border-white/10">
      {/* Background Decorative Gradients */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{ backgroundColor: product.themeColor }}
      />
      <div
        className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-15 pointer-events-none"
        style={{ backgroundColor: product.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-full glass-pill border text-orange-400 mb-4 inline-block"
          >
            THE ART OF THE SMASH
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight"
          >
            {product.detailsSection.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl font-light text-zinc-300 leading-relaxed"
          >
            {product.detailsSection.description}
          </motion.p>
        </div>

        {/* Grid Showcase: High-Res Editorial Photography + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
          {/* Main Detail Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl aspect-[4/3]"
          >
            <Image
              src={product.detailImage}
              alt={product.detailsSection.imageAlt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent z-10" />

            {/* Video Play Button Overlay if available */}
            {product.videoSrc && (
              <button
                onClick={() => setVideoModalOpen(true)}
                className="absolute inset-0 z-20 flex items-center justify-center group/btn"
                aria-label="Play Assembly Video"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white glass-pill border border-white/30 shadow-2xl transition-all duration-300 group-hover/btn:scale-110"
                  style={{ backgroundColor: `${product.themeColor}aa` }}
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="absolute bottom-6 left-6 text-xs font-mono uppercase tracking-widest text-zinc-300 flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Watch Sear Assembly Video
                </span>
              </button>
            )}

            <div className="absolute bottom-6 right-6 z-20">
              <span className="text-xs font-mono text-white/70 glass-pill px-3 py-1 rounded-full">
                100% FRESH INGREDIENTS
              </span>
            </div>
          </motion.div>

          {/* Right Stats & Craft Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center space-x-3 text-orange-400">
                <Flame className="w-6 h-6" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  Craft Specs & Ingredients
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {product.stats.map((st, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="text-xs font-mono text-zinc-400 uppercase mb-1">{st.label}</div>
                    <div className="text-2xl font-black text-white" style={{ color: product.accentColor }}>{st.val}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Freshness Section Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-orange-400 uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                <span>FRESHNESS GUARANTEE</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase text-white">
                {product.freshnessSection.title}
              </h3>
              <p className="text-zinc-300 leading-relaxed text-base sm:text-lg font-light">
                {product.freshnessSection.description}
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center">
              <div className="glass-pill p-6 rounded-2xl border border-orange-500/30 text-center space-y-2 max-w-xs">
                <ShieldCheck className="w-10 h-10 text-orange-400 mx-auto" />
                <div className="text-sm font-bold uppercase text-white">Zero Heat Lamps</div>
                <div className="text-xs text-zinc-400">Cooked fresh in under 90 seconds from order placement.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {videoModalOpen && product.videoSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl bg-zinc-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-pill flex items-center justify-center text-white hover:bg-white/20"
              >
                ✕
              </button>
              <video
                src={product.videoSrc}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh] object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
