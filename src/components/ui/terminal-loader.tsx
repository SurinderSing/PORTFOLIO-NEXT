'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLoaderProps {
  onComplete?: () => void;
}

export default function TerminalLoader({ onComplete }: TerminalLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleFinish = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 280);
  }, [onComplete]);

  // Fast-forward / Skip on click or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Progress counter animation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Snappy cyber progression
      const increment = Math.random() * 8 + 6;
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 180);
      } else {
        setProgress(Math.floor(current));
      }
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  // Dynamic status text based on progression stage
  const getStatusText = (pct: number) => {
    if (pct < 25) return 'INITIALIZING SYSTEM CORE...';
    if (pct < 55) return 'LOADING FRONTEND & FULL-STACK EXPERTISE...';
    if (pct < 85) return 'CONNECTING TO INDERDEVENGINE SERVERS...';
    if (pct < 100) return 'OPTIMIZING ASSETS & RENDERING DOM...';
    return 'SYSTEM READY // ACCESS GRANTED';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="terminal-loader"
          exit={{
            opacity: 0,
            scale: 1.01,
            filter: 'blur(3px)',
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={handleFinish}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background/95 text-foreground font-mono select-none cursor-pointer overflow-hidden px-4 backdrop-blur-md touch-none overscroll-none"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Cyber Scanline Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Ambient Glowing Orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Terminal Container */}
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card/95 shadow-2xl dark:border-emerald-500/25 dark:bg-[#060c18]/95 dark:shadow-[0_0_50px_rgba(0,255,204,0.08)] backdrop-blur-xl overflow-hidden p-5 sm:p-7">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between border-b border-border dark:border-emerald-500/20 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>
              <div className="flex items-center gap-2 bg-primary/10 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-primary/20 dark:border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-xs tracking-wider text-primary dark:text-emerald-400 font-bold uppercase">
                  INDER_DEV_ENGINE // v2.4
                </span>
              </div>
            </div>

            {/* Code Lines with Theme-Responsive Syntax Highlighting */}
            <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed mb-6 font-mono">
              <div className="text-muted-foreground flex items-center gap-2">
                <span className="text-primary font-semibold">$</span>
                <span>{'// initializing surinder-portfolio.exe'}</span>
              </div>

              <div>
                <span className="text-emerald-600 dark:text-purple-400 font-semibold">
                  import
                </span>{' '}
                <span className="text-foreground dark:text-white font-medium">
                  {'{ FrontendEngineer }'}
                </span>{' '}
                <span className="text-emerald-600 dark:text-purple-400 font-semibold">
                  from
                </span>{' '}
                <span className="text-teal-600 dark:text-emerald-300 font-medium">
                  {"'./surinder-singh'"}
                </span>
                ;
              </div>

              <div className="text-muted-foreground">
                {'// loading frontend & full-stack expertise...'}
              </div>

              <div>
                <span className="text-emerald-600 dark:text-purple-400 font-semibold">
                  const
                </span>{' '}
                <span className="text-sky-600 dark:text-sky-300 font-medium">
                  skills
                </span>{' '}
                ={' '}
                <span className="text-emerald-600 dark:text-amber-400 font-semibold">
                  await
                </span>{' '}
                <span className="text-amber-600 dark:text-yellow-300 font-semibold">
                  loadStack
                </span>
                ([
                <span className="text-teal-600 dark:text-emerald-300 font-medium">
                  {"'React'"}
                </span>
                ,{' '}
                <span className="text-teal-600 dark:text-emerald-300 font-medium">
                  {"'Next.js'"}
                </span>
                ,{' '}
                <span className="text-teal-600 dark:text-emerald-300 font-medium">
                  {"'TypeScript'"}
                </span>
                ,{' '}
                <span className="text-teal-600 dark:text-emerald-300 font-medium">
                  {"'AI'"}
                </span>
                ]);
              </div>

              <div className="text-muted-foreground">
                {'// connecting to InderDevEngine servers...'}
              </div>

              <div>
                <span className="text-emerald-600 dark:text-purple-400 font-semibold">
                  const
                </span>{' '}
                <span className="text-sky-600 dark:text-sky-300 font-medium">
                  portfolio
                </span>{' '}
                ={' '}
                <span className="text-emerald-600 dark:text-amber-400 font-semibold">
                  await
                </span>{' '}
                <span className="text-amber-600 dark:text-yellow-300 font-semibold">
                  initialize
                </span>
                ({'{ '}
                <span className="text-foreground/80 dark:text-emerald-300 font-medium">
                  status
                </span>
                :{' '}
                <span className="text-teal-600 dark:text-emerald-400 font-medium">
                  {"'ready'"}
                </span>
                {' }'});
              </div>
            </div>

            {/* Neon Progress Bar & Percentage */}
            <div className="space-y-2 pt-2 border-t border-border dark:border-emerald-500/10">
              <div className="flex items-center justify-between text-[11px] sm:text-xs">
                <span className="text-primary dark:text-emerald-400/90 font-medium tracking-wider truncate mr-2">
                  {getStatusText(progress)}
                </span>
                <span className="text-primary dark:text-emerald-300 font-bold tabular-nums">
                  [{progress}%]
                </span>
              </div>

              {/* Progress Track */}
              <div className="h-1.5 w-full bg-muted dark:bg-[#0a1a28] rounded-full overflow-hidden relative border border-border/40 dark:border-emerald-500/20">
                <div
                  className="h-full bg-gradient-to-r from-primary via-emerald-500 to-teal-400 dark:from-emerald-500 dark:via-teal-400 dark:to-cyan-400 transition-all duration-75 ease-out rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] dark:shadow-[0_0_12px_rgba(52,211,153,0.9),0_0_20px_rgba(45,212,191,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Quick Skip Hint */}
            <div className="mt-4 pt-3 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/60 dark:border-slate-800/40">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary dark:bg-emerald-500 animate-pulse" />
                PRESS ESC OR CLICK ANYWHERE TO SKIP
              </span>
              <span className="font-semibold text-primary/80 dark:text-emerald-500/70">
                SURINDER.DEV
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
