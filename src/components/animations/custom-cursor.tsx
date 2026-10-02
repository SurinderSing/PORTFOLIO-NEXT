'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for outer ring
  const springConfig = { damping: 28, stiffness: 420, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has touch capability (mobile/tablet)
    const hasTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (hasTouch) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);
    document.body.classList.add('custom-cursor-none');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsPointer(false);
        return;
      }

      // Check exclusively for clickable interactive elements
      const isClickable = Boolean(
        target.closest(
          'a, button, [role="button"], label, select, summary, [data-cursor="pointer"]'
        )
      );
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsPointer(false);
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-none');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <div
      style={{ zIndex: 999999 }}
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* Outer Spring Follower Halo */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 999999,
        }}
        animate={{
          width: isPointer ? 29 : 20,
          height: isPointer ? 29 : 20,
          borderRadius: 9999,
          borderWidth: isPointer ? 1.5 : 1,
          borderColor: isPointer
            ? 'rgba(16, 185, 129, 0.85)'
            : 'rgba(16, 185, 129, 0.4)',
          backgroundColor: isPointer
            ? 'rgba(16, 185, 129, 0.18)'
            : 'rgba(16, 185, 129, 0.04)',
          boxShadow: isPointer
            ? '0 0 12px rgba(16, 185, 129, 0.35)'
            : '0 0 8px rgba(16, 185, 129, 0.15)',
          scale: isClicked ? 0.85 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 380,
          mass: 0.35,
        }}
        className="fixed top-0 left-0 border backdrop-blur-xs pointer-events-none"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 999999,
        }}
        animate={{
          width: isPointer ? 5 : 4.5,
          height: isPointer ? 5 : 4.5,
          borderRadius: 9999,
          scale: isClicked ? 0.6 : isPointer ? 1.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 480,
        }}
        className="fixed top-0 left-0 bg-primary shadow-[0_0_6px_rgba(16,185,129,0.9)] pointer-events-none"
      />
    </div>
  );
}
