import { ShieldAlert, Shirt, Clock, MapPin, AlertTriangle } from "lucide-react";
import { DetailedEvent } from "@/lib/events-data";

interface EventRulesSectionProps {
  event: DetailedEvent;
}

export default function EventRulesSection({ event }: EventRulesSectionProps) {
  const rules = [
    {
      title: "ENTRY",
      desc: "Age 18+ requirement. Physical valid government ID required at door.",
      icon: ShieldAlert,
      color: "text-amber-400",
    },
    {
      title: "DRESS CODE",
      desc: event.dressCode || "Smart casual. No flip-flops or slippers.",
      icon: Shirt,
      color: "text-[#8B5CF6]",
    },
    {
      title: "TIMINGS",
      desc: event.doorsOpen || "Doors open 9:00 PM. Re-entry restricted after midnight.",
      icon: Clock,
      color: "text-[#22C55E]",
    },
    {
      title: "VENUE",
      desc: `${event.venue}, ${event.area}, Bengaluru. Valet parking available on first-come basis.`,
      icon: MapPin,
      color: "text-[#EC4899]",
    },
    {
      title: "IMPORTANT",
      desc: "No outside food or drinks. Zero tolerance for harassment or unauthorized photography.",
      icon: AlertTriangle,
      color: "text-rose-400",
    },
  ];

  return (
    <section className="w-full my-12">
      <span className="font-mono text-[11px] text-[#8B5CF6] uppercase tracking-wider block mb-1">
        HOUSE POLICY
      </span>
      <h2
        className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight mb-6"
        style={{ fontWeight: 700 }}
      >
        EVENT DETAILS &amp; RULES
      </h2>

      <div className="p-6 rounded-[16px] bg-[#1A1A21] border border-[#2A2A35]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div key={rule.title} className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#141418] border border-[#2A2A35] flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${rule.color}`} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-white tracking-wider mb-1">
                    {rule.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
