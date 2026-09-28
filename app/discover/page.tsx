"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard, { EventCardProps } from "@/components/EventCard";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  MapPin,
  Calendar,
  RotateCcw,
} from "lucide-react";

interface DiscoverEvent extends EventCardProps {
  id: string;
  genre: string;
  numericPrice: number;
  day: "friday" | "saturday" | "sunday" | "next_week";
}

const allEventsData: DiscoverEvent[] = [
  {
    id: "e1",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    genre: "Techno",
    title: "Berghain Sessions Vol. 12",
    date: "Sat, 19 Jul",
    time: "10:00 PM",
    venue: "Playboy Club",
    area: "Indiranagar",
    price: "₹999",
    numericPrice: 999,
    day: "saturday",
    goingCount: 234,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e2",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    genre: "Bollywood",
    title: "Desi Nights — Saturday Edition",
    date: "Sat, 19 Jul",
    time: "9:00 PM",
    venue: "Toit Brewpub",
    area: "Koramangala",
    price: "₹599",
    numericPrice: 599,
    day: "saturday",
    goingCount: 412,
    saved: true,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e3",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    genre: "Live Music",
    title: "Parvaaz Live in Bangalore",
    date: "Sun, 20 Jul",
    time: "7:30 PM",
    venue: "Phoenix Marketcity",
    area: "Whitefield",
    price: "₹1,299",
    numericPrice: 1299,
    day: "sunday",
    goingCount: 891,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e4",
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
    category: "ROOFTOP",
    genre: "Rooftop",
    title: "Sundowner Sessions",
    date: "Sun, 20 Jul",
    time: "5:00 PM",
    venue: "The Skyye",
    area: "UB City",
    price: "₹799",
    numericPrice: 799,
    day: "sunday",
    goingCount: 167,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e5",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    genre: "House",
    title: "Deep House Odyssey",
    date: "Fri, 18 Jul",
    time: "9:30 PM",
    venue: "Fandom",
    area: "Koramangala",
    price: "₹699",
    numericPrice: 699,
    day: "friday",
    goingCount: 310,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e6",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "COMEDY",
    genre: "Comedy",
    title: "Late Night Standup Jam",
    date: "Sat, 19 Jul",
    time: "8:00 PM",
    venue: "The Humming Tree",
    area: "Indiranagar",
    price: "₹499",
    numericPrice: 499,
    day: "saturday",
    goingCount: 145,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e7",
    image:
      "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=800&auto=format&fit=crop",
    category: "HIP-HOP",
    genre: "Hip-Hop",
    title: "Underground Cypher & Beats",
    date: "Fri, 18 Jul",
    time: "10:00 PM",
    venue: "Vapour",
    area: "MG Road",
    price: "₹399",
    numericPrice: 399,
    day: "friday",
    goingCount: 280,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e8",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    category: "ROOFTOP",
    genre: "Rooftop",
    title: "Skyline Lounge Sunset Sessions",
    date: "Sun, 20 Jul",
    time: "5:30 PM",
    venue: "High Ultra Lounge",
    area: "Malleshwaram",
    price: "₹899",
    numericPrice: 899,
    day: "sunday",
    goingCount: 195,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e9",
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    genre: "Techno",
    title: "Cyberpunk Neon Rave",
    date: "Sat, 19 Jul",
    time: "11:00 PM",
    venue: "Pebble The Jungle Lounge",
    area: "Sadashivanagar",
    price: "₹1,199",
    numericPrice: 1199,
    day: "saturday",
    goingCount: 520,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e10",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    genre: "Bollywood",
    title: "Retro Disco Masala",
    date: "Fri, 18 Jul",
    time: "9:00 PM",
    venue: "Badmaash",
    area: "UB City",
    price: "₹750",
    numericPrice: 750,
    day: "friday",
    goingCount: 360,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e11",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    genre: "Live Music",
    title: "Indie Rock Night Live",
    date: "Sat, 19 Jul",
    time: "8:30 PM",
    venue: "BFlat Bar",
    area: "Indiranagar",
    price: "₹500",
    numericPrice: 500,
    day: "saturday",
    goingCount: 210,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    id: "e12",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "ELECTRONIC",
    genre: "Electronic",
    title: "Dreamscapes Audiovisual",
    date: "Sun, 20 Jul",
    time: "8:00 PM",
    venue: "Sunburn Union",
    area: "Koramangala",
    price: "₹850",
    numericPrice: 850,
    day: "sunday",
    goingCount: 340,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

const categoryPills = [
  "All",
  "Techno",
  "Bollywood",
  "Live Music",
  "Rooftop",
  "House",
  "Comedy",
  "Hip-Hop",
  "Electronic",
];

const areaOptions = [
  "All Areas",
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "UB City",
  "MG Road",
  "Malleshwaram",
  "Sadashivanagar",
];

const dateOptions = [
  { label: "All Dates", value: "all" },
  { label: "Friday (18 Jul)", value: "friday" },
  { label: "Saturday (19 Jul)", value: "saturday" },
  { label: "Sunday (20 Jul)", value: "sunday" },
];

const sortOptions = [
  { label: "Trending (Most Going)", value: "popular" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedDate, setSelectedDate] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [events, setEvents] = useState<DiscoverEvent[]>(allEventsData);

  const handleSaveToggle = (id: string, isSaved: boolean) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, saved: isSaved } : e))
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedArea("All Areas");
    setSelectedDate("all");
    setSortBy("popular");
  };

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = event.title.toLowerCase().includes(q);
          const matchVenue = event.venue.toLowerCase().includes(q);
          const matchArea = event.area.toLowerCase().includes(q);
          const matchCategory = event.category.toLowerCase().includes(q);
          if (!matchTitle && !matchVenue && !matchArea && !matchCategory) {
            return false;
          }
        }

        // Category filter
        if (
          selectedCategory !== "All" &&
          event.genre.toLowerCase() !== selectedCategory.toLowerCase() &&
          event.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Area filter
        if (
          selectedArea !== "All Areas" &&
          event.area.toLowerCase() !== selectedArea.toLowerCase()
        ) {
          return false;
        }

        // Date filter
        if (selectedDate !== "all" && event.day !== selectedDate) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") {
          return b.goingCount - a.goingCount;
        }
        if (sortBy === "price_asc") {
          return a.numericPrice - b.numericPrice;
        }
        if (sortBy === "price_desc") {
          return b.numericPrice - a.numericPrice;
        }
        return 0;
      });
  }, [events, searchQuery, selectedCategory, selectedArea, selectedDate, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedArea !== "All Areas" ||
    selectedDate !== "all" ||
    sortBy !== "popular";

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between selection:bg-[#8B5CF6] selection:text-white relative overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      {/* Discover Content */}
      <div className="w-full pt-[96px] pb-[80px]">
        {/* Ambient Top Glow Blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, rgba(236,72,153,0.06) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141418] border border-[#2A2A35] text-xs font-mono text-[#8B5CF6] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-[0.12em] uppercase">
                EXPLORE BANGALORE
              </span>
            </div>

            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight font-sans text-white leading-tight"
              style={{ fontWeight: 700 }}
            >
              Discover Events &amp;{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to right, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Nightlife
              </span>
            </h1>

            <p className="mt-3 text-[#A1A1AA] text-base sm:text-lg max-w-2xl font-sans font-normal leading-relaxed">
              Find upcoming parties, gigs, concerts, and social meetups happening
              across the city. Connect with your crowd before heading out.
            </p>
          </div>

          {/* Search Bar & Primary Input */}
          <div className="w-full mb-6">
            <div className="relative w-full h-[54px] bg-[#141418] border border-[#2A2A35] focus-within:border-[#8B5CF6] focus-within:ring-4 focus-within:ring-[#8B5CF6]/15 rounded-[12px] flex items-center px-4 transition-all duration-200">
              <Search className="w-5 h-5 text-[#A1A1AA] shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event, artist, venue (e.g. Berghain, Indiranagar, Toit)..."
                className="w-full h-full bg-transparent text-white text-sm sm:text-base placeholder:text-[#71717A] focus:outline-none font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categoryPills.map((pill) => {
              const isActive = selectedCategory === pill;
              return (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setSelectedCategory(pill)}
                  className={`font-mono text-xs px-4 py-2 rounded-full whitespace-nowrap border transition-all duration-200 shrink-0 ${
                    isActive
                      ? "border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
                      : "border-[#2A2A35] bg-[#141418] text-[#A1A1AA] hover:border-[#8B5CF6] hover:text-white"
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Advanced Filters Row: Area, Date, Sort */}
          <div className="p-4 rounded-xl bg-[#141418] border border-[#2A2A35] flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {/* Area Filter */}
              <div className="flex items-center gap-2 bg-[#1A1A21] border border-[#2A2A35] rounded-lg px-3 py-1.5 text-xs text-[#A1A1AA]">
                <MapPin className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                <label htmlFor="area-select" className="sr-only">
                  Area
                </label>
                <select
                  id="area-select"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-2 font-mono text-xs"
                >
                  {areaOptions.map((area) => (
                    <option key={area} value={area} className="bg-[#1A1A21]">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-2 bg-[#1A1A21] border border-[#2A2A35] rounded-lg px-3 py-1.5 text-xs text-[#A1A1AA]">
                <Calendar className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                <label htmlFor="date-select" className="sr-only">
                  Date
                </label>
                <select
                  id="date-select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-2 font-mono text-xs"
                >
                  {dateOptions.map((d) => (
                    <option key={d.value} value={d.value} className="bg-[#1A1A21]">
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By Filter */}
              <div className="flex items-center gap-2 bg-[#1A1A21] border border-[#2A2A35] rounded-lg px-3 py-1.5 text-xs text-[#A1A1AA]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />
                <label htmlFor="sort-select" className="sr-only">
                  Sort By
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-2 font-mono text-xs"
                >
                  {sortOptions.map((s) => (
                    <option key={s.value} value={s.value} className="bg-[#1A1A21]">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count & Reset Button */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="font-mono text-xs text-[#A1A1AA]">
                Showing{" "}
                <span className="text-white font-medium">
                  {filteredEvents.length}
                </span>{" "}
                {filteredEvents.length === 1 ? "event" : "events"}
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B5CF6] hover:text-purple-300 transition-colors py-1 px-2 rounded hover:bg-white/5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onClick={() => router.push(`/events/${event.id}`)}
                  onSaveToggle={(saved) => handleSaveToggle(event.id, saved)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="w-full py-16 px-4 rounded-2xl bg-[#141418] border border-[#2A2A35] flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#1A1A21] border border-[#2A2A35] flex items-center justify-center text-[#8B5CF6] mb-4 shadow-lg">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-white mb-1">
                No matching events found
              </h3>
              <p className="font-sans text-sm text-[#A1A1AA] max-w-sm mb-6">
                We couldn&apos;t find any events matching your search or filter
                criteria. Try adjusting your selections or clear your filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-sm font-medium transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
