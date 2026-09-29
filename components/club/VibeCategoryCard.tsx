"use client";

import { VibeCategory } from "@/lib/clubs-data";
import { ArrowRight } from "lucide-react";

interface VibeCategoryCardProps {
  vibe: VibeCategory;
  isSelected: boolean;
  onSelect: (vibe: VibeCategory) => void;
}

export default function VibeCategoryCard({
  vibe,
  isSelected,
  onSelect,
}: VibeCategoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(vibe)}
      aria-pressed={isSelected}
      className={`group relative w-full h-[180px] sm:h-[200px] rounded-[12px] overflow-hidden border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
        isSelected
          ? "border-[#8B5CF6] ring-2 ring-[#8B5CF6]/50 "
          : "border-[#1A1A1A] hover:border-[#8B5CF6]/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
      }`}
    >
      {/* Background Image with Overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={vibe.image}
        alt={vibe.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-black/20" />

      {/* Top Badge */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
          {vibe.badge}
        </span>
        {isSelected && (
          <span className="font-mono text-[10px] font-bold text-white bg-[#8B5CF6] px-2 py-0.5 rounded-full shadow-sm">
            ACTIVE FILTER
          </span>
        )}
      </div>

      {/* Card Content at bottom */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="font-sans font-bold text-lg text-white tracking-tight group-hover:text-[#8B5CF6] transition-colors">
            {vibe.title}
          </h4>
          <ArrowRight className="w-4 h-4 text-[#8B5CF6] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0" />
        </div>
        <p className="font-sans text-xs text-[#D4D4D8] line-clamp-1 leading-snug">
          {vibe.subtitle}
        </p>
      </div>
    </button>
  );
}
