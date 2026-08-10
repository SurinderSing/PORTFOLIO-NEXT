'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

let hasHydrated = false;

export const AnimatedDivider: React.FC<{
  className?: string;
  delay?: number;
}> = ({ className = '', delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const isInitialLoad = useRef(!hasHydrated);

  useEffect(() => {
    hasHydrated = true;
  }, []);

  return (
    <motion.div
      initial={
        isInitialLoad.current
          ? { opacity: 0, scaleX: shouldReduceMotion ? 1 : 0 }
          : false
      }
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-10px', amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={`h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent ${className}`}
    />
  );
};
