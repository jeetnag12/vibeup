"use client";

import Link from "next/link";
import { Users, MapPin, Check, Plus } from "lucide-react";
import { Community } from "@/lib/communities-data";

interface CommunityCardProps {
  community: Community;
  isJoined: boolean;
  onToggleJoin: (communityId: string) => void;
  variant?: "standard" | "featured";
}

export default function CommunityCard({
  community,
  isJoined,
  onToggleJoin,
  variant = "standard",
}: CommunityCardProps) {
  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleJoin(community.id);
  };

  const isFeatured = variant === "featured";
  const displayedCount = isJoined
    ? community.memberCount + 1
    : community.memberCount;

  return (
    <article
      aria-label={community.name}
      className={`group relative bg-[#1A1A21] rounded-[16px] border border-[#2A2A35] overflow-hidden transition-all duration-200 hover:border-[#8B5CF6] hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(139,92,246,0.18)] flex flex-col justify-between ${
        isFeatured ? "shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : ""
      }`}
    >
      <Link href={`/communities/${community.id}`} className="block flex-1">
        {/* Cover Image */}
        <div
          className={`relative w-full overflow-hidden bg-[#09090B] ${
            isFeatured ? "h-[190px] sm:h-[220px]" : "h-[160px] sm:h-[180px]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={community.coverImage}
            alt={community.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A21] via-transparent to-black/35 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="font-mono text-[10px] font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
              {community.category}
            </span>

            {community.activityCount && (
              <span className="font-mono text-[10px] font-bold text-white bg-[#8B5CF6]/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                {community.activityCount}
              </span>
            )}
          </div>

          {/* Location badge on bottom left of image */}
          <div className="absolute bottom-2.5 left-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/90 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
              <MapPin className="w-3 h-3 text-[#EC4899]" />
              <span className="truncate max-w-[180px]">{community.location.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
          <div>
            {/* Title */}
            <h3
              className="text-white font-sans font-bold text-base sm:text-lg tracking-tight line-clamp-1 group-hover:text-[#8B5CF6] transition-colors mb-1.5"
              title={community.name}
            >
              {community.name}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans line-clamp-2 leading-relaxed mb-3.5">
              {community.description}
            </p>

            {/* Genres / Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {community.genres.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 rounded-md px-2 py-0.5"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Footer of body: Avatars + Member count */}
          <div className="pt-3 border-t border-[#2A2A35] flex items-center justify-between gap-3 text-xs font-mono">
            {/* Avatar Stack */}
            <div className="flex items-center gap-2">
              <div className="flex items-center -space-x-2 overflow-hidden">
                {community.members.slice(0, 3).map((m) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={m.id}
                    src={m.avatar}
                    alt={m.name}
                    className="w-6 h-6 rounded-full object-cover border-2 border-[#1A1A21]"
                  />
                ))}
              </div>
              <span className="text-white font-bold inline-flex items-center gap-1">
                <Users className="w-3 h-3 text-[#22C55E]" />
                {displayedCount.toLocaleString()}
              </span>
            </div>

            <span className="text-[#8B5CF6] font-mono text-[11px] group-hover:translate-x-0.5 transition-transform inline-flex items-center">
              EXPLORE →
            </span>
          </div>
        </div>
      </Link>

      {/* Action Footer: JOIN button */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
        <button
          type="button"
          onClick={handleJoinClick}
          aria-label={
            isJoined ? `Leave ${community.name}` : `Join ${community.name}`
          }
          className={`w-full h-9 rounded-xl border text-xs font-mono font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
            isJoined
              ? "border-[#22C55E] bg-[#22C55E]/15 text-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.25)]"
              : "border-[#2A2A35] bg-[#141418] text-[#A1A1AA] hover:border-[#8B5CF6] hover:text-white"
          }`}
        >
          {isJoined ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>JOINED</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>JOIN COMMUNITY</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
