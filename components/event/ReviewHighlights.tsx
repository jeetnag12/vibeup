"use client";

import { MessageSquareQuote, Sparkles } from "lucide-react";

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
        <Sparkles className="w-4 h-4 text-[#EC4899]" />
        <h3 className="font-mono text-xs font-semibold text-[#EC4899] uppercase tracking-wider">
          WHAT PEOPLE ARE SAYING
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {highlights.map((quote, idx) => (
          <div
            key={idx}
            className="p-4 rounded-[14px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/40 transition-colors flex items-start gap-3"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <p className="font-sans text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
