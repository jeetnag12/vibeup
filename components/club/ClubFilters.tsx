"use client";

import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { areaFilterOptions, genreFilterOptions } from "@/lib/clubs-data";

export type ClubSortOption = "RECOMMENDED" | "POPULAR" | "NEW" | "MOST FOLLOWED";

interface ClubFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedArea: string;
  onSelectArea: (area: string) => void;
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  selectedSort: ClubSortOption;
  onSelectSort: (sort: ClubSortOption) => void;
  totalFilteredCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function ClubFilters({
  searchQuery,
  onSearchChange,
  selectedArea,
  onSelectArea,
  selectedGenre,
  onSelectGenre,
  selectedSort,
  onSelectSort,
  totalFilteredCount,
  onClearFilters,
  hasActiveFilters,
}: ClubFiltersProps) {
  const sortOptions: ClubSortOption[] = [
    "RECOMMENDED",
    "POPULAR",
    "NEW",
    "MOST FOLLOWED",
  ];

  return (
    <div className="w-full mb-10 space-y-5">
      {/* Search Bar + Sort Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="club-search-input" className="sr-only">
            Search clubs, venues or areas
          </label>
          <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="club-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search clubs, venues, genres, or areas..."
            className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] font-sans transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#666666] hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Sort Selector & Result Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="font-mono text-xs text-[#666666]">
            <strong className="text-white text-sm font-sans">{totalFilteredCount}</strong> CLUBS
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-mono text-[#666666]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="hidden sm:inline">SORT:</span>
            </div>
            <label htmlFor="club-sort-select" className="sr-only">
              Sort clubs
            </label>
            <select
              id="club-sort-select"
              value={selectedSort}
              onChange={(e) => onSelectSort(e.target.value as ClubSortOption)}
              className="bg-[#111111] border border-[#1A1A1A] rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111111] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Area Filters Row */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-[#666666] uppercase tracking-wider">
            FILTER BY AREA
          </span>
          <span className="font-mono text-[10px] text-[#666666]">
            Bangalore Hubs
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {areaFilterOptions.map((area) => {
            const isActive = selectedArea === area;
            return (
              <button
                key={area}
                type="button"
                onClick={() => onSelectArea(area)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium tracking-wider uppercase transition-all duration-150 shrink-0 border ${
                  isActive
                    ? "bg-[#8B5CF6] border-[#8B5CF6] text-white "
                    : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white hover:border-[#8B5CF6]/40"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category / Genre Filters Row */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-[#666666] uppercase tracking-wider">
            FILTER BY GENRE &amp; MUSIC
          </span>
          <span className="font-mono text-[10px] text-[#666666]">
            Sound Profile
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => onSelectGenre("ALL")}
            className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium tracking-wider uppercase transition-all shrink-0 border ${
              selectedGenre === "ALL"
                ? "bg-[#EC4899] border-[#EC4899] text-white shadow-[0_0_10px_rgba(236,72,153,0.35)]"
                : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white"
            }`}
          >
            ALL GENRES
          </button>
          {genreFilterOptions.map((genre) => {
            const isActive = selectedGenre.toUpperCase() === genre.toUpperCase();
            return (
              <button
                key={genre}
                type="button"
                onClick={() => onSelectGenre(genre)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium tracking-wider uppercase transition-all shrink-0 border ${
                  isActive
                    ? "bg-[#EC4899] border-[#EC4899] text-white shadow-[0_0_10px_rgba(236,72,153,0.35)]"
                    : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white hover:border-[#EC4899]/40"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Chips & Clear Button */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-[#1A1A1A] flex items-center gap-2 flex-wrap text-xs font-mono">
          <span className="text-[#666666]">Active:</span>

          {selectedArea !== "ALL" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-white">
              <span>Area: {selectedArea}</span>
              <button
                type="button"
                onClick={() => onSelectArea("ALL")}
                aria-label="Remove area filter"
                className="hover:text-[#EC4899]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedGenre !== "ALL" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EC4899]/15 border border-[#EC4899]/30 text-white">
              <span>Genre: {selectedGenre}</span>
              <button
                type="button"
                onClick={() => onSelectGenre("ALL")}
                aria-label="Remove genre filter"
                className="hover:text-[#EC4899]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white">
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Remove search filter"
                className="hover:text-[#EC4899]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 text-[11px] text-[#EC4899] hover:text-pink-300 ml-auto transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>CLEAR ALL FILTERS</span>
          </button>
        </div>
      )}
    </div>
  );
}
