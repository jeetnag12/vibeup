"use client";

import Link from "next/link";
import {
  UserPlus,
  Check,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  Compass,
} from "lucide-react";
import { Person } from "@/lib/people-data";

export interface PeopleCardProps {
  person: Person;
  isFollowing: boolean;
  onToggleFollow: (id: string) => void;
  variant?: "standard" | "compact" | "event-context";
  eventContext?: { id: string; name: string; date?: string };
  communityContext?: { id: string; name: string };
  clubContext?: { id: string; name: string };
}

export default function PeopleCard({
  person,
  isFollowing,
  onToggleFollow,
  variant = "standard",
  eventContext,
  communityContext,
  clubContext,
}: PeopleCardProps) {
  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFollow(person.id);
  };

  const isGoingOutTonight = person.activeStatus === "GOING OUT TONIGHT";
  const isOnline = person.activeStatus === "ONLINE";

  const displayContext =
    eventContext || (person.upcomingEvents.length > 0 ? person.upcomingEvents[0] : null);

  const displayCommunity =
    communityContext || (person.communities.length > 0 ? person.communities[0] : null);

  const displayClub =
    clubContext || (person.clubs.length > 0 ? person.clubs[0] : null);

  return (
    <article
      aria-label={`${person.name} profile card`}
      className={`group relative bg-[#1A1A21] rounded-[16px] border border-[#2A2A35] hover:border-[#8B5CF6] hover:shadow-[0_0_24px_rgba(139,92,246,0.18)] transition-all duration-200 flex flex-col justify-between h-full ${
        variant === "compact" ? "p-3 sm:p-4" : "p-4 sm:p-5"
      }`}
    >
      <div>
        {/* Top Header: Avatar + Active Status + Vibe Match */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <Link
            href={`/people/${person.id}`}
            className="relative shrink-0 block focus:outline-none"
            tabIndex={-1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#2A2A35] group-hover:border-[#8B5CF6]/60 transition-colors"
            />
            {/* Status dot */}
            <span
              title={person.activeStatus}
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#1A1A21] ${
                isGoingOutTonight
                  ? "bg-[#EC4899] ring-2 ring-[#EC4899]/30"
                  : isOnline
                  ? "bg-[#22C55E]"
                  : "bg-[#8B5CF6]"
              }`}
            />
          </Link>

          {/* Vibe Match Badge */}
          <div className="flex flex-col items-end">
            <span className="font-mono text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              <span>{person.vibeMatch}% VIBE MATCH</span>
            </span>

            <span className="font-mono text-[10px] text-[#A1A1AA] mt-1 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-[#EC4899]" />
              <span>{person.area}</span>
            </span>
          </div>
        </div>

        {/* Identity: Name & Username */}
        <div className="mb-2.5">
          <Link
            href={`/people/${person.id}`}
            className="font-sans font-bold text-sm sm:text-base text-white hover:text-[#8B5CF6] transition-colors truncate block"
          >
            {person.name}
          </Link>
          <span className="font-mono text-xs text-[#A1A1AA] block truncate">
            {person.username}
          </span>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-[#A1A1AA] font-sans line-clamp-2 leading-relaxed mb-3">
          {person.bio}
        </p>

        {/* Top Genre Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {person.genres.slice(0, 3).map((g) => (
            <span
              key={g}
              className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 rounded-md px-2 py-0.5"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Connections / Social Graph Context Signals */}
        <div className="space-y-1.5 pt-2 border-t border-[#2A2A35]/60 mb-4 text-[11px] font-mono">
          {/* Mutual Event Context */}
          {displayContext && (
            <div className="flex items-center gap-1.5 text-[#D4D4D8] truncate">
              <Calendar className="w-3 h-3 text-[#8B5CF6] shrink-0" />
              <span className="text-[#A1A1AA] shrink-0">GOING TO:</span>
              <Link
                href={`/events/${displayContext.id}`}
                className="text-white hover:text-[#8B5CF6] transition-colors truncate underline-offset-2 hover:underline"
              >
                {displayContext.name}
              </Link>
            </div>
          )}

          {/* Mutual Community Context */}
          {displayCommunity && (
            <div className="flex items-center gap-1.5 text-[#D4D4D8] truncate">
              <Users className="w-3 h-3 text-[#EC4899] shrink-0" />
              <span className="text-[#A1A1AA] shrink-0">COMMUNITY:</span>
              <Link
                href={`/communities/${displayCommunity.id}`}
                className="text-white hover:text-[#EC4899] transition-colors truncate underline-offset-2 hover:underline"
              >
                {displayCommunity.name}
              </Link>
            </div>
          )}

          {/* Club Affinity Context */}
          {displayClub && (
            <div className="flex items-center gap-1.5 text-[#D4D4D8] truncate">
              <Compass className="w-3 h-3 text-[#22C55E] shrink-0" />
              <span className="text-[#A1A1AA] shrink-0">REGULAR AT:</span>
              <Link
                href={`/clubs/${displayClub.id}`}
                className="text-white hover:text-[#22C55E] transition-colors truncate underline-offset-2 hover:underline"
              >
                {displayClub.name}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer: Follow Button & Profile Link */}
      <div className="pt-2 border-t border-[#2A2A35] flex items-center justify-between gap-3">
        <Link
          href={`/people/${person.id}`}
          className="text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
        >
          VIEW PROFILE →
        </Link>

        <button
          type="button"
          onClick={handleFollowClick}
          aria-label={isFollowing ? `Unfollow ${person.name}` : `Follow ${person.name}`}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
            isFollowing
              ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E]/25"
              : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
          }`}
        >
          {isFollowing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>FOLLOWING</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span>FOLLOW</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
