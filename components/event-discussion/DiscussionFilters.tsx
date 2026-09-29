"use client";

import { Search, X, ArrowUpDown } from "lucide-react";
import { DiscussionTopic } from "@/lib/events-data";

export type DiscussionSort = "LATEST" | "MOST DISCUSSED" | "TRENDING";

interface DiscussionFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTopic: DiscussionTopic | "ALL";
  onTopicChange: (topic: DiscussionTopic | "ALL") => void;
  sort: DiscussionSort;
  onSortChange: (sort: DiscussionSort) => void;
  filteredCount: number;
}

const topics: { label: string; value: DiscussionTopic | "ALL" }[] = [
  { label: "ALL", value: "ALL" },
  { label: "GENERAL", value: "general" },
  { label: "MUSIC", value: "music" },
  { label: "DRESS CODE", value: "dress-code" },
  { label: "TIMING", value: "timing" },
  { label: "VENUE", value: "venue" },
  { label: "TRANSPORT", value: "transport" },
  { label: "TICKETS", value: "tickets" },
  { label: "CREW", value: "crew" },
  { label: "SOLO", value: "solo" },
  { label: "OTHER", value: "other" },
];

export default function DiscussionFilters({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onTopicChange,
  sort,
  onSortChange,
  filteredCount,
}: DiscussionFiltersProps) {
  return (
    <div className="w-full mb-6 flex flex-col gap-3.5">
      {/* Search Bar + Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg h-[44px] bg-[#111111] border border-[#1A1A1A] rounded-xl flex items-center px-3.5 focus-within:border-[#8B5CF6] transition-colors">
          <Search className="w-4 h-4 text-[#666666] mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search discussion... (e.g. cab, outfits, timing)"
            aria-label="Search discussion"
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-[#666666] focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="p-1 rounded-md text-[#666666] hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <span className="text-[11px] font-mono text-[#666666] flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-[#8B5CF6]" />
            <span className="hidden sm:inline">SORT:</span>
          </span>
          <div className="flex rounded-xl bg-[#111111] border border-[#1A1A1A] p-1">
            {(["LATEST", "MOST DISCUSSED", "TRENDING"] as DiscussionSort[]).map(
              (opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onSortChange(opt)}
                  className={`px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all ${
                    sort === opt
                      ? "bg-[#8B5CF6] text-white font-bold"
                      : "text-[#666666] hover:text-white"
                  }`}
                >
                  {opt}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Topic Filter Pills (Horizontally scrollable on mobile) */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          {topics.map((t) => {
            const isActive = selectedTopic === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => onTopicChange(t.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all duration-150 border whitespace-nowrap ${
                  isActive
                    ? "bg-[#8B5CF6] border-[#8B5CF6] text-white font-bold "
                    : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white hover:border-[#8B5CF6]/40"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <span className="hidden lg:inline text-xs font-mono text-[#666666] shrink-0">
          {filteredCount} {filteredCount === 1 ? "thread" : "threads"}
        </span>
      </div>
    </div>
  );
}
