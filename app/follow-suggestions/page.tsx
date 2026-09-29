"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Plus,
  Users,
  MapPin,
  Building2,
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";

// ==================================================
// MOCK DATA FOR ONBOARDING RECOMMENDATIONS
// ==================================================

interface PersonSuggestion {
  id: string;
  name: string;
  username: string;
  interests: string[];
  area: string;
  vibeScore: number;
  reason: string;
  avatar: string;
}

interface ClubSuggestion {
  id: string;
  name: string;
  genre: string;
  area: string;
  reason: string;
}

interface CommunitySuggestion {
  id: string;
  name: string;
  genre: string;
  membersCount: string;
  reason: string;
}

const SUGGESTED_PEOPLE: PersonSuggestion[] = [
  {
    id: "person-001",
    name: "ARJUN",
    username: "@arjun.wav",
    interests: ["TECHNO", "HOUSE"],
    area: "INDIRANAGAR",
    vibeScore: 87,
    reason: "BASED ON YOUR GENRES",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
  },
  {
    id: "person-002",
    name: "RIYA",
    username: "@riya.afterdark",
    interests: ["AFRO HOUSE", "TRAVEL"],
    area: "KORAMANGALA",
    vibeScore: 91,
    reason: "SIMILAR VIBE",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
  },
  {
    id: "person-003",
    name: "KABIR",
    username: "@kabir.nights",
    interests: ["HIP HOP", "R&B"],
    area: "HSR",
    vibeScore: 84,
    reason: "NEAR YOUR SELECTED AREAS",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop",
  },
  {
    id: "person-004",
    name: "ANANYA",
    username: "@ananya.vibes",
    interests: ["HOUSE", "FESTIVALS"],
    area: "CHURCH STREET",
    vibeScore: 89,
    reason: "BASED ON YOUR INTERESTS",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop",
  },
];

const SUGGESTED_CLUBS: ClubSuggestion[] = [
  {
    id: "club-001",
    name: "THE WAREHOUSE",
    genre: "Electronic Music",
    area: "Indiranagar",
    reason: "NEAR YOUR SELECTED AREAS",
  },
  {
    id: "club-002",
    name: "NEON ROOM",
    genre: "House / Techno",
    area: "Koramangala",
    reason: "BASED ON YOUR GENRES",
  },
  {
    id: "club-003",
    name: "THE SOCIAL CLUB",
    genre: "Hip Hop / R&B",
    area: "Church Street",
    reason: "POPULAR IN BANGALORE",
  },
  {
    id: "club-004",
    name: "NIGHT SHIFT",
    genre: "Electronic / Experimental",
    area: "MG Road",
    reason: "SIMILAR VIBE",
  },
];

const SUGGESTED_COMMUNITIES: CommunitySuggestion[] = [
  {
    id: "comm-001",
    name: "BANGALORE TECHNO HEADS",
    genre: "Techno",
    membersCount: "1.8K members",
    reason: "BASED ON YOUR GENRES",
  },
  {
    id: "comm-002",
    name: "AFRO HOUSE BANGALORE",
    genre: "Afro House",
    membersCount: "920 members",
    reason: "BASED ON YOUR INTERESTS",
  },
  {
    id: "comm-003",
    name: "BANGALORE NIGHT OWLS",
    genre: "Nightlife",
    membersCount: "2.4K members",
    reason: "NEAR YOUR SELECTED AREAS",
  },
  {
    id: "comm-004",
    name: "HOUSE MUSIC INDIA",
    genre: "House",
    membersCount: "3.1K members",
    reason: "POPULAR COMMUNITY",
  },
];

export default function FollowSuggestionsPage() {
  const router = useRouter();

  // Local state for social graph selections
  const [followedPeople, setFollowedPeople] = useState<string[]>([]);
  const [followedClubs, setFollowedClubs] = useState<string[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);

  // Toggle handlers
  const toggleFollowPerson = (id: string) => {
    setFollowedPeople((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFollowClub = (id: string) => {
    setFollowedClubs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleJoinCommunity = (id: string) => {
    setJoinedCommunities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Complete onboarding
  const handleFinish = () => {
    // Optionally persist followed entities in sessionStorage
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          "vibeup_followed_people",
          JSON.stringify(followedPeople)
        );
        sessionStorage.setItem(
          "vibeup_followed_clubs",
          JSON.stringify(followedClubs)
        );
        sessionStorage.setItem(
          "vibeup_joined_communities",
          JSON.stringify(joinedCommunities)
        );
      } catch {
        // Fallback
      }
    }

    router.push("/home");
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ================================================== */}
      {/* ONBOARDING MINIMAL TOP HEADER */}
      {/* ================================================== */}
      <header className="w-full h-[64px] border-b border-[#1A1A1A]/60 bg-[rgba(9,9,11,0.8)] backdrop-blur-md relative z-20">
        <div className="max-w-[1140px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/choose-areas"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-white transition-colors p-1.5 rounded-[4px] hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </Link>

          {/* VibeUp Logo */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0 shadow-[0_0_10px_#8B5CF6]"
              aria-hidden="true"
            />
            <span className="text-white font-bold text-base tracking-tight font-sans">
              VIBEUP
            </span>
          </div>

          {/* Step Indicator */}
          <span className="font-mono text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-full">
            STEP 5 OF 5 · FINAL
          </span>
        </div>
      </header>

      {/* ================================================== */}
      {/* MAIN ONBOARDING CONTENT CONTAINER */}
      {/* ================================================== */}
      <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[1140px] mx-auto space-y-10"
        >
          {/* Progress Bar (100%) */}
          <div className="max-w-[700px] mx-auto">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-2 uppercase">
              <span className="text-[#22C55E]">✓ 1. PROFILE</span>
              <span className="text-[#22C55E]">✓ 2. INTERESTS</span>
              <span className="text-[#22C55E]">✓ 3. GENRES</span>
              <span className="text-[#22C55E]">✓ 4. AREAS</span>
              <span className="text-[#8B5CF6] font-bold">5. PEOPLE</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#111111] border border-[#1A1A1A] overflow-hidden flex">
              <div className="w-full h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full transition-all duration-300" />
            </div>
          </div>

          {/* Headline & Narrative */}
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
              FIND YOUR PEOPLE
            </h1>
            <p className="text-sm text-[#666666] font-sans mt-2 leading-relaxed">
              Follow a few people, clubs, or communities to make VibeUp feel like yours from the start.
            </p>
            <p className="text-[11px] font-mono text-[#666666] mt-1">
              You can always discover and follow more later.
            </p>
          </div>

          {/* ================================================== */}
          {/* SECTION 1: PEOPLE YOU MAY VIBE WITH */}
          {/* ================================================== */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#8B5CF6]" />
                <h2 className="text-base sm:text-lg font-extrabold tracking-[-0.03em] font-sans text-white tracking-wide">
                  PEOPLE YOU MAY VIBE WITH
                </h2>
              </div>
              <span className="text-xs font-mono text-[#666666] hidden sm:inline">
                Suggested nightlife connections
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUGGESTED_PEOPLE.map((person) => {
                const isFollowed = followedPeople.includes(person.id);

                return (
                  <div
                    key={person.id}
                    className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      {/* Reason Pill */}
                      <span className="font-mono text-[9px] text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-3">
                        {person.reason}
                      </span>

                      {/* User Info */}
                      <div className="flex items-center gap-3 mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#1A1A1A] shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="font-sans font-bold text-sm text-white truncate">
                            {person.name}
                          </h3>
                          <span className="font-mono text-xs text-[#666666] block truncate">
                            {person.username}
                          </span>
                        </div>
                      </div>

                      {/* Secondary Meta */}
                      <div className="space-y-1 mb-4 text-xs font-mono">
                        <div className="flex items-center gap-1.5 text-[#666666]">
                          <MapPin className="w-3 h-3 text-[#EC4899] shrink-0" />
                          <span className="truncate">{person.area}</span>
                        </div>
                        <div className="text-[11px] text-[#666666] truncate">
                          {person.interests.join(" · ")}
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] text-[#22C55E]">
                          <Sparkles className="w-3 h-3" />
                          <span>VIBE SCORE {person.vibeScore}</span>
                        </div>
                      </div>
                    </div>

                    {/* Follow Action */}
                    <button
                      type="button"
                      onClick={() => toggleFollowPerson(person.id)}
                      className={`w-full py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isFollowed
                          ? "bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E]"
                          : "bg-[#111111] hover:bg-[#8B5CF6] text-white border border-[#1A1A1A] hover:border-transparent"
                      }`}
                    >
                      {isFollowed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>FOLLOWING</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>FOLLOW</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================================================== */}
          {/* SECTION 2: CLUBS TO FOLLOW */}
          {/* ================================================== */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#EC4899]" />
                <h2 className="text-base sm:text-lg font-extrabold tracking-[-0.03em] font-sans text-white tracking-wide">
                  CLUBS TO FOLLOW
                </h2>
              </div>
              <span className="text-xs font-mono text-[#666666] hidden sm:inline">
                Top venues for your sound
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUGGESTED_CLUBS.map((club) => {
                const isFollowed = followedClubs.includes(club.id);

                return (
                  <div
                    key={club.id}
                    className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#EC4899]/40 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      {/* Reason Pill */}
                      <span className="font-mono text-[9px] text-[#EC4899] bg-[#EC4899]/15 border border-[#EC4899]/30 px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-3">
                        {club.reason}
                      </span>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 text-[#EC4899]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-sans font-bold text-sm text-white truncate">
                            {club.name}
                          </h3>
                          <span className="font-mono text-xs text-[#666666] block truncate">
                            {club.area}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-mono text-[#666666] mb-4">
                        {club.genre}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFollowClub(club.id)}
                      className={`w-full py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isFollowed
                          ? "bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E]"
                          : "bg-[#111111] hover:bg-[#EC4899] text-white border border-[#1A1A1A] hover:border-transparent"
                      }`}
                    >
                      {isFollowed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>FOLLOWING</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>FOLLOW</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================================================== */}
          {/* SECTION 3: COMMUNITIES TO JOIN */}
          {/* ================================================== */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#8B5CF6]" />
                <h2 className="text-base sm:text-lg font-extrabold tracking-[-0.03em] font-sans text-white tracking-wide">
                  COMMUNITIES TO JOIN
                </h2>
              </div>
              <span className="text-xs font-mono text-[#666666] hidden sm:inline">
                Connect with shared nightlife crowds
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUGGESTED_COMMUNITIES.map((community) => {
                const isJoined = joinedCommunities.includes(community.id);

                return (
                  <div
                    key={community.id}
                    className="p-5 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      {/* Reason Pill */}
                      <span className="font-mono text-[9px] text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-3">
                        {community.reason}
                      </span>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-[#8B5CF6]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-sans font-bold text-sm text-white truncate">
                            {community.name}
                          </h3>
                          <span className="font-mono text-xs text-[#666666] block truncate">
                            {community.genre}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-mono text-[#666666] mb-4">
                        {community.membersCount}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleJoinCommunity(community.id)}
                      className={`w-full py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isJoined
                          ? "bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E]"
                          : "bg-[#111111] hover:bg-[#8B5CF6] text-white border border-[#1A1A1A] hover:border-transparent"
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
                          <span>JOIN</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================================================== */}
          {/* COMPLETION ACTIONS */}
          {/* ================================================== */}
          <div className="pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/choose-areas"
              className="w-full sm:w-auto px-5 py-3 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] text-xs font-mono text-[#666666] hover:text-white transition-colors text-center"
            >
              ← BACK TO AREAS
            </Link>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full sm:w-auto px-4 py-3 text-xs font-mono text-[#666666] hover:text-white transition-colors text-center"
              >
                SKIP FOR NOW
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2 active:scale-[0.99] text-center"
              >
                <span>ENTER VIBEUP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Accent */}
      <footer className="w-full py-4 text-center border-t border-[#1A1A1A]/40 text-[11px] font-mono text-[#666666]">
        VIBEUP · ONBOARDING STEP 5 OF 5 (COMPLETE)
      </footer>
    </main>
  );
}
