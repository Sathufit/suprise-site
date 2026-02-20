'use client';

import { Howl } from 'howler';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  audioSrc: string;
  autoplay?: boolean;
  songTitle?: string;
  artistName?: string;
}

const BAR_COUNT = 18;

export default function MusicPlayer({
  audioSrc,
  autoplay = false,
  songTitle = 'Slow Motion',
  artistName = 'Bensound',
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const [barHeights, setBarHeights] = useState<number[]>(
    Array.from({ length: BAR_COUNT }, () => 0.2)
  );
  const animFrameRef = useRef<number>(0);

  // Animate waveform bars when playing
  useEffect(() => {
    if (!isPlaying) {
      setBarHeights(Array.from({ length: BAR_COUNT }, () => 0.15));
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const animate = () => {
      setBarHeights(
        Array.from({ length: BAR_COUNT }, (_, i) => {
          const t = Date.now() / 1000;
          const base = Math.sin(t * 2 + i * 0.5) * 0.25 + 0.35;
          const secondary = Math.sin(t * 3.7 + i * 0.8) * 0.15;
          const tertiary = Math.sin(t * 5.1 + i * 1.3) * 0.1;
          return Math.max(0.1, Math.min(1, base + secondary + tertiary));
        })
      );
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying]);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [audioSrc],
      loop: true,
      volume: volume,
      html5: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
      onloaderror: (_id, error) => console.error('Music load error:', error),
      onplayerror: (_id, _error) => {
        soundRef.current?.once('unlock', () => soundRef.current?.play());
      },
    });

    if (autoplay) {
      setTimeout(() => soundRef.current?.play(), 200);
    }

    return () => { soundRef.current?.unload(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      soundRef.current?.mute(!prev);
      return !prev;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: 30 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          // Expanded view
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-5 w-64"
            style={{ border: '1px solid rgba(201, 133, 138, 0.2)' }}
          >
            {/* Song info */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p
                  className="font-semibold text-sm leading-tight"
                  style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)' }}
                >
                  {songTitle}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {artistName}
                </p>
              </div>
              {/* Collapse button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs rounded-full px-2 py-1 transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            {/* Waveform visualizer */}
            <div className="flex items-end justify-center gap-0.5 h-10 mb-4">
              {barHeights.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${h * 100}%` }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="w-1 rounded-full"
                  style={{
                    background: isPlaying
                      ? `linear-gradient(to top, var(--rose-gold), var(--soft-rose))`
                      : 'rgba(201, 133, 138, 0.3)',
                    minHeight: '4px',
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--soft-rose), var(--rose-gold))' }}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '2px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>

              {/* Volume section */}
              <div className="flex items-center gap-2 flex-1">
                <button onClick={toggleMute} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {isMuted || volume === 0 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    if (isMuted && v > 0) setIsMuted(false);
                  }}
                  className="volume-slider flex-1"
                  style={{
                    background: `linear-gradient(to right, var(--rose-gold) ${(isMuted ? 0 : volume) * 100}%, rgba(201, 133, 138, 0.2) ${(isMuted ? 0 : volume) * 100}%)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          // Collapsed pill
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsExpanded(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsExpanded(true); }}
            className="glass-card rounded-full px-4 py-3 flex items-center gap-2.5 cursor-pointer group"
            style={{ border: '1px solid rgba(201, 133, 138, 0.2)' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Mini play button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--soft-rose), var(--rose-gold))' }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '1px' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {/* Mini waveform */}
            <div className="flex items-end gap-0.5 h-5">
              {barHeights.slice(0, 8).map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${h * 100}%` }}
                  transition={{ duration: 0.15 }}
                  className="w-0.5 rounded-full"
                  style={{
                    background: isPlaying
                      ? `linear-gradient(to top, var(--rose-gold), var(--soft-rose))`
                      : 'rgba(201, 133, 138, 0.3)',
                    minHeight: '3px',
                  }}
                />
              ))}
            </div>

            {/* Song name */}
            <span className="text-xs font-medium hidden sm:block" style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)' }}>
              {songTitle}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
