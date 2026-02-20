'use client';

import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import SparkleCanvas from './SparkleCanvas';

export interface Milestone {
  date: string;
  title: string;
  description: string;
  icon?: 'heart' | 'calendar' | 'gift' | 'ring' | 'star' | 'camera';
  emoji?: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

const iconEmojis: Record<string, string> = {
  heart: '💕',
  calendar: '📅',
  gift: '🎁',
  ring: '💍',
  star: '⭐',
  camera: '📸',
};

function TimelineCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;
  const emoji = milestone.emoji || (milestone.icon ? iconEmojis[milestone.icon] : '💕');

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* The icon node on the center line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 150 }}
        className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
        style={{ width: '56px', height: '56px' }}
      >
        {/* Outer pulse ring */}
        <motion.div
          animate={isInView ? {
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: index * 0.3 }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, rgba(242, 167, 184, 0.5), rgba(201, 169, 233, 0.5))' }}
        />
        {/* Inner circle */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg relative z-10"
          style={{
            background: 'linear-gradient(135deg, #F2A7B8 0%, #C9858A 50%, #C9A9E9 100%)',
            boxShadow: '0 4px 20px rgba(201, 133, 138, 0.4), 0 0 0 3px rgba(255,255,255,0.8)',
          }}
        >
          {emoji}
        </div>
      </motion.div>

      {/* Card - alternates left/right on desktop */}
      <motion.div
        initial={{
          opacity: 0,
          x: isEven ? -60 : 60,
          y: 20,
        }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full md:w-5/12 ${isEven
            ? 'md:mr-auto md:pr-12 pl-0'
            : 'md:ml-auto md:pl-12 md:text-left ml-auto'
          } mt-4 md:mt-0`}
      >
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden group cursor-default"
        >
          {/* Corner decoration */}
          <div
            className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity"
            style={{
              background: 'radial-gradient(circle at top right, var(--soft-rose), transparent)',
            }}
          />

          <motion.p
            className="text-sm font-medium mb-2 flex items-center gap-1.5"
            style={{ fontFamily: 'var(--font-script)', color: 'var(--rose-gold)', fontSize: '1.1rem' }}
          >
            📆 {milestone.date}
          </motion.p>

          <h3
            className="font-bold text-xl mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-dark)' }}
          >
            {milestone.title}
          </h3>

          <p
            className="leading-relaxed text-sm"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
          >
            {milestone.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
            style={{ background: 'linear-gradient(to right, var(--soft-rose), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Timeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-4 md:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--warm-white) 0%, #F5EEFF 50%, var(--warm-white) 100%)',
      }}
    >
      <SparkleCanvas className="absolute inset-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-lg mb-3 tracking-widest uppercase"
            style={{ color: 'var(--rose-gold)', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}
          >
            — Our Journey —
          </p>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-dark)' }}
          >
            Milestones of
            <br />
            <span className="text-gradient italic">Love</span>
          </h2>
          <p
            className="text-xl"
            style={{ fontFamily: 'var(--font-script)', color: 'var(--text-muted)' }}
          >
            Every moment with you is a treasure
          </p>
        </motion.div>

        {/* Timeline content */}
        <div className="relative">
          {/* Background line */}
          <div
            className="absolute hidden md:block"
            style={{
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, transparent, rgba(201, 133, 138, 0.2) 10%, rgba(201, 133, 138, 0.2) 90%, transparent)',
            }}
          />

          {/* Animated progress line */}
          <motion.div
            style={{
              scaleY,
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              transformOrigin: 'top',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, var(--soft-rose), var(--rose-gold), var(--pale-purple))',
            }}
            className="hidden md:block"
          />

          <div className="space-y-16 md:space-y-20">
            {milestones.map((milestone, index) => (
              <TimelineCard key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
