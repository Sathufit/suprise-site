'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface BlurRevealProps {
  children: ReactNode;
  hint?: string;
}

export default function BlurReveal({ children, hint = "Click to reveal" }: BlurRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer group"
      onClick={() => setIsRevealed(true)}
      whileHover={{ scale: isRevealed ? 1 : 1.02 }}
    >
      {!isRevealed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 backdrop-blur-md bg-white/30 rounded-lg flex items-center justify-center z-10 border-2 border-rose-gold/30"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <FaStar className="text-rose-gold text-2xl mx-auto mb-2" />
            </motion.div>
            <p className="text-text-muted text-sm font-body">{hint}</p>
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="p-6 rounded-lg bg-white/50 border border-rose-gold/20"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
