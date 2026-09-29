"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface ClubItem {
  id: string;
  name: string;
  area: string;
  genres: string[];
  rating: number;
  followers: string;
  image: string;
  openTonight?: boolean;
}

const clubs: ClubItem[] = [
  {
    id: "playboy-club",
    name: "Playboy Club",
    area: "Indiranagar",
    genres: ["Techno", "House"],
    rating: 4.8,
    followers: "4.2K",
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop",
    openTonight: true,
  },
  {
    id: "the-humming-tree",
    name: "The Humming Tree",
    area: "Indiranagar",
    genres: ["Live Music", "Indie"],
    rating: 4.9,
    followers: "8.1K",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    openTonight: true,
  },
  {
    id: "toit-brewpub",
    name: "Toit Brewpub",
    area: "Koramangala",
    genres: ["Bollywood", "Casual"],
    rating: 4.6,
    followers: "12.4K",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=600&auto=format&fit=crop",
    openTonight: true,
  },
  {
    id: "fandom",
    name: "Fandom",
    area: "Koramangala",
    genres: ["Electronic", "Hip-hop"],
    rating: 4.7,
    followers: "5.6K",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600&auto=format&fit=crop",
    openTonight: true,
  },
  {
    id: "the-skyye",
    name: "The Skyye",
    area: "UB City",
    genres: ["Rooftop", "Lounge"],
    rating: 4.5,
    followers: "9.8K",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop",
    openTonight: true,
  },
  {
    id: "vapour",
    name: "Vapour",
    area: "MG Road",
    genres: ["Bollywood", "Commercial"],
    rating: 4.4,
    followers: "3.9K",
    image:
      "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=600&auto=format&fit=crop",
    openTonight: true,
  },
];

export default function PopularClubs() {
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("clubs-scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -280 : 280;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-[120px] bg-[#000000]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p
              className="font-mono text-[#8B5CF6] uppercase mb-2 font-medium"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
              }}
            >
              BANGALORE&apos;S BEST
            </p>
            <h2
              className="font-sans font-extrabold tracking-[-0.03em] text-white text-[32px] tracking-tight leading-tight"
              style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Popular Clubs
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll Navigation Arrows (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scroll("left")}
                className="w-8 h-8 rounded-full border border-[#1A1A1A] bg-[#111111] flex items-center justify-center text-[#666666] hover:text-white hover:border-[#8B5CF6] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scroll("right")}
                className="w-8 h-8 rounded-full border border-[#1A1A1A] bg-[#111111] flex items-center justify-center text-[#666666] hover:text-white hover:border-[#8B5CF6] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/clubs"
              className="group inline-flex items-center gap-1.5 text-[#8B5CF6] hover:underline font-medium text-sm transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scrollable Row */}
        <div
          id="clubs-scroll-container"
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollSnapType: "x mandatory",
          }}
        >
          {clubs.map((club) => {
            const isFollowing = followingMap[club.id] ?? false;

            return (
              <div
                key={club.id}
                className="w-[260px] shrink-0 snap-start bg-[#111111] border border-[#1A1A1A] rounded-[12px] overflow-hidden transition-all duration-200 hover:border-[#8B5CF6] hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] flex flex-col justify-between group"
              >
                {/* Top: Club Photo */}
                <div className="relative w-full h-[160px] overflow-hidden bg-[#000000]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Open status pill top-right */}
                  {club.openTonight && (
                    <span
                      className="absolute top-[12px] right-[12px] z-10 text-white font-mono rounded-full font-medium shadow-sm flex items-center justify-center pointer-events-none"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.9)",
                        fontSize: "10px",
                        padding: "4px 10px",
                      }}
                    >
                      Open Tonight
                    </span>
                  )}
                </div>

                {/* Bottom Padding 16px */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Club Name */}
                    <h3
                      className="text-white font-sans text-[16px] tracking-tight line-clamp-1 mb-1"
                      style={{ fontWeight: 600 }}
                      title={club.name}
                    >
                      {club.name}
                    </h3>

                    {/* Area with MapPin */}
                    <div className="flex items-center gap-1.5 text-[#666666] mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                      <span className="font-mono text-[12px]">{club.area}</span>
                    </div>

                    {/* Genre Tags Row */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {club.genres.map((genre) => (
                        <span
                          key={genre}
                          className="font-mono text-[10px] text-[#8B5CF6] rounded-full px-2.5 py-0.5 border"
                          style={{
                            backgroundColor: "rgba(139, 92, 246, 0.1)",
                            borderColor: "rgba(139, 92, 246, 0.3)",
                          }}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Stats Row (space-between) */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]">
                      <span className="font-mono text-[12px] text-white">
                        ⭐ {club.rating.toFixed(1)}
                      </span>
                      <span className="font-mono text-[12px] text-[#666666]">
                        {club.followers} followers
                      </span>
                    </div>

                    {/* Follow Button */}
                    <button
                      type="button"
                      onClick={() => toggleFollow(club.id)}
                      className={`w-full h-[36px] mt-3 rounded-[8px] border transition-all duration-200 font-sans text-[14px] flex items-center justify-center ${
                        isFollowing
                          ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-white"
                          : "border-[#1A1A1A] bg-transparent text-[#666666] hover:border-[#8B5CF6] hover:text-white"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
