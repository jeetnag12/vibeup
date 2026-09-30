"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TrendingEventItem {
  id: string;
  image: string;
  category: string;
  title: string;
  venue: string;
  price: string;
}

const trendingEvents: TrendingEventItem[] = [
  {
    id: "berghain-sessions-vol-12",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    category: "TECHNO",
    title: "Berghain Sessions Vol. 12",
    venue: "Playboy Club · Indiranagar",
    price: "₹999",
  },
  {
    id: "desi-nights-saturday",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    category: "BOLLYWOOD",
    title: "Desi Nights — Saturday Edition",
    venue: "Toit Brewpub · Koramangala",
    price: "₹599",
  },
  {
    id: "parvaaz-live-bangalore",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    category: "LIVE MUSIC",
    title: "Parvaaz Live in Bangalore",
    venue: "Phoenix Marketcity · Whitefield",
    price: "₹1,299",
  },
  {
    id: "sundowner-sessions",
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
    category: "ROOFTOP",
    title: "Sundowner Sessions",
    venue: "The Skyye · UB City",
    price: "₹799",
  },
  {
    id: "underground-vault-rave",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "HOUSE",
    title: "Underground Vault Rave",
    venue: "Basement Vault · CBD",
    price: "₹899",
  },
];

export default function TrendingSection() {
  const router = useRouter();

  return (
    <section
      id="trending"
      className="w-full relative z-10"
      style={{
        backgroundColor: "#F2F0EB",
        padding: "100px 0",
      }}
    >
      {/* SECTION HEADER */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 mb-12 flex flex-row items-end justify-between gap-4">
        {/* Left Side */}
        <div>
          <span
            className="block font-mono text-[#8B5CF6] uppercase mb-1.5"
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              fontWeight: 700,
            }}
          >
            THIS WEEKEND
          </span>
          <h2
            className="font-sans text-[#000000] m-0 leading-[0.95]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.03em",
            }}
          >
            TRENDING IN BLR
          </h2>
        </div>

        {/* Right Side */}
        <Link
          href="/discover"
          className="inline-flex items-center text-[#8B5CF6] hover:text-[#7C3AED] transition-colors duration-150 font-mono shrink-0 mb-1"
          style={{
            fontSize: "12px",
            letterSpacing: "0.02em",
          }}
        >
          View all →
        </Link>
      </div>

      {/* CARDS GRID: 5 columns desktop, 3 tablet, 2 mobile */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {trendingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => router.push(`/events/${event.id}`)}
              className="group relative cursor-pointer select-none bg-[#FFFFFF]"
              style={{
                aspectRatio: "3 / 4",
                borderRadius: "8px",
                overflow: "hidden",
                border: "2px solid #7C3AED",
                transition: "transform 250ms ease, box-shadow 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "4px 4px 0px #7C3AED";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image: full card, object-fit cover */}
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="z-0 transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                style={{ objectFit: "cover" }}
              />

              {/* Gradient Overlay (z-1) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 1,
                  background:
                    "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.95) 100%)",
                }}
              />

              {/* TOP RIGHT price (absolute top-10 right-10 z-10) */}
              <div
                className="absolute z-10 font-mono"
                style={{
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "2px",
                  border: "1px solid #000000",
                  lineHeight: 1,
                }}
              >
                {event.price}
              </div>

              {/* BOTTOM (absolute bottom-0 z-10, p-4) */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col items-start text-left pointer-events-none">
                {/* Category */}
                <span
                  className="font-mono text-white inline-block mb-2 uppercase"
                  style={{
                    backgroundColor: "#8B5CF6",
                    fontSize: "9px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "2px",
                    letterSpacing: "0.05em",
                    lineHeight: 1.2,
                  }}
                >
                  {event.category}
                </span>

                {/* Title */}
                <h3
                  className="font-sans text-white m-0 line-clamp-1 leading-snug"
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {event.title}
                </h3>

                {/* Venue */}
                <p
                  className="font-mono m-0 mt-1 line-clamp-1"
                  style={{
                    fontSize: "10px",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {event.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
