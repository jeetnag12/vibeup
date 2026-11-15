import Link from "next/link";
import { Logo } from "@/components/Navbar";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Events", href: "/discover" },
      { label: "Clubs", href: "/clubs" },
      { label: "Communities", href: "/communities" },
      { label: "Crews", href: "/crews" },
      { label: "People", href: "/people" },
    ],
  },
  {
    title: "You",
    links: [
      { label: "Join VibeUp", href: "/signup" },
      { label: "Log in", href: "/login" },
      { label: "Messages", href: "/messages" },
      { label: "Saved", href: "/saved" },
    ],
  },
  {
    title: "VibeUp",
    links: [
      { label: "About", href: "/about" },
      { label: "Help & contact", href: "/help" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-night border-t border-line pt-14 pb-8">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start gap-4">
            <Link href="/" aria-label="VibeUp home">
              <Logo className="text-[28px]" />
            </Link>
            <p className="text-muted text-[15px] max-w-[34ch]">
              Tickets, crews and people for Bangalore nights. Don&apos;t go solo.
            </p>
            <a
              href="https://instagram.com/vibeup.bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-tile border border-line grid place-items-center">
                <InstagramIcon />
              </span>
              <span className="font-mono text-xs">@vibeup.bangalore</span>
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#C9C6D6] hover:text-white text-[15px] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[12px] text-muted">© 2026 VibeUp · Bangalore · 18+</p>
          <p className="font-mono text-[12px] text-muted">App coming soon</p>
        </div>
      </div>
    </footer>
  );
}
