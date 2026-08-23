'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import FailedImage from '@/assets/images/failed-image.jpg';
import { Loader2 } from 'lucide-react';

interface LivePreviewProps {
  previewUrl: string;
  title: string;
  fallbackImage?: StaticImageData | string;
  timeoutMs?: number;
}

export default function LivePreview({
  previewUrl,
  title,
  fallbackImage = FailedImage,
  timeoutMs = 6000,
}: LivePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFrameable, setIsFrameable] = useState<boolean | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);
    setIsFrameable(null);

    // Pre-check if target URL allows iframe embedding (checks X-Frame-Options & CSP)
    const checkFrameability = async () => {
      try {
        const res = await fetch(
          `/api/preview-check?url=${encodeURIComponent(previewUrl)}`
        );
        const data = await res.json();

        if (!isMounted) return;

        if (!data.frameable) {
          setIsFrameable(false);
          setHasError(true);
          setIsLoading(false);
          return;
        }

        setIsFrameable(true);

        // Timeout fallback if iframe takes too long to load
        timerRef.current = setTimeout(() => {
          if (isMounted) {
            setIsLoading((loading) => {
              if (loading) {
                setHasError(true);
                return false;
              }
              return loading;
            });
          }
        }, timeoutMs);
      } catch {
        if (isMounted) {
          setIsFrameable(false);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    checkFrameability();

    return () => {
      isMounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [previewUrl, timeoutMs]);

  const handleIframeLoad = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLoading(false);
  };

  const handleIframeError = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLoading(false);
    setHasError(true);
  };

  // If the iframe failed to load or timed out, gracefully render the fallback image
  if (hasError) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-muted">
        <Image
          src={fallbackImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover"
          priority={false}
        />
        <div className="absolute bottom-2 left-2 z-30 bg-black/90 text-[10px] text-white/90 px-2 py-0.5 rounded font-mono border border-white/10 shadow-xs">
          Preview unavailable • Static view
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-tertiary-2 group">
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card text-muted-foreground transition-opacity duration-300">
          <Loader2 className="w-5 h-5 animate-spin text-primary mb-1.5" />
          <span className="text-[11px] font-medium tracking-wide">
            Loading preview...
          </span>
        </div>
      )}

      {/* Embedded Sandboxed Iframe with scaled responsive viewport */}
      {isFrameable && (
        <div className="w-full h-full overflow-hidden relative">
          <iframe
            src={previewUrl}
            title={`Live preview of ${title}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className={`w-[200%] h-[200%] transform scale-50 origin-top-left border-0 transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ pointerEvents: 'none' }}
          />
        </div>
      )}

      {/* Non-interactive overlay to intercept clicks and route cleanly to project URL */}
      <div
        className="absolute inset-0 z-20 cursor-pointer bg-transparent"
        aria-hidden="true"
      />

      {/* Live Badge */}
      {!isLoading && !hasError && (
        <div className="absolute bottom-2 left-2 z-30 flex items-center gap-1.5 bg-black/90 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono font-medium border border-emerald-500/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Preview
        </div>
      )}
    </div>
  );
}
