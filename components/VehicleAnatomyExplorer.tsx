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

  // Canvas render function
  const renderFrame = useCallback((frameIndex: number, isHoveredGlow: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Studio dark fill
    ctx.fillStyle = '#0B0D0F';
    ctx.fillRect(0, 0, width, height);

    // Image fit calculation
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = height * 0.82;
      drawWidth = drawHeight * imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = width * 0.90;
      drawHeight = drawWidth / imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;
    }

    // Glow highlight if component is hovered
    if (isHoveredGlow) {
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 30;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Technical Blueprint Grid Overlay
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 60;
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

  // Update frame on scroll or drag
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const scrollFrame = Math.floor(latest * (TOTAL_FRAMES - 1));
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

  // Canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current, Boolean(hoveredPartId));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredPartId, renderFrame]);

  // Re-render when hovered part changes
  useEffect(() => {
    renderFrame(currentFrameRef.current, Boolean(hoveredPartId));
  }, [hoveredPartId, renderFrame]);

  // Interactive Label visibility threshold (show labels when exploded in middle/end scroll)
  const labelsOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  return (
    <section id="anatomy" ref={containerRef} className="relative h-[550vh] bg-garage-dark">
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas Render Stage */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`w-full h-full object-cover block bg-garage-dark ${
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
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20 max-w-2xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 border border-white/10 bg-black/50 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-garage-accent">
            <Sparkles className="w-3.5 h-3.5 text-garage-accent" />
            <span>INTERACTIVE VEHICLE ANATOMY EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-lg">
            EXPLORE THE ANATOMY
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-light tracking-wider">
            Rotate it. Dissect it. Click components to learn how Bell Automotive maintains them.
          </p>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-4 py-2 glass-panel border border-white/10 text-xs font-mono text-neutral-300 pointer-events-auto">
          <div className="flex items-center gap-2">
            <MoveHorizontal className="w-4 h-4 text-garage-accent animate-pulse" />
            <span>DRAG TO ROTATE VEHICLE</span>
          </div>
          <span className="text-neutral-600">|</span>
          <button
            onClick={() => {
              setManualFrameOffset(0);
              currentFrameRef.current = 0;
              renderFrame(0, false);
            }}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
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
