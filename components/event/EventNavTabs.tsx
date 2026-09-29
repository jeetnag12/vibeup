"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Users, MessageSquare, ShieldCheck, Star } from "lucide-react";

interface EventNavTabsProps {
  eventId: string;
}

export default function EventNavTabs({ eventId }: EventNavTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "OVERVIEW",
      href: `/events/${eventId}`,
      icon: Eye,
      isActive: pathname === `/events/${eventId}`,
    },
    {
      label: "WHO'S GOING",
      href: `/events/${eventId}/going`,
      icon: Users,
      isActive: pathname.includes("/going"),
    },
    {
      label: "DISCUSSION",
      href: `/events/${eventId}/discussion`,
      icon: MessageSquare,
      isActive: pathname.includes("/discussion"),
    },
    {
      label: "CREWS",
      href: `/events/${eventId}/crews`,
      icon: ShieldCheck,
      isActive: pathname.includes("/crews"),
    },
    {
      label: "REVIEWS",
      href: `/events/${eventId}/reviews`,
      icon: Star,
      isActive: pathname.includes("/reviews"),
    },
  ];

  return (
    <nav
      aria-label="Event Sections Navigation"
      className="w-full mb-8 border-b border-[#1A1A1A]"
    >
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-[4px] font-mono text-xs font-semibold tracking-wider transition-all duration-150 shrink-0 border ${
                tab.isActive
                  ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.25)]"
                  : "bg-[#111111] border-[#1A1A1A] text-[#666666] hover:text-white hover:border-[#8B5CF6]/40"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  tab.isActive ? "text-[#8B5CF6]" : "text-[#666666]"
                }`}
              />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
