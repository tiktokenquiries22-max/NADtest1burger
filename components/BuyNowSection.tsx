"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { ShoppingBag, Plus, Minus, Truck, RotateCcw, Check } from "lucide-react";

interface BuyNowSectionProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, options: string[]) => void;
}

export default function BuyNowSection({ product, onAddToCart }: BuyNowSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const basePriceNum = parseFloat(product.price.replace("£", ""));
  const addonsPrice = selectedAddons.length * 1.5;
  const totalPrice = ((basePriceNum + addonsPrice) * quantity).toFixed(2);

  const availableAddons = [
    { id: "extra-cheese", label: "Extra Molten American Cheese", price: "+£1.50" },
    { id: "extra-sauce", label: "Double Oak-Smoked House Sauce", price: "+£1.50" },
    { id: "extra-bacon", label: "Crispy Habanero Bacon Strip", price: "+£1.50" },
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedAddons);
    setToastMessage(`Added ${quantity}x ${product.name} to cart!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section id="buy-section" className="relative py-16 sm:py-36 bg-zinc-950 text-white overflow-hidden border-t border-white/10">
      {/* Glow Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] rounded-full blur-[180px] opacity-20 pointer-events-none"
        style={{ backgroundColor: product.themeColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-5 sm:p-14 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            
            {/* Left Product Summary */}
            <div className="md:col-span-6 space-y-4 sm:space-y-6">
              <span
                className="inline-block text-[11px] sm:text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase border"
                style={{
                  backgroundColor: `${product.themeColor}20`,
                  borderColor: `${product.themeColor}60`,
                  color: product.accentColor,
                }}
              >
                CUSTOMIZE & ORDER
              </span>
              <h2 className="text-2xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Addons Selection */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] sm:text-xs font-mono uppercase text-zinc-400">
                  Optional Craft Upgrades (+£1.50 each):
                </span>
                <div className="space-y-2">
                  {availableAddons.map((addon) => {
                    const active = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all ${
                          active
                            ? "bg-white/15 border-orange-500 text-white"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2 text-left">
                          <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 rounded flex items-center justify-center border ${active ? "bg-orange-500 border-orange-500 text-white" : "border-zinc-500"}`}>
                            {active && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          {addon.label}
                        </span>
                        <span className="font-mono text-orange-400 shrink-0 ml-2">{addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Processing Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {product.buyNowSection.processingParams.map((param, i) => (
                  <span key={i} className="glass-pill px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono text-zinc-300">
                    🔥 {param}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Commerce Purchase Box */}
            <div className="md:col-span-6 flex flex-col space-y-6 sm:space-y-8 bg-zinc-900/80 p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4 sm:pb-6">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase">Total Price</span>
                  <div className="text-3xl sm:text-5xl font-black font-mono text-white">
                    £{totalPrice}
                  </div>
                </div>
                <span className="text-xs text-zinc-400 font-mono">
                  {product.buyNowSection.unit}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold uppercase text-zinc-300">Quantity</span>
                <div className="flex items-center space-x-3 sm:space-x-4 glass-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-white/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-base sm:text-lg font-bold text-white w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add To Cart CTA Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-lg text-white uppercase tracking-wider flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 glow-button group active:scale-95"
                style={{
                  backgroundColor: product.themeColor,
                  boxShadow: `0 0 35px ${product.themeColor}80`,
                }}
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                ADD TO CART • £{totalPrice}
              </button>

              {/* Trust & Delivery Guarantees */}
              <div className="space-y-2.5 pt-2 text-[11px] sm:text-xs text-zinc-400 border-t border-white/10">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>{product.buyNowSection.deliveryPromise}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{product.buyNowSection.returnPolicy}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-8 z-50 glass-panel border border-orange-500/50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 bg-zinc-950/95 text-white max-w-sm mx-auto sm:mx-0"
          >
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shrink-0">
              ✓
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold">{toastMessage}</div>
              <div className="text-[10px] sm:text-xs text-zinc-400">Order saved to cart drawer.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
