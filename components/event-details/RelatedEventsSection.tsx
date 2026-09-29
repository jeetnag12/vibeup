"use client";

import { useRouter } from "next/navigation";
import EventCard from "@/components/EventCard";
import { relatedEventsList } from "@/lib/events-data";

export default function RelatedEventsSection() {
  const router = useRouter();

  return (
    <section className="w-full my-12 pt-8 border-t border-[#1A1A1A]">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
          RECOMMENDED EXPERIENCES
        </span>
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] font-sans text-white tracking-tight"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          YOU MIGHT ALSO LIKE
        </h2>
        <p className="text-sm sm:text-base text-[#666666] font-sans mt-1">
          Similar vibrations, soundscapes, and crowds this coming weekend.
        </p>
      </div>

      {/* Grid of 4 Reused EventCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        {relatedEventsList.map((event, idx) => (
          <div key={idx} className="cursor-pointer">
            <EventCard
              {...event}
              onClick={() => {
                const targetSlug = event.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                router.push(`/events/${targetSlug}`);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
