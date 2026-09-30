"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CardCarousel, { CarouselItem } from "@/components/CardCarousel";
import TrendingSection from "@/components/TrendingSection";
import ClubsMarquee from "@/components/ClubsMarquee";
import {
  StarShape,
  ArrowDown,
  DotGrid,
  CrossHair,
  TriangleSet,
} from "@/components/Decoratives";
import Footer from "@/components/Footer";
import EventCard, { EventCardProps } from "@/components/EventCard";
import PeopleCard from "@/components/PeopleCard";
import ClubCard from "@/components/club/ClubCard";
import CommunityCard from "@/components/community/CommunityCard";
import HowItWorks from "@/components/HowItWorks";
import { mockPeopleData } from "@/lib/people-data";
import { allClubsData } from "@/lib/clubs-data";
import { allCommunitiesData } from "@/lib/communities-data";
import {
  Search,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Zap,
  Flame,
  Radio,
} from "lucide-react";

// ==================================================
// STRUCTURED MOCK DATA FOR AUTHENTICATED HOME LOOP
// ==================================================

interface HomeEvent extends EventCardProps {
  id: string;
}

const defaultCurrentUser = {
  name: "JEET",
  interests: ["NIGHTLIFE", "MUSIC", "FESTIVALS"],
  genres: ["TECHNO", "HOUSE"],
  areas: ["INDIRANAGAR", "KORAMANGALA"],
};

// 0. EVENTS THIS WEEKEND (7 Carousel Items with Parvaaz featured at index 2)
const weekendCarouselItems: CarouselItem[] = [
  {
    id: "techno-night-playboy",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Techno night",
    subtitle: "Playboy Club · Indiranagar",
    price: "₹999",
    date: "Sat Jul 19",
  },
  {
    id: "bollywood-saturdays-toit",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    title: "Bollywood Saturdays",
    subtitle: "Toit · Koramangala",
    price: "₹599",
    date: "Sat Jul 19",
  },
  {
    id: "parvaaz-live-phoenix",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    title: "Parvaaz Live",
    subtitle: "Phoenix · Whitefield",
    price: "₹1299",
    date: "Sun Jul 20",
  },
  {
    id: "sundowner-the-skyye",
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
    category: "ROOFTOP",
    title: "Sundowner",
    subtitle: "The Skyye · UB City",
    price: "₹799",
    date: "Sun Jul 20",
  },
  {
    id: "comedy-night-canvas",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=800&auto=format&fit=crop",
    category: "COMEDY",
    title: "Comedy Night",
    subtitle: "Canvas Laugh · Indiranagar",
    price: "₹699",
    date: "Fri Jul 18",
  },
  {
    id: "underground-rave-secret",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    category: "ELECTRONIC",
    title: "Underground Rave",
    subtitle: "Secret Venue · Central BLR",
    price: "₹1499",
    date: "Sat Jul 19",
  },
  {
    id: "jazz-evening-windmills",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop",
    category: "JAZZ",
    title: "Jazz Evening",
    subtitle: "Windmills · Whitefield",
    price: "₹899",
    date: "Sun Jul 20",
  },
];

// 1. WHAT'S HAPPENING TONIGHT? (4 Featured Events)
const tonightEvents: HomeEvent[] = [
  {
    id: "cyberpunk-neon-warehouse",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "TECHNO AFTER DARK",
    date: "Tonight",
    time: "10:00 PM",
    venue: "The Warehouse",
    area: "Indiranagar",
    price: "₹999",
    goingCount: 184,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "deep-house-odyssey-vol-4",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    title: "NEON FRIDAY",
    date: "Tonight",
    time: "9:00 PM",
    venue: "Neon Room",
    area: "Koramangala",
    price: "₹799",
    goingCount: 226,
    avatars: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "after-dark-residents-night",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "AFRO HOUSE",
    title: "AFRO NIGHTS",
    date: "Tonight",
    time: "10:00 PM",
    venue: "Night Shift",
    area: "MG Road",
    price: "₹899",
    goingCount: 142,
    avatars: [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "saturday-techno-night",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    title: "ROOFTOP SESSIONS",
    date: "Tonight",
    time: "8:30 PM",
    venue: "Skyline",
    area: "Church Street",
    price: "₹699",
    goingCount: 310,
    avatars: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

// 2. MADE FOR YOUR VIBE (3 Personalization Signals)
const personalizedEvents: HomeEvent[] = [
  {
    id: "cyberpunk-neon-warehouse",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Cyberpunk Neon Warehouse",
    date: "Fri, 16 Oct",
    time: "10:00 PM",
    venue: "Basement Vault",
    area: "Indiranagar",
    price: "₹899",
    goingCount: 168,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "saturday-techno-night",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Saturday Techno Odyssey",
    date: "Sat, 17 Oct",
    time: "9:30 PM",
    venue: "Pebble Lounge",
    area: "Indiranagar",
    price: "₹999",
    goingCount: 284,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "deep-house-odyssey-vol-4",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    title: "Deep House Sunset Sessions",
    date: "Sun, 18 Oct",
    time: "6:00 PM",
    venue: "Fandom",
    area: "Koramangala",
    price: "₹699",
    goingCount: 195,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

// 3. TRENDING THIS WEEKEND (4 Events)
const trendingEvents: HomeEvent[] = [
  {
    id: "desi-nights-club-edition",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    title: "Desi Nights — Saturday Edition",
    date: "Sat, 24 Oct",
    time: "9:00 PM",
    venue: "Loft 38",
    area: "Indiranagar",
    price: "₹599",
    goingCount: 412,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "saturday-house-session",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    title: "Saturday House Session",
    date: "Sat, 24 Oct",
    time: "10:00 PM",
    venue: "Toit Brewpub",
    area: "Indiranagar",
    price: "₹499",
    goingCount: 340,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "after-dark-residents-night",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    title: "Subterranean Sessions Live",
    date: "Sun, 25 Oct",
    time: "7:30 PM",
    venue: "The Gypsy Warehouse",
    area: "MG Road",
    price: "₹899",
    goingCount: 290,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "cyberpunk-neon-warehouse",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Underground Vault Rave",
    date: "Sun, 25 Oct",
    time: "9:00 PM",
    venue: "Basement Vault",
    area: "CBD",
    price: "₹999",
    goingCount: 460,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "deep-house-odyssey-vol-4",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Midnight Frequency Vol. 4",
    date: "Sun, 25 Oct",
    time: "10:00 PM",
    venue: "The Sound Garden",
    area: "HSR Layout",
    price: "₹799",
    goingCount: 310,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

const DISCOVERY_FILTERS = [
  "TONIGHT",
  "THIS WEEKEND",
  "TECHNO",
  "HOUSE",
  "HIP HOP",
  "LIVE MUSIC",
  "NEAR ME",
];

export default function AuthenticatedHomePage() {
  const router = useRouter();

  // User State with Onboarding prefill
  const [user, setUser] = useState(defaultCurrentUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("TONIGHT");

  // Follow/Join social states
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
  const [clubsFollowingMap, setClubsFollowingMap] = useState<Record<string, boolean>>({});
  const [joinedCommunitiesMap, setJoinedCommunitiesMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedProfile = sessionStorage.getItem("vibeup_profile");
        const storedSignup = sessionStorage.getItem("vibeup_auth_signup");

        if (storedProfile) {
          const parsed = JSON.parse(storedProfile);
          if (parsed.displayName) {
            setUser((prev) => ({ ...prev, name: parsed.displayName.toUpperCase() }));
          }
        } else if (storedSignup) {
          const parsed = JSON.parse(storedSignup);
          if (parsed.fullName) {
            setUser((prev) => ({ ...prev, name: parsed.fullName.toUpperCase() }));
          }
        }
      } catch {
        // Fallback
      }
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/discover");
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    router.push("/discover");
  };

  const toggleFollowPerson = (personId: string) => {
    setFollowingMap((prev) => ({ ...prev, [personId]: !prev[personId] }));
  };

  const toggleFollowClub = (clubId: string) => {
    setClubsFollowingMap((prev) => ({ ...prev, [clubId]: !prev[clubId] }));
  };

  const toggleJoinCommunity = (communityId: string) => {
    setJoinedCommunitiesMap((prev) => ({
      ...prev,
      [communityId]: !prev[communityId],
    }));
  };

  // Slice mock data for Home sections
  const homePeople = mockPeopleData.slice(0, 6);
  const homeClubs = allClubsData.slice(0, 4);
  const homeCommunities = allCommunitiesData.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#7C3AED]/40 selection:text-white relative overflow-x-hidden">
      {/* Full-page decorative background text system */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "10vh",
            right: "-5vw",
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 900,
            fontSize: "clamp(120px, 20vw, 280px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "rgba(255,255,255,0.018)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          VIBEUP
        </span>
        <span
          style={{
            position: "absolute",
            top: "45vh",
            left: "-3vw",
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 900,
            fontSize: "clamp(80px, 14vw, 200px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "rgba(255,255,255,0.015)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          BANGALORE
        </span>
      </div>

      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO */}
      <div className="relative w-full overflow-hidden">
        <Hero />

        {/* StarShape (60px) — top right of hero section, position absolute, top 20%, right 8%, rotation: 15deg, z-index 25 */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            right: "8%",
            zIndex: 25,
            transform: "rotate(15deg)",
          }}
        >
          <StarShape size={60} />
        </div>

        {/* TriangleSet — scattered in hero, 2-3 instances at different positions/sizes */}
        {/* Instance 1: top-left area */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{
            top: "16%",
            left: "8%",
            zIndex: 25,
            opacity: 0.7,
            transform: "rotate(-10deg)",
          }}
        >
          <TriangleSet size={44} />
        </div>

        {/* Instance 2: middle-right floating */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "64%",
            right: "10%",
            zIndex: 25,
            opacity: 0.65,
            transform: "rotate(20deg)",
          }}
        >
          <TriangleSet size={36} />
        </div>

        {/* Instance 3: bottom-center floating */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            bottom: "12%",
            left: "45%",
            zIndex: 25,
            opacity: 0.5,
            transform: "rotate(180deg)",
          }}
        >
          <TriangleSet size={30} />
        </div>
      </div>

      {/* 2.5. FULL WIDTH 3D CARD CAROUSEL (BETWEEN HERO AND TRENDING) */}
      <section
        className="w-full relative z-10 select-none overflow-hidden"
        style={{
          backgroundColor: "#000000",
          padding: "80px 0",
        }}
      >
        {/* Section header (px-8 max-width 1440px mx-auto mb-12) */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 mb-12">
          <span
            className="block font-mono text-[#8B5CF6] uppercase mb-2 font-bold"
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
            }}
          >
            ↗ EVENTS THIS WEEKEND
          </span>
          <h2
            className="font-sans text-white m-0 leading-[0.95]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.03em",
            }}
          >
            DISCOVER WHAT&apos;S ON
          </h2>
        </div>

        {/* Full-width CardCarousel */}
        <CardCarousel
          items={weekendCarouselItems}
          initialIndex={2}
          autoPlay={true}
          interval={3000}
        />
      </section>

      {/* 3. TRENDING SECTION (LIGHT BACKGROUND BELOW HERO) */}
      <div className="relative w-full">
        <TrendingSection />

        {/* DotGrid — bottom left of trending section, position absolute, bottom 40px, left 40px */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "40px",
            left: "40px",
            zIndex: 20,
          }}
        >
          <DotGrid />
        </div>
      </div>

      {/* 4. CLUBS MARQUEE */}
      <div className="relative w-full overflow-hidden">
        <ClubsMarquee />

        {/* CrossHair (48px) — top right of clubs section */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "40px",
            right: "48px",
            zIndex: 20,
          }}
        >
          <CrossHair size={48} stroke="rgba(139, 92, 246, 0.4)" />
        </div>
      </div>

      <div className="w-full pt-[84px] pb-[80px] relative z-10">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 space-y-20 md:space-y-[120px]">
          {/* ================================================== */}
          {/* 2 & 3 & 4. GREETING, SEARCH & QUICK FILTERS */}
          {/* ================================================== */}
          <section className="space-y-6 pt-4">
            {/* 2. Personalized Greeting */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#1A1A1A] mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="font-mono text-xs text-[#666666] uppercase tracking-wider">
                  GOOD EVENING, {user.name}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                WHAT&apos;S YOUR VIBE TONIGHT?
              </h1>
              <p className="text-sm sm:text-base text-[#666666] font-sans mt-2">
                Discover events, people and places around Bangalore.
              </p>
            </div>

            {/* 3. Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#666666]">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH EVENTS, CLUBS, PEOPLE..."
                className="w-full bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6]/50 focus:border-[#8B5CF6] rounded-[12px] pl-12 pr-28 py-3.5 sm:py-4 text-xs sm:text-sm font-mono text-white placeholder-[#666666] focus:outline-none transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              />
              <button
                type="submit"
                className="absolute inset-y-1.5 right-1.5 px-4 sm:px-5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
              </button>
            </form>

            {/* 4. Quick Discovery Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {DISCOVERY_FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleFilterClick(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-[#8B5CF6] text-white font-bold "
                        : "bg-[#111111] text-[#666666] hover:text-white hover:bg-[#111111] border border-[#1A1A1A]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ================================================== */}
          {/* 5. WHAT'S HAPPENING TONIGHT? (Featured Events) */}
          {/* ================================================== */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-[#EC4899]" />
                  <span className="font-mono text-xs text-[#EC4899] font-bold uppercase tracking-wider">
                    FEATURED TONIGHT
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  WHAT&apos;S HAPPENING TONIGHT?
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-0.5">
                  The city&apos;s plans start here.
                </p>
              </div>

              <Link
                href="/discover"
                className="text-xs font-mono text-[#8B5CF6] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tonightEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onClick={() => router.push(`/events/${event.id}`)}
                />
              ))}
            </div>
          </section>

          {/* ================================================== */}
          {/* 6. MADE FOR YOUR VIBE (Personalization Section) */}
          {/* ================================================== */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="font-mono text-xs text-[#8B5CF6] font-bold uppercase tracking-wider">
                    BECAUSE YOU LIKE TECHNO &amp; HOUSE IN INDIRANAGAR
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  MADE FOR YOUR VIBE
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-0.5">
                  Based on the things you selected during setup.
                </p>
              </div>

              <Link
                href="/discover"
                className="text-xs font-mono text-[#8B5CF6] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>EXPLORE MATCHES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalizedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onClick={() => router.push(`/events/${event.id}`)}
                />
              ))}
            </div>
          </section>

          {/* ================================================== */}
          {/* 8. WHO'S GOING OUT? */}
          {/* ================================================== */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-[#22C55E]" />
                  <span className="font-mono text-xs text-[#22C55E] font-bold uppercase tracking-wider">
                    SOCIAL CONNECTIONS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  WHO&apos;S GOING OUT?
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-0.5">
                  See who&apos;s already planning their night.
                </p>
              </div>

              <Link
                href="/people"
                className="text-xs font-mono text-[#8B5CF6] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>DISCOVER PEOPLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {homePeople.map((person) => (
                <PeopleCard
                  key={person.id}
                  person={person}
                  isFollowing={Boolean(followingMap[person.id])}
                  onToggleFollow={toggleFollowPerson}
                  variant="compact"
                />
              ))}
            </div>
          </section>

          {/* ================================================== */}
          {/* 9. FIND YOUR CROWD (Social Architecture Pillar) */}
          {/* ================================================== */}
          <section className="p-6 sm:p-8 rounded-[12px] bg-[#111111] border border-[#1A1A1A] shadow-xl space-y-6 relative overflow-hidden">
            <div>
              <span className="font-mono text-xs text-[#8B5CF6] font-bold uppercase tracking-widest block mb-1">
                SOCIAL NIGHTLIFE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                FIND YOUR CROWD
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1 max-w-xl">
                Your next night out doesn&apos;t have to start with a group chat. Connect with people, communities, and crews directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: PEOPLE */}
              <Link
                href="/people"
                className="p-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mb-4 text-[#8B5CF6]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white group-hover:text-[#8B5CF6] transition-colors mb-1">
                    PEOPLE
                  </h3>
                  <p className="text-xs text-[#666666] font-sans leading-relaxed">
                    Find people with your vibe heading to the same events.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#8B5CF6] font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  EXPLORE PEOPLE →
                </span>
              </Link>

              {/* Card 2: COMMUNITIES */}
              <Link
                href="/communities"
                className="p-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center mb-4 text-[#EC4899]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white group-hover:text-[#EC4899] transition-colors mb-1">
                    COMMUNITIES
                  </h3>
                  <p className="text-xs text-[#666666] font-sans leading-relaxed">
                    Join ongoing conversations around the nightlife music you love.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#EC4899] font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  EXPLORE COMMUNITIES →
                </span>
              </Link>

              {/* Card 3: CREWS */}
              <Link
                href="/crews"
                className="p-6 rounded-[12px] bg-[#111111] border border-[#1A1A1A] hover:border-[#8B5CF6] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mb-4 text-[#22C55E]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white group-hover:text-[#22C55E] transition-colors mb-1">
                    CREWS
                  </h3>
                  <p className="text-xs text-[#666666] font-sans leading-relaxed">
                    Find or build a temporary squad for your next night out.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#22C55E] font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  FIND A CREW →
                </span>
              </Link>
            </div>
          </section>

          {/* ================================================== */}
          {/* 10. POPULAR CLUBS */}
          {/* ================================================== */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-mono text-xs text-[#8B5CF6] font-bold uppercase tracking-wider block mb-1">
                  BANGALORE VENUES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  POPULAR CLUBS
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-0.5">
                  Places the city is talking about.
                </p>
              </div>

              <Link
                href="/clubs"
                className="text-xs font-mono text-[#8B5CF6] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeClubs.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  isFollowing={Boolean(clubsFollowingMap[club.id])}
                  onToggleFollow={toggleFollowClub}
                />
              ))}
            </div>
          </section>

          {/* ================================================== */}
          {/* 11. ACTIVE COMMUNITIES */}
          {/* ================================================== */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-mono text-xs text-[#8B5CF6] font-bold uppercase tracking-wider block mb-1">
                  SHARED PASSIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                  ACTIVE COMMUNITIES
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-0.5">
                  Find people who are into the same things.
                </p>
              </div>

              <Link
                href="/communities"
                className="text-xs font-mono text-[#8B5CF6] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  isJoined={Boolean(joinedCommunitiesMap[community.id])}
                  onToggleJoin={toggleJoinCommunity}
                />
              ))}
            </div>
          </section>

          {/* ================================================== */}
          {/* 12. CREW CTA */}
          {/* ================================================== */}
          <section className="p-8 sm:p-12 rounded-[12px] bg-gradient-to-r from-[#111111] via-[#111111] to-[#111111] border border-[#1A1A1A] shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-mono text-xs text-[#EC4899] font-bold uppercase tracking-widest block mb-1.5">
                NEVER GO OUT ALONE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                NO CREW YET?
              </h2>
              <p className="text-sm text-[#666666] font-sans mt-2 leading-relaxed">
                Find people for your next plan or start your own crew. Connect with verified attendees before doors open.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/crews"
                className="w-full sm:w-auto px-6 py-3.5 rounded-[4px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-center"
              >
                FIND A CREW
              </Link>
              <Link
                href="/crews"
                className="w-full sm:w-auto px-6 py-3.5 rounded-[4px] bg-[#111111] hover:bg-[#1A1A1A] text-white border border-[#1A1A1A] font-mono text-xs font-bold uppercase tracking-wider transition-colors text-center"
              >
                CREATE A CREW
              </Link>
            </div>
          </section>

          {/* ================================================== */}
          {/* 13. HOW VIBEUP WORKS */}
          {/* ================================================== */}
          <HowItWorks />

          {/* ================================================== */}
          {/* 14. VIBES FEED TEASER (V2 Feature Preview) */}
          {/* ================================================== */}
          <section className="p-6 sm:p-8 rounded-[12px] bg-[#111111] border border-[#1A1A1A]/80 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto text-[#8B5CF6]">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight">
                YOUR NIGHT. YOUR VIBE.
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1 max-w-md mx-auto leading-relaxed">
                Soon you&apos;ll be able to share the moments, sounds, and visuals that make your night unforgettable.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111111] border border-[#1A1A1A] font-mono text-[11px] text-[#666666] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                <span>COMING SOON</span>
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* 15. FOOTER */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
