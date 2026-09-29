"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  Share2,
  Check,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { getCommunityById, allCommunitiesData, Community } from "@/lib/communities-data";

export default function CommunityDetailPage() {
  const params = useParams();
  const rawId = (params?.communityId as string) || "bangalore-techno-society";

  const community: Community = useMemo(() => {
    const found = getCommunityById(rawId);
    if (found) return found;

    const formattedName = rawId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      id: rawId,
      name: formattedName.toUpperCase(),
      description:
        "A vibrant nightlife community connecting music enthusiasts and partygoers across Bangalore.",
      coverImage:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      location: "Bangalore",
      area: "Bangalore",
      category: "MUSIC",
      genres: ["Techno", "House", "Electronic"],
      memberCount: 1240,
      memberCountDisplay: "1.2K",
      activityCount: "ACTIVE TODAY",
      tags: ["Nightlife", "Community", "Bangalore"],
      members: allCommunitiesData[0].members,
      interest: "TECHNO",
      upcomingEventsCount: 3,
    };
  }, [rawId]);

  const [isJoined, setIsJoined] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const displayedMemberCount = isJoined
    ? community.memberCount + 1
    : community.memberCount;

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[88px] sm:pt-[96px] pb-[80px]">
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <Link
              href="/communities"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO COMMUNITIES</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1A1A21] border border-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? "COPIED LINK ✓" : "SHARE COMMUNITY"}</span>
            </button>
          </div>

          {/* Hero Banner Card */}
          <div className="rounded-[24px] bg-[#141418] border border-[#2A2A35] overflow-hidden mb-10 shadow-2xl">
            {/* Cover Image */}
            <div className="relative w-full h-[240px] sm:h-[340px] bg-[#09090B] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={community.coverImage}
                alt={community.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/60 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                  {community.category} · {community.location.toUpperCase()}
                </span>

                {community.activityCount && (
                  <span className="font-mono text-xs font-bold text-white bg-[#8B5CF6]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                    {community.activityCount}
                  </span>
                )}
              </div>
            </div>

            {/* Banner Header Info */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {community.genres.map((g) => (
                    <span
                      key={g}
                      className="font-mono text-[11px] text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold font-sans text-white tracking-tight mb-3">
                  {community.name}
                </h1>

                <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed mb-4">
                  {community.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A1A1AA]">
                  <span className="inline-flex items-center gap-1 text-[#EC4899]">
                    <MapPin className="w-3.5 h-3.5" />
                    {community.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#22C55E] font-bold">
                    <Users className="w-3.5 h-3.5" />
                    {displayedMemberCount.toLocaleString()} Members
                  </span>
                  {community.upcomingEventsCount ? (
                    <span className="inline-flex items-center gap-1 text-white">
                      <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      {community.upcomingEventsCount} Events Supported
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsJoined(!isJoined)}
                  className={`px-7 py-3 rounded-xl font-mono text-xs font-bold transition-all ${
                    isJoined
                      ? "bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E] shadow-[0_0_16px_rgba(34,197,94,0.3)]"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                  }`}
                >
                  {isJoined ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      JOINED COMMUNITY
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      JOIN COMMUNITY
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Community Info & Member Roster Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left Column: Community Members (Cols 8) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-7 rounded-[20px] bg-[#141418] border border-[#2A2A35]">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#8B5CF6]" />
                  <h3 className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
                    COMMUNITY MEMBERS
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mb-5">
                  Partygoers and music enthusiasts active in {community.name}.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {community.members.map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] flex items-center gap-3"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#2A2A35]"
                      />
                      <div className="truncate">
                        <span className="font-sans font-bold text-xs text-white block truncate">
                          {m.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#22C55E]">
                          Active Member
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Descriptors */}
              <div className="p-6 sm:p-7 rounded-[20px] bg-[#141418] border border-[#2A2A35]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#EC4899]" />
                  <h3 className="font-mono text-xs font-semibold text-[#EC4899] uppercase tracking-wider">
                    COMMUNITY VIBE TAGS
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] text-xs font-mono text-white"
                    >
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Guidelines (Cols 4) */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-[20px] bg-[#141418] border border-[#2A2A35] space-y-4">
              <h3 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                COMMUNITY GUIDELINES
              </h3>
              <ul className="space-y-3 text-xs font-sans text-[#D4D4D8]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0" />
                  <span>Respect everyone on and off the dance floor. No uninvited touching or filming.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] mt-1.5 shrink-0" />
                  <span>Music-first mentality: share track IDs, DJ sets, and underground event tips.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />
                  <span>Group safety: lookout for crew members during late night transit.</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#2A2A35] flex items-center gap-2 text-[11px] font-mono text-[#71717A]">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>Verified VibeUp Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
