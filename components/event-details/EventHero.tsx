"use client";

import { useState } from "react";
import { Bookmark, Share2, MapPin, Calendar, Clock, Check } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface EventHeroProps {
  event: DetailedEvent;
  onGetTicketsClick: () => void;
}

export default function EventHero({ event, onGetTicketsClick }: EventHeroProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out ${event.title} at ${event.venue} on VibeUp!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Event Poster / Image */}
        <div className="lg:col-span-5 w-full">
          <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-[16px] overflow-hidden border border-[#2A2A35] bg-[#141418] shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="eager"
            />

            {/* Category Overlay Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#09090B]/80 backdrop-blur-md border border-[#2A2A35]">
              <span className="font-mono text-[11px] text-[#8B5CF6] font-medium tracking-wider uppercase">
                {event.category}
              </span>
            </div>

            {/* Age Badge */}
            <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-[#09090B]/80 backdrop-blur-md border border-[#2A2A35]">
              <span className="font-mono text-[11px] text-[#A1A1AA] font-medium">
                {event.ageRestriction}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Event Information */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Category / Genre Label */}
            <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-[0.15em] font-medium mb-3">
              {event.category}
            </p>

            {/* Large Event Title */}
            <h1
              className="text-3xl sm:text-5xl lg:text-5xl font-bold font-sans text-white tracking-tight leading-[1.08] mb-6"
              style={{ fontWeight: 700 }}
            >
              {event.title}
            </h1>

            {/* Key Schedule & Venue Info */}
            <div className="space-y-3.5 mb-6 text-sm sm:text-base">
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded-lg bg-[#141418] border border-[#2A2A35] flex items-center justify-center text-[#8B5CF6] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono font-medium">{event.dateDisplay}</span>
                  <span className="text-[#A1A1AA] font-mono text-sm ml-2">
                    · {event.timeDisplay}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded-lg bg-[#141418] border border-[#2A2A35] flex items-center justify-center text-[#EC4899] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold">{event.venue}</span>
                  <span className="text-[#A1A1AA] text-sm ml-2">
                    · {event.area}, {event.city}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#A1A1AA]">
                <div className="w-8 h-8 rounded-lg bg-[#141418] border border-[#2A2A35] flex items-center justify-center text-[#22C55E] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="font-mono text-xs sm:text-sm">
                  <span>{event.timeRange}</span>
                  <span className="mx-2">·</span>
                  <span className="text-white font-medium">{event.ageRestriction}</span>
                </div>
              </div>
            </div>

            {/* Price Highlight */}
            <div className="mb-8 p-4 rounded-xl bg-[#141418] border border-[#2A2A35] inline-flex items-baseline gap-2">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase">Tickets:</span>
              <span className="text-2xl font-bold font-sans text-white">
                ₹{event.startingPrice}
              </span>
              <span className="text-xs text-[#A1A1AA] font-mono">onwards</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-[#2A2A35]">
            {/* Primary CTA: GET TICKETS */}
            <button
              type="button"
              onClick={onGetTicketsClick}
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-[0_0_24px_rgba(139,92,246,0.3)] active:scale-95"
            >
              GET TICKETS
            </button>

            {/* SAVE Button */}
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              aria-label={isSaved ? "Saved to your list" : "Save event"}
              className={`px-5 py-3.5 rounded-xl border font-sans text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isSaved
                  ? "bg-[#1A1A21] border-[#EC4899] text-[#EC4899]"
                  : "bg-[#141418] border-[#2A2A35] text-white hover:border-[#8B5CF6]"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#EC4899]" : ""}`} />
              <span className="hidden sm:inline">{isSaved ? "SAVED" : "SAVE"}</span>
            </button>

            {/* SHARE Button */}
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share event"
              className="px-5 py-3.5 rounded-xl bg-[#141418] border border-[#2A2A35] text-white hover:border-[#8B5CF6] font-sans text-sm font-medium transition-all duration-200 flex items-center gap-2 relative"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span className="hidden sm:inline text-[#22C55E]">COPIED!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#A1A1AA]" />
                  <span className="hidden sm:inline">SHARE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
