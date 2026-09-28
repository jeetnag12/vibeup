"use client";

import { useState } from "react";
import { Heart, Calendar, MapPin } from "lucide-react";

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
}: EventCardProps) {
  const [isSaved, setIsSaved] = useState(saved);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (onSaveToggle) {
      onSaveToggle(nextSaved);
    }
  };

  const visibleAvatars = (avatars || []).slice(0, 3);

  return (
    <div
      onClick={onClick}
      className="group relative w-full bg-[#1A1A21] rounded-[16px] border border-[#2A2A35] overflow-hidden cursor-pointer transition-all duration-200 hover:border-[#8B5CF6] hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] hover:-translate-y-[2px] flex flex-col"
    >
      {/* Top Section — Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#141418]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Left: Category Pill */}
        <span
          className="absolute top-[12px] left-[12px] z-10 text-white font-mono rounded-full flex items-center justify-center font-medium shadow-sm pointer-events-none"
          style={{
            backgroundColor: "rgba(139, 92, 246, 0.9)",
            fontSize: "10px",
            letterSpacing: "0.06em",
            padding: "4px 10px",
          }}
        >
          {category}
        </span>

        {/* Top Right: Save Button */}
        <button
          type="button"
          aria-label={isSaved ? "Remove from saved" : "Save event"}
          onClick={handleHeartClick}
          className="absolute top-[12px] right-[12px] z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-90"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      </div>

      {/* Bottom Section — Info */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Event Title */}
          <h3
            className="text-white font-sans text-[16px] line-clamp-1 mb-2 tracking-tight group-hover:text-purple-200 transition-colors"
            style={{ fontWeight: 600 }}
            title={title}
          >
            {title}
          </h3>

          {/* Metadata Rows */}
          <div className="flex flex-col gap-1.5">
            {/* Date + Time Row */}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              <span className="font-mono text-[12px] text-[#A1A1AA] truncate">
                {date} · {time}
              </span>
            </div>

            {/* Venue + Area Row */}
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
              <span className="font-mono text-[12px] text-[#A1A1AA] truncate">
                {venue} · {area}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row (space-between) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#2A2A35] mt-1">
          {/* Left: Stacked avatars + Going count */}
          <div className="flex items-center gap-2">
            {visibleAvatars.length > 0 ? (
              <div className="flex items-center -space-x-2">
                {visibleAvatars.map((avatarUrl, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index}
                    src={avatarUrl}
                    alt="Attendee avatar"
                    className="w-6 h-6 rounded-full object-cover border-2 border-[#1A1A21]"
                  />
                ))}
              </div>
            ) : null}

            <span className="font-mono text-[11px] text-[#A1A1AA]">
              +{goingCount} going
            </span>
          </div>

          {/* Right: Price */}
          <span
            className="text-white font-sans text-[16px] tracking-tight shrink-0"
            style={{ fontWeight: 600 }}
          >
            {price.startsWith("From") || price.startsWith("₹")
              ? price
              : `From ₹${price}`}
          </span>
        </div>
      </div>
    </div>
  );
}
