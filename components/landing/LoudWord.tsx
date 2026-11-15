"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_WORDS = ["Techno", "Bollywood", "Rooftop", "Live music", "Comedy", "Jazz"];

/**
 * Giant cycling headline word. Letters stretch (font width + weight) towards the pointer,
 * and ripple on their own when there is no pointer (phones).
 */
export default function LoudWord({
  words = DEFAULT_WORDS,
  interval = 2400,
  className = "",
}: {
  words?: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const scope = wrapRef.current?.closest("[data-loud-scope]") ?? wrapRef.current;
    const onMove = (e: Event) => {
      const p = e as PointerEvent;
      pointer.current = { x: p.clientX, y: p.clientY };
    };
    const onLeave = () => (pointer.current = null);
    scope?.addEventListener("pointermove", onMove);
    scope?.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const loop = (t: number) => {
      const letters = wrapRef.current?.querySelectorAll<HTMLSpanElement>("[data-l]") ?? [];
      letters.forEach((el, i) => {
        let k: number;
        const p = pointer.current;
        if (p) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(r.left + r.width / 2 - p.x, r.top + r.height / 2 - p.y);
          k = Math.max(0, 1 - d / 300);
        } else {
          k = ((Math.sin(t / 520 - i * 0.55) + 1) / 2) * 0.8;
        }
        el.style.fontVariationSettings = `'wdth' ${(60 + 90 * k).toFixed(1)}, 'wght' ${(500 + 400 * k).toFixed(0)}`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      scope?.removeEventListener("pointermove", onMove);
      scope?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const word = words[index];
  return (
    <h1
      ref={wrapRef}
      aria-live="polite"
      aria-label={word}
      className={`font-display uppercase whitespace-nowrap overflow-hidden leading-[0.86] h-[0.9em] m-0 ${
        index % 2 ? "text-pink" : "text-yellow"
      } ${className}`}
      style={{ fontStretch: "normal", letterSpacing: "-0.02em" }}
    >
      {word.split("").map((ch, i) => (
        <span
          key={`${index}-${i}`}
          data-l
          aria-hidden="true"
          className="inline-block animate-[loudUp_0.5s_cubic-bezier(.2,.9,.2,1)_both]"
          style={{ animationDelay: `${i * 35}ms`, fontVariationSettings: "'wdth' 75, 'wght' 800" }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </h1>
  );
}
