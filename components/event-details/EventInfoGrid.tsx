import { Calendar, Clock, MapPin, Music, ShieldAlert } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface EventInfoGridProps {
  event: DetailedEvent;
}

export default function EventInfoGrid({ event }: EventInfoGridProps) {
  const infoItems = [
    {
      label: "DATE",
      value: "Saturday, 03 October 2026",
      icon: Calendar,
      color: "text-[#8B5CF6]",
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
      color: "text-[#EC4899]",
    },
    {
      label: "LOCATION",
      value: `${event.area}, ${event.city}`,
      icon: MapPin,
      color: "text-[#A1A1AA]",
    },
    {
      label: "GENRE",
      value: event.genre,
      icon: Music,
      color: "text-[#8B5CF6]",
    },
    {
      label: "AGE",
      value: event.ageRestriction,
      icon: ShieldAlert,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="w-full my-8 p-5 sm:p-6 rounded-[16px] bg-[#141418] border border-[#2A2A35]">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {infoItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon className={`w-3.5 h-3.5 ${item.color} opacity-90`} />
                <span className="font-mono text-[11px] text-[#A1A1AA] uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              <span className="font-sans font-medium text-white text-sm sm:text-[15px] leading-snug">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
