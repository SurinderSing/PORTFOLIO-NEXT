'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSpeed: number; // continuous slow drift speed (0.18 to 0.40 px/frame)
  angle: number; // heading direction in radians
  angleSpeed: number; // gentle organic wandering rate
  baseRadius: number;
  phase: number;
  colorPhase: number; // individual color shift phase offset
  currentForce: number; // smoothed transition force for trail & delay
}

export interface AntigravityBackgroundProps {
  className?: string;
}

export const AntigravityBackground: React.FC<AntigravityBackgroundProps> = ({
  className = 'absolute inset-0 pointer-events-none -z-10 h-full w-full opacity-90 transition-opacity duration-300',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let idleCallbackId: number;
    let isRunning = true;
    let isIntersecting = true;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse coordinates (target & trailing follower with distinct delay)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 95, // Compact localized antigravity field radius (~75px–105px)
      active: false,
    };

    // Scroll inertia tracking with 2x extended delayed wave
    let lastScrollY = window.scrollY;
    let targetScrollVelocity = 0;
    let smoothScrollVelocity = 0;

    let particles: Particle[] = [];

    const getDimensions = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        return {
          w: Math.max(parent.clientWidth || rect.width, 300),
          h: Math.max(parent.clientHeight || rect.height, 200),
        };
      }
      return {
        w: window.innerWidth,
        h: window.innerHeight,
      };
    };

    const initParticles = () => {
      const dims = getDimensions();
      width = dims.w;
      height = dims.h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dynamically scale radius to maintain a compact, localized ripple (~75px - 105px)
      mouse.radius = Math.max(75, Math.min(width * 0.08, 105));

      const spacing = width < 768 ? 38 : 30;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      particles = [];

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          // Distributed starting points with organic jitter
          const jitterX = (Math.random() - 0.5) * spacing * 0.85;
          const jitterY = (Math.random() - 0.5) * spacing * 0.85;
          const x = i * spacing + jitterX;
          const y = j * spacing + jitterY;
          const angle = Math.random() * Math.PI * 2;

          // 20% of particles scaled by +50% (1.5x) for subtle depth-of-field hierarchy
          const isAccent = Math.random() < 0.2;
          const standardRadius = 0.85 + Math.random() * 0.55;
          const baseRadius = isAccent ? standardRadius * 1.5 : standardRadius;

          particles.push({
            x,
            y,
            vx: 0,
            vy: 0,
            baseSpeed: 0.08 + Math.random() * 0.12, // continuous gentle ambient drift (0.08–0.20 px/frame)
            angle,
            angleSpeed: (Math.random() - 0.5) * 0.003, // subtle organic direction drift
            baseRadius,
            phase: Math.random() * Math.PI * 2,
            colorPhase: (x / (width || 800)) * 1.6 + Math.random() * 1.2, // spatial aurora color offset
            currentForce: 0,
          });
        }
      }
    };

    // Mouse event handlers - tracks cursor position relative to canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      // Active when cursor is reasonably within or near container bounds
      const proximityBuffer = 20;
      const inBounds =
        e.clientX >= rect.left - proximityBuffer &&
        e.clientX <= rect.right + proximityBuffer &&
        e.clientY >= rect.top - proximityBuffer &&
        e.clientY <= rect.bottom + proximityBuffer;

      if (inBounds) {
        mouse.targetX = relX;
        mouse.targetY = relY;
        mouse.active = true;
      } else {
        mouse.active = false;
        mouse.targetX = -1000;
        mouse.targetY = -1000;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Accumulate scroll impulse for extended delayed wave
      targetScrollVelocity += Math.max(Math.min(delta * 0.2, 28), -28);
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initParticles, 150);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning && isIntersecting) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    // IntersectionObserver to suspend render loop when scrolled offscreen
    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            if (!isRunning && !document.hidden) {
              isRunning = true;
              animationFrameId = requestAnimationFrame(render);
            }
          } else {
            if (isRunning) {
              isRunning = false;
              cancelAnimationFrame(animationFrameId);
            }
          }
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(canvas.parentElement || canvas);
    }

    // ResizeObserver on parent container for responsive sizing
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(canvas.parentElement);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let time = 0;

    // Render loop
    const render = () => {
      if (!isRunning) return;
      time += 1;

      // Heavy trailing lag: mouse follower glides smoothly behind the cursor
      mouse.x += (mouse.targetX - mouse.x) * 0.038;
      mouse.y += (mouse.targetY - mouse.y) * 0.038;

      // Smooth scroll velocity wave (0.011 lerp)
      smoothScrollVelocity +=
        (targetScrollVelocity - smoothScrollVelocity) * 0.011;
      targetScrollVelocity *= 0.96;

      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === 'dark';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Organic slow wandering angle
        p.angle += p.angleSpeed + Math.sin(time * 0.003 + p.phase) * 0.004;

        // 2. Base slow continuous autonomous velocity
        const driftVx = Math.cos(p.angle) * p.baseSpeed;
        const driftVy = Math.sin(p.angle) * p.baseSpeed;

        // 3. Trailing mouse distance vectors (screen space)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        let targetForce = 0;
        let repelAngle = 0;

        // Antigravity force calculation with organic exponential falloff
        if (mouse.active && dist < mouse.radius && dist > 0) {
          const normDist = 1 - dist / mouse.radius;
          targetForce = normDist * normDist * 1.35; // Power curve
          repelAngle = Math.atan2(dy, dx);
        }

        // Gradual force accumulation for distinct trailing wave effect
        p.currentForce += (targetForce - p.currentForce) * 0.055;

        // Combine cursor trailing force with subtle scroll luminescence reaction (no physical displacement)
        const scrollEffect = Math.min(
          Math.abs(smoothScrollVelocity) * 0.025,
          0.18
        );
        const combinedForce = Math.max(p.currentForce, scrollEffect);

        // Antigravity cursor push impulse
        if (p.currentForce > 0.01) {
          const push = p.currentForce * 2.4;
          p.vx += Math.cos(repelAngle) * push;
          p.vy += Math.sin(repelAngle) * push;
        }

        // Velocity damping for impulses (smoothly returns to zero, letting base continuous drift dominate)
        p.vx *= 0.91;
        p.vy *= 0.91;

        // Apply positions
        p.x += driftVx + p.vx;
        p.y += driftVy + p.vy;

        // Screen boundary wrapping (smooth wrap with margin)
        const margin = 20;
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;

        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;

        // Aurora cyber color shifting:
        // Cycles continuously between Emerald (~152°), Cyan (~195°), Blue (~220°), and Violet/Indigo (~268°)
        const colorCycle = time * 0.0018 + p.colorPhase;
        const hue = 210 + Math.sin(colorCycle) * 58;

        // Visual properties based on theme and interactive force
        let saturation: number;
        let lightness: number;
        let opacity: number;
        let radius = p.baseRadius;

        if (isDark) {
          saturation = 82;
          lightness = combinedForce > 0.02 ? 68 : 58;
          const baseOpacity = 0.22 + Math.sin(time * 0.006 + p.phase) * 0.05;
          opacity = Math.min(baseOpacity + combinedForce * 0.55, 0.85);
          radius = p.baseRadius + combinedForce * 0.85;
        } else {
          saturation = 72;
          lightness = combinedForce > 0.02 ? 34 : 42;
          const baseOpacity = 0.22 + Math.sin(time * 0.006 + p.phase) * 0.04;
          opacity = Math.min(baseOpacity + combinedForce * 0.5, 0.8);
          radius = p.baseRadius + combinedForce * 0.75;
        }

        // Draw particle dot (circle)
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness}%, ${opacity.toFixed(2)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Defer initialization to idle time so main paint is not blocked
    if ('requestIdleCallback' in window) {
      idleCallbackId = (window as any).requestIdleCallback(
        () => {
          initParticles();
          animationFrameId = requestAnimationFrame(render);
        },
        { timeout: 100 }
      );
    } else {
      setTimeout(() => {
        initParticles();
        animationFrameId = requestAnimationFrame(render);
      }, 50);
    }

    return () => {
      isRunning = false;
      if (idleCallbackId && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleCallbackId);
      }
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};

export default AntigravityBackground;
