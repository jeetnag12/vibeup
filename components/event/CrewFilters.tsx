"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export type CrewFilterType = "ALL" | "OPEN SPOTS" | "NEARBY" | "POPULAR" | "NEW";
export type CrewSortType = "Recommended" | "Most Members" | "Most Open Spots" | "Newest";

interface CrewFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: CrewFilterType;
  onFilterChange: (filter: CrewFilterType) => void;
  activeSort: CrewSortType;
  onSortChange: (sort: CrewSortType) => void;
  totalCrewsCount: number;
}

export default function CrewFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  totalCrewsCount,
}: CrewFiltersProps) {
  const filters: CrewFilterType[] = [
    "ALL",
    "OPEN SPOTS",
    "NEARBY",
    "POPULAR",
    "NEW",
  ];

  const sortOptions: CrewSortType[] = [
    "Recommended",
    "Most Members",
    "Most Open Spots",
    "Newest",
  ];

  return (
    <div className="w-full mb-8">
      {/* Section Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="font-mono text-xs text-[#8B5CF6] uppercase tracking-wider block mb-1">
            EXPLORE GROUPS
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
            FIND A CREW
          </h3>
          <p className="text-sm text-[#A1A1AA] font-sans mt-1">
            Already have a plan? Join people who are going your way.
          </p>
        </div>

        <div className="font-mono text-xs text-[#A1A1AA]">
          SHOWING <span className="text-white font-bold">{totalCrewsCount}</span> CREWS
        </div>
      </div>

      {/* Search Input & Sort Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <label htmlFor="crew-search-input" className="sr-only">
            Search crews
          </label>
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="crew-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search crews by name, area, music, or vibe..."
            className="w-full bg-[#141418] border border-[#2A2A35] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A1A1AA] hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="hidden sm:inline">SORT:</span>
          </div>
          <label htmlFor="crew-sort-select" className="sr-only">
            Sort crews by
          </label>
          <select
            id="crew-sort-select"
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value as CrewSortType)}
            className="bg-[#141418] border border-[#2A2A35] rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#1A1A21] text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Pills with Horizontal Scrolling on Mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider uppercase transition-all duration-150 shrink-0 border ${
                isActive
                  ? "bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_14px_rgba(139,92,246,0.35)]"
                  : "bg-[#141418] border-[#2A2A35] text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/50"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
