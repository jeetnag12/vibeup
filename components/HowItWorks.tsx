"use client";

import { Search, Users, Zap, Star, ChevronRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discover",
    description:
      "Find events by genre, area, vibe, and price. No more missing out.",
  },
  {
    num: "02",
    icon: Users,
    title: "Find Your Crowd",
    description:
      "See who's going. Match with people who share your taste.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Build Your Crew",
    description:
      "Create or join a crew. Plan together before the night begins.",
  },
  {
    num: "04",
    icon: Star,
    title: "Build Your Vibe Score",
    description:
      "Rate, review, and earn your nightlife reputation after every event.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-[80px] bg-[#141418] text-center">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <p
            className="font-mono text-[#8B5CF6] uppercase mb-2 font-medium"
            style={{
              fontSize: "11px",
              letterSpacing: "0.1em",
            }}
          >
            THE VIBEUP WAY
          </p>

          <h2
            className="font-sans font-bold text-white text-[32px] sm:text-[36px] tracking-tight leading-tight mb-3"
            style={{ fontWeight: 700 }}
          >
            From discovery to memory
          </h2>

          <p
            className="text-[#A1A1AA] text-[16px] max-w-[500px] mx-auto font-sans leading-relaxed font-normal"
            style={{ fontWeight: 400 }}
          >
            Every night out starts with discovery and ends with a story worth sharing.
          </p>
        </div>

        {/* Steps Grid: 4 columns desktop, 2x2 tablet, 1 column mobile */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                {/* Step Card Content */}
                <div className="w-full h-full flex flex-col items-center p-6 rounded-2xl bg-[#1A1A21]/60 border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-all duration-200 group">
                  {/* Large Number */}
                  <span
                    className="font-mono font-bold leading-none mb-3 transition-colors duration-200 group-hover:text-[rgba(139,92,246,0.35)]"
                    style={{
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "rgba(139, 92, 246, 0.2)",
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Icon below number */}
                  <div className="mb-4 text-[#8B5CF6] p-2.5 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-sans text-white text-[18px] mb-2 tracking-tight"
                    style={{ fontWeight: 600 }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-sans text-[#A1A1AA] text-[14px] leading-relaxed max-w-[240px]"
                    style={{ fontWeight: 400 }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Between each step on desktop: Arrow icon (ChevronRight) in #2A2A35 */}
                {!isLast && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-[#2A2A35] pointer-events-none"
                    aria-hidden="true"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
