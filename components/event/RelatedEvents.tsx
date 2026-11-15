"use client";

import { useRouter } from "next/navigation";
import EventCard from "@/components/EventCard";
import { relatedEventsList } from "@/lib/events-data";
import { Sparkles } from "@/components/icons";

export default function RelatedEvents() {
  const router = useRouter();

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#25252F]">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-[#FFE14D]" />
          <span className="font-mono text-xs text-[#FFE14D] uppercase tracking-wider font-semibold">
            CURATED NIGHTLIFE
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
          MORE NIGHTS YOU MIGHT LIKE
        </h3>
        <p className="text-xs sm:text-sm text-[#8E8C9C] font-sans mt-1">
          Explore upcoming techno, house, and electronic experiences across Bangalore.
        </p>
      </div>

      {/* Grid of 4 Reused EventCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedEventsList.slice(0, 4).map((event, idx) => {
          const targetSlug = event.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return (
            <div key={idx} className="cursor-pointer">
              <EventCard
                {...event}
                onClick={() => router.push(`/events/${targetSlug}`)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
