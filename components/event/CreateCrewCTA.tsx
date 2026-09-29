"use client";

import { Plus, Sparkles } from "lucide-react";

interface CreateCrewCTAProps {
  onCreateClick: () => void;
}

export default function CreateCrewCTA({ onCreateClick }: CreateCrewCTAProps) {
  return (
    <div className="w-full mb-10 rounded-[20px] bg-gradient-to-r from-[#1A1A21] via-[#141418] to-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6]/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative ambient gradient */}
      <div
        className="absolute -right-16 -top-16 w-60 h-60 rounded-full pointer-events-none opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, #EC4899 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider font-semibold">
            START YOUR OWN GROUP
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight mb-1.5">
          DON&apos;T SEE YOUR CROWD?
        </h4>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans leading-relaxed">
          Create your own crew and invite people going to this event. Set your meetup spot, decide whether it&apos;s open or private, and party together.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreateClick}
        className="relative z-10 w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] active:scale-[0.99]"
      >
        <Plus className="w-4 h-4" />
        <span>CREATE A CREW</span>
      </button>
    </div>
  );
}
