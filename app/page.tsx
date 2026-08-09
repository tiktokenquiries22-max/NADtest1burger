"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBurgerScroll from "@/components/ProductBurgerScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import ProductDetails from "@/components/ProductDetails";
import BuyNowSection from "@/components/BuyNowSection";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, ShoppingBag, X, Trash2, ArrowRight, Flame } from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAddons: string[];
}

export default function Home() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const currentProduct = products[currentProductIndex];

  // Dynamically update CSS custom variables when product changes
  useEffect(() => {
    document.documentElement.style.setProperty("--bg-gradient", currentProduct.gradient);
    document.documentElement.style.setProperty("--theme-color", currentProduct.themeColor);
    document.documentElement.style.setProperty("--accent-color", currentProduct.accentColor);
  }, [currentProduct]);

  // Product Navigation Handlers
  const handleNextProduct = () => {
    const nextIdx = (currentProductIndex + 1) % products.length;
    switchProduct(nextIdx);
  };

  const handlePrevProduct = () => {
    const prevIdx = (currentProductIndex - 1 + products.length) % products.length;
    switchProduct(prevIdx);
  };

  const switchProduct = (idx: number) => {
    setCurrentProductIndex(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, addons: string[]) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && JSON.stringify(item.selectedAddons) === JSON.stringify(addons)
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedAddons: addons }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart
    .reduce((acc, item) => {
      const base = parseFloat(item.product.price.replace("£", ""));
      const addonCost = item.selectedAddons.length * 1.5;
      return acc + (base + addonCost) * item.quantity;
    }, 0)
    .toFixed(2);

  const nextProduct = products[(currentProductIndex + 1) % products.length];

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative selection:bg-orange-600 selection:text-white">
      {/* Fixed Navbar */}
      <Navbar
        currentProduct={currentProduct}
        cartCount={totalCartItems}
        onOpenCart={() => setCartOpen(true)}
        onSelectProduct={switchProduct}
        products={products}
      />

      {/* Navigation Mechanism A: Floating Left / Right Side Arrows */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden sm:block">
        <button
          onClick={handlePrevProduct}
          aria-label="Previous Burger"
          className="p-3 rounded-full glass-panel hover:border-orange-500/50 text-white transition-all duration-300 hover:scale-110 active:scale-95 group shadow-2xl"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden sm:block">
        <button
          onClick={handleNextProduct}
          aria-label="Next Burger"
          className="p-3 rounded-full glass-panel hover:border-orange-500/50 text-white transition-all duration-300 hover:scale-110 active:scale-95 group shadow-2xl"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Navigation Mechanism B: Fixed Bottom Product Selector Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="glass-panel p-1.5 rounded-full border border-white/20 shadow-2xl flex items-center space-x-1 sm:space-x-2">
          {products.map((prod, idx) => {
            const active = currentProductIndex === idx;
            return (
              <button
                key={prod.id}
                onClick={() => switchProduct(idx)}
                className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 flex items-center space-x-2 ${
                  active ? "glass-pill-active text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                <span>{prod.name.replace("The ", "")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Product Hero Canvas & Text Overlays */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <ProductBurgerScroll
            product={currentProduct}
            onScrollProgress={setScrollProgress}
          />
          <ProductTextOverlays
            product={currentProduct}
            scrollProgress={scrollProgress}
          />

          {/* Product Details Section */}
          <ProductDetails product={currentProduct} />

          {/* Commerce Section */}
          <BuyNowSection product={currentProduct} onAddToCart={handleAddToCart} />

          {/* Navigation Mechanism C: Editorial Next Burger CTA Banner */}
          <section className="relative py-20 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-t border-b border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <button
                onClick={handleNextProduct}
                className="w-full max-w-4xl mx-auto glass-panel p-8 sm:p-14 rounded-3xl border border-white/15 hover:border-orange-500/50 transition-all duration-500 group text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
                  style={{ backgroundColor: nextProduct.themeColor }}
                />
                <div>
                  <span className="text-xs font-mono tracking-widest text-orange-400 uppercase mb-2 block">
                    READY FOR ANOTHER BITE?
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight group-hover:translate-x-2 transition-transform">
                    EXPLORE {nextProduct.name} →
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 font-light">
                    {nextProduct.subName} • {nextProduct.price}
                  </p>
                </div>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-2xl"
                  style={{ backgroundColor: nextProduct.themeColor }}
                >
                  <ArrowRight className="w-8 h-8" />
                </div>
              </button>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-md bg-zinc-950 border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-6 h-6 text-orange-500" />
                    <h2 className="text-xl font-bold uppercase text-white tracking-wider">
                      Your Order Bag ({totalCartItems})
                    </h2>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 rounded-xl glass-pill text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-zinc-500 font-mono text-sm">
                      Your order bag is empty.
                    </div>
                  ) : (
                    cart.map((item, idx) => {
                      const basePrice = parseFloat(item.product.price.replace("£", ""));
                      const addonsCost = item.selectedAddons.length * 1.5;
                      const itemTotal = ((basePrice + addonsCost) * item.quantity).toFixed(2);
                      return (
                        <div
                          key={idx}
                          className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-white uppercase">{item.product.name}</div>
                            <div className="text-xs text-zinc-400 font-mono">
                              Qty: {item.quantity} × {item.product.price}
                            </div>
                            {item.selectedAddons.length > 0 && (
                              <div className="text-[10px] text-orange-400 font-mono">
                                + {item.selectedAddons.length} Craft Addons
                              </div>
                            )}
                            <div className="text-sm font-black font-mono text-white pt-1">
                              £{itemTotal}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Cart Footer */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-base font-bold">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="text-2xl font-mono text-white">£{cartSubtotal}</span>
                </div>
                <button
                  disabled={cart.length === 0}
                  className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-black text-center uppercase tracking-wider transition-all duration-300 shadow-xl"
                  onClick={() => alert(`Order placed for £${cartSubtotal}! Thank you for choosing STACKHOUSE.`)}
                >
                  CHECKOUT NOW • £{cartSubtotal}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
