"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const topTextSingle = "VIBEUP · FIND YOUR CROWD · BANGALORE · NIGHTLIFE · DISCOVER · ";
  const topTextRepeated = topTextSingle.repeat(20);

  const middleRow1Single = "FIND YOUR CROWD · EVENTS · CLUBS · CREWS · ";
  const middleRow1Repeated = middleRow1Single.repeat(16);

  const middleRow2Single = "▲ △ ▽ ▼ · · · ━━ ┅ ▲ △ ▽ · · · ";
  const middleRow2Repeated = middleRow2Single.repeat(20);

  const bottomTextSingle = "BANGALORE NIGHTLIFE · @VIBEUP.BANGALORE · APP COMING SOON · ";
  const bottomTextRepeated = bottomTextSingle.repeat(20);

  return (
    <section className="relative w-full h-screen min-h-[640px] bg-[#000000] overflow-hidden select-none">
      {/* ================================================== */}
      {/* LAYER 1: Background photo (z-index: 0)            */}
      {/* ================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600"
            alt="Bangalore nightlife rave crowd and concert stage"
            fill
            priority
            className="pointer-events-none"
            style={{
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.1) brightness(0.85)",
            }}
          />
        </div>
      </div>

      {/* ================================================== */}
      {/* LAYER 2: Top ticker band (z-index: 10, top: 28%)   */}
      {/* ================================================== */}
      <div
        className="absolute left-0 w-full z-10 overflow-hidden flex items-center bg-[#8B5CF6]"
        style={{
          top: "28%",
          height: "52px",
        }}
      >
        <div className="marquee-left w-max">
          <div
            className="font-sans whitespace-nowrap text-[#000000] px-4"
            style={{
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "0.05em",
            }}
          >
            {topTextRepeated}
          </div>
          <div
            className="font-sans whitespace-nowrap text-[#000000] px-4"
            style={{
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "0.05em",
            }}
            aria-hidden="true"
          >
            {topTextRepeated}
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* LAYER 3: Middle ticker band (z-index: 10, top: 38%)*/}
      {/* ================================================== */}
      <div
        className="absolute left-0 w-full z-10 overflow-hidden flex flex-col justify-center bg-[#7C3AED]"
        style={{
          top: "38%",
          height: "80px",
        }}
      >
        {/* Row 1 — scrolling RIGHT */}
        <div className="overflow-hidden flex items-center">
          <div className="marquee-right w-max">
            <div
              className="font-sans whitespace-nowrap text-[#FFFFFF] px-4 leading-none"
              style={{
                fontWeight: 900,
                fontSize: "32px",
                letterSpacing: "-0.02em",
              }}
            >
              {middleRow1Repeated}
            </div>
            <div
              className="font-sans whitespace-nowrap text-[#FFFFFF] px-4 leading-none"
              style={{
                fontWeight: 900,
                fontSize: "32px",
                letterSpacing: "-0.02em",
              }}
              aria-hidden="true"
            >
              {middleRow1Repeated}
            </div>
          </div>
        </div>

        {/* Row 2 — small graphic elements row scrolling LEFT */}
        <div className="overflow-hidden flex items-center mt-1">
          <div className="marquee-left w-max">
            <div
              className="font-mono whitespace-nowrap px-4 leading-none"
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              {middleRow2Repeated}
            </div>
            <div
              className="font-mono whitespace-nowrap px-4 leading-none"
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.4)",
              }}
              aria-hidden="true"
            >
              {middleRow2Repeated}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* LAYER 4: Bottom ticker band (z-index: 10, top: 53%)*/}
      {/* ================================================== */}
      <div
        className="absolute left-0 w-full z-10 overflow-hidden flex items-center bg-[#8B5CF6]"
        style={{
          top: "53%",
          height: "52px",
        }}
      >
        <div className="marquee-right w-max">
          <div
            className="font-sans whitespace-nowrap text-[#000000] px-4"
            style={{
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "0.05em",
            }}
          >
            {bottomTextRepeated}
          </div>
          <div
            className="font-sans whitespace-nowrap text-[#000000] px-4"
            style={{
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "0.05em",
            }}
            aria-hidden="true"
          >
            {bottomTextRepeated}
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* LAYER 5: Content overlay (z-index: 20)             */}
      {/* ================================================== */}
      <div
        className="absolute z-20"
        style={{
          bottom: 0,
          left: 0,
          padding: "48px",
        }}
      >
        {/* Small label */}
        <div
          className="font-mono text-[#8B5CF6] mb-3 select-none"
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
          }}
        >
          ↓ SCROLL TO DISCOVER
        </div>

        {/* Two buttons side by side */}
        <div className="flex flex-row items-center gap-3">
          <Link
            href="/discover"
            className="inline-flex items-center justify-center text-[#000000] bg-[#8B5CF6] hover:bg-[#9d74f7] active:scale-[0.98] transition-all duration-150 font-sans"
            style={{
              fontWeight: 800,
              fontSize: "14px",
              padding: "12px 28px",
              borderRadius: "2px",
            }}
          >
            Discover Events
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center text-[#000000] bg-[#FFFFFF] hover:bg-[#F3F4F6] active:scale-[0.98] transition-all duration-150 font-sans"
            style={{
              fontWeight: 800,
              fontSize: "14px",
              padding: "12px 28px",
              borderRadius: "2px",
            }}
          >
            Join VibeUp
          </Link>
        </div>
      </div>

      {/* ================================================== */}
      {/* LAYER 6: Top left logo area & Top right info (z-30)*/}
      {/* ================================================== */}
      {/* Top left logo */}
      <div
        className="absolute z-30 select-none pointer-events-none"
        style={{
          top: "80px",
          left: "48px",
        }}
      >
        <span
          className="font-sans text-[#FFFFFF]"
          style={{
            fontWeight: 900,
            fontSize: "14px",
            letterSpacing: "0.1em",
          }}
        >
          VIBEUP
        </span>
      </div>

      {/* Top right location / year */}
      <div
        className="absolute z-30 select-none pointer-events-none"
        style={{
          top: "80px",
          right: "48px",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            color: "rgba(255, 255, 255, 0.4)",
            letterSpacing: "0.1em",
          }}
        >
          BANGALORE, IN · 2026
        </span>
      </div>
    </section>
  );
}
