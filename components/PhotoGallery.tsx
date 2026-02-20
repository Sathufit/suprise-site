'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import FadeIn from './animations/FadeIn';

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

// Pre-defined rotations and scales for polaroid effect (no runtime randomness for SSR safety)
const POLAROID_TRANSFORMS = [
  { rotate: -3, scale: 1 },
  { rotate: 2, scale: 1 },
  { rotate: -1.5, scale: 1 },
  { rotate: 3.5, scale: 1 },
  { rotate: -2, scale: 1 },
  { rotate: 1, scale: 1 },
  { rotate: -4, scale: 1 },
  { rotate: 2.5, scale: 1 },
];

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => i !== null ? (i - 1 + photos.length) % photos.length : null);
      if (e.key === 'ArrowRight') setSelectedIndex((i) => i !== null ? (i + 1) % photos.length : null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  return (
    <section
      className="py-32 px-4 md:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--warm-white) 0%, #FFE8F0 50%, var(--warm-white) 100%)',
      }}
    >
      {/* Decorative scattered petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${15 + i * 14}%`,
              top: `${10 + (i % 3) * 30}%`,
              fontSize: `${20 + i * 4}px`,
            }}
            animate={{ rotate: [0, 360], y: [0, -10, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-lg mb-3 tracking-widest"
            style={{ color: 'var(--rose-gold)', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}
          >
            — CAPTURED MOMENTS —
          </p>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-dark)' }}
          >
            Our Gallery of
            <br />
            <span className="text-gradient italic">Memories</span>
          </h2>
          <p
            className="text-xl"
            style={{ fontFamily: 'var(--font-script)', color: 'var(--text-muted)' }}
          >
            Every picture tells our story
          </p>
        </motion.div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {photos.map((photo, index) => {
            const transform = POLAROID_TRANSFORMS[index % POLAROID_TRANSFORMS.length];
            const isHovered = hoveredIndex === index;

            return (
              <FadeIn key={index} delay={0.06 * index}>
                <motion.div
                  initial={{ rotate: transform.rotate }}
                  animate={{
                    rotate: isHovered ? 0 : transform.rotate,
                    scale: isHovered ? 1.08 : transform.scale,
                    y: isHovered ? -12 : 0,
                    zIndex: isHovered ? 10 : 1,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(index)}
                  className="cursor-zoom-in relative"
                  style={{ position: 'relative', zIndex: isHovered ? 10 : 1 }}
                >
                  {/* Polaroid frame */}
                  <div
                    className="polaroid"
                    style={{
                      boxShadow: isHovered
                        ? '0 25px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(180, 100, 120, 0.15)'
                        : '0 4px 15px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
                      transition: 'box-shadow 0.35s ease',
                    }}
                  >
                    {/* Photo */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500"
                        style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        unoptimized
                      />
                      {/* Hover overlay */}
                      <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, rgba(242, 167, 184, 0.3), rgba(201, 169, 233, 0.3))' }}
                      >
                        <motion.div
                          animate={{ scale: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--rose-gold)">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Caption handwritten style */}
                    {photo.caption && (
                      <div className="pt-2 pb-1 text-center">
                        <p
                          className="text-sm leading-tight"
                          style={{ fontFamily: 'var(--font-script)', color: 'var(--text-muted)', fontSize: '0.95rem' }}
                        >
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(20, 10, 25, 0.95)', backdropFilter: 'blur(12px)' }}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full text-white z-10 transition-colors"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(4px)' }}
              whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </motion.button>

            {/* Previous */}
            <motion.button
              className="absolute left-3 md:left-5 w-11 h-11 flex items-center justify-center rounded-full text-white z-10"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.2)' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((i) => i !== null ? (i - 1 + photos.length) % photos.length : null);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </motion.button>

            {/* Next */}
            <motion.button
              className="absolute right-3 md:right-5 w-11 h-11 flex items-center justify-center rounded-full text-white z-10"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.2)' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((i) => i !== null ? (i + 1) % photos.length : null);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </motion.button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center"
            >
              {/* Polaroid in lightbox */}
              <div
                className="bg-white p-3 pb-6 shadow-2xl"
                style={{ maxWidth: '90vw', maxHeight: '80vh' }}
              >
                <div className="relative" style={{ width: '100%', height: '60vh' }}>
                  <Image
                    src={photos[selectedIndex].src}
                    alt={photos[selectedIndex].alt}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="90vw"
                  />
                </div>
                {photos[selectedIndex].caption && (
                  <p
                    className="text-center mt-3 text-lg"
                    style={{ fontFamily: 'var(--font-script)', color: 'var(--text-muted)' }}
                  >
                    {photos[selectedIndex].caption}
                  </p>
                )}
              </div>

              {/* Counter */}
              <div
                className="mt-4 px-4 py-1.5 rounded-full text-sm text-white"
                style={{ background: 'rgba(255, 255, 255, 0.15)' }}
              >
                {selectedIndex + 1} of {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
