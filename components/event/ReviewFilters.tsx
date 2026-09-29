"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export type ReviewFilterCategory = "ALL" | "MUSIC" | "CROWD" | "VENUE" | "EXPERIENCE";
export type ReviewSortOption = "MOST RECENT" | "HIGHEST RATED" | "MOST HELPFUL";

interface ReviewFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: ReviewFilterCategory;
  onFilterChange: (f: ReviewFilterCategory) => void;
  activeSort: ReviewSortOption;
  onSortChange: (s: ReviewSortOption) => void;
  totalCount: number;
}

export default function ReviewFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  totalCount,
}: ReviewFiltersProps) {
  const filters: ReviewFilterCategory[] = [
    "ALL",
    "MUSIC",
    "CROWD",
    "VENUE",
    "EXPERIENCE",
  ];

  const sortOptions: ReviewSortOption[] = [
    "MOST RECENT",
    "HIGHEST RATED",
    "MOST HELPFUL",
  ];

  return (
    <div className="w-full mb-6">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="font-mono text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
          FILTER &amp; SEARCH REVIEWS
        </h3>
        <span className="font-mono text-xs text-[#A1A1AA]">
          <strong className="text-white">{totalCount}</strong> REVIEWS
        </span>
      </div>

      {/* Search Input & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3.5">
        {/* Search */}
        <div className="relative flex-1">
          <label htmlFor="review-search-input" className="sr-only">
            Search reviews
          </label>
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="review-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reviews by keywords or reviewer name..."
            className="w-full bg-[#141418] border border-[#2A2A35] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] font-sans transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear review search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A1A1AA] hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-xs font-mono text-[#A1A1AA] shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="hidden sm:inline">SORT:</span>
          </div>
          <label htmlFor="review-sort-select" className="sr-only">
            Sort reviews
          </label>
          <select
            id="review-sort-select"
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value as ReviewSortOption)}
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
        {filters.map((category) => {
          const isActive = activeFilter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onFilterChange(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium tracking-wider uppercase transition-all duration-150 shrink-0 border ${
                isActive
                  ? "bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                  : "bg-[#141418] border-[#2A2A35] text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/40"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
