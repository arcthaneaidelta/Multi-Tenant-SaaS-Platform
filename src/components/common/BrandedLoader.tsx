import React, { useEffect, useState } from 'react';

interface BrandedLoaderProps {
  onFinish?: () => void;
}

export const BrandedLoader: React.FC<BrandedLoaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onFinish) onFinish();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 12;
      });
    }, 90);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 350);
    }, 1150);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F8F6] transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        {/* Logo Mark */}
        <div className="w-14 h-14 rounded-2xl bg-[#304F40] shadow-sm flex items-center justify-center mb-6 relative overflow-hidden group">
          <svg className="w-7 h-7 text-[#E7EEE8]" viewBox="0 0 32 32" fill="none">
            <path d="M8 10L16 23L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="12" r="2.2" fill="#B89A68" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-bold tracking-tight text-[#222B28] font-display mb-1.5">
          VELORA
        </h1>

        {/* Tagline */}
        <p className="text-xs uppercase tracking-[0.25em] text-[#78817B] font-medium mb-8">
          One platform. Every possibility.
        </p>

        {/* Thin progress bar */}
        <div className="w-48 h-[2px] bg-[#E6EAE6] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#557C68] transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        <span className="text-[10px] text-[#78817B]/60 font-mono mt-3">
          Initializing Enterprise Environment...
        </span>
      </div>
    </div>
  );
};
