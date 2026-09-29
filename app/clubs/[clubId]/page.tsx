"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Calendar,
  Ticket,
  Sparkles,
  Share2,
  Compass,
} from "lucide-react";
import { getClubById, allClubsData } from "@/lib/clubs-data";

export default function ClubDetailPage() {
  const params = useParams();
  const rawId = (params?.clubId as string) || "xyz-club";

  const club = useMemo(() => {
    return getClubById(rawId) || allClubsData[0];
  }, [rawId]);

  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
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
          {/* Breadcrumb & Actions */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <Link
              href="/clubs"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO ALL CLUBS</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1A1A21] border border-[#2A2A35] text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? "COPIED LINK ✓" : "SHARE VENUE"}</span>
            </button>
          </div>

          {/* Hero Banner Card */}
          <div className="rounded-[24px] bg-[#141418] border border-[#2A2A35] overflow-hidden mb-10">
            {/* Cover Image */}
            <div className="relative w-full h-[260px] sm:h-[340px] bg-[#09090B] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/60 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                  {club.area.toUpperCase()} · BANGALORE
                </span>

                {club.openTonight && (
                  <span className="font-mono text-xs font-bold text-white bg-[#22C55E]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                    OPEN TONIGHT
                  </span>
                )}
              </div>
            </div>

            {/* Banner Header Info */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {club.genres.map((g) => (
                    <span
                      key={g}
                      className="font-mono text-[11px] text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                  {club.rating && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{club.rating.toFixed(1)} Rating</span>
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold font-sans text-white tracking-tight mb-3">
                  {club.name}
                </h1>

                <p className="text-sm sm:text-base text-[#D4D4D8] font-sans leading-relaxed mb-4">
                  {club.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A1A1AA]">
                  <span className="inline-flex items-center gap-1 text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
                    {club.address || club.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-white">
                    <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    {club.hours || "8:00 PM – 2:00 AM"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#22C55E]">
                    <Users className="w-3.5 h-3.5" />
                    {club.followersDisplay} Followers
                  </span>
                </div>
              </div>

              {/* Follow CTA */}
              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all ${
                    isFollowing
                      ? "bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                  }`}
                >
                  {isFollowing ? "FOLLOWING ✓" : "FOLLOW CLUB"}
                </button>
              </div>
            </div>
          </div>

          {/* 2-Column Venue Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left Column: Events & Vibe (Col 8) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Upcoming Events Box */}
              {club.nextEvent && (
                <div className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                      <h3 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                        FEATURED UPCOMING EVENT
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#22C55E]">
                      Tickets Active
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#1A1A21] border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[11px] text-[#EC4899] uppercase block mb-1">
                        {club.nextEvent.genre}
                      </span>
                      <h4 className="text-xl font-bold font-sans text-white mb-2">
                        {club.nextEvent.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#A1A1AA]">
                        <span className="inline-flex items-center gap-1 text-white">
                          <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          {club.nextEvent.dateDisplay}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1 text-[#22C55E] font-bold">
                          <Ticket className="w-3.5 h-3.5" />
                          {club.nextEvent.startingPrice} onwards
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/events/${club.nextEvent.id}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono font-bold transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)] shrink-0"
                    >
                      <span>VIEW EVENT</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Vibe Tags & Musical Identity */}
              <div className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35]">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-4 h-4 text-[#EC4899]" />
                  <h3 className="font-mono text-xs font-semibold text-[#EC4899] uppercase tracking-wider">
                    SOUND &amp; ATMOSPHERE
                  </h3>
                </div>
                <h4 className="text-xl font-bold font-sans text-white mb-2">
                  What It Feels Like
                </h4>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mb-4">
                  Community-curated descriptors from partygoers who frequent {club.name}.
                </p>

                <div className="flex flex-wrap gap-2">
                  {(club.vibeTags || ["Nightlife", "Curated Sound", "Bangalore Beats"]).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35] text-xs font-mono text-white"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Venue Rules & Info (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] space-y-5">
              <h3 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                VENUE LOGISTICS
              </h3>

              <div className="space-y-3 text-xs font-sans text-[#A1A1AA]">
                <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                  <span className="font-mono text-[10px] text-[#8B5CF6] uppercase block mb-1">
                    ENTRY POLICY
                  </span>
                  <p className="text-white font-medium">
                    {club.entryRule || "Couples & mixed groups preferred. Clubwear mandatory."}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                  <span className="font-mono text-[10px] text-[#EC4899] uppercase block mb-1">
                    LOCATION
                  </span>
                  <p className="text-white font-medium">
                    {club.address || club.location}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1A1A21] border border-[#2A2A35]">
                  <span className="font-mono text-[10px] text-[#22C55E] uppercase block mb-1">
                    COMMUNITY VIBE SCORE
                  </span>
                  <p className="text-white font-bold text-base font-mono">
                    ⭐ {club.rating ? club.rating.toFixed(1) : "4.7"} / 5.0
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2A2A35] flex items-center gap-2 text-[11px] font-mono text-[#71717A]">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>Verified VibeUp Nightlife Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
