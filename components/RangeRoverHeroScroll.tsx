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

  // Array storing preloaded Image objects
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
        // Fallback progress if image fails
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

  // Canvas render function
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

    // Dark luxury background studio fill
    ctx.fillStyle = '#0B0D0F';
    ctx.fillRect(0, 0, width, height);

    // Object-fitcontain calculation to keep car properly proportioned
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = height * 0.85;
      drawWidth = drawHeight * imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = width * 0.92;
      drawHeight = drawWidth / imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;
    }

    // Draw frame onto canvas
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Draw subtle vignette gradient overlay
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.3,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.65
    );
    gradient.addColorStop(0, 'rgba(11, 13, 15, 0)');
    gradient.addColorStop(1, 'rgba(11, 13, 15, 0.85)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Update canvas on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map scroll progress [0, 1] to frame index [0, TOTAL_FRAMES - 1]
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => renderFrame(frameIndex));
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, renderFrame]);

  // Canvas resize listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
    <section ref={containerRef} className="relative h-[480vh] bg-garage-dark">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas Renderer */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block bg-garage-dark"
        />

        {/* Loading Progress Spinner */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-garage-dark z-30 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-2 border-white/10 border-t-garage-accent rounded-full animate-spin" />
            <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              LOADING RANGE ROVER ANATOMY SEQUENCE... {loadProgress}%
            </div>
          </div>
        )}

        {/* Dynamic Text Overlays */}
        <HeroTextOverlays progress={scrollYProgress} />

        {/* Scroll Down Indicator (visible on initial hero screen) */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-400">
            SCROLL TO DISSECT
          </span>
          <ChevronDown className="w-4 h-4 text-white animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
