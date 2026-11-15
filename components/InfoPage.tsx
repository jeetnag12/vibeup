import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Shared layout for simple text pages: About, Help, Privacy, Terms. */
export default function InfoPage({
  kicker,
  title,
  accent,
  intro,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  accent?: string;
  intro: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-night text-white">
      <Navbar />
      <div className="max-w-[820px] mx-auto px-5 sm:px-6 pt-[120px] pb-24">
        <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted mb-3">↗ {kicker}</p>
        <h1 className="font-extrabold uppercase text-[clamp(44px,8vw,96px)] leading-[0.88] m-0">
          {title} {accent && <span className="text-yellow">{accent}</span>}
        </h1>
        <p className="text-[18px] text-[#C9C6D6] mt-6 max-w-[60ch]">{intro}</p>
        {updated && <p className="font-mono text-[12px] text-muted mt-3">Last updated {updated}</p>}
        <div className="mt-12 flex flex-col gap-10 [&_h2]:text-[28px] [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:leading-none [&_h2]:mb-3 [&_p]:text-[#C9C6D6] [&_p]:leading-relaxed [&_li]:text-[#C9C6D6] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
