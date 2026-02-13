'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { FaHeart, FaCalendarAlt, FaGift, FaRing } from 'react-icons/fa';
import { useRef } from 'react';
import SlideIn from './animations/SlideIn';

export interface Milestone {
  date: string;
  title: string;
  description: string;
  icon?: 'heart' | 'calendar' | 'gift' | 'ring';
}

interface TimelineProps {
  milestones: Milestone[];
}

const iconMap = {
  heart: FaHeart,
  calendar: FaCalendarAlt,
  gift: FaGift,
  ring: FaRing,
};

export default function Timeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="relative py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-heading)' }}
          className="text-5xl md:text-6xl font-bold text-center text-text-dark mb-4"
        >
          Our Journey
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-script)' }}
          className="text-2xl text-center text-text-muted mb-16"
        >
          Every moment with you is a treasure
        </motion.p>

        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-rose-gold/20 -ml-0.5 hidden sm:block" />
          
          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-soft-rose to-rose-gold origin-top -ml-0.5 hidden sm:block"
          />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon ? iconMap[milestone.icon] : FaHeart;
              const isEven = index % 2 === 0;

              return (
                <SlideIn
                  key={index}
                  direction={isEven ? 'left' : 'right'}
                  delay={0.1 * index}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="absolute left-0 md:left-1/2 w-12 h-12 -ml-6 bg-gradient-to-br from-soft-rose to-rose-gold rounded-full flex items-center justify-center text-white shadow-lg z-10"
                  >
                    <Icon size={20} />
                  </motion.div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-rose-gold/20 hover:shadow-2xl transition-shadow duration-300"
                    >
                      <p style={{ fontFamily: 'var(--font-script)' }} className="text-rose-gold text-lg mb-2">
                        {milestone.date}
                      </p>
                      <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl font-bold text-text-dark mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
