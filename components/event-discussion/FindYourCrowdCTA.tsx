"use client";

import Link from "next/link";
import { Users, Plus, ArrowRight } from "lucide-react";

interface FindYourCrowdCTAProps {
  eventId: string;
}

export default function FindYourCrowdCTA({ eventId }: FindYourCrowdCTAProps) {
  return (
    <div className="p-6 rounded-[12px] bg-gradient-to-br from-[#111111] via-[#111111] to-[#111111] border border-[#8B5CF6]/30  relative overflow-hidden flex flex-col gap-4">
      {/* Background Glow */}
      <div
        className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-[#8B5CF6]" />
        <span className="font-mono text-[11px] text-[#8B5CF6] font-semibold uppercase tracking-wider">
          SOCIAL MATCHING
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold font-sans text-white tracking-tight mb-1.5">
          DON&apos;T WANT TO GO ALONE?
        </h3>
        <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed">
          Find people going to the same event, coordinate arrival, and build your crew before heading in.
        </p>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <Link
          href={`/events/${eventId}/going`}
          className="w-full py-2.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.25)] flex items-center justify-center gap-1.5"
        >
          <span>FIND PEOPLE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={`/events/${eventId}/crews`}
          className="w-full py-2 rounded-[4px] border border-[#1A1A1A] hover:border-[#8B5CF6] bg-[#111111] text-xs font-mono text-white transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#EC4899]" />
          <span>CREATE A CREW</span>
        </Link>
      </div>
    </div>
  );
}
