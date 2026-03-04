'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const AnimatedDivider: React.FC<{
  className?: string;
  delay?: number;
}> = ({ className = '', delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className={`h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8 ${className}`}
    />
  );
};
