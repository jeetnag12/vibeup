"use client";

import { Search, X, ArrowUpDown } from "@/components/icons";
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
        <div className="relative flex-1 max-w-lg h-[44px] bg-[#15151C] border border-[#25252F] rounded-xl flex items-center px-3.5 focus-within:border-[#FFE14D] transition-colors">
          <Search className="w-4 h-4 text-[#8E8C9C] mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search discussion... (e.g. cab, outfits, timing)"
            aria-label="Search discussion"
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-[#8E8C9C] focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="p-1 rounded-md text-[#8E8C9C] hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <span className="text-[11px] font-mono text-[#8E8C9C] flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-[#FFE14D]" />
            <span className="hidden sm:inline">SORT:</span>
          </span>
          <div className="flex rounded-xl bg-[#15151C] border border-[#25252F] p-1">
            {(["LATEST", "MOST DISCUSSED", "TRENDING"] as DiscussionSort[]).map(
              (opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onSortChange(opt)}
                  className={`px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all ${
                    sort === opt
                      ? "bg-[#FFE14D] text-[#0B0B10] font-bold"
                      : "text-[#8E8C9C] hover:text-white"
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
                    ? "bg-[#FFE14D] border-[#FFE14D] text-[#0B0B10] font-bold "
                    : "bg-[#15151C] border-[#25252F] text-[#8E8C9C] hover:text-white hover:border-[#FFE14D]/40"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <span className="hidden lg:inline text-xs font-mono text-[#8E8C9C] shrink-0">
          {filteredCount} {filteredCount === 1 ? "thread" : "threads"}
        </span>
      </div>
    </div>
  );
}
