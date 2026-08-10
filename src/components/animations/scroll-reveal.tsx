'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * Module-level hydration flag shared with FadeIn.
 * After the initial page load, all ScrollReveal components
 * skip their entrance animation on client-side navigations.
 */
let hasHydrated = false;

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
  staggerChildren?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.4,
  className = '',
  yOffset = 30,
  staggerChildren = 0,
  once = true,
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
      whileInView="visible"
      viewport={{ once, margin: '-10px', amount: 0.1 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
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
