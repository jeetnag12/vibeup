"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function CTASection() {
  return (
    <section className="relative w-full py-[120px] bg-[#09090B] overflow-hidden text-center">
      {/* Centered radial gradient background effect */}
      <div
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.08) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Label */}
        <p
          className="font-mono text-[#8B5CF6] uppercase mb-4 font-medium"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
          }}
        >
          JOIN THE WAITLIST
        </p>

        {/* Heading */}
        <h2
          className="font-sans font-bold text-white text-[38px] sm:text-[56px] tracking-tight leading-[1.08] mb-4 max-w-2xl"
          style={{ fontWeight: 700 }}
        >
          Bangalore&apos;s nightlife
          <br />
          just got social.
        </h2>

        {/* Subheading */}
        <p
          className="text-[#A1A1AA] text-[18px] max-w-md mx-auto font-sans leading-relaxed mb-10 font-normal"
          style={{ fontWeight: 400 }}
        >
          Be the first in when VibeUp drops.
        </p>

        {/* Two buttons side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6">
          {/* Button 1 (primary) */}
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-sans text-[16px] transition-all duration-200 hover:opacity-95 hover:scale-[1.02] shadow-lg shadow-purple-500/25 shrink-0"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              padding: "16px 32px",
              borderRadius: "10px",
              fontWeight: 600,
            }}
          >
            <span>Join VibeUp</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Button 2 (secondary) */}
          <a
            href="https://instagram.com/vibeup.bangalore"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white bg-transparent font-sans text-[16px] border border-[#2A2A35] hover:border-[#8B5CF6] transition-all duration-200 shrink-0"
            style={{
              padding: "16px 32px",
              borderRadius: "10px",
              fontWeight: 600,
            }}
          >
            <InstagramIcon className="w-4 h-4 text-[#EC4899]" />
            <span>Follow @vibeup.bangalore</span>
          </a>
        </div>

        {/* Small text below */}
        <p
          className="text-[#A1A1AA] font-sans font-normal"
          style={{
            fontSize: "13px",
          }}
        >
          Free to join. No spam. Early members get zero platform fees.
        </p>
      </div>
    </section>
  );
}
