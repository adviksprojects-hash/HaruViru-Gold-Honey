import React from 'react';

/**
 * AnimatedBees
 * Renders 6 realistic, lively honeybees flying naturally between
 * the white jasmine and blossom flowers around the jar at the top of the hero banner.
 */
export const AnimatedBees = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-15">
      
      {/* ─── BEE 1: Flies from Left Flower Cluster to Right Flower Cluster ─── */}
      <div className="absolute top-[8%] left-[24%] animate-bee-flight-1">
        <div className="relative w-8 h-8 -rotate-12 transition-transform">
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
            <ellipse cx="16" cy="12" rx="9" ry="4.5" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-left" />
            <ellipse cx="24" cy="12" rx="9" ry="4.5" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-right" />
            <circle cx="20" cy="11" r="3.2" fill="#1C1917" />
            <circle cx="19" cy="10" r="0.8" fill="#FDE047" />
            <path d="M 19 8 Q 17 5 15 6" stroke="#1C1917" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 21 8 Q 23 5 25 6" stroke="#1C1917" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <ellipse cx="20" cy="16" rx="4.5" ry="4" fill="#D97706" />
            <ellipse cx="20" cy="24" rx="5" ry="7" fill="#F59E0B" />
            <path d="M 15.5 21 Q 20 23 24.5 21" stroke="#1C1917" strokeWidth="1.8" fill="none" />
            <path d="M 15.2 24 Q 20 26 24.8 24" stroke="#1C1917" strokeWidth="1.8" fill="none" />
            <path d="M 16.5 27 Q 20 29 23.5 27" stroke="#1C1917" strokeWidth="1.6" fill="none" />
            <polygon points="19.5,31 20.5,31 20,33.5" fill="#1C1917" />
          </svg>
        </div>
      </div>

      {/* ─── BEE 2: Forages around the Right White Blossom Cluster ─── */}
      <div className="absolute top-[12%] right-[22%] animate-bee-flight-2">
        <div className="relative w-7 h-7 rotate-45 transition-transform">
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
            <ellipse cx="16" cy="12" rx="8.5" ry="4" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-left" />
            <ellipse cx="24" cy="12" rx="8.5" ry="4" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-right" />
            <circle cx="20" cy="11" r="3" fill="#1C1917" />
            <circle cx="21" cy="10" r="0.8" fill="#FDE047" />
            <path d="M 19 8 Q 17 5 15 6" stroke="#1C1917" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 21 8 Q 23 5 25 6" stroke="#1C1917" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <ellipse cx="20" cy="16" rx="4.2" ry="3.8" fill="#D97706" />
            <ellipse cx="20" cy="24" rx="4.8" ry="6.5" fill="#F59E0B" />
            <path d="M 15.6 21 Q 20 23 24.4 21" stroke="#1C1917" strokeWidth="1.7" fill="none" />
            <path d="M 15.4 24 Q 20 26 24.6 24" stroke="#1C1917" strokeWidth="1.7" fill="none" />
            <path d="M 16.5 27 Q 20 29 23.5 27" stroke="#1C1917" strokeWidth="1.5" fill="none" />
            <polygon points="19.5,30.5 20.5,30.5 20,33" fill="#1C1917" />
          </svg>
        </div>
      </div>

      {/* ─── BEE 3: Hovers playfully around the Left Foliage & Flowers ─── */}
      <div className="absolute top-[16%] left-[17%] animate-bee-flight-3">
        <div className="relative w-6 h-6 rotate-15 transition-transform">
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
            <ellipse cx="16" cy="12" rx="8" ry="3.8" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-left" />
            <ellipse cx="24" cy="12" rx="8" ry="3.8" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-right" />
            <circle cx="20" cy="11" r="2.8" fill="#1C1917" />
            <ellipse cx="20" cy="16" rx="4" ry="3.5" fill="#D97706" />
            <ellipse cx="20" cy="23.5" rx="4.5" ry="6" fill="#F59E0B" />
            <path d="M 16 21 Q 20 22.8 24 21" stroke="#1C1917" strokeWidth="1.5" fill="none" />
            <path d="M 15.8 24 Q 20 25.8 24.2 24" stroke="#1C1917" strokeWidth="1.5" fill="none" />
            <path d="M 16.8 26.8 Q 20 28.5 23.2 26.8" stroke="#1C1917" strokeWidth="1.4" fill="none" />
            <polygon points="19.5,29.5 20.5,29.5 20,32" fill="#1C1917" />
          </svg>
        </div>
      </div>

      {/* ─── BEE 4: Inspects the Honey Jar Rim & Nectar Stream ─── */}
      <div className="absolute top-[22%] left-[46%] animate-bee-flight-4">
        <div className="relative w-6.5 h-6.5 -rotate-25 transition-transform">
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
            <ellipse cx="16" cy="12" rx="8.5" ry="4" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-left" />
            <ellipse cx="24" cy="12" rx="8.5" ry="4" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-right" />
            <circle cx="20" cy="11" r="3" fill="#1C1917" />
            <circle cx="19" cy="10" r="0.7" fill="#FDE047" />
            <path d="M 19 8 Q 17 5 15 6" stroke="#1C1917" strokeWidth="0.7" fill="none" strokeLinecap="round" />
            <path d="M 21 8 Q 23 5 25 6" stroke="#1C1917" strokeWidth="0.7" fill="none" strokeLinecap="round" />
            <ellipse cx="20" cy="16" rx="4.2" ry="3.8" fill="#D97706" />
            <ellipse cx="20" cy="24" rx="4.8" ry="6.5" fill="#F59E0B" />
            <path d="M 15.6 21 Q 20 23 24.4 21" stroke="#1C1917" strokeWidth="1.7" fill="none" />
            <path d="M 15.4 24 Q 20 26 24.6 24" stroke="#1C1917" strokeWidth="1.7" fill="none" />
            <polygon points="19.5,30.5 20.5,30.5 20,33" fill="#1C1917" />
          </svg>
        </div>
      </div>

      {/* ─── BEE 5: Flies Diagonally across Right-to-Left Blossom Canopy ─── */}
      <div className="absolute top-[6%] right-[32%] animate-bee-flight-5">
        <div className="relative w-7 h-7 -rotate-6 transition-transform">
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
            <ellipse cx="16" cy="12" rx="8.8" ry="4.2" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-left" />
            <ellipse cx="24" cy="12" rx="8.8" ry="4.2" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.7" className="origin-[20px_16px] animate-wing-flap-right" />
            <circle cx="20" cy="11" r="3" fill="#1C1917" />
            <ellipse cx="20" cy="16" rx="4.3" ry="3.8" fill="#D97706" />
            <ellipse cx="20" cy="24" rx="4.8" ry="6.6" fill="#F59E0B" />
            <path d="M 15.6 21 Q 20 23 24.4 21" stroke="#1C1917" strokeWidth="1.6" fill="none" />
            <path d="M 15.4 24 Q 20 26 24.6 24" stroke="#1C1917" strokeWidth="1.6" fill="none" />
            <polygon points="19.5,30.5 20.5,30.5 20,33" fill="#1C1917" />
          </svg>
        </div>
      </div>

      {/* ─── BEE 6: Tiny Baby Bee Spiraling playfully above Top Blossoms ─── */}
      <div className="absolute top-[5%] left-[36%] animate-bee-flight-6">
        <div className="relative w-5 h-5 rotate-30 transition-transform">
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
            <ellipse cx="16" cy="12" rx="7.5" ry="3.5" fill="rgba(255, 255, 255, 0.88)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.6" className="origin-[20px_16px] animate-wing-flap-left" />
            <ellipse cx="24" cy="12" rx="7.5" ry="3.5" fill="rgba(255, 255, 255, 0.88)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="0.6" className="origin-[20px_16px] animate-wing-flap-right" />
            <circle cx="20" cy="11" r="2.6" fill="#1C1917" />
            <ellipse cx="20" cy="15.5" rx="3.8" ry="3.2" fill="#D97706" />
            <ellipse cx="20" cy="23" rx="4.2" ry="5.5" fill="#F59E0B" />
            <path d="M 16.2 20.5 Q 20 22 23.8 20.5" stroke="#1C1917" strokeWidth="1.4" fill="none" />
            <path d="M 16 23.5 Q 20 25 24 23.5" stroke="#1C1917" strokeWidth="1.4" fill="none" />
            <polygon points="19.5,28.5 20.5,28.5 20,31" fill="#1C1917" />
          </svg>
        </div>
      </div>

    </div>
  );
};
