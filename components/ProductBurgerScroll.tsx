"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface ProductBurgerScrollProps {
  product: Product;
  onScrollProgress?: (progress: number) => void;
}

export default function ProductBurgerScroll({
  product,
  onScrollProgress,
}: ProductBurgerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const frameCount = product.frameCount || 251;

  // Canvas fit drawing logic (Cover fit for Mobile & Full-Screen Edge-to-Edge Desktop)
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex] || imagesRef.current[0];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const isMobile = window.innerWidth < 768;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (isMobile) {
        // Mobile COVER fit: zoom/crop appropriately so there are NO empty borders or background gaps
        const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight) * 1.05;
        drawWidth = imgWidth * scale;
        drawHeight = imgHeight * scale;
        // Center the subject horizontally and vertically
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        // Desktop COVER fit: fill full viewport edge-to-edge seamlessly
        const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        drawWidth = imgWidth * scale;
        drawHeight = imgHeight * scale;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      // High quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      ctx.restore();
    },
    []
  );

  // Check reduced motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Preload frames for current product
  useEffect(() => {
    let isMounted = true;
    setImagesLoaded(false);
    setLoadProgress(0);
    imagesRef.current = [];

    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    const initialBatchSize = Math.min(30, frameCount);

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = String(index + 1).padStart(3, "0");
        img.src = `${product.folderPath}/ezgif-frame-${frameNum}.jpg`;

        img.onload = () => {
          loadedImages[index] = img;
          if (isMounted) {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / frameCount) * 100));
          }
          resolve(img);
        };

        img.onerror = () => {
          const fallback = new Image();
          fallback.src = `${product.folderPath}/ezgif-frame-001.jpg`;
          fallback.onload = () => {
            loadedImages[index] = fallback;
            resolve(fallback);
          };
          fallback.onerror = () => resolve(fallback);
        };
      });
    };

    const priorityPromises = Array.from({ length: initialBatchSize }, (_, i) => loadSingleImage(i));

    Promise.all(priorityPromises).then(() => {
      if (isMounted) {
        imagesRef.current = loadedImages;
        setImagesLoaded(true);
        drawFrame(0);

        for (let i = initialBatchSize; i < frameCount; i++) {
          loadSingleImage(i);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [product.folderPath, frameCount, drawFrame]);

  // Handle Scroll Progress & RequestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollableHeight));

      if (onScrollProgress) {
        onScrollProgress(progress);
      }

      if (isReducedMotion) {
        drawFrame(0);
        return;
      }

      const targetFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(progress * frameCount))
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;

        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetFrame);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, frameCount, onScrollProgress, isReducedMotion]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-[100vh] h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-zinc-950">
        {/* Full Viewport Ambient Glow Aura */}
        <div
          className="absolute w-[85vw] h-[85vh] max-w-[900px] max-h-[900px] rounded-full blur-[160px] opacity-30 pointer-events-none transition-colors duration-1000 animate-pulse-glow"
          style={{ backgroundColor: product.themeColor }}
        />

        {/* Loading Spinner / Progress Pill */}
        <AnimatePresence>
          {!imagesLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-20 flex flex-col items-center justify-center space-y-4 glass-panel p-6 rounded-2xl border border-white/10"
            >
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${product.themeColor} transparent transparent transparent` }} />
              <div className="text-center font-mono text-xs text-zinc-300 uppercase tracking-widest">
                Loading Assembly Frames... {loadProgress}%
              </div>
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-200"
                  style={{ width: `${loadProgress}%`, backgroundColor: product.themeColor }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-Screen Edge-to-Edge Hero Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full h-[100dvh] object-cover relative z-10 transition-opacity duration-500"
          style={{ opacity: imagesLoaded ? 1 : 0 }}
        />

        {/* Bottom Scroll Indicator Helper */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-widest text-zinc-300/80 uppercase bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            Scroll To Dissect
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/30 p-1 flex justify-center backdrop-blur-sm bg-black/20">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: product.themeColor }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
