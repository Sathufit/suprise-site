'use client';

import { useEffect, useRef } from 'react';

interface SparkleCanvasProps {
    className?: string;
}

export default function SparkleCanvas({ className = '' }: SparkleCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const sparkles: {
            x: number; y: number; size: number; life: number; maxLife: number; vx: number; vy: number;
        }[] = [];

        let frame = 0;
        let animId: number;

        const drawStar = (x: number, y: number, r: number, opacity: number) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = '#FFD6E5';
            ctx.translate(x, y);
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                const innerAngle = angle + (2 * Math.PI) / 10;
                if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
                else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
                ctx.lineTo(Math.cos(innerAngle) * r * 0.4, Math.sin(innerAngle) * r * 0.4);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            // Randomly spawn sparkles
            if (frame % 8 === 0 && sparkles.length < 12) {
                sparkles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: 3 + Math.random() * 6,
                    life: 0,
                    maxLife: 60 + Math.random() * 60,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -0.5 - Math.random() * 0.5,
                });
            }

            for (let i = sparkles.length - 1; i >= 0; i--) {
                const s = sparkles[i];
                s.life++;
                s.x += s.vx;
                s.y += s.vy;

                const progress = s.life / s.maxLife;
                const opacity = progress < 0.3
                    ? progress / 0.3
                    : progress > 0.7
                        ? 1 - (progress - 0.7) / 0.3
                        : 1;

                drawStar(s.x, s.y, s.size * opacity, opacity * 0.8);

                if (s.life >= s.maxLife) sparkles.splice(i, 1);
            }

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        />
    );
}
