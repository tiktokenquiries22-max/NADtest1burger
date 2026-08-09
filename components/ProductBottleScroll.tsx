"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, MotionValue } from "framer-motion";
import { Product } from "@/data/products";

interface ProductBottleScrollProps {
  product: Product;
  containerRef: React.RefObject<HTMLDivElement>;
  onScrollProgress?: (progress: number) => void;
}

export const ProductBottleScroll: React.FC<ProductBottleScrollProps> = ({
  product,
  containerRef,
  onScrollProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const totalFrames = 120;

  // Track scroll progress of the sticky wrapper (500vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload sequence images (1.webp to 120.webp)
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${product.folderPath}/${i}.webp`;
      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => {
        // Image missing fallback handled gracefully in render loop
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [product.folderPath]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const progress = scrollYProgress.get();
      if (onScrollProgress) {
        onScrollProgress(progress);
      }

      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * totalFrames))
      );

      const currentImage = imagesRef.current[frameIndex];

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Check if image is valid and loaded
      if (currentImage && currentImage.complete && currentImage.naturalWidth !== 0) {
        // Draw frame with contain fit
        const imgRatio = currentImage.naturalWidth / currentImage.naturalHeight;
        const screenRatio = width / height;

        let drawWidth: number;
        let drawHeight: number;

        if (screenRatio > imgRatio) {
          drawHeight = height * 0.75;
          drawWidth = drawHeight * imgRatio;
        } else {
          drawWidth = width * 0.75;
          drawHeight = drawWidth / imgRatio;
        }

        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        ctx.save();
        // Subtle floating shadow under bottle
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 20;

        ctx.drawImage(currentImage, x, y, drawWidth, drawHeight);
        ctx.restore();
      } else {
        // Procedural High-Fidelity 3D Glass Juice Bottle Render Fallback
        renderProceduralBottle(ctx, width, height, progress, product);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress, product, onScrollProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Glow ambient background aura */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 blur-3xl transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.themeColor} 0%, transparent 65%)`,
          }}
        />

        {/* HTML5 Canvas Render Engine */}
        <canvas ref={canvasRef} className="relative z-10 block pointer-events-none" />

        {/* Subtle Frame Loading Indicator (Disappears once ready) */}
        {loadedCount < 10 && (
          <div className="absolute bottom-6 right-6 z-20 px-3 py-1.5 rounded-full glass-pill text-xs text-white/80 flex items-center space-x-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            <span>Interactive 3D Engine Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * High-Fidelity Procedural 3D Bottle Renderer
 * Used as dynamic rendering engine fallback when static frame sequences are loading or generated.
 */
function renderProceduralBottle(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  product: Product
) {
  const centerX = width / 2;
  const centerY = height / 2 + Math.sin(progress * Math.PI * 4) * 8; // Gentle floating movement
  const rotationAngle = (progress * Math.PI * 2 * 1.5) - Math.PI / 6; // Dynamic 3D twist on scroll

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(Math.sin(rotationAngle) * 0.12);

  // Bottle Dimensions
  const bottleWidth = Math.min(width * 0.28, 220);
  const bottleHeight = Math.min(height * 0.65, 480);
  const radius = bottleWidth * 0.25;

  // Background Ambient Shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 25;

  // Outer Glass Body Outline
  ctx.beginPath();
  // Cap
  const capWidth = bottleWidth * 0.45;
  const capHeight = bottleHeight * 0.08;
  const capY = -bottleHeight / 2;

  ctx.roundRect(-capWidth / 2, capY, capWidth, capHeight, 6);
  ctx.fillStyle = "#1e293b";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Neck
  const neckWidth = bottleWidth * 0.38;
  const neckHeight = bottleHeight * 0.15;
  const neckY = capY + capHeight;

  ctx.beginPath();
  ctx.rect(-neckWidth / 2, neckY, neckWidth, neckHeight);
  const neckGradient = ctx.createLinearGradient(-neckWidth / 2, 0, neckWidth / 2, 0);
  neckGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
  neckGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
  neckGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
  ctx.fillStyle = neckGradient;
  ctx.fill();

  // Main Body
  const bodyY = neckY + neckHeight;
  const bodyHeight = bottleHeight - capHeight - neckHeight;

  ctx.beginPath();
  ctx.roundRect(-bottleWidth / 2, bodyY, bottleWidth, bodyHeight, radius);

  // Liquid Interior Gradient
  const liquidGradient = ctx.createLinearGradient(-bottleWidth / 2, bodyY, bottleWidth / 2, bodyY + bodyHeight);
  liquidGradient.addColorStop(0, product.themeColor);
  liquidGradient.addColorStop(1, adjustColor(product.themeColor, -40));
  ctx.fillStyle = liquidGradient;
  ctx.fill();

  // Glass Specular Highlight Overlay
  const glassHighlight = ctx.createLinearGradient(-bottleWidth / 2, bodyY, bottleWidth / 2, bodyY);
  glassHighlight.addColorStop(0, "rgba(255, 255, 255, 0.45)");
  glassHighlight.addColorStop(0.2, "rgba(255, 255, 255, 0.15)");
  glassHighlight.addColorStop(0.8, "rgba(0, 0, 0, 0.05)");
  glassHighlight.addColorStop(1, "rgba(255, 255, 255, 0.3)");
  ctx.fillStyle = glassHighlight;
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Bottle Label Brand Card
  const labelWidth = bottleWidth * 0.85;
  const labelHeight = bodyHeight * 0.42;
  const labelY = bodyY + bodyHeight * 0.28;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(-labelWidth / 2, labelY, labelWidth, labelHeight, 12);
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Label Brand Text
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.max(14, labelWidth * 0.12)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("NANO BANANA", 0, labelY + labelHeight * 0.3);

  ctx.fillStyle = product.themeColor;
  ctx.font = `600 ${Math.max(11, labelWidth * 0.09)}px sans-serif`;
  ctx.fillText(product.name.toUpperCase(), 0, labelY + labelHeight * 0.58);

  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.font = `10px sans-serif`;
  ctx.fillText("COLD PRESSED • 300ML", 0, labelY + labelHeight * 0.8);
  ctx.restore();

  // Liquid Bubbles / Floating Fruit Particles
  const bubbleCount = 8;
  for (let i = 0; i < bubbleCount; i++) {
    const bY = bodyY + ((i * 37 + progress * 150) % bodyHeight);
    const bX = Math.sin(i * 1.7 + progress * 5) * (bottleWidth * 0.3);
    const bRadius = 2 + (i % 3);

    ctx.beginPath();
    ctx.arc(bX, bY, bRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Utility to darken/lighten color
 */
function adjustColor(color: string, amount: number): string {
  return color.replace(/^#/, "").replace(/../g, (hex) =>
    Math.min(255, Math.max(0, parseInt(hex, 16) + amount))
      .toString(16)
      .padStart(2, "0")
  );
}
