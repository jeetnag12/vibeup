"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface EventDescriptionSectionProps {
  event: DetailedEvent;
}

export default function EventDescriptionSection({
  event,
}: EventDescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedParagraphs = isExpanded
    ? event.descriptionParagraphs
    : event.descriptionParagraphs.slice(0, 2);

  return (
    <section className="w-full my-12 max-w-[760px]">
      {/* Header */}
      <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
        THE EXPERIENCE
      </span>
      <h2
        className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight mb-4"
        style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
      >
        ABOUT THIS EVENT
      </h2>

      {/* Paragraphs */}
      <div className="space-y-4 text-sm sm:text-base font-sans text-[#D4D4D8] leading-relaxed">
        {displayedParagraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      {/* Expand / Collapse Button */}
      {event.descriptionParagraphs.length > 2 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#8B5CF6] hover:text-purple-300 py-1 transition-colors"
        >
          <span>{isExpanded ? "READ LESS" : "READ MORE"}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </section>
  );
}
