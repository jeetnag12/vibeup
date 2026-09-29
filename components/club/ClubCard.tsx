"use client";

import Link from "next/link";
import { MapPin, Calendar, Users, Star, Bookmark } from "lucide-react";
import { Club } from "@/lib/clubs-data";

interface ClubCardProps {
  club: Club;
  isFollowing: boolean;
  onToggleFollow: (clubId: string) => void;
  showUpcomingBadge?: boolean;
  saved?: boolean;
  onSaveToggle?: (clubId: string, isSaved: boolean) => void;
}

export default function ClubCard({
  club,
  isFollowing,
  onToggleFollow,
  showUpcomingBadge = true,
  saved,
  onSaveToggle,
}: ClubCardProps) {
  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFollow(club.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSaveToggle) {
      onSaveToggle(club.id, !saved);
    }
  };

  return (
    <article
      aria-label={club.name}
      className="group relative w-full bg-[#111111] rounded-[12px] border border-[#1A1A1A] overflow-hidden transition-all duration-200 hover:border-[#8B5CF6] hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(139,92,246,0.2)] flex flex-col justify-between"
    >
      <Link href={`/clubs/${club.id}`} className="block flex-1">
        {/* Top: Club Photo */}
        <div className="relative w-full h-[180px] overflow-hidden bg-[#000000]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30 pointer-events-none" />

          {/* Badges on image */}
          <div
            className={`absolute top-3 left-3 flex items-center justify-between gap-2 pointer-events-none ${
              onSaveToggle ? "right-12" : "right-3"
            }`}
          >
            {club.openTonight ? (
              <span className="font-mono text-[10px] font-bold text-white bg-[#22C55E]/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                OPEN TONIGHT
              </span>
            ) : club.isNew ? (
              <span className="font-mono text-[10px] font-bold text-white bg-[#8B5CF6]/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                NEW VENUE
              </span>
            ) : (
              <span className="font-mono text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                {club.area.toUpperCase()}
              </span>
            )}

            {club.rating && (
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-400 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{club.rating.toFixed(1)}</span>
              </span>
            )}
          </div>

          {/* Top Right: Bookmark Button */}
          {onSaveToggle && (
            <button
              type="button"
              aria-label={saved ? `Remove ${club.name} from saved` : `Save ${club.name}`}
              onClick={handleSaveClick}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-90 bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#8B5CF6]"
            >
              <Bookmark
                className={`w-4 h-4 transition-colors duration-200 ${
                  saved
                    ? "fill-[#8B5CF6] text-[#8B5CF6]"
                    : "text-white hover:text-[#8B5CF6]"
                }`}
              />
            </button>
          )}

          {/* Upcoming Event Count Pill */}
          {showUpcomingBadge && club.upcomingEventsCount > 0 && (
            <div className="absolute bottom-2.5 left-3">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                <Calendar className="w-3 h-3 text-[#8B5CF6]" />
                <span>{club.upcomingEventsCount} EVENTS THIS WEEK</span>
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
          <div>
            {/* Club Name & Area */}
            <div className="mb-2">
              <h3
                className="text-white font-sans font-bold text-lg tracking-tight line-clamp-1 group-hover:text-[#8B5CF6] transition-colors"
                title={club.name}
              >
                {club.name}
              </h3>

              <div className="flex items-center gap-1 text-[11px] font-mono text-[#666666] mt-0.5">
                <MapPin className="w-3 h-3 text-[#EC4899] shrink-0" />
                <span className="truncate">{club.location || club.area}</span>
              </div>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {club.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 rounded-md px-2 py-0.5"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Social Signal */}
            {club.socialSignal && (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#666666] mb-3 bg-[#111111] border border-[#1A1A1A] px-2.5 py-1 rounded-lg">
                <Users className="w-3 h-3 text-[#22C55E] shrink-0" />
                <span className="truncate">{club.socialSignal}</span>
              </div>
            )}
          </div>

          <div>
            {/* Followers Stats */}
            <div className="flex items-center justify-between pt-2.5 border-t border-[#1A1A1A] text-xs font-mono text-[#666666] mb-3">
              <span>{club.followersDisplay} FOLLOWERS</span>
              <span className="text-[#8B5CF6] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                VIEW →
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Footer Follow Button */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
        <button
          type="button"
          onClick={handleFollowClick}
          aria-label={isFollowing ? `Unfollow ${club.name}` : `Follow ${club.name}`}
          className={`w-full h-9 rounded-[4px] border text-xs font-mono font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
            isFollowing
              ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-white "
              : "border-[#1A1A1A] bg-[#111111] text-[#666666] hover:border-[#8B5CF6] hover:text-white"
          }`}
        >
          {isFollowing ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              <span>FOLLOWING ✓</span>
            </>
          ) : (
            <span>FOLLOW CLUB</span>
          )}
        </button>
      </div>
    </article>
  );
}
