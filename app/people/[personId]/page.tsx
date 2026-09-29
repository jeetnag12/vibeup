"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import PeopleCard from "@/components/PeopleCard";
import {
  MapPin,
  Users,
  Calendar,
  Sparkles,
  Share2,
  Check,
  UserPlus,
  Bookmark,
  ArrowRight,
  Flame,
  Radio,
  Clock,
  Compass,
  Star,
  Award,
  Layers,
} from "lucide-react";
import {
  getDetailedPersonProfile,
  DetailedPersonProfile,
} from "@/lib/people-data";

export default function PersonProfilePage() {
  const params = useParams();
  const router = useRouter();
  const rawId =
    (params?.personId as string) || (params?.userId as string) || "arjun-wav";

  const person: DetailedPersonProfile = useMemo(() => {
    return getDetailedPersonProfile(rawId);
  }, [rawId]);

  // Local interaction states
  const [isFollowing, setIsFollowing] = useState(person.following);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Recommendations follow states
  const [suggestedFollowing, setSuggestedFollowing] = useState<
    Record<string, boolean>
  >({});

  const toggleSuggestedFollow = (id: string) => {
    setSuggestedFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${person.name} (${person.username}) on VibeUp`,
          text: person.bio,
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const displayedFollowers = isFollowing
    ? person.followersCount + 1
    : person.followersCount;

  const isGoingOutTonight = person.activeStatus === "GOING OUT TONIGHT";
  const isOnline = person.activeStatus === "ONLINE";

  // Map icon name to Lucide component for Badges
  const renderBadgeIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-4 h-4" style={{ color }} />;
      case "Flame":
        return <Flame className="w-4 h-4" style={{ color }} />;
      case "Users":
        return <Users className="w-4 h-4" style={{ color }} />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4" style={{ color }} />;
      default:
        return <Award className="w-4 h-4" style={{ color }} />;
    }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[88px] sm:pt-[96px] pb-[80px]">
        {/* Ambient Top Glow Blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[420px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 space-y-10">
          {/* ==================================================
              1. BREADCRUMB
          ================================================== */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-between gap-3 text-xs font-mono text-[#666666]"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href="/discover"
                className="hover:text-white transition-colors"
              >
                DISCOVER
              </Link>
              <span>/</span>
              <Link href="/people" className="hover:text-white transition-colors">
                PEOPLE
              </Link>
              <span>/</span>
              <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none uppercase">
                {person.name}
              </span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share person profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#111111] hover:bg-[#111111] border border-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {copiedLink ? "COPIED URL ✓" : "SHARE PROFILE"}
              </span>
            </button>
          </nav>

          {/* ==================================================
              2. PROFILE HEADER & ACTIONS
          ================================================== */}
          <section
            aria-label="Profile Header"
            className="p-6 sm:p-8 lg:p-10 rounded-[12px] bg-[#111111] border border-[#1A1A1A] shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Gradient Accent */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              {/* Left Side: Avatar & Bio */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-3xl">
                {/* Large Avatar with Status Ring */}
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#1A1A1A] shadow-xl"
                  />
                  {/* Active Status Badge */}
                  <span
                    title={person.activeStatus}
                    className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-[#111111] ${
                      isGoingOutTonight
                        ? "bg-[#EC4899] ring-4 ring-[#EC4899]/20"
                        : isOnline
                        ? "bg-[#22C55E]"
                        : "bg-[#8B5CF6]"
                    }`}
                  />
                </div>

                {/* Identity & Details */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                      {person.name}
                    </h1>
                    <span className="font-mono text-sm text-[#666666]">
                      {person.username}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isGoingOutTonight
                          ? "bg-[#EC4899]/15 text-[#EC4899] border-[#EC4899]/30"
                          : isOnline
                          ? "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30"
                          : "bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30"
                      }`}
                    >
                      {person.activeStatus}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed">
                    {person.bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#666666] pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[#EC4899]">
                      <MapPin className="w-3.5 h-3.5" />
                      {person.area.toUpperCase()}, {person.location.toUpperCase()}
                    </span>

                    {/* Social Counts (Section 8) */}
                    <span className="inline-flex items-center gap-1 text-white font-bold">
                      <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      {displayedFollowers.toLocaleString()} FOLLOWERS
                    </span>
                    <span className="text-[#666666]">
                      · {person.followingCount} FOLLOWING
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Follow & Share Actions */}
              <div className="shrink-0 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex-1 sm:flex-initial px-6 py-3.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isFollowing
                      ? "bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white "
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>FOLLOWING</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>FOLLOW</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  aria-label="Save profile"
                  className={`px-4 py-3.5 rounded-xl border font-mono text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isSaved
                      ? "bg-[#EC4899]/20 border-[#EC4899] text-[#EC4899]"
                      : "bg-[#111111] hover:bg-[#1A1A1A] border-[#1A1A1A] text-[#666666] hover:text-white"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? "fill-[#EC4899]" : ""}`}
                  />
                  <span className="hidden sm:inline">
                    {isSaved ? "SAVED ✓" : "SAVE"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share person profile"
                  className="px-4 py-3.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-[#666666] hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {copiedLink ? "COPIED" : "SHARE"}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* ==================================================
              MAIN BALANCED TWO-COLUMN LAYOUT
              LEFT: Vibe Identity, Music Taste, Upcoming Events, Event History
              RIGHT: Nightlife Stats, Favourite Clubs, Communities, Badges
          ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ----------------- LEFT COLUMN (7 Cols) ----------------- */}
            <div className="lg:col-span-7 space-y-8">
              {/* 9. VIBE IDENTITY (THE VIBE) */}
              <section
                aria-label="Vibe Identity"
                className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                      THE VIBE
                    </h2>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-md">
                    {person.vibeMatch}% VIBE MATCH
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Top Genres */}
                  <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                    <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider block mb-1.5">
                      TOP GENRES
                    </span>
                    <div className="space-y-1">
                      {person.genres.map((g) => (
                        <span
                          key={g}
                          className="font-sans text-xs font-bold text-white block truncate"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Favourite Nights */}
                  <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                    <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider block mb-1.5">
                      FAVOURITE NIGHTS
                    </span>
                    <div className="space-y-1">
                      {person.favouriteNights.map((night) => (
                        <span
                          key={night}
                          className="font-sans text-xs font-bold text-white block"
                        >
                          {night}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Favourite Areas */}
                  <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                    <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider block mb-1.5">
                      FAVOURITE AREAS
                    </span>
                    <div className="space-y-1">
                      {person.favouriteAreas.map((area) => (
                        <span
                          key={area}
                          className="font-sans text-xs font-bold text-white block truncate"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 10. VIBE TAGS */}
                <div className="pt-2">
                  <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider block mb-2.5">
                    VIBE TAGS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {person.vibeTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl bg-[#111111] hover:bg-[#252530] border border-[#1A1A1A] text-xs font-mono text-white transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* 11. INTERESTS & GENRES (MUSIC TASTE & INTERESTS) */}
              <section
                aria-label="Music Taste & Interests"
                className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-5"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Flame className="w-4 h-4 text-[#EC4899]" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#EC4899] uppercase tracking-wider">
                      MUSIC TASTE
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {person.musicTaste.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-white font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1A1A1A]">
                  <span className="font-mono text-[11px] text-[#666666] uppercase tracking-wider block mb-2.5">
                    INTERESTS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {person.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-lg bg-[#111111] border border-[#1A1A1A] text-xs font-sans text-[#D4D4D8]"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* 12. UPCOMING EVENTS */}
              <section aria-label="Upcoming Events" className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                      UPCOMING EVENTS
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#666666]">
                    {person.upcomingEvents.length} GOING
                  </span>
                </div>

                {person.upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {person.upcomingEvents.map((evt) => (
                      <EventCard
                        key={evt.id}
                        image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop"
                        category="TECHNO"
                        title={evt.name}
                        date={evt.date}
                        time="10:00 PM – 3:00 AM"
                        venue="Basement Vault"
                        area="CBD, Bangalore"
                        price="₹899"
                        goingCount={420}
                        avatars={[
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
                        ]}
                        onClick={() => router.push(`/events/${evt.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center rounded-[12px] bg-[#111111] border border-[#1A1A1A] text-xs font-mono text-[#666666]">
                    No upcoming events on this schedule.
                  </div>
                )}
              </section>

              {/* 13. EVENT HISTORY (RECENTLY ATTENDED) */}
              <section aria-label="Event History" className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#22C55E]" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#22C55E] uppercase tracking-wider">
                      RECENTLY ATTENDED
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#666666]">
                    EVENT PASSPORT
                  </span>
                </div>

                <div className="space-y-2.5">
                  {person.attendedEvents.map((item) => (
                    <Link
                      key={item.id}
                      href={`/events/${item.id}`}
                      className="p-3.5 rounded-[4px] bg-[#111111] hover:bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all flex items-center justify-between gap-4 group"
                    >
                      <div className="truncate">
                        <span className="font-sans font-bold text-xs sm:text-sm text-white group-hover:text-[#8B5CF6] transition-colors block truncate">
                          {item.name}
                        </span>
                        <span className="font-mono text-[11px] text-[#666666] block truncate">
                          {item.venue}
                        </span>
                      </div>

                      <div className="text-right shrink-0 flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded">
                          {item.genre}
                        </span>
                        <span className="font-mono text-xs text-[#666666]">
                          {item.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* ----------------- RIGHT COLUMN (5 Cols) ----------------- */}
            <div className="lg:col-span-5 space-y-8">
              {/* 18. VIBE STATS (NIGHTLIFE STATS) */}
              <section
                aria-label="Nightlife Stats"
                className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                      NIGHTLIFE STATS
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-[#22C55E]">
                    ACTIVITY VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                      {person.stats.eventsAttended}
                    </div>
                    <div className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                      EVENTS ATTENDED
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                      {person.stats.clubsVisited}
                    </div>
                    <div className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                      CLUBS VISITED
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                      {person.stats.communitiesCount}
                    </div>
                    <div className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                      COMMUNITIES
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                      {person.stats.crewsJoined}
                    </div>
                    <div className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                      CREWS JOINED
                    </div>
                  </div>
                </div>
              </section>

              {/* 14. FAVOURITE CLUBS */}
              <section aria-label="Favourite Clubs" className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#22C55E]" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#22C55E] uppercase tracking-wider">
                      FAVOURITE CLUBS
                    </h2>
                  </div>
                  <Link
                    href="/clubs"
                    className="font-mono text-xs text-[#666666] hover:text-white transition-colors"
                  >
                    EXPLORE CLUBS →
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {person.favouriteClubsList.map((club) => (
                    <Link
                      key={club.id}
                      href={`/clubs/${club.id}`}
                      className="p-3 rounded-[4px] bg-[#111111] hover:bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={club.image}
                          alt={club.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#1A1A1A] shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-sans font-bold text-xs sm:text-sm text-white group-hover:text-[#8B5CF6] transition-colors block truncate">
                            {club.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#666666] block truncate">
                            {club.area}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-xs text-amber-400 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{club.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* 15. COMMUNITIES */}
              <section aria-label="Communities" className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                      COMMUNITIES
                    </h2>
                  </div>
                  <Link
                    href="/communities"
                    className="font-mono text-xs text-[#666666] hover:text-white transition-colors"
                  >
                    ALL COMMUNITIES →
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {person.communitiesList.map((comm) => (
                    <Link
                      key={comm.id}
                      href={`/communities/${comm.id}`}
                      className="p-3 rounded-[4px] bg-[#111111] hover:bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={comm.image}
                          alt={comm.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#1A1A1A] shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-sans font-bold text-xs sm:text-sm text-white group-hover:text-[#8B5CF6] transition-colors block truncate">
                            {comm.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#22C55E] block">
                            {comm.memberCountDisplay} Members
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-[#666666] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>

              {/* 19. PROFILE BADGES */}
              <section
                aria-label="Profile Badges"
                className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-amber-400 uppercase tracking-wider">
                      BADGES
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#666666]">
                    {person.badges.length} EARNED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {person.badges.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center gap-2.5"
                    >
                      <div className="p-2 rounded-lg bg-black/40 shrink-0">
                        {renderBadgeIcon(b.iconName, b.color)}
                      </div>
                      <div className="truncate">
                        <span className="font-sans font-bold text-[11px] text-white block truncate">
                          {b.title}
                        </span>
                        <span className="font-mono text-[9px] text-[#666666] block">
                          {b.requirement}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* ==================================================
              16. RECENT ACTIVITY (Full Width)
          ================================================== */}
          <section aria-label="Recent Activity" className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                  RECENT ACTIVITY
                </h2>
              </div>
              <span className="font-mono text-xs text-[#666666]">TIMELINE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {person.activityFeed.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl bg-[#111111] border border-[#1A1A1A] flex flex-col justify-between gap-2"
                >
                  <div className="font-sans text-xs">
                    <span className="text-[#666666] mr-1.5">{act.text}</span>
                    {act.link ? (
                      <Link
                        href={act.link}
                        className="font-bold text-white hover:text-[#8B5CF6] transition-colors underline-offset-2 hover:underline"
                      >
                        {act.target}
                      </Link>
                    ) : (
                      <span className="font-bold text-white">{act.target}</span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-[#666666]">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================
              17. SOCIAL CONNECTIONS ("PEOPLE YOU MAY KNOW")
          ================================================== */}
          <section aria-label="People You May Know" className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#1A1A1A] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-[#EC4899]" />
                  <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#EC4899] uppercase tracking-wider">
                    PEOPLE YOU MAY KNOW
                  </h2>
                </div>
                <p className="text-sm text-[#666666] font-sans">
                  Partygoers and friends in common across Bangalore.
                </p>
              </div>

              <Link
                href="/people"
                className="font-mono text-xs text-[#666666] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>EXPLORE ALL PEOPLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {person.peopleYouMayKnow.map((item) => (
                <PeopleCard
                  key={item.id}
                  person={item}
                  isFollowing={Boolean(suggestedFollowing[item.id])}
                  onToggleFollow={toggleSuggestedFollow}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Share Toast Notification */}
      {copiedLink && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#111111] border border-[#8B5CF6] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom"
        >
          <Check className="w-4 h-4 text-[#8B5CF6]" />
          <span>Profile link copied to clipboard!</span>
        </div>
      )}

      <Footer />
    </main>
  );
}
