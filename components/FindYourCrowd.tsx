"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const previewUsers = [
  {
    name: "Aarav Sharma",
    genres: "Techno · House · Melodic",
    mutual: "4 mutual events",
    initials: "AS",
    avatarBg: "from-[#8B5CF6] via-purple-600 to-[#EC4899]",
    avatarImg:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    offsetClass: "ml-0 z-30",
  },
  {
    name: "Rhea Nair",
    genres: "Indie · Live Music · Rock",
    mutual: "3 mutual events",
    initials: "RN",
    avatarBg: "from-[#EC4899] via-fuchsia-600 to-[#8B5CF6]",
    avatarImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    offsetClass: "sm:ml-[20px] -mt-[20px] z-20",
  },
  {
    name: "Kabir Mehta",
    genres: "Electronic · Hip-hop · Trap",
    mutual: "5 mutual events",
    initials: "KM",
    avatarBg: "from-indigo-600 via-purple-600 to-[#8B5CF6]",
    avatarImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    offsetClass: "sm:ml-[40px] -mt-[20px] z-10",
  },
];

const features = [
  "Match by music taste and events",
  "See who's going to the same night",
  "Create or join a crew instantly",
];

export default function FindYourCrowd() {
  return (
    <section className="w-full py-[80px] bg-[#09090B] relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-start">
            {/* Label */}
            <p
              className="font-mono text-[#8B5CF6] uppercase mb-3 font-medium"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
              }}
            >
              SOCIAL DISCOVERY
            </p>

            {/* Heading */}
            <h2
              className="font-sans font-bold text-white text-[36px] sm:text-[48px] tracking-tight leading-[1.12] mb-6"
              style={{ fontWeight: 700 }}
            >
              Find people
              <br />
              who go out
              <br />
              like you.
            </h2>

            {/* Description */}
            <p
              className="text-[#A1A1AA] text-[18px] max-w-[420px] font-sans leading-relaxed mb-8 font-normal"
              style={{ fontWeight: 400 }}
            >
              VibeUp matches you with people based on your music taste, the events you attend, and the clubs you vibe with. Not another dating app. Your nightlife crew.
            </p>

            {/* 3 feature points */}
            <div className="flex flex-col gap-3.5 mb-10 w-full max-w-[420px]">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <span className="text-white text-[15px] sm:text-[16px] font-sans">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 text-white font-medium transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-[0_0_24px_rgba(139,92,246,0.35)]"
              style={{
                backgroundColor: "#8B5CF6",
                padding: "14px 28px",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#7C3AED";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#8B5CF6";
              }}
            >
              <span className="font-sans text-[15px]">Find Your Crowd</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* RIGHT SIDE: 3 stacked/overlapping people cards preview */}
          <div className="w-full flex flex-col items-center lg:items-start justify-center pt-4 lg:pt-0 lg:pl-8">
            <div className="relative flex flex-col w-full max-w-[340px]">
              {previewUsers.map((user) => (
                <div
                  key={user.name}
                  className={`w-full sm:w-[300px] bg-[#1A1A21] border border-[#2A2A35] rounded-[12px] p-4 shadow-xl transition-transform duration-300 hover:scale-[1.02] ${user.offsetClass}`}
                  style={{
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Avatar circle 48px */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.avatarImg}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Right of avatar: Name & Genres */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-white font-sans text-[14px] truncate"
                        style={{ fontWeight: 600 }}
                      >
                        {user.name}
                      </h4>
                      <p className="font-mono text-[12px] text-[#A1A1AA] truncate mt-0.5">
                        {user.genres}
                      </p>
                    </div>

                    {/* Far right: Follow button pill */}
                    <button
                      type="button"
                      tabIndex={-1}
                      className="shrink-0 text-xs font-mono px-3 py-1 rounded-full border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors duration-200"
                    >
                      Follow
                    </button>
                  </div>

                  {/* Below card: Mutual events */}
                  <div className="mt-3 pt-2.5 border-t border-[#2A2A35]/60 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#8B5CF6]">
                      {user.mutual}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
