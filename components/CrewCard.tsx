"use client";

import Link from "next/link";
import {
  MapPin,
  Calendar,
  Check,
  Plus,
  Sparkles,
} from "@/components/icons";
import { Crew } from "@/lib/crews-data";

export interface CrewCardProps {
  crew: Crew;
  isJoined: boolean;
  onToggleJoin: (crewId: string) => void;
  variant?: "standard" | "compact";
}

export default function CrewCard({
  crew,
  isJoined,
  onToggleJoin,
  variant = "standard",
}: CrewCardProps) {
  const currentCount = isJoined ? crew.memberCount + 1 : crew.memberCount;
  const isFull = currentCount >= crew.maxMembers && !isJoined;

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFull) {
      onToggleJoin(crew.id);
    }
  };

  return (
    <article
      aria-label={`${crew.name} card`}
      className={`group relative bg-[#15151C] rounded-[12px] border border-[#25252F] hover:border-[#FFE14D] hover:shadow-[0_0_24px_rgba(255,225,77,0.18)] transition-all duration-200 flex flex-col justify-between overflow-hidden h-full ${
        variant === "compact" ? "p-3 sm:p-4" : "p-4 sm:p-5"
      }`}
    >
      <div>
        {/* Cover Image & Badges */}
        <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-[#0B0B10] mb-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={crew.coverImage}
            alt={crew.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15151C] via-transparent to-black/40 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
            <span className="font-mono text-[10px] font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
              {crew.type}
            </span>

            {crew.activityCount && (
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md ${
                  isFull
                    ? "bg-[#EF4444]/90 text-white"
                    : "bg-[#FFE14D]/90 text-white shadow-sm"
                }`}
              >
                {isFull ? "FULL" : crew.activityCount}
              </span>
            )}
          </div>

          {/* Bottom Area badge */}
          <div className="absolute bottom-2 left-2.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/90 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
              <MapPin className="w-3 h-3 text-[#FF4FA3]" />
              <span>{crew.area.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {/* Crew Title & Link to Detail */}
        <div className="mb-2">
          <Link
            href={`/crews/${crew.id}`}
            className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-[#FFE14D] transition-colors truncate block"
          >
            {crew.name}
          </Link>
          <p className="text-xs text-[#8E8C9C] font-sans line-clamp-2 leading-relaxed mt-1">
            {crew.description}
          </p>
        </div>

        {/* Event Connection Banner */}
        <div className="p-2.5 rounded-xl bg-[#15151C] border border-[#25252F]/80 space-y-1 mb-3 text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-[#FFE14D] shrink-0" />
            <Link
              href={`/events/${crew.eventId}`}
              className="font-sans font-bold text-white hover:text-[#FFE14D] transition-colors truncate underline-offset-2 hover:underline"
            >
              {crew.eventName}
            </Link>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8C9C]">
            <span className="truncate">{crew.venue}</span>
            <span className="shrink-0 text-white font-medium">
              {crew.date} · {crew.time}
            </span>
          </div>
        </div>

        {/* Community Origin (if any) */}
        {crew.communityContext && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D4D4D8] mb-3 truncate">
            <Sparkles className="w-3 h-3 text-[#FF4FA3] shrink-0" />
            <span className="text-[#8E8C9C] shrink-0">FROM:</span>
            <Link
              href={`/communities/${crew.communityContext.id}`}
              className="text-[#FF4FA3] hover:underline truncate"
            >
              {crew.communityContext.name}
            </Link>
          </div>
        )}

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {crew.genres.map((g) => (
            <span
              key={g}
              className="font-mono text-[10px] text-[#FFE14D] bg-[#FFE14D]/10 border border-[#FFE14D]/25 rounded-md px-2 py-0.5"
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Member avatars, capacity, and Join button */}
      <div className="pt-3 border-t border-[#25252F] flex items-center justify-between gap-3">
        {/* Member Avatars & Size count */}
        <div className="flex items-center gap-2 truncate">
          <div className="flex -space-x-2 overflow-hidden shrink-0">
            {crew.members.slice(0, 3).map((m) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={m.id}
                src={m.avatar}
                alt={m.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-[#15151C]"
              />
            ))}
          </div>

          <span
            className={`font-mono text-xs font-bold ${
              isFull ? "text-[#EF4444]" : "text-[#22C55E]"
            }`}
          >
            {currentCount} / {crew.maxMembers}
          </span>
        </div>

        {/* Join Button */}
        <button
          type="button"
          disabled={isFull}
          onClick={handleJoinClick}
          className={`px-3.5 py-1.5 rounded-[4px] text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            isJoined
              ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E]/25"
              : isFull
              ? "bg-[#25252F] text-[#8E8C9C] cursor-not-allowed border border-transparent"
              : "bg-[#FFE14D] hover:bg-[#F2CF2E] text-[#0B0B10] "
          }`}
        >
          {isJoined ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>JOINED</span>
            </>
          ) : isFull ? (
            <span>FULL</span>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>JOIN CREW</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
