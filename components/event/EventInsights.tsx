"use client";

import { Activity, Check } from "lucide-react";
import { EventInsight } from "@/lib/reviews-data";

interface EventInsightsProps {
  insights: EventInsight[];
}

export default function EventInsights({ insights }: EventInsightsProps) {
  return (
    <div className="w-full rounded-[20px] bg-[#141418] border border-[#2A2A35] p-6 sm:p-7">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-4 h-4 text-[#22C55E]" />
        <h3 className="font-mono text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
          REVIEW INTELLIGENCE
        </h3>
      </div>

      <h4 className="text-xl font-bold font-sans text-white tracking-tight mb-1">
        THE VIBE AT A GLANCE
      </h4>
      <p className="text-xs text-[#A1A1AA] font-sans mb-5">
        Dominant descriptors derived directly from verified attendee reviews.
      </p>

      {/* Insights Tags Grid */}
      <div className="space-y-2.5">
        {insights.map((item) => (
          <div
            key={item.tag}
            className="p-3 rounded-xl bg-[#1A1A21] border border-[#2A2A35] flex items-center justify-between gap-3 hover:border-[#8B5CF6]/40 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider truncate">
                {item.tag}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-[11px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                {item.percentage}% OF ATTENDEES
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-[#2A2A35] flex items-center gap-1.5 text-[11px] font-mono text-[#71717A]">
        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
        <span>Aggregated from verified ticket check-ins</span>
      </div>
    </div>
  );
}
