'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from '@/components/LandingPage';
import Timeline, { Milestone } from '@/components/Timeline';
import PhotoGallery, { Photo } from '@/components/PhotoGallery';
import MusicPlayer from '@/components/MusicPlayer';
import LoveLetter from '@/components/LoveLetter';
import PetalRain from '@/components/PetalRain';
import CursorGlow from '@/components/CursorGlow';
import FadeIn from '@/components/animations/FadeIn';
import FloatingElement from '@/components/animations/FloatingElement';

// ─────────────────────── DATA ──────────────────────────────
const milestones: Milestone[] = [
  {
    photo: '/images/1.jpeg',
    description:
      'In your eyes, I found a home — a place I never want to leave.',
    emoji: '💕',
  },
  {
    photo: '/images/2.jpeg',
    objectPosition: 'center 40%',
    description:
      'Every moment with you is a memory I will treasure for the rest of my life.',
    emoji: '🌹',
  },
  {
    photo: '/images/3.jpeg',
    objectPosition: 'center 2%',
    description:
      'You are the reason I believe in love — completely, endlessly, hopelessly.',
    emoji: '💫',
  },
  {
    photo: '/images/4.jpeg',
    description:
      'I fell in love with you slowly, then all at once — and I would choose you a thousand times over.',
    emoji: '✨',
  },
];

const photos: Photo[] = [
  { src: '/images/1.jpeg', alt: 'Our memory', caption: 'Always & forever' },
  { src: '/images/2.jpeg', alt: 'Our memory', caption: 'Together is my favourite place' },
  { src: '/images/3.jpeg', alt: 'Our memory', caption: 'Every moment with you' },
  { src: '/images/4.jpeg', alt: 'Our memory', caption: 'You make me smile' },
  { src: '/images/5.jpeg', alt: 'Our memory', caption: 'My favourite adventure' },
  { src: '/images/6.jpeg', alt: 'Our memory', caption: 'Endless love' },
  { src: '/images/7.jpeg', alt: 'Our memory', caption: 'You are my sunshine' },
  { src: '/images/8.jpeg', alt: 'Our memory', caption: 'Love in every look' },
  { src: '/images/9.jpeg', alt: 'Our memory', caption: 'Side by side always' },
  { src: '/images/10.jpeg', alt: 'Our memory', caption: 'My whole heart' },
  { src: '/images/11.jpeg', alt: 'Our memory', caption: 'Lost in you' },
];

const loveNotes = [
  'Every day with you is a new adventure. Thank you for being my partner in everything.',
  'You make ordinary moments extraordinary just by being there.',
  'I fall in love with you more and more each day.',
  'You are my today and all of my tomorrows.',
];

// ─────────────────────── SECTION DIVIDER ──────────────────────────
function WaveDivider({ flip = false, color = '#FFF9F5' }: { flip?: boolean; color?: string }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none', marginBottom: '-2px' }}>
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '50px' }}
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// ─────────────────────── HERO ──────────────────────────
function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #FFF9F5 0%, #FFE0EC 40%, #EDE0FF 80%, #FFF5F8 100%)',
      }}
    >
      <PetalRain count={20} intensity="light" />

      {/* Decorative blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
          background:
            'radial-gradient(ellipse, rgba(242, 167, 184, 0.18) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%',
          background:
            'radial-gradient(ellipse, rgba(201, 169, 233, 0.15) 0%, transparent 70%)',
          bottom: '-5%',
          left: '-8%',
        }}
      />

      {/* Floating micro hearts */}
      {[...Array(4)].map((_, i) => (
        <FloatingElement
          key={i}
          duration={3 + i}
          yOffset={12 + i * 3}
          className="absolute pointer-events-none"
          style={{
            left: `${10 + i * 22}%`,
            top: `${15 + (i % 2) * 55}%`,
            opacity: 0.35,
          }}
        >
          <svg width={14 + i * 4} height={14 + i * 4} viewBox="0 0 24 24" fill="var(--soft-rose)">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </FloatingElement>
      ))}

      <div className="relative z-10 text-center max-w-4xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="text-sm uppercase tracking-widest mb-6 flex items-center justify-center gap-3"
          style={{ color: 'var(--rose-gold)', fontFamily: 'var(--font-body)', letterSpacing: '0.25em' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '40px',
              height: '1px',
              background: 'var(--rose-gold)',
            }}
          />
          with love
          <span
            style={{
              display: 'inline-block',
              width: '40px',
              height: '1px',
              background: 'var(--rose-gold)',
            }}
          />
        </motion.p>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h1
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', lineHeight: '1.05' }}
            className="text-6xl md:text-8xl font-bold text-center mb-6"
          >
            <span style={{ color: 'var(--text-dark)' }}>Our</span>{' '}
            <span className="text-gradient italic">Love</span>
            <br />
            <span style={{ color: 'var(--text-dark)' }}>Story</span>
          </h1>
        </motion.div>

        {/* Script subtitle */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}>
          <p
            style={{ fontFamily: 'var(--font-script)', color: 'var(--text-muted)', fontSize: '1.6rem' }}
            className="mb-10"
          >
            A celebration of our journey together
          </p>
        </motion.div>

        {/* Opening message card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
          <div
            className="glass-card rounded-3xl p-8 md:p-10 max-w-2xl mx-auto relative overflow-hidden"
            style={{ border: '1px solid rgba(201, 133, 138, 0.15)' }}
          >
            {/* Subtle shimmer stripe */}
            <motion.div
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
              className="absolute inset-y-0 w-1/4"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                skewX: '-15deg',
                top: 0,
                zIndex: 0,
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-elegant)',
                color: 'var(--text-dark)',
                fontSize: '1.2rem',
                lineHeight: '1.8',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 1,
              }}
              className="text-center"
            >
              To my dearest partner, every moment with you has been a treasure.
              This website is a small token of my love — celebrating all the beautiful
              memories we&apos;ve created together. Here&apos;s to many more adventures ahead! ❤️
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <div className="mt-14 flex flex-col items-center gap-2">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}
            >
              Scroll to explore
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--rose-gold)" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────── LOVE NOTE SECTION ──────────────────────────
function LoveNoteSection({
  note,
  index,
}: {
  note: string;
  index: number;
}) {
  const hints = [
    '💌 A letter just for you',
    '✨ Something special inside',
    '💝 Words from the heart',
  ];

  return (
    <section
      className="py-20 px-4 relative"
      style={{
        background:
          index % 2 === 0
            ? 'linear-gradient(180deg, var(--warm-white), #F8F0FF)'
            : 'linear-gradient(180deg, #F8F0FF, var(--warm-white))',
      }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
        <FadeIn>
          <LoveLetter hint={hints[index % hints.length]} cardIndex={index}>
            <p
              style={{ fontFamily: 'var(--font-script)', color: 'var(--text-dark)', fontSize: '1.4rem', lineHeight: '1.7' }}
            >
              &ldquo;{note}&rdquo;
            </p>
          </LoveLetter>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────── FINAL SECTION ──────────────────────────
function ForeverSection({ note }: { note: string }) {
  return (
    <section
      className="py-40 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFF5F8 0%, #FFE0EC 40%, #EDE0FF 100%)',
      }}
    >
      <PetalRain count={25} intensity="medium" />

      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(242, 167, 184, 0.2) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn>
          <p
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: 'var(--rose-gold)', fontFamily: 'var(--font-body)', letterSpacing: '0.25em' }}
          >
            — always & forever —
          </p>
          <h2
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: 'var(--text-dark)' }}
            className="text-6xl md:text-8xl font-bold mb-10"
          >
            Forever &amp;
            <br />
            <span className="text-gradient italic">Always</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div
            className="glass-card rounded-3xl p-10 md:p-14 relative overflow-hidden"
            style={{ border: '1px solid rgba(201, 133, 138, 0.15)' }}
          >
            {/* Corner flourishes */}
            <div className="absolute top-4 left-5 text-2xl opacity-20">❋</div>
            <div className="absolute top-4 right-5 text-2xl opacity-20">❋</div>
            <div className="absolute bottom-4 left-5 text-2xl opacity-20">❋</div>
            <div className="absolute bottom-4 right-5 text-2xl opacity-20">❋</div>

            <motion.p
              style={{
                fontFamily: 'var(--font-script)',
                color: 'var(--text-dark)',
                fontSize: '1.8rem',
                lineHeight: '1.6',
              }}
            >
              &ldquo;{note}&rdquo;
            </motion.p>

            {/* Animating hearts */}
            <div className="flex justify-center gap-4 mt-10">
              {[0, 0.3, 0.6].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.25, 1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay,
                    times: [0, 0.14, 0.28, 0.42, 1],
                  }}
                >
                  <svg width={24 + i * 4} height={24 + i * 4} viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id={`hg${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F2A7B8" />
                        <stop offset="100%" stopColor="#C9A9E9" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                      fill={`url(#hg${i})`}
                    />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Signature */}
        <FadeIn delay={0.6}>
          <p
            className="mt-12 text-4xl"
            style={{ fontFamily: 'var(--font-script)', color: 'var(--text-muted)' }}
          >
            With all my love 💕
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────── ROOT ──────────────────────────
export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleBegin = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowLanding(false);
    setMusicStarted(true);
  };

  return (
    <main className="min-h-screen">
      <CursorGlow />

      <AnimatePresence mode="wait">
        {showLanding && <LandingPage onBegin={handleBegin} />}
      </AnimatePresence>

      {!showLanding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sticky music player */}
          <MusicPlayer
            audioSrc="/audio/all-of-me.mp3"
            autoplay={musicStarted}
            songTitle="All of Me"
            artistName="John Legend"
          />

          {/* ① Hero */}
          <HeroSection />

          {/* Love letter 1 */}
          <LoveNoteSection note={loveNotes[0]} index={0} />

          {/* Wave divider */}
          <WaveDivider color="#F5EEFF" />

          {/* ② Timeline */}
          <Timeline milestones={milestones} />

          {/* Wave divider */}
          <WaveDivider flip color="#FFE8F0" />

          {/* Love letter 2 */}
          <LoveNoteSection note={loveNotes[1]} index={1} />

          {/* Wave divider */}
          <WaveDivider color="#FFE8F0" />

          {/* ③ Photo Gallery */}
          <PhotoGallery photos={photos} />

          {/* Love letter 3 */}
          <LoveNoteSection note={loveNotes[2]} index={2} />

          {/* ④ Forever section */}
          <ForeverSection note={loveNotes[3]} />
        </motion.div>
      )}
    </main>
  );
}
