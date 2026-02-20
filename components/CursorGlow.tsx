'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const dotRef = useRef<HTMLDivElement>(null);
    const auraRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const auraPos = useRef({ x: 0, y: 0 });
    const animRef = useRef<number>(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            // Smooth lerp for aura
            const lerpFactor = 0.08;
            auraPos.current.x += (pos.current.x - auraPos.current.x) * lerpFactor;
            auraPos.current.y += (pos.current.y - auraPos.current.y) * lerpFactor;

            if (dotRef.current) {
                dotRef.current.style.left = `${pos.current.x}px`;
                dotRef.current.style.top = `${pos.current.y}px`;
            }

            if (auraRef.current) {
                auraRef.current.style.left = `${auraPos.current.x}px`;
                auraRef.current.style.top = `${auraPos.current.y}px`;
            }

            animRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <>
            {/* Trailing aura */}
            <div
                ref={auraRef}
                style={{
                    position: 'fixed',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(242, 167, 184, 0.08) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: 'none',
                }}
            />
            {/* Dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'rgba(201, 133, 138, 0.5)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'multiply',
                }}
            />
        </>
    );
}
