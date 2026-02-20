'use client';

import { motion } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  yOffset?: number;
  className?: string;
  style?: CSSProperties;
}

export default function FloatingElement({
  children,
  duration = 3,
  yOffset = 10,
  className = '',
  style,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset, -yOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
