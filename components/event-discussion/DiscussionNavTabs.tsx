"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Users, Eye, ShieldCheck, Star } from "@/components/icons";

interface DiscussionNavTabsProps {
  eventId: string;
}

export default function DiscussionNavTabs({ eventId }: DiscussionNavTabsProps) {
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
    <div className="w-full mb-8 border-b border-[#25252F]">
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-[4px] font-mono text-xs font-semibold tracking-wider transition-all duration-150 shrink-0 border ${
                tab.isActive
                  ? "bg-[#FFE14D]/15 border-[#FFE14D] text-white shadow-[0_0_16px_rgba(255,225,77,0.25)]"
                  : "bg-[#15151C] border-[#25252F] text-[#8E8C9C] hover:text-white hover:border-[#FFE14D]/40"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  tab.isActive ? "text-[#FFE14D]" : "text-[#8E8C9C]"
                }`}
              />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
