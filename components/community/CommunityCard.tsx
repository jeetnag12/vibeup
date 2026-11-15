"use client";

import Link from "next/link";
import { Users, MapPin, Check, Plus, Bookmark } from "@/components/icons";
import { Community } from "@/lib/communities-data";

interface CommunityCardProps {
  community: Community;
  isJoined: boolean;
  onToggleJoin: (communityId: string) => void;
  variant?: "standard" | "featured";
  saved?: boolean;
  onSaveToggle?: (communityId: string, isSaved: boolean) => void;
}

export default function CommunityCard({
  community,
  isJoined,
  onToggleJoin,
  variant = "standard",
  saved,
  onSaveToggle,
}: CommunityCardProps) {
  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleJoin(community.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSaveToggle) {
      onSaveToggle(community.id, !saved);
    }
  };

  const isFeatured = variant === "featured";
  const displayedCount = isJoined
    ? community.memberCount + 1
    : community.memberCount;

  return (
    <article
      aria-label={community.name}
      className={`group relative bg-[#15151C] rounded-[12px] border border-[#25252F] overflow-hidden transition-all duration-200 hover:border-[#FFE14D] hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,225,77,0.18)] flex flex-col justify-between ${
        isFeatured ? "" : ""
      }`}
    >
      <Link href={`/communities/${community.id}`} className="block flex-1">
        {/* Cover Image */}
        <div
          className={`relative w-full overflow-hidden bg-[#0B0B10] ${
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

          <div className="absolute inset-0 bg-gradient-to-t from-[#15151C] via-transparent to-black/35 pointer-events-none" />

          {/* Top Badges */}
          <div
            className={`absolute top-3 left-3 flex items-center justify-between gap-2 pointer-events-none ${
              onSaveToggle ? "right-12" : "right-3"
            }`}
          >
            <span className="font-mono text-[10px] font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
              {community.category}
            </span>

            {community.activityCount && (
              <span className="font-mono text-[10px] font-bold text-white bg-[#FFE14D]/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                {community.activityCount}
              </span>
            )}
          </div>

          {/* Top Right: Bookmark Button */}
          {onSaveToggle && (
            <button
              type="button"
              aria-label={
                saved ? `Remove ${community.name} from saved` : `Save ${community.name}`
              }
              onClick={handleSaveClick}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-90 bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#FFE14D]"
            >
              <Bookmark weight={saved ? "fill" : "bold"}
 className={`w-4 h-4 transition-colors duration-200 ${
 saved
 ? " text-[#FFE14D]"
 : "text-white hover:text-[#FFE14D]"
 }`}
 />
            </button>
          )}

          {/* Location badge on bottom left of image */}
          <div className="absolute bottom-2.5 left-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/90 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
              <MapPin className="w-3 h-3 text-[#FF4FA3]" />
              <span className="truncate max-w-[180px]">{community.location.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
          <div>
            {/* Title */}
            <h3
              className="text-white font-sans font-bold text-base sm:text-lg tracking-tight line-clamp-1 group-hover:text-[#FFE14D] transition-colors mb-1.5"
              title={community.name}
            >
              {community.name}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans line-clamp-2 leading-relaxed mb-3.5">
              {community.description}
            </p>

            {/* Genres / Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {community.genres.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="font-mono text-[10px] text-[#FFE14D] bg-[#FFE14D]/10 border border-[#FFE14D]/25 rounded-md px-2 py-0.5"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Footer of body: Avatars + Member count */}
          <div className="pt-3 border-t border-[#25252F] flex items-center justify-between gap-3 text-xs font-mono">
            {/* Avatar Stack */}
            <div className="flex items-center gap-2">
              <div className="flex items-center -space-x-2 overflow-hidden">
                {community.members.slice(0, 3).map((m) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={m.id}
                    src={m.avatar}
                    alt={m.name}
                    className="w-6 h-6 rounded-full object-cover border-2 border-[#15151C]"
                  />
                ))}
              </div>
              <span className="text-white font-bold inline-flex items-center gap-1">
                <Users className="w-3 h-3 text-[#22C55E]" />
                {displayedCount.toLocaleString()}
              </span>
            </div>

            <span className="text-[#FFE14D] font-mono text-[11px] group-hover:translate-x-0.5 transition-transform inline-flex items-center">
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
          className={`w-full h-9 rounded-[4px] border text-xs font-mono font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
            isJoined
              ? "border-[#22C55E] bg-[#22C55E]/15 text-[#22C55E] "
              : "border-[#25252F] bg-[#15151C] text-[#8E8C9C] hover:border-[#FFE14D] hover:text-white"
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
