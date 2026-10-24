import React from 'react';

/**
 * AnimatedHoneyStream
 * 
 * Hyper-realistic optical simulation of golden honey:
 * 1. Starts strictly at the jar's lower lip / pouring mouth (no lines through the glass or near navbar).
 * 2. Pours down onto the "Explore Reserves & Shop" button, coating it with a viscous amber crest.
 * 3. Cascades from the bottom edge of the button straight down to the ground.
 * 4. Floods into an expansive, glistening "Honey Lake" with concentric expanding ripples,
 *    caustic glints, and surface waves.
 */
export const AnimatedHoneyStream = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Amber Liquid Gradients */}
          <linearGradient id="honeyLiquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.45" />
          </linearGradient>

          {/* Vertical Downward Flowing Highlight Streak */}
          <linearGradient id="streamHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="20%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>

          {/* Droplet Radial Glow */}
          <radialGradient id="honeyDropletGlow" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.95" />
          </radialGradient>

          {/* Honey Lake Radial Sheen */}
          <radialGradient id="honeyLakeGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#D97706" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#92400E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0.0" />
          </radialGradient>

          {/* Concentric Ripple Radial Gradient */}
          <radialGradient id="lakeRippleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#FEF08A" stopOpacity="0" />
            <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STAGE 1: JAR LIP STARTING POINT (Y ≈ 280) -> BUTTON (Y ≈ 480) */}
        {/* Starts EXCLUSIVELY at the jar's lower pouring rim            */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <g className="animate-honey-undulate-soft" style={{ transformOrigin: '500px 280px' }}>
          
          {/* Jar Lower Lip Meniscus: Starting point of the spill */}
          <ellipse
            cx="499"
            cy="282"
            rx="13"
            ry="6"
            fill="url(#honeyDropletGlow)"
            opacity="0.95"
          />

          {/* Ambient Warm Golden Glow along stream */}
          <path
            d="M 491 285 Q 498 380 496 480 L 507 480 Q 506 380 509 285 Z"
            fill="url(#honeyLiquidGrad)"
            opacity="0.3"
            filter="blur(3px)"
          />

          {/* Main Viscous Stream Column from Jar Mouth to Button */}
          <path
            d="M 493 285 Q 498 380 497 480 L 505 480 Q 504 380 507 285 Z"
            fill="url(#honeyLiquidGrad)"
            opacity="0.75"
          />

          {/* Animated Liquid Flow Light Wave running downwards */}
          <path
            d="M 496 285 Q 499 380 499 480"
            stroke="url(#streamHighlight)"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
            className="animate-honey-flow-streak"
            opacity="0.92"
          />

          {/* Continuous Downward Specular Moving Dashes */}
          <path
            d="M 501 285 Q 502 380 502 480"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="30 60"
            className="animate-honey-flow-dash"
            opacity="0.85"
          />

          {/* Falling Amber Drops into the button */}
          <ellipse
            cx="499"
            cy="295"
            rx="3.2"
            ry="8.5"
            fill="url(#honeyDropletGlow)"
            className="animate-honey-drop-upper-1"
          />
          <ellipse
            cx="498"
            cy="295"
            rx="3.8"
            ry="10"
            fill="url(#honeyDropletGlow)"
            className="animate-honey-drop-upper-2"
          />
          <ellipse
            cx="501"
            cy="295"
            rx="3"
            ry="7.5"
            fill="url(#honeyDropletGlow)"
            className="animate-honey-drop-upper-3"
          />
        </g>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STAGE 2: HONEY COATING & POOLING ON THE BUTTON (Y ≈ 480-530)  */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <g transform="translate(498, 482)">
          {/* Honey splash/pool mound right where the stream strikes the button */}
          <ellipse
            cx="0"
            cy="0"
            rx="16"
            ry="7"
            fill="url(#honeyDropletGlow)"
            className="animate-honey-impact-pulse"
            opacity="0.95"
          />

          {/* Golden glistening layer spreading across the button surface */}
          <path
            d="M -18 -2 Q 0 9 18 -1 Q 14 20 -2 24 Q -20 18 -18 -2 Z"
            fill="url(#honeyLiquidGrad)"
            opacity="0.9"
            className="animate-honey-crest-pulse"
          />

          {/* Specular curved reflection on the button honey crest */}
          <path
            d="M -12 3 Q 0 10 12 4"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />

          {/* Glistening highlight spark on button */}
          <circle cx="-3" cy="5" r="1.8" fill="#FFFFFF" className="animate-honey-glint-1" />
        </g>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STAGE 3: CASCADING FROM BUTTON DOWN TO HONEY LAKE (Y ≈ 530-670)*/}
        {/* ═════════════════════════════════════════════════════════════ */}
        <g style={{ transformOrigin: '497px 525px' }}>
          
          {/* Viscous Honey Cascade falling from button bottom */}
          <path
            d="M 494 520 Q 497 590 496 670 L 503 670 Q 503 590 503 520 Z"
            fill="url(#honeyLiquidGrad)"
            opacity="0.75"
          />

          {/* Downward light wave from button to floor */}
          <path
            d="M 496 520 Q 498 590 498 670"
            stroke="url(#streamHighlight)"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
            className="animate-honey-flow-streak"
            opacity="0.88"
          />

          {/* Specular stream dashes */}
          <path
            d="M 500 520 Q 501 590 500 670"
            stroke="#FFFFFF"
            strokeWidth="1"
            fill="none"
            strokeDasharray="25 50"
            className="animate-honey-flow-dash"
            opacity="0.8"
          />

          {/* Amber Drops falling from button to lake */}
          <ellipse
            cx="498"
            cy="525"
            rx="3.2"
            ry="9"
            fill="url(#honeyDropletGlow)"
            className="animate-honey-drop-lower-1"
          />
          <ellipse
            cx="499"
            cy="525"
            rx="3.6"
            ry="11"
            fill="url(#honeyDropletGlow)"
            className="animate-honey-drop-lower-2"
          />
        </g>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* STAGE 4: EXPANSIVE GLISTENING "HONEY LAKE" AT THE GROUND       */}
        {/* Rich, wide, flooded pool of golden honey with ripples & caustics*/}
        {/* ═════════════════════════════════════════════════════════════ */}
        <g transform="translate(500, 680)">
          
          {/* 1. Deep Ambient Amber Lake Foundation */}
          <ellipse
            cx="0"
            cy="15"
            rx="380"
            ry="75"
            fill="url(#honeyLakeGrad)"
            opacity="0.85"
            className="animate-honey-lake-breath"
          />

          {/* 2. Inner Golden Honey Pool Core */}
          <ellipse
            cx="0"
            cy="10"
            rx="240"
            ry="50"
            fill="url(#honeyLiquidGrad)"
            opacity="0.75"
          />

          {/* 3. Concentric Viscous Liquid Ripples Expanding across Lake */}
          <ellipse
            cx="-3"
            cy="0"
            rx="50"
            ry="15"
            fill="url(#lakeRippleGrad)"
            className="animate-honey-ripple-1"
          />
          <ellipse
            cx="-3"
            cy="0"
            rx="90"
            ry="25"
            fill="url(#lakeRippleGrad)"
            className="animate-honey-ripple-2"
          />
          <ellipse
            cx="-3"
            cy="0"
            rx="140"
            ry="38"
            fill="url(#lakeRippleGrad)"
            className="animate-honey-ripple-3"
          />
          <ellipse
            cx="-3"
            cy="0"
            rx="200"
            ry="50"
            fill="url(#lakeRippleGrad)"
            className="animate-honey-ripple-4"
          />

          {/* 4. Impact Mound where stream strikes the lake */}
          <ellipse
            cx="-2"
            cy="-5"
            rx="22"
            ry="9"
            fill="url(#honeyDropletGlow)"
            className="animate-honey-impact-pulse"
            opacity="0.95"
          />

          {/* 5. Glistening Surface Reflections & Shimmering Caustic Arcs */}
          <path
            d="M -160 12 Q -80 3 0 10 Q 80 18 160 8"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M -110 22 Q -40 32 40 26 Q 100 20 140 28"
            stroke="#FEF08A"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M -60 -2 Q 0 4 60 -1"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />

          {/* 6. Scattered Golden Honey Splatter Droplets around Lake Perimeter */}
          <ellipse cx="-230" cy="8" rx="7" ry="3.5" fill="url(#honeyDropletGlow)" />
          <ellipse cx="240" cy="12" rx="8" ry="4" fill="url(#honeyDropletGlow)" />
          <ellipse cx="-180" cy="38" rx="6" ry="3" fill="url(#honeyDropletGlow)" />
          <ellipse cx="190" cy="34" rx="7" ry="3.5" fill="url(#honeyDropletGlow)" />
          <ellipse cx="-90" cy="48" rx="5" ry="2.5" fill="url(#honeyDropletGlow)" />
          <ellipse cx="100" cy="45" rx="5.5" ry="2.8" fill="url(#honeyDropletGlow)" />
          <ellipse cx="-280" cy="18" rx="4" ry="2" fill="url(#honeyDropletGlow)" opacity="0.8" />
          <ellipse cx="290" cy="22" rx="4.5" ry="2.2" fill="url(#honeyDropletGlow)" opacity="0.8" />

          {/* 7. Sparkling Glistening Pinpoint Glints */}
          <circle cx="-60" cy="10" r="2.2" fill="#FFFFFF" className="animate-honey-glint-1" />
          <circle cx="75" cy="15" r="2.5" fill="#FFFFFF" className="animate-honey-glint-2" />
          <circle cx="-130" cy="18" r="1.8" fill="#FFFFFF" className="animate-honey-glint-3" />
          <circle cx="140" cy="8" r="2" fill="#FFFFFF" className="animate-honey-glint-1" />
          <circle cx="0" cy="28" r="1.8" fill="#FFFFFF" className="animate-honey-glint-2" />
          <circle cx="-25" cy="-2" r="2" fill="#FFFFFF" className="animate-honey-glint-3" />
        </g>

      </svg>
    </div>
  );
};
