'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

interface LandingPageProps {
  onBegin: () => void;
}

export default function LandingPage({ onBegin }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-warm-white via-blush to-lavender"
    >
      <div className="text-center px-8 max-w-2xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.3,
            type: 'spring',
            stiffness: 100
          }}
          className="mb-8"
        >
          <FaHeart className="text-rose-gold text-6xl mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ fontFamily: 'var(--font-heading)' }}
          className="text-6xl md:text-7xl font-bold text-text-dark mb-6"
        >
          Our Love Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ fontFamily: 'var(--font-script)' }}
          className="text-2xl md:text-3xl text-text-muted mb-12"
        >
          A journey through our memories together
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBegin}
          className="group relative px-12 py-5 text-xl font-medium text-white bg-gradient-to-r from-soft-rose to-rose-gold rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 bg-gradient-to-r from-rose-gold to-soft-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative z-10" style={{ fontFamily: 'var(--font-body)' }}>
            Begin Our Story
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-8 text-sm text-text-muted"
        >
          🎵 Music will play when you continue
        </motion.p>
      </div>
    </motion.div>
  );
}
