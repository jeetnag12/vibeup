"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  Check,
  UserPlus,
  Shield,
  Music,
} from "lucide-react";
import { defaultEvent } from "@/lib/events-data";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = (params?.userId as string) || "a1";

  // Find user in attendee or vibeMatches lists, or fallback
  const user = useMemo(() => {
    const fromAttendees = defaultEvent.attendees.find((a) => a.id === userId);
    if (fromAttendees) return fromAttendees;

    const fromVibe = defaultEvent.vibeMatches.find((v) => v.id === userId);
    if (fromVibe) {
      return {
        id: fromVibe.id,
        name: fromVibe.name,
        avatar: fromVibe.avatar,
        bio: fromVibe.reason,
        interests: fromVibe.matchTags,
        musicTaste: fromVibe.musicTaste || "Techno · House · Electronic",
        vibeScore: fromVibe.vibeScore,
        vibeMatch: fromVibe.matchPercentage,
        area: fromVibe.area || "Indiranagar",
        mutualConnections: fromVibe.mutualCount || 3,
        mutualDetails: fromVibe.mutualDetails || "3 mutual connections",
        isFollowing: fromVibe.isFollowing,
      };
    }

    // Default fallback profile
    return {
      id: userId,
      name: "Aarav Sharma",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
      bio: "Synthesizer enthusiast, analog photography & weekend warehouse raver in Bangalore.",
      interests: ["Techno", "House", "Photography", "Modular Synth"],
      musicTaste: "Berlin Techno · Acid House · Minimal",
      vibeScore: 87,
      vibeMatch: 92,
      area: "Indiranagar",
      mutualConnections: 3,
      mutualDetails: "Attended 4 events with you",
      isFollowing: false,
      crewStatus: "in_crew",
      crewName: "Saturday Techno Crew",
    };
  }, [userId]);

  const [isFollowing, setIsFollowing] = useState(user.isFollowing ?? false);

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      <Navbar />

      <div className="w-full pt-[96px] pb-[80px]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          {/* Back Navigation */}
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>

          {/* Profile Card Header */}
          <div className="p-6 sm:p-8 rounded-[20px] bg-[#141418] border border-[#2A2A35] relative overflow-hidden mb-8">
            {/* Ambient Background Gradient */}
            <div
              className="absolute -top-20 -right-20 w-80 h-80 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#8B5CF6] shadow-[0_0_24px_rgba(139,92,246,0.25)]"
                />

                <div>
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                      {user.name.toUpperCase()}
                    </h1>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] font-semibold">
                      VIBE SCORE {user.vibeScore}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#A1A1AA] mb-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
                      {user.area.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      {user.mutualDetails || `${user.mutualConnections} mutual connections`}
                    </span>
                  </div>

                  <p className="text-sm text-[#A1A1AA] font-sans max-w-lg leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                type="button"
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-150 flex items-center justify-center gap-2 shrink-0 ${
                  isFollowing
                    ? "bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]"
                    : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_16px_rgba(139,92,246,0.3)]"
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
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Music Taste & Genres */}
            <div className="p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-3">
                <Music className="w-4 h-4" />
                <span>MUSIC DNA</span>
              </div>
              <div className="text-base font-bold font-sans text-white mb-3">
                {user.musicTaste}
              </div>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#141418] border border-[#2A2A35] text-[#A1A1AA]"
                  >
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Communities & Crews */}
            <div className="p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#EC4899] uppercase tracking-wider mb-3">
                <Shield className="w-4 h-4" />
                <span>COMMUNITIES &amp; CREWS</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="p-3 rounded-xl bg-[#141418] border border-[#2A2A35] flex items-center justify-between">
                  <span className="text-sm font-sans font-bold text-white">
                    Bangalore Techno Community
                  </span>
                  <span className="font-mono text-[10px] text-[#8B5CF6]">ACTIVE</span>
                </div>
                {user.crewName && (
                  <div className="p-3 rounded-xl bg-[#141418] border border-[#2A2A35] flex items-center justify-between">
                    <span className="text-sm font-sans font-bold text-white">
                      {user.crewName}
                    </span>
                    <span className="font-mono text-[10px] text-[#EC4899]">MEMBER</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Events Attending */}
          <div className="p-6 sm:p-8 rounded-[20px] bg-[#1A1A21] border border-[#2A2A35]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-4">
              <Calendar className="w-4 h-4" />
              <span>UPCOMING NIGHTS</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141418] border border-[#2A2A35] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-[#8B5CF6] uppercase tracking-wider block mb-0.5">
                  {defaultEvent.category}
                </span>
                <h3 className="font-sans font-bold text-lg text-white mb-1">
                  {defaultEvent.title}
                </h3>
                <p className="text-xs font-mono text-[#A1A1AA]">
                  {defaultEvent.dateDisplay} · {defaultEvent.venue}, {defaultEvent.area}
                </p>
              </div>

              <Link
                href={`/events/${defaultEvent.id}`}
                className="px-4 py-2 rounded-xl bg-[#1A1A21] hover:bg-[#8B5CF6] text-white border border-[#2A2A35] text-xs font-mono font-medium transition-colors text-center"
              >
                VIEW EVENT
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
