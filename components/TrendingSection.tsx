"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import EventCard, { EventCardProps } from "@/components/EventCard";

const trendingEvents: EventCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Berghain Sessions Vol. 12",
    date: "Sat, 19 Jul",
    time: "10:00 PM",
    venue: "Playboy Club",
    area: "Indiranagar",
    price: "₹999",
    goingCount: 234,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    title: "Desi Nights — Saturday Edition",
    date: "Sat, 19 Jul",
    time: "9:00 PM",
    venue: "Toit Brewpub",
    area: "Koramangala",
    price: "₹599",
    goingCount: 412,
    saved: true,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    title: "Parvaaz Live in Bangalore",
    date: "Sun, 20 Jul",
    time: "7:30 PM",
    venue: "Phoenix Marketcity",
    area: "Whitefield",
    price: "₹1,299",
    goingCount: 891,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
    category: "ROOFTOP",
    title: "Sundowner Sessions",
    date: "Sun, 20 Jul",
    time: "5:00 PM",
    venue: "The Skyye",
    area: "UB City",
    price: "₹799",
    goingCount: 167,
    saved: false,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

export default function TrendingSection() {
  const router = useRouter();
  return (
    <section className="w-full py-[80px] bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header Row */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          {/* Left: Label + Main Heading */}
          <div>
            <p
              className="font-mono text-[#8B5CF6] uppercase mb-2 font-medium"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
              }}
            >
              THIS WEEKEND IN BLR
            </p>
            <h2
              className="font-sans font-bold text-white text-[32px] tracking-tight leading-tight"
              style={{ fontWeight: 700 }}
            >
              Trending Events
            </h2>
          </div>

          {/* Right: View all link */}
          <Link
            href="/events"
            className="group inline-flex items-center gap-1.5 text-[#8B5CF6] hover:underline font-medium text-sm transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {trendingEvents.map((event) => (
            <EventCard
              key={event.title}
              {...event}
              onClick={() => {
                const slug = event.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                router.push(`/events/${slug}`);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
