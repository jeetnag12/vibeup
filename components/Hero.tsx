"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const quickFilters = [
  "This Weekend",
  "Techno",
  "Bollywood",
  "Live Music",
  "Comedy",
  "Rooftops",
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] pt-[64px] bg-[#09090B] flex flex-col items-center justify-center overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0 -translate-x-1/4 -translate-y-1/4"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(236,72,153,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content centered vertically and horizontally */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center my-auto">
        {/* Top label */}
        <p
          className="font-mono text-[#A1A1AA] uppercase mb-4 sm:mb-6"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
          }}
        >
          BANGALORE · NIGHTLIFE · EXPERIENCES
        </p>

        {/* Main headline */}
        <h1
          className="font-bold tracking-tight text-center leading-[1.08] mb-4 sm:mb-5 font-sans"
          style={{ fontWeight: 700 }}
        >
          <span className="block sm:inline text-white text-[48px] md:text-[72px]">
            FIND YOUR{" "}
          </span>
          <span
            className="text-[48px] md:text-[72px] bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CROWD.
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-[#A1A1AA] text-[18px] max-w-[480px] mx-auto font-sans leading-relaxed mb-8 sm:mb-10 font-normal"
          style={{ fontWeight: 400 }}
        >
          Discover events. Meet people. Build your crew. Experience Bangalore differently.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className={`w-full max-w-[560px] h-[56px] bg-[#141418] rounded-[12px] border flex items-center transition-all duration-200 ${
            isFocused
              ? "border-[#8B5CF6] shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
              : "border-[#2A2A35]"
          }`}
        >
          <div className="pl-4 pr-2 text-[#A1A1AA] flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search events, clubs, people..."
            className="w-full h-full bg-transparent text-white text-sm sm:text-base placeholder:text-[#71717A] px-2 focus:outline-none font-sans"
          />

          <button
            type="submit"
            className="h-full px-5 sm:px-7 rounded-r-[12px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium transition-colors duration-200 shrink-0 flex items-center justify-center"
          >
            Search
          </button>
        </form>

        {/* Quick filter pills */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 max-w-[620px]">
          {quickFilters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  setSelectedFilter(isSelected ? null : filter)
                }
                className={`font-mono text-[12px] rounded-full border transition-all duration-200 ${
                  isSelected
                    ? "border-[#8B5CF6] text-white bg-[#8B5CF6]/15"
                    : "border-[#2A2A35] bg-transparent text-[#A1A1AA] hover:border-[#8B5CF6] hover:text-white"
                }`}
                style={{
                  padding: "6px 16px",
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll down arrow at bottom center */}
      <a
        href="#discover"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#A1A1AA] hover:text-white transition-colors duration-200 p-2"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
}
