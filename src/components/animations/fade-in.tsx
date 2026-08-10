'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * Module-level flag to track whether the app has completed its initial hydration.
 * On the very first render (SSR → hydrate), this is `false` so FadeIn plays
 * its entrance animation. After hydration, it flips to `true` and all
 * subsequent client-side navigations skip the animation (content appears instantly).
 */
let hasHydrated = false;

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: number;
  yOffset?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.4,
  className = '',
  staggerChildren = 0,
  yOffset = 30,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isInitialLoad = useRef(!hasHydrated);

  useEffect(() => {
    hasHydrated = true;
  }, []);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
        when: 'beforeChildren' as const,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      initial={isInitialLoad.current ? 'hidden' : false}
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FadeInItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export const FadeInItem: React.FC<FadeInItemProps> = ({
  children,
  className = '',
  yOffset = 30,
  duration = 0.4,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
