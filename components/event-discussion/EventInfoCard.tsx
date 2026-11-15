"use client";

import { Calendar, Clock, MapPin, ShieldAlert, Sparkles } from "@/components/icons";
import { DetailedEvent } from "@/lib/events-data";

interface EventInfoCardProps {
  event: DetailedEvent;
}

export default function EventInfoCard({ event }: EventInfoCardProps) {
  const infoItems = [
    {
      label: "DATE",
      value: event.dateDisplay,
      icon: Calendar,
      color: "text-[#FFE14D]",
    },
    {
      label: "TIME",
      value: event.timeRange,
      icon: Clock,
      color: "text-[#22C55E]",
    },
    {
      label: "VENUE",
      value: event.venue,
      icon: MapPin,
      color: "text-[#FF4FA3]",
    },
    {
      label: "LOCATION",
      value: `${event.area.toUpperCase()}, ${event.city.toUpperCase()}`,
      icon: MapPin,
      color: "text-amber-400",
    },
    {
      label: "AGE",
      value: `${event.ageRestriction} (Physical ID Required)`,
      icon: ShieldAlert,
      color: "text-rose-400",
    },
  ];

  return (
    <div className="p-5 rounded-[12px] bg-[#15151C] border border-[#25252F] flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#25252F]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FFE14D]" />
          <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">
            PINNED EVENT INFO
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
          CONFIRMED
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {infoItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#15151C] border border-[#25252F] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[10px] text-[#8E8C9C] block uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="font-sans text-xs font-semibold text-white truncate block">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
