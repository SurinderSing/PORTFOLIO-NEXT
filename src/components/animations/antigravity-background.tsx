'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  baseRadius: number;
  phaseX: number;
  phaseY: number;
  freq: number;
  speedMultiplier: number;
  currentForce: number; // Smoothed transition force for trail & delay
}

export const AntigravityBackground: React.FC = () => {
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
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse coordinates (target & trailing follower with distinct delay)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 440, // Antigravity field radius
      active: false,
    };

    // Scroll inertia tracking with 2x extended delayed wave
    let lastScrollY = window.scrollY;
    let targetScrollVelocity = 0;
    let smoothScrollVelocity = 0;

    // Configuration
    const spacing = width < 768 ? 40 : 32;
    let particles: Particle[] = [];

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dynamically scale radius on larger/smaller viewports
      mouse.radius = Math.max(400, Math.min(width * 0.36, 540));

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      particles = [];

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          // Organic distribution jitter
          const jitterX = (Math.random() - 0.5) * 8;
          const jitterY = (Math.random() - 0.5) * 8;
          const x = i * spacing + jitterX;
          const y = j * spacing + jitterY;

          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            baseRadius: 1.0 + Math.random() * 0.5,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            freq: 0.0008 + Math.random() * 0.0008,
            speedMultiplier: 0.6 + Math.random() * 0.4,
            currentForce: 0,
          });
        }
      }
    };

    // Mouse event handlers - tracks live cursor position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
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

      // Accumulate scroll impulse for 2x extended delayed wave
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
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

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

      // 2x Extended delayed smooth scroll velocity wave (0.011 lerp)
      smoothScrollVelocity +=
        (targetScrollVelocity - smoothScrollVelocity) * 0.011;
      targetScrollVelocity *= 0.96;

      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === 'dark';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic organic ambient drift around fixed origin
        const harmonicX =
          Math.sin(time * p.freq + p.phaseX) * 3.5 * p.speedMultiplier;
        const harmonicY =
          Math.cos(time * p.freq + p.phaseY) * 3.5 * p.speedMultiplier;
        const naturalX = p.originX + harmonicX;
        const naturalY = p.originY + harmonicY;

        // Trailing mouse distance vectors (screen space)
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

        // Combine cursor trailing force with delayed scroll wave influence
        const scrollEffect = Math.min(
          Math.abs(smoothScrollVelocity) * 0.04,
          0.32
        );
        const combinedForce = Math.max(p.currentForce, scrollEffect);

        // 50% increased opacity baseline
        let opacity = isDark ? 0.17 : 0.2;
        let radius = p.baseRadius;
        let color = isDark ? '34, 197, 94' : '15, 23, 42'; // subtle emerald in dark, slate in light

        if (combinedForce > 0.02) {
          // Antigravity & scroll wave active state (50% increased opacity)
          opacity = Math.min(
            (isDark ? 0.27 : 0.3) + combinedForce * 0.45,
            0.75
          );
          radius = p.baseRadius + combinedForce * 0.95;

          // Color transition to vibrant cyan/emerald highlight on interaction
          if (combinedForce > 0.35) {
            color = isDark ? '56, 189, 248' : '14, 165, 233'; // Cyan highlight
          } else if (combinedForce > 0.15) {
            color = isDark ? '52, 211, 153' : '16, 185, 129'; // Emerald highlight
          }
        }

        // Soft elastic spring physics: low spring force gives particles extended delay & inertia
        const springX = (naturalX - p.x) * 0.024;
        const springY = (naturalY - p.y) * 0.016; // 2x softer vertical spring for long, fluid scroll return

        p.vx += springX;
        p.vy += springY;

        // Antigravity cursor push impulse
        if (p.currentForce > 0.01) {
          const push = p.currentForce * 2.8;
          p.vx += Math.cos(repelAngle) * push;
          p.vy += Math.sin(repelAngle) * push;
        }

        // 2x Extended delayed fluid scroll wave impulse with row-phase lag
        if (Math.abs(smoothScrollVelocity) > 0.003) {
          const normalizedY = p.originY / (height || 800);
          const rowPhase = Math.sin(normalizedY * Math.PI + time * 0.018);
          const scrollPush = smoothScrollVelocity * (0.28 + rowPhase * 0.12);
          p.vy -= scrollPush;
        }

        // Velocity damping & floating integration
        p.vx *= 0.92;
        p.vy *= 0.935;
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle dot (circle)
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 h-full w-full opacity-90 transition-opacity duration-300"
    />
  );
};

export default AntigravityBackground;
