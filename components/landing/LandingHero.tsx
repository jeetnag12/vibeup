"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoudWord from "./LoudWord";

/** Landing hero: Loud Type word cycling through genres, live counter, spinning 18+ badge. */
export default function LandingHero() {
  const [going, setGoing] = useState(312);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setGoing((n) => n + 1 + Math.floor(Math.random() * 3)), 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header
      data-loud-scope
      className="relative overflow-hidden border-b border-line pt-[136px] pb-16"
      style={{
        background:
          "radial-gradient(60% 50% at 85% 20%, rgba(255,79,163,.22), transparent 70%), radial-gradient(50% 60% at 0% 100%, rgba(92,200,255,.14), transparent 70%), #0B0B10",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 relative">
        <div className="absolute right-5 sm:right-6 -top-11 w-24 h-24 sm:w-[138px] sm:h-[138px] z-[2]" aria-hidden="true">
          <svg viewBox="0 0 138 138" className="w-full h-full animate-[spinSlow_14s_linear_infinite]">
            <defs>
              <path id="badge-circle" d="M69,69 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" />
            </defs>
            <circle cx="69" cy="69" r="67" fill="#FF4FA3" />
            <text fontFamily="var(--font-display)" fontWeight="800" fontSize="13.5" letterSpacing="3" fill="#0B0B10">
              <textPath href="#badge-circle">BANGALORE · AFTER DARK · BANGALORE · AFTER DARK ·</textPath>
            </text>
          </svg>
          <b className="absolute inset-0 grid place-items-center font-display font-black text-night text-[22px] sm:text-[30px]" style={{ fontStretch: "140%" }}>
            18+
          </b>
        </div>

        <p className="flex flex-wrap items-center gap-2.5 m-0 mb-1.5 font-display font-bold uppercase text-[clamp(16px,2.2vw,26px)] tracking-[0.02em]" style={{ fontStretch: "125%" }}>
          This weekend it&apos;s
          <span className="inline-flex items-center gap-2 font-mono text-[12px] font-medium tracking-[0.06em] text-lime border border-lime/35 rounded-full px-2.5 py-1 tabular-nums">
            <i className="w-[7px] h-[7px] rounded-full bg-lime animate-[livePulse_1.6s_infinite]" />
            {going} going out tonight
          </span>
        </p>

        <LoudWord className="text-[clamp(64px,14.5vw,210px)]" />

        <p className="text-[clamp(17px,1.6vw,20px)] text-[#C9C6D6] max-w-[46ch] mt-6 mb-7">
          Book the ticket, find a crew going to the same event, and meet people who like the same music as you. Bangalore nights, sorted.
        </p>
        <div className="flex flex-wrap gap-3.5 items-center">
          <Link href="#events" className="rounded-full bg-yellow text-night font-semibold text-[15px] px-6 py-3.5 hover:bg-[#FFEA80] hover:-translate-y-0.5 transition-all">
            Explore events →
          </Link>
          <Link href="/crews" className="rounded-full border border-[#3A3A48] text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-tile transition-colors">
            Find a crew
          </Link>
        </div>
      </div>
    </header>
  );
}
