'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import HeroTextOverlays from './HeroTextOverlays';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 251;

export default function RangeRoverHeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload frame sequence images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/images/rangerover/hero/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      imgArray.push(img);
    }

    imagesRef.current = imgArray;
  }, []);

  // Canvas render function - True Edge-to-Edge Cover Fill
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark luxury studio background fill
    ctx.fillStyle = '#0B0D0F';
    ctx.fillRect(0, 0, width, height);

    // True Full-Screen Cover Scaling Math
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;

    if (canvasAspect > imgAspect) {
      drawWidth = width;
      drawHeight = width / imgAspect;
    } else {
      drawHeight = height;
      drawWidth = height * imgAspect;
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    // Draw full-screen edge-to-edge car frame
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Subtle edge vignette
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.4,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.75
    );
    gradient.addColorStop(0, 'rgba(11, 13, 15, 0)');
    gradient.addColorStop(1, 'rgba(11, 13, 15, 0.85)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Update canvas on scroll (Progressive drive from 0.0 to 0.88, hold at 100% completion till 1.0 before releasing)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const normalizedProgress = Math.min(1, Math.max(0, latest / 0.88));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(normalizedProgress * (TOTAL_FRAMES - 1))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => renderFrame(frameIndex));
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, renderFrame]);

  // Canvas resize handling for 100svh / 100dvh full viewport
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Initial draw once loaded
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0);
    }
  }, [imagesLoaded, renderFrame]);

  return (
    <section ref={containerRef} className="relative h-[450vh] w-full p-0 m-0 bg-garage-dark">
      {/* Sticky True Fullscreen Viewport Stage (Pinned to viewport throughout scroll animation) */}
      <div className="sticky top-0 h-[100vh] h-[100dvh] w-full max-w-full overflow-hidden flex items-center justify-center p-0 m-0 border-none">
        {/* Canvas Renderer */}
        <canvas
          ref={canvasRef}
          className="w-full h-full h-[100dvh] object-cover block bg-garage-dark p-0 m-0 border-none"
        />

        {/* Loading Overlay */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-garage-dark z-30 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-2 border-white/10 border-t-garage-accent rounded-full animate-spin" />
            <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              LOADING RANGE ROVER HERO SEQUENCE... {loadProgress}%
            </div>
          </div>
        )}

        {/* Dynamic Text Overlays */}
        <HeroTextOverlays progress={scrollYProgress} />

        {/* Scroll Down Indicator */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-300 text-shadow">
            SCROLL TO DISSECT
          </span>
          <ChevronDown className="w-4 h-4 text-white animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
