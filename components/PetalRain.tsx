'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
}

const PETAL_COLORS = [
  'rgba(242, 167, 184, alpha)',
  'rgba(244, 184, 200, alpha)',
  'rgba(255, 224, 236, alpha)',
  'rgba(201, 169, 233, alpha)',
  'rgba(232, 213, 255, alpha)',
  'rgba(255, 192, 210, alpha)',
  'rgba(201, 133, 138, alpha)',
];

function createPetal(canvasWidth: number): Petal {
  const alpha = (0.4 + Math.random() * 0.5).toFixed(2);
  const colorTemplate = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  return {
    x: Math.random() * canvasWidth,
    y: -20 - Math.random() * 100,
    size: 6 + Math.random() * 12,
    speedY: 0.6 + Math.random() * 1.4,
    speedX: (Math.random() - 0.5) * 0.8,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 3,
    opacity: parseFloat(alpha),
    color: colorTemplate.replace('alpha', alpha),
    swayAmplitude: 40 + Math.random() * 60,
    swaySpeed: 0.005 + Math.random() * 0.01,
    swayOffset: Math.random() * Math.PI * 2,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal, time: number) {
  ctx.save();
  ctx.translate(petal.x + Math.sin(time * petal.swaySpeed + petal.swayOffset) * petal.swayAmplitude, petal.y);
  ctx.rotate((petal.rotation * Math.PI) / 180);
  ctx.globalAlpha = petal.opacity;

  // Draw heart-shaped petal
  const s = petal.size;
  ctx.fillStyle = petal.color;
  ctx.beginPath();
  // Elliptical petal shape
  ctx.ellipse(0, 0, s * 0.5, s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Petal vein
  ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.8);
  ctx.lineTo(0, s * 0.8);
  ctx.stroke();

  ctx.restore();
}

interface PetalRainProps {
  count?: number;
  intensity?: 'light' | 'medium' | 'heavy';
}

export default function PetalRain({ count = 25, intensity = 'medium' }: PetalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const petalCount = intensity === 'light' ? 15 : intensity === 'heavy' ? 40 : count;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize petals spread across the canvas at start
    petalsRef.current = Array.from({ length: petalCount }, () => {
      const petal = createPetal(canvas.width);
      petal.y = Math.random() * canvas.height; // Start spread across screen
      return petal;
    });

    let lastSpawn = 0;

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new petals periodically
      if (timestamp - lastSpawn > 800 / (petalCount / 20)) {
        if (petalsRef.current.length < petalCount * 1.5) {
          petalsRef.current.push(createPetal(canvas.width));
        }
        lastSpawn = timestamp;
      }

      petalsRef.current = petalsRef.current.filter((petal) => {
        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.rotation += petal.rotationSpeed;

        drawPetal(ctx, petal, timestamp);

        return petal.y < canvas.height + 50;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [petalCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
