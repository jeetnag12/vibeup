"use client";

import { Plus, Sparkles } from "@/components/icons";

interface CreateCrewCTAProps {
  onCreateClick: () => void;
}

export default function CreateCrewCTA({ onCreateClick }: CreateCrewCTAProps) {
  return (
    <div className="w-full mb-10 rounded-[12px] bg-gradient-to-r from-[#15151C] via-[#15151C] to-[#15151C] border border-[#25252F] hover:border-[#FFE14D]/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative ambient gradient */}
      <div
        className="absolute -right-16 -top-16 w-60 h-60 rounded-full pointer-events-none opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
        style={{
          background: "radial-gradient(circle, #FFE14D 0%, #FF4FA3 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#FFE14D]" />
          <span className="font-mono text-xs text-[#FFE14D] uppercase tracking-wider font-semibold">
            START YOUR OWN GROUP
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight mb-1.5">
          DON&apos;T SEE YOUR CROWD?
        </h4>
        <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans leading-relaxed">
          Create your own crew and invite people going to this event. Set your meetup spot, decide whether it&apos;s open or private, and party together.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreateClick}
        className="relative z-10 w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] font-sans text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(255,225,77,0.3)] hover:shadow-[0_0_28px_rgba(255,225,77,0.5)] active:scale-[0.99]"
      >
        <Plus className="w-4 h-4" />
        <span>CREATE A CREW</span>
      </button>
    </div>
  );
}
