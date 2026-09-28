"use client";

import { Search, X, ArrowUpDown } from "lucide-react";

export type FilterType =
  | "ALL"
  | "PEOPLE YOU FOLLOW"
  | "VIBE MATCHES"
  | "CREW LOOKING"
  | "NEW CONNECTIONS";

export type SortType =
  | "Recommended"
  | "Vibe Match"
  | "Recently Joined"
  | "Mutual Connections";

interface AttendeeFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
  totalFilteredCount: number;
}

const filterOptions: { label: FilterType; countLabel?: string }[] = [
  { label: "ALL" },
  { label: "PEOPLE YOU FOLLOW" },
  { label: "VIBE MATCHES" },
  { label: "CREW LOOKING" },
  { label: "NEW CONNECTIONS" },
];

const sortOptions: SortType[] = [
  "Recommended",
  "Vibe Match",
  "Recently Joined",
  "Mutual Connections",
];

export default function AttendeeFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  totalFilteredCount,
}: AttendeeFiltersProps) {
  return (
    <div className="w-full mb-8 flex flex-col gap-4">
      {/* Top Bar: Search + Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xl h-[46px] bg-[#141418] border border-[#2A2A35] rounded-xl flex items-center px-3.5 focus-within:border-[#8B5CF6] transition-colors">
          <Search className="w-4 h-4 text-[#A1A1AA] mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search people going..."
            aria-label="Search people going"
            className="w-full bg-transparent text-sm text-white placeholder:text-[#71717A] focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="p-1 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#2A2A35] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <label
            htmlFor="sort-select"
            className="text-xs font-mono text-[#A1A1AA] flex items-center gap-1.5 shrink-0"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="hidden sm:inline">SORT:</span>
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={activeSort}
              onChange={(e) => onSortChange(e.target.value as SortType)}
              className="h-[46px] bg-[#141418] border border-[#2A2A35] hover:border-[#8B5CF6]/50 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#8B5CF6] cursor-pointer transition-colors appearance-none pr-8"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#141418] text-white">
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#A1A1AA] text-[10px]">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills (Horizontally scrollable on mobile) */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <div className="flex items-center gap-2 shrink-0">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.label;
            return (
              <button
                key={opt.label}
                onClick={() => onFilterChange(opt.label)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 shrink-0 border whitespace-nowrap ${
                  isActive
                    ? "bg-[#8B5CF6] border-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                    : "bg-[#141418] border-[#2A2A35] text-[#A1A1AA] hover:text-white hover:border-[#8B5CF6]/50"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Live Counter */}
        <div className="hidden lg:block text-xs font-mono text-[#A1A1AA] shrink-0">
          Showing <span className="text-white font-bold">{totalFilteredCount}</span> attendees
        </div>
      </div>
    </div>
  );
}
