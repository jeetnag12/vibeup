"use client";

import React from "react";

interface BaseDecorativeProps {
  className?: string;
  style?: React.CSSProperties;
  stroke?: string;
  fill?: string;
  size?: number | string;
}

/**
 * 1. StarShape — 6-pointed geometric star
 * SVG, stroke #8B5CF6, stroke-width 1.5, no fill, size prop (default 40px)
 * Animation: rotate 360deg, 8s linear infinite
 */
export function StarShape({
  size = 40,
  stroke = "#8B5CF6",
  className = "",
  style,
}: BaseDecorativeProps) {
  return (
    <div
      className={`inline-block pointer-events-none select-none anim-spin-8s ${className}`}
      style={style}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 4 L61.5 32.5 L91 26.5 L73 50 L91 73.5 L61.5 67.5 L50 96 L38.5 67.5 L9 73.5 L27 50 L9 26.5 L38.5 32.5 Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * 2. ArrowDown — hand-drawn style arrow pointing down
 * SVG path, stroke white or purple, stroke-width 2, no fill, size 48px
 * Animation: subtle float translateY -8px to 0, 3s ease-in-out infinite alternate
 */
export function ArrowDown({
  size = 48,
  stroke = "#FFFFFF",
  className = "",
  style,
}: BaseDecorativeProps) {
  return (
    <div
      className={`inline-block pointer-events-none select-none anim-float ${className}`}
      style={style}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Slightly organic curved stem */}
        <path
          d="M24 6 C23.2 16, 25.1 28, 24 41"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Hand-drawn chevron head */}
        <path
          d="M15 32 C18.5 36.2, 21.8 39.8, 24 41.5 C26.2 39.8, 29.5 36.2, 33 32"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * 3. DotGrid — 3x3 grid of small circles
 * SVG, fill #8B5CF6, opacity 0.4, each circle 3px radius, 12px gap
 * Animation: opacity pulse 2s ease-in-out infinite
 */
export function DotGrid({
  fill = "#8B5CF6",
  className = "",
  style,
}: BaseDecorativeProps) {
  return (
    <div
      className={`inline-block pointer-events-none select-none anim-dot-pulse ${className}`}
      style={{ opacity: 0.4, ...style }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Row 1: gap is 12px between centers (6, 18, 30) */}
        <circle cx="6" cy="6" r="3" fill={fill} />
        <circle cx="18" cy="6" r="3" fill={fill} />
        <circle cx="30" cy="6" r="3" fill={fill} />

        {/* Row 2 */}
        <circle cx="6" cy="18" r="3" fill={fill} />
        <circle cx="18" cy="18" r="3" fill={fill} />
        <circle cx="30" cy="18" r="3" fill={fill} />

        {/* Row 3 */}
        <circle cx="6" cy="30" r="3" fill={fill} />
        <circle cx="18" cy="30" r="3" fill={fill} />
        <circle cx="30" cy="30" r="3" fill={fill} />
      </svg>
    </div>
  );
}

/**
 * 4. CrossHair — crosshair/plus symbol
 * SVG, stroke rgba(255,255,255,0.3), stroke-width 1, size 32px
 * Animation: subtle float translateY -8px to 0, 3s ease-in-out infinite alternate
 */
export function CrossHair({
  size = 32,
  stroke = "rgba(255, 255, 255, 0.3)",
  className = "",
  style,
}: BaseDecorativeProps) {
  return (
    <div
      className={`inline-block pointer-events-none select-none anim-float ${className}`}
      style={style}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center circle */}
        <circle cx="16" cy="16" r="8" stroke={stroke} strokeWidth="1" />
        {/* Crosshair lines */}
        <line x1="16" y1="2" x2="16" y2="30" stroke={stroke} strokeWidth="1" />
        <line x1="2" y1="16" x2="30" y2="16" stroke={stroke} strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * 5. TriangleSet — 3 small triangles grouped
 * SVG, stroke #8B5CF6, no fill
 * Animation: subtle float translateY -8px to 0, 3s ease-in-out infinite alternate
 */
export function TriangleSet({
  size = 48,
  stroke = "#8B5CF6",
  className = "",
  style,
}: BaseDecorativeProps) {
  return (
    <div
      className={`inline-block pointer-events-none select-none anim-float ${className}`}
      style={style}
    >
      <svg
        width={size}
        height={typeof size === "number" ? size * 0.75 : size}
        viewBox="0 0 64 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triangle 1 (medium) */}
        <path
          d="M16 6 L30 32 L2 32 Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Triangle 2 (large) */}
        <path
          d="M44 14 L60 44 L28 44 Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Triangle 3 (small) */}
        <path
          d="M48 2 L56 16 L40 16 Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
