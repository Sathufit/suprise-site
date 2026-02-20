'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import PetalRain from './PetalRain';

interface LandingPageProps {
  onBegin: () => void;
}

const floatingHearts = [
  { x: '10%', y: '20%', size: 14, delay: 0, duration: 4 },
  { x: '85%', y: '15%', size: 10, delay: 0.5, duration: 5 },
  { x: '20%', y: '70%', size: 18, delay: 1.0, duration: 3.5 },
  { x: '80%', y: '60%', size: 12, delay: 0.7, duration: 4.5 },
  { x: '50%', y: '10%', size: 8, delay: 1.5, duration: 6 },
  { x: '5%', y: '50%', size: 16, delay: 0.3, duration: 3.8 },
  { x: '90%', y: '80%', size: 11, delay: 1.2, duration: 5.2 },
  { x: '45%', y: '85%', size: 9, delay: 0.8, duration: 4.2 },
];

function HeartPath({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  );
}

export default function LandingPage({ onBegin }: LandingPageProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const controls = useAnimation();

  const handleBegin = async () => {
    setClicked(true);
    await controls.start({
      scale: [1, 1.1, 0],
      opacity: [1, 1, 0],
      transition: { duration: 0.8, ease: 'easeInOut' },
    });
    onBegin();
  };

  const heartColors = [
    'rgba(242, 167, 184, 0.6)',
    'rgba(201, 133, 138, 0.5)',
    'rgba(201, 169, 233, 0.5)',
    'rgba(244, 184, 200, 0.6)',
    'rgba(255, 192, 210, 0.4)',
  ];

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF5F8 0%, #FFE0EC 30%, #F0E5FF 65%, #FFF0F5 100%)',
      }}
    >
      {/* Petal Rain */}
      <PetalRain count={30} intensity="medium" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242, 167, 184, 0.4) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 233, 0.35) 0%, transparent 70%)',
          bottom: '-5%',
          right: '-5%',
        }}
      />

      {/* Floating hearts */}
      {floatingHearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: heart.x, top: heart.y }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <HeartPath size={heart.size} color={heartColors[i % heartColors.length]} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-3xl">
        {/* Animated heart */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2, type: 'spring', stiffness: 80, damping: 12 }}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(242, 167, 184, 0.6), transparent)',
                transform: 'scale(2)',
              }}
            />
            {/* Inner glow ring */}
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(201, 133, 138, 0.5), transparent)',
                transform: 'scale(1.5)',
              }}
            />
            {/* Heart icon */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1, 1.1, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.14, 0.28, 0.42, 1],
              }}
              className="relative z-10"
            >
              <svg width="80" height="80" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F2A7B8" />
                    <stop offset="50%" stopColor="#C9858A" />
                    <stop offset="100%" stopColor="#C9A9E9" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                  fill="url(#heartGrad)"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Title - character by character reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
          className="mb-3"
        >
          <h1
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
            className="text-7xl md:text-8xl font-bold leading-none"
          >
            <span className="text-gradient">Our Love</span>
            <br />
            <span style={{ color: 'var(--text-dark)' }}>Story</span>
          </h1>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="flex items-center justify-center gap-4 my-6"
        >
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, var(--rose-gold))' }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--rose-gold)" style={{ opacity: 0.7 }}>
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, var(--rose-gold))' }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ fontFamily: 'var(--font-script)', color: 'var(--text-muted)' }}
          className="text-2xl md:text-3xl mb-10"
        >
          A journey through our memories together
        </motion.p>

        {/* Begin button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBegin}
            disabled={clicked}
            className="relative group overflow-hidden rounded-full text-white font-semibold text-lg px-14 py-5"
            style={{
              fontFamily: 'var(--font-body)',
              background: 'linear-gradient(135deg, #F2A7B8 0%, #C9858A 50%, #C9A9E9 100%)',
              boxShadow: hovered
                ? '0 20px 50px rgba(201, 133, 138, 0.5), 0 8px 20px rgba(201, 133, 138, 0.3)'
                : '0 8px 30px rgba(201, 133, 138, 0.35)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Shimmer overlay */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              className="absolute inset-0 w-1/3"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                skewX: '-15deg',
              }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Begin Our Story
              <motion.span
                animate={{ x: hovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ✨
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Music note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-8 text-sm flex items-center justify-center gap-2"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎵
          </motion.span>
          Music will play automatically
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            🎵
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
}
