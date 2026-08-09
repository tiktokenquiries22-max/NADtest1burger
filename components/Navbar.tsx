"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Flame, MapPin, Sparkles } from "lucide-react";
import { Product } from "@/data/products";

interface NavbarProps {
  currentProduct: Product;
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (index: number) => void;
  products: Product[];
}

export default function Navbar({
  currentProduct,
  cartCount,
  onOpenCart,
  onSelectProduct,
  products,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3 border-b border-white/10 shadow-2xl" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg"
              style={{ backgroundColor: currentProduct.themeColor }}
            >
              {/* Custom Burger Stack SVG Icon */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V8C20 8.55228 19.5523 9 19 9H5C4.44772 9 4 8.55228 4 8V8Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M3 13H21" strokeWidth="2.8"/>
                <path d="M5 17C5 16.4477 5.44772 16 6 16H18C18.5523 16 19 16.4477 19 17V17.5C19 19.433 17.433 21 15.5 21H8.5C6.567 21 5 19.433 5 17.5V17Z" fill="currentColor" fillOpacity="0.3"/>
                <path d="M7 11.5L9 11.5M12 11.5L14 11.5M17 11.5L18 11.5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider font-mono uppercase text-white flex items-center gap-1.5">
                STACKHOUSE <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-orange-400 font-sans tracking-normal border border-orange-500/30">CRAFT</span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase hidden sm:block">
                Luxury Smash Burgers
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {products.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => onSelectProduct(idx)}
                className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 uppercase ${
                  currentProduct.id === prod.id
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {prod.name.replace("The ", "")}
                {currentProduct.id === prod.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: currentProduct.accentColor }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <a
              href="#craft-story"
              className="text-sm font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors duration-200"
            >
              CRAFT & SECRET
            </a>
          </nav>

          {/* Actions: Cart + Order CTA */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCart}
              aria-label="Open Shopping Cart"
              className="relative p-2.5 rounded-xl glass-pill text-white hover:border-orange-500/50 transition-all duration-300 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: currentProduct.themeColor }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <a
              href="#buy-section"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide text-white uppercase transition-all duration-300 shadow-xl group hover:scale-105 active:scale-95"
              style={{
                backgroundColor: currentProduct.themeColor,
                boxShadow: `0 0 25px ${currentProduct.themeColor}60`,
              }}
            >
              <Flame className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
              ORDER NOW
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl glass-pill text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-zinc-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Select Your Burger
              </span>
              <div className="grid gap-3">
                {products.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(idx);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                      currentProduct.id === prod.id
                        ? "bg-white/10 border-orange-500 text-white font-bold"
                        : "bg-white/5 border-white/5 text-zinc-300"
                    }`}
                  >
                    <div>
                      <div className="text-base">{prod.name}</div>
                      <div className="text-xs text-zinc-400 font-normal">{prod.price} • {prod.subName}</div>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: prod.themeColor }}
                    />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                <a
                  href="#buy-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl font-bold text-center text-white uppercase tracking-wider flex items-center justify-center gap-2"
                  style={{ backgroundColor: currentProduct.themeColor }}
                >
                  <Flame className="w-5 h-5 fill-current" />
                  ORDER NOW ({currentProduct.price})
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
