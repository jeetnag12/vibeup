"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import CommunityCard from "@/components/community/CommunityCard";
import {
  Users,
  MapPin,
  Calendar,
  Sparkles,
  Share2,
  Check,
  Plus,
  Bookmark,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Flame,
  Radio,
  Clock,
  ShieldCheck,
  Eye,
} from "lucide-react";
import {
  getDetailedCommunityById,
  DetailedCommunity,
} from "@/lib/communities-data";

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.communityId as string) || "bangalore-techno-society";

  const community: DetailedCommunity = useMemo(() => {
    return getDetailedCommunityById(rawId);
  }, [rawId]);

  // Local state for actions
  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  // Related communities join states
  const [joinedRelated, setJoinedRelated] = useState<Record<string, boolean>>(
    {}
  );

  const toggleRelatedJoin = (id: string) => {
    setJoinedRelated((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: community.name,
          text: community.description,
          url: url,
        });
        return;
      } catch {
        // User cancelled or unsupported, fallback to clipboard
      }
    }

    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const displayedMemberCount = isJoined
    ? community.memberCount + 1
    : community.memberCount;

  const displayedMemberCountString = isJoined
    ? `${(displayedMemberCount / 1000).toFixed(1)}K`
    : community.memberCountDisplay;

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[88px] sm:pt-[96px] pb-[80px]">
        {/* Ambient Top Glow Blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.07) 45%, transparent 70%)",
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
              <Link
                href="/communities"
                className="hover:text-white transition-colors"
              >
                COMMUNITIES
              </Link>
              <span>/</span>
              <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
                {community.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share community link"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#111111] hover:bg-[#111111] border border-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {copiedLink ? "COPIED URL ✓" : "SHARE"}
                </span>
              </button>
            </div>
          </nav>

          {/* ==================================================
              2. COMMUNITY HERO & ACTIONS
          ================================================== */}
          <section
            aria-label="Community Hero"
            className="rounded-[12px] bg-[#111111] border border-[#1A1A1A] overflow-hidden shadow-2xl relative"
          >
            {/* Cover Image Container */}
            <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[440px] bg-[#000000] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={community.coverImage}
                alt={community.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-black/30" />

              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 uppercase tracking-wider shadow-lg">
                    {community.category} · {community.location.toUpperCase()}
                  </span>
                  {community.trending && (
                    <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs font-bold text-[#EC4899] bg-[#EC4899]/15 border border-[#EC4899]/30 backdrop-blur-md px-3 py-1 rounded-full">
                      <Flame className="w-3.5 h-3.5" />
                      TRENDING
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white bg-[#8B5CF6]/90 backdrop-blur-md px-3.5 py-1 rounded-full shadow-lg">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    {community.activityCount || "ACTIVE TODAY"}
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Information & Action Bar */}
            <div className="p-6 sm:p-8 lg:p-10 -mt-12 sm:-mt-16 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl space-y-4">
                {/* Genres */}
                <div className="flex flex-wrap items-center gap-2">
                  {community.genres.map((g) => (
                    <span
                      key={g}
                      className="font-mono text-xs text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Community Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight leading-[1.1]">
                  {community.name}
                </h1>

                {/* Short Description */}
                <p className="text-sm sm:text-base lg:text-lg text-[#D4D4D8] font-sans leading-relaxed max-w-2xl">
                  {community.description}
                </p>

                {/* Meta Signals */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[#666666] pt-1">
                  <span className="inline-flex items-center gap-1.5 text-[#EC4899]">
                    <MapPin className="w-4 h-4" />
                    {community.area || community.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#22C55E] font-bold">
                    <Users className="w-4 h-4" />
                    {displayedMemberCount.toLocaleString()} Members
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white">
                    <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                    {community.eventsThisMonth} Events This Month
                  </span>
                </div>
              </div>

              {/* Action Buttons: Join, Save, Share */}
              <div className="shrink-0 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsJoined(!isJoined)}
                  className={`px-7 py-3.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isJoined
                      ? "bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white "
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-4 h-4" />
                      JOINED COMMUNITY
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      JOIN COMMUNITY
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  aria-label="Save community"
                  className={`px-4 py-3.5 rounded-xl border font-mono text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isSaved
                      ? "bg-[#EC4899]/20 border-[#EC4899] text-[#EC4899]"
                      : "bg-[#111111] hover:bg-[#1A1A1A] border-[#1A1A1A] text-[#666666] hover:text-white"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? "fill-[#EC4899]" : ""}`}
                  />
                  <span>{isSaved ? "SAVED ✓" : "SAVE"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share community"
                  className="px-4 py-3.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-[#666666] hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? "LINK COPIED" : "SHARE"}</span>
                </button>
              </div>
            </div>
          </section>

          {/* ==================================================
              3. COMMUNITY STATS (Compact & Social)
          ================================================== */}
          <section
            aria-label="Community Key Numbers"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="p-4 sm:p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                  {displayedMemberCountString}
                </div>
                <div className="font-mono text-xs text-[#666666] uppercase tracking-wider">
                  MEMBERS
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] shrink-0">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                  {community.activeToday}
                </div>
                <div className="font-mono text-xs text-[#666666] uppercase tracking-wider">
                  ACTIVE TODAY
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center text-[#EC4899] shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                  {community.eventsThisMonth}
                </div>
                <div className="font-mono text-xs text-[#666666] uppercase tracking-wider">
                  EVENTS THIS MONTH
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              MAIN TWO-COLUMN SECTION (Balanced Layout)
              LEFT: About, Interests, Activity
              RIGHT: The Crowd, Compatibility, Discussion
          ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ----------------- LEFT COLUMN (7 Cols) ----------------- */}
            <div className="lg:col-span-7 space-y-8">
              {/* 5. About Community */}
              <section className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="font-mono text-xs font-extrabold text-[#8B5CF6] uppercase tracking-wider tracking-[-0.03em]">
                      ABOUT THIS COMMUNITY
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] text-[#666666] bg-[#111111] px-2.5 py-1 rounded-md border border-[#1A1A1A] inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>VERIFIED COMMUNITY</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed">
                  {community.aboutText}
                </p>

                {/* Community Ethos Pills */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-sans text-[#666666]">
                  <div className="p-3 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
                    <span className="text-white text-xs font-medium">
                      Music-first mentality
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EC4899] shrink-0" />
                    <span className="text-white text-xs font-medium">
                      Safe crew transits
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
                    <span className="text-white text-xs font-medium">
                      Zero harassment policy
                    </span>
                  </div>
                </div>
              </section>

              {/* 6. Community Interests */}
              <section className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#EC4899]" />
                  <h2 className="font-mono text-xs font-extrabold text-[#EC4899] uppercase tracking-wider tracking-[-0.03em]">
                    WHAT WE VIBE WITH
                  </h2>
                </div>
                <p className="text-xs text-[#666666] font-sans">
                  Identity signals and music frequencies curated by members of{" "}
                  {community.name}.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {community.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-[#252530] border border-[#1A1A1A] text-xs font-mono text-white transition-colors cursor-default"
                    >
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </section>

              {/* 9. Recent Activity */}
              <section className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#22C55E]" />
                    <h2 className="font-mono text-xs font-extrabold text-[#22C55E] uppercase tracking-wider tracking-[-0.03em]">
                      RECENT ACTIVITY
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-[#666666]">
                    LIVE UPDATES
                  </span>
                </div>

                <div className="space-y-3">
                  {community.activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={act.avatar}
                          alt={act.userName}
                          className="w-8 h-8 rounded-full object-cover border border-[#1A1A1A] shrink-0"
                        />
                        <div className="truncate font-sans text-xs">
                          <span className="font-bold text-white mr-1.5">
                            {act.userName}
                          </span>
                          <span className="text-[#666666] mr-1.5">
                            {act.action}
                          </span>
                          {act.target && (
                            <span className="font-medium text-[#8B5CF6]">
                              {act.target}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[#666666] shrink-0">
                        {act.timeAgo}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ----------------- RIGHT COLUMN (5 Cols) ----------------- */}
            <div className="lg:col-span-5 space-y-8">
              {/* 7. Members ("THE CROWD") & Social Compatibility */}
              <section className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="font-mono text-xs font-extrabold text-[#8B5CF6] uppercase tracking-wider tracking-[-0.03em]">
                      THE CROWD
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#22C55E] font-bold">
                    +{displayedMemberCountString}
                  </span>
                </div>

                {/* Avatar Stack Header */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A]">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {community.detailedMembers.slice(0, 5).map((m) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={m.id}
                        src={m.avatar}
                        alt={m.name}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#111111] object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-xs font-sans text-[#D4D4D8]">
                    <span className="font-bold text-white">
                      People in this community
                    </span>
                    <span className="block text-[11px] text-[#666666] font-mono">
                      Connecting over sound & nightlife
                    </span>
                  </div>
                </div>

                {/* 12. Social Compatibility Sub-section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-[#EC4899] uppercase tracking-wider font-semibold">
                      PEOPLE YOU MAY VIBE WITH
                    </span>
                    <span className="font-mono text-[10px] text-[#666666]">
                      AI MATCH
                    </span>
                  </div>

                  <div className="space-y-3">
                    {community.vibeMatchMembers.map((member) => (
                      <Link
                        key={member.id}
                        href={`/people/${member.id}`}
                        className="p-3.5 rounded-[4px] bg-[#111111] hover:bg-[#252530] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all duration-200 flex items-center justify-between gap-3 group block"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#1A1A1A] group-hover:border-[#8B5CF6] transition-colors shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-sans font-bold text-xs text-white group-hover:text-[#8B5CF6] transition-colors block truncate">
                              {member.name}
                            </span>
                            <span className="font-mono text-[10px] text-[#666666] block truncate">
                              {member.interests.slice(0, 2).join(" · ")}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-md inline-block">
                            {member.vibeMatch}% VIBE MATCH
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* More Community Members Grid */}
                <div className="pt-2">
                  <span className="font-mono text-[11px] text-[#666666] uppercase tracking-wider block mb-3">
                    MORE MEMBERS
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {community.detailedMembers.slice(3, 7).map((member) => (
                      <Link
                        key={member.id}
                        href={`/people/${member.id}`}
                        className="p-3 rounded-[4px] bg-[#111111] hover:bg-[#252530] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all flex items-center gap-2.5 group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#1A1A1A]"
                        />
                        <div className="truncate">
                          <span className="font-sans font-bold text-xs text-white group-hover:text-[#8B5CF6] transition-colors block truncate">
                            {member.name}
                          </span>
                          <span className="font-mono text-[9px] text-[#22C55E] block">
                            {member.area || "Bangalore"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* 16. Community Discussion Preview */}
              <section className="p-6 sm:p-7 rounded-[12px] bg-[#111111] border border-[#1A1A1A] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                    <h2 className="font-mono text-xs font-extrabold text-[#8B5CF6] uppercase tracking-wider tracking-[-0.03em]">
                      COMMUNITY TALK
                    </h2>
                  </div>
                  <Link
                    href={`/communities/${community.id}/discussion`}
                    className="font-mono text-[11px] text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center gap-1"
                  >
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-xs text-[#666666] font-sans">
                  Active topics, party tips, and crew calls in {community.name}.
                </p>

                <div className="space-y-3">
                  {community.discussions.map((disc) => (
                    <div
                      key={disc.id}
                      className="p-3.5 rounded-xl bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/50 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={disc.authorAvatar}
                            alt={disc.authorName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="font-sans font-semibold text-white">
                            {disc.authorName}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#666666]">
                          {disc.timeAgo}
                        </span>
                      </div>

                      <h3 className="font-sans font-bold text-xs sm:text-sm text-white line-clamp-1">
                        {disc.title}
                      </h3>

                      <p className="font-sans text-xs text-[#666666] line-clamp-2">
                        {disc.preview}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                        <span className="text-[#8B5CF6]">
                          💬 {disc.replyCount} replies
                        </span>
                        <Link
                          href={`/communities/${community.id}/discussion`}
                          className="hover:text-white transition-colors"
                        >
                          Join conversation →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/communities/${community.id}/discussion`}
                    className="w-full py-2.5 rounded-[4px] bg-[#111111] hover:bg-[#252530] border border-[#1A1A1A] text-xs font-mono text-center text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>VIEW ALL DISCUSSIONS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </Link>
                </div>
              </section>
            </div>
          </div>

          {/* ==================================================
              8. UPCOMING EVENTS (COMMUNITY EVENTS)
          ================================================== */}
          <section aria-label="Community Events" className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1A1A1A] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                  <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                    COMMUNITY EVENTS
                  </h2>
                </div>
                <p className="text-sm text-[#666666] font-sans">
                  Events people in this community are interested in.
                </p>
              </div>

              <Link
                href="/discover"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-white transition-colors"
              >
                <span>EXPLORE ALL EVENTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* EventCard Grid with Social Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {community.upcomingEvents.map((evt) => (
                <div key={evt.id} className="flex flex-col space-y-2">
                  {/* Reused EventCard */}
                  <EventCard
                    image={evt.image}
                    category={evt.category}
                    title={evt.title}
                    date={evt.date}
                    time={evt.time}
                    venue={evt.venue}
                    area={evt.area}
                    price={evt.price}
                    goingCount={evt.goingCount}
                    avatars={evt.avatars}
                    onClick={() => router.push(`/events/${evt.id}`)}
                  />

                  {/* Social Signals Bar */}
                  <div className="px-3.5 py-2 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-between text-[10px] font-mono text-[#666666]">
                    <span className="text-[#22C55E] font-bold">
                      {evt.membersGoing} MEMBERS GOING
                    </span>
                    <span className="text-[#EC4899]">
                      {evt.crewsForming} CREWS FORMING
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================
              18. COMMUNITY MOMENTS (Photo Grid + Lightbox)
          ================================================== */}
          <section aria-label="Community Moments" className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#EC4899]" />
                  <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#EC4899] uppercase tracking-wider">
                    COMMUNITY MOMENTS
                  </h2>
                </div>
                <p className="text-sm text-[#666666] font-sans">
                  Snapshots from recent nights, dance floors, and warehouse
                  gatherings.
                </p>
              </div>

              <span className="font-mono text-xs text-[#666666]">
                {community.photos.length} PHOTOS
              </span>
            </div>

            {/* 6-Photo Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {community.photos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="group relative h-40 sm:h-48 rounded-[12px] overflow-hidden bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all focus:outline-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-full bg-black/70 text-white backdrop-blur-md">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ==================================================
              17. RELATED COMMUNITIES ("YOU MAY ALSO VIBE WITH")
          ================================================== */}
          <section aria-label="Related Communities" className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1A1A1A] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-[#8B5CF6]" />
                  <h2 className="font-mono text-xs font-extrabold tracking-[-0.03em] text-[#8B5CF6] uppercase tracking-wider">
                    YOU MAY ALSO VIBE WITH
                  </h2>
                </div>
                <p className="text-sm text-[#666666] font-sans">
                  More nightlife groups that match your music frequency.
                </p>
              </div>

              <Link
                href="/communities"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-white transition-colors"
              >
                <span>ALL COMMUNITIES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Reused CommunityCard Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {community.relatedCommunities.map((relComm) => (
                <CommunityCard
                  key={relComm.id}
                  community={relComm}
                  isJoined={Boolean(joinedRelated[relComm.id])}
                  onToggleJoin={toggleRelatedJoin}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ==================================================
          PHOTO LIGHTBOX MODAL
      ================================================== */}
      {selectedPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Community photo preview"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#111111] border border-[#1A1A1A] rounded-[12px] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Caption & Close */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#1A1A1A]">
              <span className="font-mono text-xs text-[#666666]">
                MOMENT {selectedPhotoIndex + 1} OF{" "}
                {community.photos.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] text-[#666666] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Preview with Navigation */}
            <div className="relative w-full h-[320px] sm:h-[480px] bg-black flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={community.photos[selectedPhotoIndex].url}
                alt={community.photos[selectedPhotoIndex].caption}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev / Next controls */}
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setSelectedPhotoIndex(
                    (selectedPhotoIndex - 1 + community.photos.length) %
                      community.photos.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={() =>
                  setSelectedPhotoIndex(
                    (selectedPhotoIndex + 1) % community.photos.length
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="p-4 sm:p-5 bg-[#111111] border-t border-[#1A1A1A]">
              <p className="font-sans text-sm text-white font-medium">
                {community.photos[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Share Toast Feedback */}
      {copiedLink && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#111111] border border-[#8B5CF6] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom"
        >
          <Check className="w-4 h-4 text-[#8B5CF6]" />
          <span>Community link copied to clipboard!</span>
        </div>
      )}

      <Footer />
    </main>
  );
}
