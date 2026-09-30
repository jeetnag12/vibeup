"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ClubItem {
  id: string;
  name: string;
  area: string;
  genres: string;
  image: string;
}

const marqueeClubs: ClubItem[] = [
  {
    id: "playboy-club",
    name: "Playboy Club",
    area: "Indiranagar",
    genres: "TECHNO · HOUSE",
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "the-humming-tree",
    name: "The Humming Tree",
    area: "Indiranagar",
    genres: "LIVE MUSIC · INDIE",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "toit-brewpub",
    name: "Toit Brewpub",
    area: "Koramangala",
    genres: "BOLLYWOOD · CRAFT",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "fandom",
    name: "Fandom",
    area: "Koramangala",
    genres: "ELECTRONIC · HIP HOP",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "the-skyye",
    name: "The Skyye",
    area: "UB City",
    genres: "ROOFTOP · LOUNGE",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
  },
];

const marqueeTextSingle =
  "PLAYBOY CLUB · THE HUMMING TREE · TOIT BREWPUB · FANDOM · THE SKYYE · VAPOUR · SOCIAL · ARBOR BREWING · ";
const marqueeTextRepeated = marqueeTextSingle.repeat(4);

export default function ClubsMarquee() {
  const router = useRouter();

  return (
    <section
      id="clubs-marquee"
      className="w-full relative z-10 select-none"
      style={{
        backgroundColor: "#000000",
        padding: "100px 0",
      }}
    >
      {/* HEADER (px-8, max-width 1440px, mx-auto, mb-16) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 mb-16">
        <span
          className="block font-mono text-[#8B5CF6] uppercase mb-2"
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            fontWeight: 700,
          }}
        >
          BANGALORE&apos;S BEST
        </span>
        <h2
          className="font-sans text-white m-0 leading-[0.95]"
          style={{
            fontWeight: 900,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.03em",
          }}
        >
          POPULAR CLUBS
        </h2>
      </div>

      {/* TWO MARQUEE TEXT ROWS */}
      <div className="w-full overflow-hidden flex flex-col">
        {/* Row 1: marquee-left, py-4, border-top 1px solid #1A1A1A, border-bottom 1px solid #1A1A1A */}
        <div
          className="w-full overflow-hidden border-t border-b border-[#1A1A1A] py-4"
          style={{ borderColor: "#1A1A1A" }}
        >
          <div className="marquee-left w-max">
            <div
              className="font-sans whitespace-nowrap px-4 leading-none"
              style={{
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 64px)",
                color: "rgba(255, 255, 255, 0.08)",
                letterSpacing: "-0.02em",
              }}
            >
              {marqueeTextRepeated}
            </div>
            <div
              className="font-sans whitespace-nowrap px-4 leading-none"
              style={{
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 64px)",
                color: "rgba(255, 255, 255, 0.08)",
                letterSpacing: "-0.02em",
              }}
              aria-hidden="true"
            >
              {marqueeTextRepeated}
            </div>
          </div>
        </div>

        {/* Row 2: marquee-right, py-4, border-bottom 1px solid #1A1A1A */}
        <div
          className="w-full overflow-hidden border-b border-[#1A1A1A] py-4"
          style={{ borderColor: "#1A1A1A" }}
        >
          <div className="marquee-right w-max">
            <div
              className="font-sans whitespace-nowrap px-4 leading-none"
              style={{
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 64px)",
                color: "rgba(255, 255, 255, 0.08)",
                letterSpacing: "-0.02em",
              }}
            >
              {marqueeTextRepeated}
            </div>
            <div
              className="font-sans whitespace-nowrap px-4 leading-none"
              style={{
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 64px)",
                color: "rgba(255, 255, 255, 0.08)",
                letterSpacing: "-0.02em",
              }}
              aria-hidden="true"
            >
              {marqueeTextRepeated}
            </div>
          </div>
        </div>
      </div>

      {/* BELOW MARQUEES — Club cards grid (5 columns desktop, 3 tablet, 2 mobile, px-8, max-width 1440px, mx-auto, mt-16) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {marqueeClubs.map((club) => (
            <div
              key={club.id}
              onClick={() => router.push(`/clubs/${club.id}`)}
              className="group relative cursor-pointer select-none bg-[#0D0D0D]"
              style={{
                aspectRatio: "4 / 3",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #1A1A1A",
                transition: "all 400ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8B5CF6";
                e.currentTarget.style.boxShadow =
                  "-2px 0 20px rgba(139, 92, 246, 0.2), 2px 0 20px rgba(236, 72, 153, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1A1A1A";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image: full bleed, object-fit cover, grayscale(20%) default, grayscale(0%) hover */}
              <Image
                src={club.image}
                alt={club.name}
                fill
                className="z-0 transition-all duration-400 group-hover:scale-105 pointer-events-none"
                style={{
                  objectFit: "cover",
                  filter: "grayscale(20%)",
                  transition: "filter 400ms ease, transform 400ms ease",
                }}
              />

              {/* Overlay: gradient bottom dark */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 1,
                  background:
                    "linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, 0.92) 100%)",
                }}
              />

              {/* Bottom content (absolute, p-4) */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col items-start text-left pointer-events-none">
                <h3
                  className="font-sans text-white m-0 line-clamp-1 leading-snug"
                  style={{
                    fontWeight: 800,
                    fontSize: "18px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {club.name}
                </h3>
                <span
                  className="font-mono text-[#666666] mt-0.5 line-clamp-1"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {club.area}
                </span>
                <span
                  className="font-mono text-[#8B5CF6] mt-1 font-medium line-clamp-1"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {club.genres}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
