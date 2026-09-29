"use client";

import Link from "next/link";
import { Plus, Users, Sparkles, ArrowRight } from "lucide-react";

interface CrewHeroProps {
  eventId: string;
  onCreateCrew: () => void;
}

export default function CrewHero({ eventId, onCreateCrew }: CrewHeroProps) {
  return (
    <section className="relative w-full mb-10 overflow-hidden rounded-[24px] bg-gradient-to-b from-[#141418] via-[#141418] to-[#0D0D11] border border-[#2A2A35] p-6 sm:p-10 lg:p-12">
      {/* Ambient background glow accents */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(236,72,153,0.15) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span className="font-mono text-xs font-semibold text-[#8B5CF6] tracking-wider uppercase">
            FIND YOUR CROWD
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-[1.08] mb-4">
          GO TOGETHER.
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-[#A1A1AA] font-sans max-w-2xl leading-relaxed mb-8">
          Find people going to the same event, join a crew, or create your own. Never party alone unless you want to.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
          <button
            type="button"
            onClick={onCreateCrew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-all duration-200 shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE A CREW</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          <Link
            href={`/events/${eventId}/going`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1A21] hover:bg-[#2A2A35] text-white font-sans text-sm font-medium border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-all duration-200"
          >
            <Users className="w-4 h-4 text-[#EC4899]" />
            <span>FIND PEOPLE</span>
            <ArrowRight className="w-4 h-4 ml-0.5 text-[#A1A1AA]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
