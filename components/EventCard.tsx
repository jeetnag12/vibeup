"use client";

import { useState } from "react";
import { Heart, Share2, MapPin } from "lucide-react";

export interface EventCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  area: string;
  price: string;
  goingCount: number;
  avatars?: string[];
  saved?: boolean;
  onSaveToggle?: (isSaved: boolean) => void;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function EventCard({
  image,
  category,
  title,
  date,
  time,
  venue,
  area,
  price,
  goingCount,
  avatars = [],
  saved = false,
  onSaveToggle,
  onClick,
  className,
  style,
}: EventCardProps) {
  const [isSaved, setIsSaved] = useState(saved);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (onSaveToggle) {
      onSaveToggle(nextSaved);
    }
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} at ${venue} on VibeUp!`,
          url: typeof window !== "undefined" ? window.location.href : "",
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(
          typeof window !== "undefined" ? window.location.href : ""
        );
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      } catch {
        // Ignore clipboard error
      }
    }
  };

  const visibleAvatars = (avatars || []).slice(0, 3);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
      aria-label={`${title} at ${venue}, ${date}`}
      className={`group relative w-full aspect-[3/4] rounded-[12px] overflow-hidden cursor-pointer border border-[#1A1A1A] transition-all duration-[250ms] select-none hover:-translate-y-[6px] hover:border-[rgba(124,58,237,0.5)] hover:shadow-[-2px_0_20px_rgba(124,58,237,0.3),2px_0_20px_rgba(236,72,153,0.2)] ${
        className || ""
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        ...style,
      }}
    >
      {/* 1. Full Card Image (Poster Artwork) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* 2. Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Top Right — Price Pill */}
      <div
        className="absolute top-[12px] right-[12px] z-10 font-mono text-[12px] font-bold text-white border border-white/10 rounded-[4px] pointer-events-none select-none flex items-center justify-center"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "4px 12px",
        }}
      >
        <span>{price}</span>
      </div>

      {/* 4. Top Left — Save + Share Icons */}
      <div className="absolute top-[12px] left-[12px] z-10 flex items-center gap-[6px]">
        {/* Heart / Save Button */}
        <button
          type="button"
          aria-label={isSaved ? "Remove from saved" : "Save event"}
          onClick={handleHeartClick}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-90"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isSaved
                ? "fill-[#EC4899] stroke-[#EC4899]"
                : "stroke-white hover:stroke-[#EC4899]"
            }`}
          />
        </button>

        {/* Share Button */}
        <button
          type="button"
          aria-label={copiedShare ? "Link copied" : "Share event"}
          onClick={handleShareClick}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-90 text-white hover:text-[#7C3AED]"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          title={copiedShare ? "Link copied!" : "Share event"}
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col pointer-events-none">
        {/* Category Pill */}
        <span
          className="inline-block self-start font-mono text-[10px] text-white font-bold uppercase rounded-[3px] mb-2 pointer-events-auto"
          style={{
            background: "rgba(124, 58, 237, 0.85)",
            padding: "3px 10px",
          }}
        >
          {category}
        </span>

        {/* Title */}
        <h3
          className="font-sans font-bold text-[16px] text-white line-clamp-1 mb-1 tracking-tight"
          style={{ fontWeight: 700 }}
          title={title}
        >
          {title}
        </h3>

        {/* Venue + Area Row */}
        <div className="flex items-center gap-1 text-[11px] font-mono text-[#888888] truncate">
          <MapPin className="w-3 h-3 text-[#7C3AED] shrink-0" />
          <span className="truncate">
            {venue} · {area}
          </span>
        </div>

        {/* Date + Time Row */}
        <div className="font-mono text-[11px] text-[#666666] mt-0.5">
          {date} · {time}
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2.5 pt-1">
          {/* Left: Stacked Avatars + Going count */}
          <div className="flex items-center gap-2">
            {visibleAvatars.length > 0 && (
              <div className="flex items-center -space-x-1.5 overflow-hidden">
                {visibleAvatars.map((avatar, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={idx}
                    src={avatar}
                    alt="Attendee"
                    className="w-6 h-6 rounded-full object-cover border-2 border-black"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
            <span className="font-mono text-[11px] text-[#888888]">
              +{goingCount} going
            </span>
          </div>

          {/* Right: empty */}
          <div />
        </div>
      </div>
    </div>
  );
}
