"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
  product: Product;
  scrollProgress: number;
}

export default function ProductTextOverlays({
  product,
  scrollProgress,
}: ProductTextOverlaysProps) {
  // Utility function to compute opacity and scale based on scroll ranges
  const getSectionStyles = (start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    let y = 30;
    let blur = 10;
    let scale = 0.95;

    if (scrollProgress >= start && scrollProgress <= end) {
      if (scrollProgress < peakStart) {
        const factor = (scrollProgress - start) / (peakStart - start);
        opacity = factor;
        y = 30 * (1 - factor);
        blur = 10 * (1 - factor);
        scale = 0.95 + 0.05 * factor;
      } else if (scrollProgress <= peakEnd) {
        opacity = 1;
        y = 0;
        blur = 0;
        scale = 1;
      } else {
        const factor = 1 - (scrollProgress - peakEnd) / (end - peakEnd);
        opacity = factor;
        y = -30 * (1 - factor);
        blur = 10 * (1 - factor);
        scale = 1 + 0.03 * (1 - factor);
      }
    }

    return { opacity, y, blur, scale };
  };

  const section1 = getSectionStyles(0.0, 0.04, 0.14, 0.19);
  const section2 = getSectionStyles(0.20, 0.25, 0.38, 0.44);
  const section3 = getSectionStyles(0.46, 0.51, 0.64, 0.70);
  const section4 = getSectionStyles(0.72, 0.77, 0.88, 0.94);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Section 1: Hero Introduction */}
        <div
          className="absolute inset-x-4 sm:inset-x-8 md:left-12 md:right-auto md:max-w-xl transition-all duration-300 transform"
          style={{
            opacity: section1.opacity,
            transform: `translate3d(0, ${section1.y}px, 0) scale(${section1.scale})`,
            filter: `blur(${section1.blur}px)`,
          }}
        >
          <div className="flex flex-col space-y-3 text-left">
            <span
              className="inline-self-start self-start text-xs font-mono font-bold tracking-widest px-3.5 py-1 rounded-full uppercase border shadow-lg"
              style={{
                backgroundColor: `${product.themeColor}20`,
                borderColor: `${product.themeColor}60`,
                color: product.accentColor,
              }}
            >
              {product.badge || "STACKHOUSE EXCLUSIVE"}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
              {product.section1.title}
            </h1>
            <p className="text-xl sm:text-2xl font-light text-zinc-300 tracking-wide font-sans">
              {product.section1.subtitle}
            </p>
            <div className="pt-4 flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: product.accentColor }} />
                PREMIUM BRITISH BEEF
              </span>
              <span>•</span>
              <span>SEARED FRESH</span>
            </div>
          </div>
        </div>

        {/* Section 2: Construction & Sear */}
        <div
          className="absolute inset-x-4 sm:inset-x-8 md:right-12 md:left-auto md:max-w-xl text-right transition-all duration-300 transform"
          style={{
            opacity: section2.opacity,
            transform: `translate3d(0, ${section2.y}px, 0) scale(${section2.scale})`,
            filter: `blur(${section2.blur}px)`,
          }}
        >
          <div className="flex flex-col space-y-3 items-end">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
              01 // THE SEAR & CRUST
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-none">
              {product.section2.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-md">
              {product.section2.subtitle}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-4 text-left">
              {product.stats.slice(0, 2).map((st, i) => (
                <div key={i} className="glass-panel px-4 py-2 rounded-xl border border-white/10">
                  <div className="text-[10px] text-zinc-400 font-mono uppercase">{st.label}</div>
                  <div className="text-lg font-black text-white" style={{ color: product.accentColor }}>{st.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Flavor & Layers */}
        <div
          className="absolute inset-x-4 sm:inset-x-8 md:left-12 md:right-auto md:max-w-xl text-left transition-all duration-300 transform"
          style={{
            opacity: section3.opacity,
            transform: `translate3d(0, ${section3.y}px, 0) scale(${section3.scale})`,
            filter: `blur(${section3.blur}px)`,
          }}
        >
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              02 // LAYERS & TEXTURE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-none">
              {product.section3.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              {product.section3.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {product.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="glass-pill px-3 py-1 rounded-lg text-xs text-zinc-200 border border-white/10"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Brand Philosophy & Action Call */}
        <div
          className="absolute inset-x-4 sm:inset-x-8 left-1/2 -translate-x-1/2 max-w-2xl text-center transition-all duration-300 transform"
          style={{
            opacity: section4.opacity,
            transform: `translate3d(-50%, ${section4.y}px, 0) scale(${section4.scale})`,
            filter: `blur(${section4.blur}px)`,
          }}
        >
          <div className="flex flex-col items-center space-y-4">
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              03 // READY FOR THE FIRST BITE
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none text-glow">
              {product.section4.title}
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-lg">
              {product.section4.subtitle || "Hand-crafted patties. Toasted brioche. House smoked sauce."}
            </p>
            <div className="pt-4 pointer-events-auto">
              <a
                href="#buy-section"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: product.themeColor,
                  boxShadow: `0 0 35px ${product.themeColor}80`,
                }}
              >
                CLAIM YOUR BURGER ({product.price}) →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
