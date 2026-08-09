"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { Droplets, Sun, Award, Leaf, Zap, Clock, ShieldCheck } from "lucide-react";

interface ProductDetailsSectionProps {
  product: Product;
}

export const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  product,
}) => {
  return (
    <section id="details" className="relative z-30 py-24 px-6 max-w-7xl mx-auto space-y-20">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-pill text-xs font-extrabold uppercase tracking-widest text-amber-300">
          <Award className="w-4 h-4" />
          <span>Uncompromising Standards</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          Crafted For Pure Flavor
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
          Every bottle is a masterclass in fruit sourcing, minimal processing, and nutritional retention.
        </p>
      </motion.div>

      {/* Grid 1: Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Text Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden group border border-white/15"
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
            style={{ background: product.themeColor }}
          />

          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xl">
            <Sun className="w-6 h-6" />
          </div>

          <h3 className="text-3xl md:text-4xl font-extrabold text-white">
            {product.detailsSection.title}
          </h3>

          <p className="text-white/85 text-base md:text-lg leading-relaxed font-light">
            {product.detailsSection.description}
          </p>

          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10">
            {product.stats.map((st, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl font-black text-amber-300">{st.val}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">{st.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Feature Highlights Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 gap-6"
        >
          {product.features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl flex items-center space-x-5 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-amber-300 flex-shrink-0">
                {idx === 0 ? <Leaf className="w-6 h-6" /> : idx === 1 ? <ShieldCheck className="w-6 h-6" /> : <Droplets className="w-6 h-6" />}
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-white">{feature}</h4>
                <p className="text-xs text-white/70 mt-1">100% natural extraction method preserving raw active bio-enzymes.</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Grid 2: Freshness Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden bg-slate-900/60 border border-white/15"
      >
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            <Clock className="w-4 h-4" />
            <span>HPP Cold Processing Technology</span>
          </div>

          <h3 className="text-3xl md:text-5xl font-black text-white">
            {product.freshnessSection.title}
          </h3>

          <p className="text-white/85 text-base md:text-lg leading-relaxed font-light">
            {product.freshnessSection.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            {product.buyNowSection.processingParams.map((param, pIdx) => (
              <span
                key={pIdx}
                className="px-4 py-2 rounded-xl glass-pill text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{param}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
