'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '@/components/LandingPage';
import Timeline, { Milestone } from '@/components/Timeline';
import PhotoGallery, { Photo } from '@/components/PhotoGallery';
import MusicPlayer from '@/components/MusicPlayer';
import BlurReveal from '@/components/BlurReveal';
import FadeIn from '@/components/animations/FadeIn';
import FloatingElement from '@/components/animations/FloatingElement';
import { FaHeart } from 'react-icons/fa';

// Sample milestone data - customize with your own dates and memories
const milestones: Milestone[] = [
  {
    date: 'January 15, 2024',
    title: 'First Meeting',
    description: 'The day our paths crossed and my life changed forever. I remember the way you smiled and knew something special was beginning.',
    icon: 'heart',
  },
  {
    date: 'February 14, 2024',
    title: 'First Date',
    description: 'Our magical first date under the stars. Every moment with you felt like a dream come true.',
    icon: 'calendar',
  },
  {
    date: 'May 20, 2024',
    title: 'Our First Trip',
    description: 'Adventures together, creating memories that would last forever. Exploring the world with you by my side.',
    icon: 'gift',
  },
  {
    date: 'December 25, 2024',
    title: 'A Special Promise',
    description: 'The day we promised to always be there for each other, through thick and thin.',
    icon: 'ring',
  },
];

// Sample photo data - replace with your own photos
// Add your photos to /public/images/ folder
const photos: Photo[] = [
  {
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600',
    alt: 'Beautiful moment together',
    caption: 'Our first adventure',
  },
  {
    src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600',
    alt: 'Sunset memories',
    caption: 'Watching the sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607159-d9e8d3a28b50?w=600',
    alt: 'Happy times',
    caption: 'Laughter and joy',
  },
  {
    src: 'https://images.unsplash.com/photo-1514846326710-096e4a8035e0?w=600',
    alt: 'Special celebration',
    caption: 'Celebrating us',
  },
  {
    src: 'https://images.unsplash.com/photo-1476900164809-ff19b8ae5968?w=600',
    alt: 'Nature walk',
    caption: 'Walking together',
  },
  {
    src: 'https://images.unsplash.com/photo-1522663107331-e4d7e5e5c11d?w=600',
    alt: 'Cozy moments',
    caption: 'Comfortable silence',
  },
  {
    src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600',
    alt: 'City adventures',
    caption: 'Urban exploring',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607159-7b4f90e9e120?w=600',
    alt: 'Sweet memories',
    caption: 'Forever in my heart',
  },
];

// Love notes content - customize these with your own messages
const loveNotes = [
  "Every day with you is a new adventure. Thank you for being my partner in everything.",
  "You make ordinary moments extraordinary just by being there.",
  "I fall in love with you more and more each day.",
  "You are my today and all of my tomorrows.",
];

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleBegin = () => {
    setShowLanding(false);
    setMusicStarted(true);
  };

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {showLanding && (
          <LandingPage onBegin={handleBegin} />
        )}
      </AnimatePresence>

      {!showLanding && (
        <>
          {/* Music Player - shows after landing page */}
          {/* Using a beautiful royalty-free romantic piano piece */}
          <MusicPlayer 
            audioSrc="https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" 
            autoplay={musicStarted}
          />

          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <FloatingElement duration={4} yOffset={15} className="absolute top-20 left-10 opacity-50">
              <FaHeart className="text-soft-rose text-4xl" />
            </FloatingElement>
            <FloatingElement duration={5} yOffset={20} className="absolute top-40 right-20 opacity-50">
              <FaHeart className="text-rose-gold text-3xl" />
            </FloatingElement>
            <FloatingElement duration={6} yOffset={12} className="absolute bottom-40 left-20 opacity-50">
              <FaHeart className="text-pale-purple text-5xl" />
            </FloatingElement>

            <FadeIn>
              <h1 
                style={{ fontFamily: 'var(--font-heading)' }}
                className="text-6xl md:text-8xl font-bold text-center text-text-dark mb-6"
              >
                Our Love Story
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p 
                style={{ fontFamily: 'var(--font-script)' }}
                className="text-3xl md:text-4xl text-center text-text-muted mb-8 max-w-2xl"
              >
                A celebration of our journey together
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-3xl border border-rose-gold/20">
                <p 
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-xl text-text-dark text-center leading-relaxed"
                >
                  To my dearest partner, every moment with you has been a treasure. 
                  This website is a small token of my love, celebrating all the beautiful 
                  memories we&apos;ve created together. Here&apos;s to many more adventures ahead! ❤️
                </p>
              </div>
            </FadeIn>
          </section>

          {/* Hidden Love Note #1 */}
          <div className="max-w-2xl mx-auto px-4 mb-16">
            <BlurReveal hint="💕 A secret message awaits...">
              <p 
                style={{ fontFamily: 'var(--font-script)' }}
                className="text-2xl text-text-dark text-center"
              >
                {loveNotes[0]}
              </p>
            </BlurReveal>
          </div>

          {/* Timeline Section */}
          <Timeline milestones={milestones} />

          {/* Hidden Love Note #2 */}
          <div className="max-w-2xl mx-auto px-4 my-16">
            <BlurReveal hint="✨ Click to reveal something special">
              <p 
                style={{ fontFamily: 'var(--font-script)' }}
                className="text-2xl text-text-dark text-center"
              >
                {loveNotes[1]}
              </p>
            </BlurReveal>
          </div>

          {/* Photo Gallery Section */}
          <PhotoGallery photos={photos} />

          {/* Hidden Love Note #3 */}
          <div className="max-w-2xl mx-auto px-4 my-16">
            <BlurReveal hint="💝 One more secret...">
              <p 
                style={{ fontFamily: 'var(--font-script)' }}
                className="text-2xl text-text-dark text-center"
              >
                {loveNotes[2]}
              </p>
            </BlurReveal>
          </div>

          {/* Final Message Section */}
          <section className="py-32 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <h2 
                  style={{ fontFamily: 'var(--font-heading)' }}
                  className="text-5xl md:text-6xl font-bold text-text-dark mb-8"
                >
                  Forever & Always
                </h2>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <div className="bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-rose-gold/20">
                  <p 
                    style={{ fontFamily: 'var(--font-script)' }}
                    className="text-3xl text-text-dark mb-6"
                  >
                    {loveNotes[3]}
                  </p>
                  <div className="flex justify-center gap-2 text-soft-rose text-3xl mt-8">
                    <FloatingElement duration={2} yOffset={8}>
                      <FaHeart />
                    </FloatingElement>
                    <FloatingElement duration={2.5} yOffset={8}>
                      <FaHeart />
                    </FloatingElement>
                    <FloatingElement duration={3} yOffset={8}>
                      <FaHeart />
                    </FloatingElement>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
