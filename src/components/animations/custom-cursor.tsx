'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'pointer' | 'text' | 'input' | 'drag';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for outer ring
  const springConfig = { damping: 28, stiffness: 420, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rafRef = useRef<number | null>(null);

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

    let pendingTarget: HTMLElement | null = null;

    const evaluateTarget = () => {
      if (!pendingTarget) {
        setVariant('default');
        return;
      }

      // Check for draggable elements
      if (
        pendingTarget.closest(
          '[draggable="true"], .cursor-grab, [data-cursor="drag"]'
        )
      ) {
        setVariant('drag');
        return;
      }

      // Check for inputs and textareas
      if (pendingTarget.closest('input, textarea')) {
        setVariant('input');
        return;
      }

      // Check for interactive clickables (links, buttons, controls)
      if (
        pendingTarget.closest(
          'a, button, [role="button"], label, select, summary, [data-cursor="pointer"]'
        )
      ) {
        setVariant('pointer');
        return;
      }

      // Check for text content (paragraphs, headings, lists, code)
      if (
        pendingTarget.closest(
          'p, h1, h2, h3, h4, h5, h6, span, blockquote, code, pre, article, [data-cursor="text"]'
        )
      ) {
        setVariant('text');
        return;
      }

      setVariant('default');
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      pendingTarget = e.target as HTMLElement | null;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          evaluateTarget();
          rafRef.current = null;
        });
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
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

  // Outer ring animation configurations per variant
  const getOuterStyles = () => {
    switch (variant) {
      case 'pointer':
        return {
          width: 48,
          height: 48,
          borderRadius: 9999,
          borderWidth: 1.5,
          borderColor: 'rgba(16, 185, 129, 0.85)',
          backgroundColor: 'rgba(16, 185, 129, 0.18)',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
        };
      case 'text':
        return {
          width: 14,
          height: 28,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: 'rgba(16, 185, 129, 0.5)',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.15)',
        };
      case 'input':
        return {
          width: 22,
          height: 32,
          borderRadius: 8,
          borderWidth: 1.5,
          borderColor: 'rgba(16, 185, 129, 0.75)',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          boxShadow: '0 0 14px rgba(16, 185, 129, 0.25)',
        };
      case 'drag':
        return {
          width: 44,
          height: 44,
          borderRadius: 9999,
          borderWidth: 2,
          borderColor: 'rgba(16, 185, 129, 0.9)',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          boxShadow: '0 0 18px rgba(16, 185, 129, 0.3)',
        };
      case 'default':
      default:
        return {
          width: 32,
          height: 32,
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: 'rgba(16, 185, 129, 0.4)',
          backgroundColor: 'rgba(16, 185, 129, 0.04)',
          boxShadow: '0 0 12px rgba(16, 185, 129, 0.15)',
        };
    }
  };

  // Inner dot animation configurations per variant
  const getInnerStyles = () => {
    switch (variant) {
      case 'pointer':
        return {
          width: 8,
          height: 8,
          borderRadius: 9999,
          scale: isClicked ? 0.6 : 1.4,
          opacity: isVisible ? 1 : 0,
        };
      case 'text':
        return {
          width: 2.5,
          height: 20,
          borderRadius: 4,
          scale: isClicked ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        };
      case 'input':
        return {
          width: 2.5,
          height: 22,
          borderRadius: 4,
          scale: isClicked ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        };
      case 'drag':
        return {
          width: 6,
          height: 6,
          borderRadius: 9999,
          scale: isClicked ? 0.7 : 1.2,
          opacity: isVisible ? 1 : 0,
        };
      case 'default':
      default:
        return {
          width: 7,
          height: 7,
          borderRadius: 9999,
          scale: isClicked ? 0.6 : 1,
          opacity: isVisible ? 1 : 0,
        };
    }
  };

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
          ...getOuterStyles(),
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

      {/* Inner Precision Dot / Indicator */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 999999,
        }}
        animate={getInnerStyles()}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 480,
        }}
        className="fixed top-0 left-0 bg-primary shadow-[0_0_10px_rgba(16,185,129,0.9)] pointer-events-none"
      />
    </div>
  );
}
