'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface LoveLetterProps {
    children: ReactNode;
    hint?: string;
    cardIndex?: number;
}

export default function LoveLetter({
    children,
    hint = 'A message for you...',
    cardIndex = 0,
}: LoveLetterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const sealColors = [
        ['#F2A7B8', '#C9858A'],
        ['#C9A9E9', '#9B72CF'],
        ['#FFD6A5', '#E8A96B'],
    ];
    const [sealTop, sealBottom] = sealColors[cardIndex % sealColors.length];

    return (
        <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    // Envelope closed state
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="cursor-pointer select-none"
                        onClick={() => setIsOpen(true)}
                    >
                        <motion.div
                            whileHover={{ y: -8, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            {/* Envelope body */}
                            <div
                                className="relative w-72 md:w-80"
                                style={{
                                    background: 'linear-gradient(145deg, #FFF5F8, #FFE8F2)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(201, 133, 138, 0.25)',
                                    boxShadow: '0 8px 32px rgba(180, 100, 120, 0.15), 0 2px 8px rgba(180, 100, 120, 0.08)',
                                    padding: '0',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Envelope inner diagonal lines */}
                                <svg
                                    width="100%"
                                    viewBox="0 0 320 220"
                                    className="block"
                                    style={{ height: '150px' }}
                                >
                                    {/* Envelope back */}
                                    <rect width="320" height="220" fill="url(#envGrad)" rx="4" />
                                    <defs>
                                        <linearGradient id="envGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FFF0F5" />
                                            <stop offset="100%" stopColor="#FFE0EC" />
                                        </linearGradient>
                                    </defs>
                                    {/* Bottom-left triangle */}
                                    <polygon
                                        points="0,220 160,120 0,0"
                                        fill="rgba(201, 133, 138, 0.08)"
                                        stroke="rgba(201, 133, 138, 0.15)"
                                        strokeWidth="0.5"
                                    />
                                    {/* Bottom-right triangle */}
                                    <polygon
                                        points="320,220 160,120 320,0"
                                        fill="rgba(201, 133, 138, 0.06)"
                                        stroke="rgba(201, 133, 138, 0.15)"
                                        strokeWidth="0.5"
                                    />
                                    {/* Bottom flap */}
                                    <polygon
                                        points="0,220 160,120 320,220"
                                        fill="rgba(201, 133, 138, 0.12)"
                                        stroke="rgba(201, 133, 138, 0.2)"
                                        strokeWidth="0.5"
                                    />
                                    {/* Top flap (closed lid) */}
                                    <polygon
                                        points="0,0 160,100 320,0"
                                        fill="rgba(201, 133, 138, 0.1)"
                                        stroke="rgba(201, 133, 138, 0.2)"
                                        strokeWidth="0.5"
                                    />

                                    {/* Wax seal */}
                                    <circle cx="160" cy="125" r="22" fill={`url(#sealGrad${cardIndex})`} />
                                    <defs>
                                        <radialGradient id={`sealGrad${cardIndex}`} cx="40%" cy="35%">
                                            <stop offset="0%" stopColor={sealTop} />
                                            <stop offset="100%" stopColor={sealBottom} />
                                        </radialGradient>
                                    </defs>
                                    {/* Heart on seal */}
                                    <g transform="translate(150, 115) scale(0.7)">
                                        <path
                                            d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                                            fill="rgba(255,255,255,0.85)"
                                        />
                                    </g>
                                </svg>

                                {/* Hint text */}
                                <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center">
                                    <motion.p
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-xs font-medium"
                                        style={{ color: 'var(--rose-gold)', fontFamily: 'var(--font-body)' }}
                                    >
                                        {hint}
                                    </motion.p>
                                    <motion.p
                                        animate={{ y: [0, 3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-xs mt-0.5"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        Click to open ↡
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    // Letter revealed state
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0, y: -30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-72 md:w-96"
                    >
                        <div
                            className="relative p-8 rounded-lg"
                            style={{
                                background: 'linear-gradient(145deg, #FFFCFE, #FFF5F8)',
                                border: '1px solid rgba(201, 133, 138, 0.2)',
                                boxShadow: '0 15px 50px rgba(180, 100, 120, 0.15), 0 5px 15px rgba(180, 100, 120, 0.08)',
                            }}
                        >
                            {/* Decorative corner flourishes */}
                            <div className="absolute top-3 left-3 text-rose-300 text-sm opacity-40">✦</div>
                            <div className="absolute top-3 right-3 text-rose-300 text-sm opacity-40">✦</div>
                            <div className="absolute bottom-3 left-3 text-rose-300 text-sm opacity-40">✦</div>
                            <div className="absolute bottom-3 right-3 text-rose-300 text-sm opacity-40">✦</div>

                            {/* Letter lines decoration */}
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute left-8 right-8"
                                    style={{
                                        top: `${30 + i * 18}%`,
                                        height: '1px',
                                        background: 'rgba(201, 133, 138, 0.07)',
                                    }}
                                />
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="relative z-10 text-center"
                            >
                                {children}
                            </motion.div>

                            {/* Close button */}
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                className="mt-5 w-full text-xs flex items-center justify-center gap-1 py-2 rounded-full transition-colors"
                                style={{
                                    color: 'var(--text-muted)',
                                    background: 'rgba(201, 133, 138, 0.08)',
                                    fontFamily: 'var(--font-body)',
                                }}
                                whileHover={{ background: 'rgba(201, 133, 138, 0.15)' }}
                            >
                                Close letter ↑
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
