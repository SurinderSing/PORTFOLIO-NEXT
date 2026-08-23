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
  angle: number;
  baseLength: number;
  baseAngle: number;
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
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse coordinates (target & smoothly lerped current)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 480, // Expansive Antigravity effect radius
      active: false,
    };

    // Scroll tracking with smooth fluid inertia
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Configuration
    const spacing = 32; // Grid spacing in px
    let particles: Particle[] = [];

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dynamically scale radius on larger/smaller viewports
      mouse.radius = Math.max(440, Math.min(width * 0.4, 580));

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      particles = [];

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          // Organic distribution jitter
          const jitterX = (Math.random() - 0.5) * 10;
          const jitterY = (Math.random() - 0.5) * 10;
          const x = i * spacing + jitterX;
          const y = j * spacing + jitterY;
          const randomAngle = Math.random() * Math.PI * 2;

          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            angle: randomAngle,
            baseAngle: randomAngle,
            baseLength: 2.2 + Math.random() * 2.5,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            freq: 0.0008 + Math.random() * 0.0008,
            speedMultiplier: 0.6 + Math.random() * 0.4,
            currentForce: 0,
          });
        }
      }
    };

    initParticles();

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Impart responsive scroll inertia lag
      if (mouse.active) {
        mouse.y -= delta * 0.45;
      }

      // Gentle scroll impulse
      scrollVelocity += Math.max(Math.min(delta * 0.04, 7), -7);
    };

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;

    // Render loop
    const render = (timestamp: number) => {
      time = timestamp;
      ctx.clearRect(0, 0, width, height);

      // Smooth, responsive cursor tracking (calibrated follow-through speed)
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.048;
        mouse.y += (mouse.targetY - mouse.y) * 0.048;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.025;
        mouse.y += (-1000 - mouse.y) * 0.025;
      }

      // Smooth exponential decay on scroll inertia
      scrollVelocity *= 0.95;
      const absScrollVel = Math.abs(scrollVelocity);

      const isDark =
        document.documentElement.classList.contains('dark') ||
        resolvedTheme === 'dark';

      const maxDist = mouse.radius;
      const maxDistSq = maxDist * maxDist;

      // Draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Ambient continuous floating motion (smooth ease when idle)
        const floatX =
          Math.sin(time * p.freq + p.phaseX) * 3.5 * p.speedMultiplier;
        const floatY =
          Math.cos(time * p.freq * 0.85 + p.phaseY) * 3.5 * p.speedMultiplier;
        const targetOriginX = p.originX + floatX;
        const targetOriginY = p.originY + floatY;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;

        // Ambient undulating angle wave across the field
        const ambientWave =
          Math.sin(time * 0.001 + p.originX * 0.003 + p.originY * 0.003) * 0.3;
        let targetAngle = p.baseAngle + ambientWave;
        let targetForce = 0;

        // 2. Antigravity Mouse Forcefield Interaction with Smoothstep Curve
        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const rawForce = 1 - dist / maxDist; // 0 (edge) -> 1 (center)

          // Smoothstep Hermite curve: 3x^2 - 2x^3 for soft ease-in-out perimeter
          targetForce = rawForce * rawForce * (3 - 2 * rawForce);

          // Living flutter micro-oscillation around cursor
          const livingFlutter =
            Math.sin(time * 0.0025 + p.phaseX) * 0.15 * targetForce;
          targetAngle = Math.atan2(dy, dx) + Math.PI + livingFlutter;
        }

        // 3. Calibrated Transition Delay on Forcefield
        p.currentForce += (targetForce - p.currentForce) * 0.065;
        const easeForce = p.currentForce;

        // Silky spring return force to origin
        const returnForceX = (targetOriginX - p.x) * 0.05;
        const returnForceY = (targetOriginY - p.y) * 0.05;
        p.vx += returnForceX;
        p.vy += returnForceY;

        // Scroll reaction: gentle tilt and subtle float
        if (absScrollVel > 0.05) {
          p.vy -= scrollVelocity * 0.02;
          const scrollTilt = Math.sign(scrollVelocity) * 0.15;
          targetAngle += scrollTilt;
        }

        // Apply magnetic push based on delayed force
        if (easeForce > 0.005) {
          const pushAngle = Math.atan2(dy, dx);
          const pushForce = easeForce * 16;
          p.vx -= Math.cos(pushAngle) * pushForce * 0.03;
          p.vy -= Math.sin(pushAngle) * pushForce * 0.03;
        }

        // Dynamic length, opacity, and theme color transition (lightened further)
        const scrollStretch =
          absScrollVel > 0.05 ? Math.min(absScrollVel * 0.15, 4.0) : 0;
        const length = p.baseLength + easeForce * 7.5 + scrollStretch;

        const opacity = isDark
          ? 0.045 + easeForce * 0.32
          : 0.03 + easeForce * 0.32;

        // Brand Emerald Green: #34D399 (dark) / #16A34A (light)
        const color = isDark ? '52, 211, 153' : '22, 163, 74';

        // Soft fluid friction
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        // Calibrated liquid angle interpolation
        let angleDiff = targetAngle - p.angle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        p.angle += angleDiff * 0.075;

        // Draw particle dash
        const halfLen = length / 2;
        const cos = Math.cos(p.angle);
        const sin = Math.sin(p.angle);

        ctx.beginPath();
        ctx.moveTo(p.x - cos * halfLen, p.y - sin * halfLen);
        ctx.lineTo(p.x + cos * halfLen, p.y + sin * halfLen);
        ctx.strokeStyle = `rgba(${color}, ${opacity})`;
        ctx.lineWidth = 1.3;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
