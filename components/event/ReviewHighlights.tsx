"use client";

import { MessageSquareQuote, Sparkles } from "@/components/icons";

interface ReviewHighlightsProps {
  highlights: string[];
}

export default function ReviewHighlights({
  highlights = [
    "Music was exactly what I came for. The crowd was great.",
    "Great venue and production. Arrive early.",
    "Perfect if you're into underground techno.",
    "Found a crew through VibeUp and ended up staying till close.",
  ],
}: ReviewHighlightsProps) {
  return (
    <section className="w-full mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#FF4FA3]" />
        <h3 className="font-mono text-xs font-semibold text-[#FF4FA3] uppercase tracking-wider">
          WHAT PEOPLE ARE SAYING
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {highlights.map((quote, idx) => (
          <div
            key={idx}
            className="p-4 rounded-[14px] bg-[#15151C] border border-[#25252F] hover:border-[#FFE14D]/40 transition-colors flex items-start gap-3"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#FFE14D] shrink-0 mt-0.5" />
            <p className="font-sans text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
