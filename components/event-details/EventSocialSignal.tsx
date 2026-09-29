"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface EventSocialSignalProps {
  event: DetailedEvent;
}

export default function EventSocialSignal({ event }: EventSocialSignalProps) {
  const visibleAvatars = event.goingAvatars.slice(0, 4);
  const remainingCount = Math.max(0, event.goingCount - visibleAvatars.length);

  return (
    <Link
      href={`/events/${event.id}/going`}
      className="group block w-full mt-6 p-4 sm:p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Prominent Numbers & Avatars */}
        <div className="flex items-center gap-4">
          {/* Overlapping Avatar Stack */}
          <div className="flex items-center -space-x-3 shrink-0">
            {visibleAvatars.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt="Going attendee"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#111111] shadow-md"
              />
            ))}
            {remainingCount > 0 && (
              <div className="w-10 h-10 rounded-full bg-[#111111] border-2 border-[#111111] flex items-center justify-center text-xs font-mono font-bold text-white shadow-md">
                +{remainingCount}
              </div>
            )}
          </div>

          {/* Social Counts */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight group-hover:text-purple-200 transition-colors">
                {event.goingCount} people
              </span>
              <span className="text-xs sm:text-sm font-sans text-[#666666]">
                are going
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="font-mono text-xs sm:text-sm text-[#8B5CF6] font-medium">
                {event.vibeCount} people you might vibe with
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive cue */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#666666] group-hover:text-white transition-colors self-end sm:self-center">
          <span>See who&apos;s going</span>
          <ArrowRight className="w-4 h-4 text-[#8B5CF6] transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
