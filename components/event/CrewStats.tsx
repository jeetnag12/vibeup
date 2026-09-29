"use client";

import { Users, ShieldCheck, Sparkles } from "lucide-react";

interface CrewStatsProps {
  crewsCount?: number;
  peopleCount?: number;
  openSpotsCount?: number;
}

export default function CrewStats({
  crewsCount = 12,
  peopleCount = 84,
  openSpotsCount = 27,
}: CrewStatsProps) {
  const stats = [
    {
      value: crewsCount,
      label: "CREWS GOING",
      sublabel: "Attending this event",
      icon: ShieldCheck,
      color: "#8B5CF6",
    },
    {
      value: peopleCount,
      label: "PEOPLE IN CREWS",
      sublabel: "Coordinating together",
      icon: Users,
      color: "#EC4899",
    },
    {
      value: openSpotsCount,
      label: "OPEN SPOTS",
      sublabel: "Looking for members",
      icon: Sparkles,
      color: "#22C55E",
    },
  ];

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider">
          EVENT SOCIAL ACTIVITY
        </span>
        <span className="font-mono text-[11px] text-[#8B5CF6]">
          Live Event Numbers
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 rounded-[16px] bg-[#141418] border border-[#2A2A35] flex items-center justify-between gap-4 hover:border-[#8B5CF6]/40 transition-colors"
            >
              <div>
                <div className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none mb-1.5">
                  {stat.value}
                </div>
                <div className="font-mono text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">
                  {stat.label}
                </div>
                <div className="font-sans text-[11px] text-[#71717A] mt-0.5">
                  {stat.sublabel}
                </div>
              </div>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-[#2A2A35]"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
