"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[640px] bg-[#000000] overflow-hidden flex items-center">
      {/* ================================================== */}
      {/* BACKGROUND LAYER: Giant Decorative Text */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center items-end leading-[0.82] text-right font-sans pr-2 sm:pr-4 md:pr-8"
        style={{
          fontWeight: 900,
          fontSize: "clamp(100px, 18vw, 260px)",
          color: "rgba(255, 255, 255, 0.02)",
          letterSpacing: "-0.04em",
        }}
      >
        <span>FIND</span>
        <span>YOUR</span>
        <span>CROWD</span>
      </div>

      {/* ================================================== */}
      {/* CONTENT LAYER: Left Column Content */}
      {/* ================================================== */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-0 lg:pl-[8vw]">
        <div className="w-full max-w-[560px] lg:max-w-[620px] flex flex-col items-start text-left">
          {/* 1. Section label row */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full bg-[#7C3AED] shrink-0"
              aria-hidden="true"
            />
            <span
              className="font-mono text-[11px] text-[#7C3AED] uppercase font-medium"
              style={{ letterSpacing: "0.15em" }}
            >
              BANGALORE NIGHTLIFE
            </span>
          </div>

          {/* 2. Headline */}
          <h1
            className="font-sans font-black text-left leading-[0.95] my-0 tracking-[-0.03em]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(56px, 8vw, 96px)",
              letterSpacing: "-0.03em",
            }}
          >
            <span className="block text-white">FIND YOUR</span>
            <span className="block text-[#7C3AED]">CROWD.</span>
          </h1>

          {/* 3. Sub text */}
          <p
            className="font-sans text-[18px] text-[#666666] max-w-[400px] leading-relaxed mt-5 mb-0"
            style={{ fontWeight: 400 }}
          >
            Discover events. Meet people. Build your crew.
          </p>

          {/* 4. Two buttons */}
          <div className="flex flex-row flex-wrap items-center gap-3 mt-12">
            <Link
              href="/discover"
              className="inline-flex items-center justify-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-sans text-[15px] transition-colors duration-200"
              style={{
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              Discover events
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center bg-transparent border border-[#1A1A1A] hover:border-[#7C3AED] text-[#666666] hover:text-white font-sans text-[15px] transition-colors duration-200"
              style={{
                padding: "14px 32px",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              How it works →
            </a>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 5. Bottom Scroll Indicator */}
      {/* ================================================== */}
      <div
        className="absolute bottom-10 left-6 lg:left-[8vw] z-10 pointer-events-none select-none font-mono text-[10px] text-[#444444]"
        style={{ letterSpacing: "0.15em" }}
      >
        ↓ SCROLL
      </div>
    </section>
  );
}
