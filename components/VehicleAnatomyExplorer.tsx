'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import { VEHICLE_PARTS, VehiclePart } from '../data/vehicleParts';
import VehiclePartLabels from './VehiclePartLabels';
import VehiclePartPanel from './VehiclePartPanel';
import { MoveHorizontal, RotateCcw, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 251;

export default function VehicleAnatomyExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [selectedPart, setSelectedPart] = useState<VehiclePart | null>(null);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  // Manual Drag Rotation State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartFrame, setDragStartFrame] = useState(0);
  const [manualFrameOffset, setManualFrameOffset] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  // Scroll tracking pinned to containerRef
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload frame sequence images for Anatomy Explorer
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/images/rangerover/anatomy/ezgif-frame-${frameNum}.jpg`;

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

  // Canvas render function - Massive Full-Screen Viewport Fill
  const renderFrame = useCallback((frameIndex: number, isHoveredGlow: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Synchronize canvas internal width/height to device viewport
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = window.innerWidth * dpr;
    const targetHeight = window.innerHeight * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Studio dark fill
    ctx.fillStyle = '#0B0D0F';
    ctx.fillRect(0, 0, width, height);

    // Massive Edge-to-Edge Full-Screen Sizing Calculation
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;

    if (canvasAspect > imgAspect) {
      drawHeight = height * 1.35;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = width * 1.45;
      drawHeight = drawWidth / imgAspect;
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    // Glow highlight if component is hovered
    if (isHoveredGlow) {
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 35;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    // Draw full-screen car frame
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Technical Blueprint Grid Overlay
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    const gridSize = 70;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, []);

  // Update frame on scroll or drag (Progressive drive from 0.0 to 0.85, hold at 100% completion till 1.0 before releasing)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const normalizedProgress = Math.min(1, Math.max(0, latest / 0.85));
      const scrollFrame = Math.floor(normalizedProgress * (TOTAL_FRAMES - 1));
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, (scrollFrame + manualFrameOffset + TOTAL_FRAMES) % TOTAL_FRAMES)
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        requestAnimationFrame(() => renderFrame(targetFrame, Boolean(hoveredPartId)));
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, manualFrameOffset, hoveredPartId, renderFrame]);

  // Handle Drag to Rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartFrame(currentFrameRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const frameDelta = Math.floor(deltaX / 5);
    const newFrame = (dragStartFrame + frameDelta + TOTAL_FRAMES) % TOTAL_FRAMES;

    currentFrameRef.current = newFrame;
    renderFrame(newFrame, Boolean(hoveredPartId));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Canvas resize listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      renderFrame(currentFrameRef.current, Boolean(hoveredPartId));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [hoveredPartId, renderFrame]);

  // Re-render when hovered part changes
  useEffect(() => {
    renderFrame(currentFrameRef.current, Boolean(hoveredPartId));
  }, [hoveredPartId, renderFrame]);

  // Interactive Label visibility — Visible from top of section (0.0 to 0.98)
  const labelsOpacity = useTransform(scrollYProgress, [0.0, 0.05, 0.98, 1.0], [1, 1, 1, 0]);

  return (
    <section id="anatomy" ref={containerRef} className="relative h-[550vh] w-full p-0 m-0 bg-garage-dark">
      {/* Sticky Full-Screen Stage - Remains pinned to viewport throughout entire 550vh scroll sequence */}
      <div className="sticky top-0 left-0 right-0 w-screen h-screen min-h-[100dvh] h-[100dvh] h-[100svh] max-w-full overflow-hidden flex items-center justify-center p-0 m-0 border-none z-10">
        {/* Canvas Render Stage */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`w-screen h-screen min-h-[100dvh] h-[100dvh] object-cover block bg-garage-dark ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        />

        {/* Loading Overlay */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-garage-dark z-30 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-2 border-white/10 border-t-garage-accent rounded-full animate-spin" />
            <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              LOADING INTERACTIVE ANATOMY... {loadProgress}%
            </div>
          </div>
        )}

        {/* Top Header Overlay */}
        <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20 max-w-2xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 border border-white/20 bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-garage-accent">
            <Sparkles className="w-3.5 h-3.5 text-garage-accent" />
            <span>INTERACTIVE VEHICLE ANATOMY EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            EXPLORE THE ANATOMY
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-200 font-light tracking-wider drop-shadow-md">
            Rotate it. Dissect it. Hover or tap components to reveal details.
          </p>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-5 py-2.5 glass-panel border border-white/15 text-xs font-mono text-neutral-200 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2">
            <MoveHorizontal className="w-4 h-4 text-garage-accent animate-pulse" />
            <span className="uppercase">DRAG TO ROTATE VEHICLE</span>
          </div>
          <span className="text-neutral-600">|</span>
          <button
            onClick={() => {
              setManualFrameOffset(0);
              currentFrameRef.current = 0;
              renderFrame(0, false);
            }}
            className="flex items-center gap-1.5 hover:text-garage-accent transition-colors uppercase"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET VIEW</span>
          </button>
        </div>

        {/* Interactive Floating Part Labels */}
        <motion.div style={{ opacity: labelsOpacity }}>
          <VehiclePartLabels
            parts={VEHICLE_PARTS}
            hoveredPartId={hoveredPartId}
            onHoverPart={setHoveredPartId}
            onSelectPart={setSelectedPart}
          />
        </motion.div>

        {/* Selected Part Information Panel Modal */}
        <VehiclePartPanel
          part={selectedPart}
          onClose={() => setSelectedPart(null)}
        />
      </div>
    </section>
  );
}
