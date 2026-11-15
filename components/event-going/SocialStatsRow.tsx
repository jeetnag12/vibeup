"use client";

import { Users, Sparkles, ShieldCheck } from "@/components/icons";
import { DetailedEvent } from "@/lib/events-data";

interface SocialStatsRowProps {
  event: DetailedEvent;
}

export default function SocialStatsRow({ event }: SocialStatsRowProps) {
  const activeCrewsCount = event.crews?.length || 8;

  const stats = [
    {
      value: event.goingCount || 124,
      label: "PEOPLE GOING",
      subtext: "Verified ticket holders & RSVPs",
      icon: Users,
      color: "text-white",
      iconBg: "bg-[#FFE14D]/15 text-[#FFE14D] border-[#FFE14D]/30",
    },
    {
      value: event.vibeCount || 23,
      label: "PEOPLE YOU MAY VIBE WITH",
      subtext: "High music & interest match",
      icon: Sparkles,
      color: "text-[#FFE14D]",
      iconBg: "bg-[#FFE14D]/20 text-[#FFE14D] border-[#FFE14D]/50 shadow-[0_0_16px_rgba(255,225,77,0.2)]",
    },
    {
      value: activeCrewsCount,
      label: "ACTIVE CREWS",
      subtext: "Groups gathering for this night",
      icon: ShieldCheck,
      color: "text-[#FF4FA3]",
      iconBg: "bg-[#FF4FA3]/15 text-[#FF4FA3] border-[#FF4FA3]/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="p-5 sm:p-6 rounded-[12px] bg-[#15151C] border border-[#25252F] hover:border-[#FFE14D]/50 transition-all duration-200 flex items-center justify-between gap-4"
          >
            <div>
              <div
                className={`text-3xl sm:text-4xl font-bold font-sans tracking-tight mb-1 ${stat.color}`}
                style={{ fontWeight: 700 }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-xs font-semibold text-white tracking-wider mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-[#8E8C9C] font-sans">
                {stat.subtext}
              </div>
            </div>

            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${stat.iconBg}`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
