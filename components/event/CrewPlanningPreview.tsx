"use client";

import { MessageSquare, MapPin, BarChart3, UserPlus, Compass } from "lucide-react";

export default function CrewPlanningPreview() {
  const features = [
    {
      icon: MessageSquare,
      title: "CHAT",
      subtitle: "Talk before the event.",
      description: "Coordinate pre-drinks, dress codes, music vibes, and entry timing in your crew's private channel.",
      color: "#8B5CF6",
    },
    {
      icon: MapPin,
      title: "MEETUP",
      subtitle: "Choose where to meet.",
      description: "Pick a spot nearby—a rooftop pub, metro station, or club gate—so nobody walks into the venue alone.",
      color: "#EC4899",
    },
    {
      icon: BarChart3,
      title: "POLL",
      subtitle: "Decide plans together.",
      description: "Vote on table bookings, arrival time, cab pooling, or whether to hit an after-party after 2:00 AM.",
      color: "#22C55E",
    },
    {
      icon: UserPlus,
      title: "INVITE",
      subtitle: "Bring more people.",
      description: "Keep open spots filled by inviting solo ravers or friends attending the same night.",
      color: "#EAB308",
    },
  ];

  return (
    <section className="w-full mb-16 pt-10 border-t border-[#2A2A35]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 mb-3">
          <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span className="font-mono text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
            SOCIAL COORDINATION
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
          WHAT CAN YOUR CREW DO?
        </h3>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans mt-2">
          VibeUp crews aren&apos;t just chat groups. They&apos;re purpose-built for coordinating real-world nightlife plans.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 rounded-[20px] bg-[#141418] border border-[#2A2A35] hover:border-[#8B5CF6]/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-[#2A2A35]"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>

                <div className="flex items-baseline gap-2 mb-1.5">
                  <h4 className="font-mono font-bold text-white text-base tracking-wider uppercase">
                    {item.title}
                  </h4>
                </div>

                <p className="font-sans font-semibold text-sm text-white/90 mb-2">
                  {item.subtitle}
                </p>

                <p className="font-sans text-xs text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#2A2A35]/60 flex items-center gap-1.5 font-mono text-[10px] text-[#8B5CF6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                <span>INCLUDED IN CREW</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
