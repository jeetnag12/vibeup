"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, MessageCircle, Send } from "@/components/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CommunityDiscussion, getDetailedCommunityById } from "@/lib/communities-data";

const ME_AVATAR =
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=160&auto=format&fit=crop";

export default function CommunityDiscussionPage() {
  const params = useParams();
  const id = (params?.communityId as string) || "";
  const community = useMemo(() => getDetailedCommunityById(id), [id]);

  const [posts, setPosts] = useState<CommunityDiscussion[]>(community.discussions);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 5) {
      setError("Give your post a title of at least 5 characters.");
      return;
    }
    setError("");
    setPosts([
      {
        id: `local-${Date.now()}`,
        authorName: "You",
        authorAvatar: ME_AVATAR,
        title: title.trim(),
        preview: body.trim() || "No details added.",
        timeAgo: "Just now",
        replyCount: 0,
      },
      ...posts,
    ]);
    setTitle("");
    setBody("");
  };

  return (
    <main className="min-h-screen bg-night text-white">
      <Navbar />
      <div className="max-w-[880px] mx-auto px-5 sm:px-6 pt-[112px] pb-20">
        <Link
          href={`/communities/${community.id}`}
          className="inline-flex items-center gap-2 text-muted hover:text-white text-[14px] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {community.name.toLowerCase()}
        </Link>

        <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted mb-3">↗ Community discussions</p>
        <h1 className="font-extrabold uppercase text-[clamp(38px,6vw,72px)] leading-[0.9] m-0">
          {community.name}
        </h1>
        <p className="text-muted mt-4 max-w-[60ch]">
          Ask about events, find people to go with, and share what you thought of last weekend.
        </p>

        <form onSubmit={submit} className="mt-10 bg-tile border border-line rounded-[22px] p-5 flex flex-col gap-3">
          <label htmlFor="disc-title" className="font-mono text-[11px] tracking-[0.09em] uppercase text-muted">
            Start a discussion
          </label>
          <input
            id="disc-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Anyone going to Techno Night on Saturday?"
            className="bg-night border border-line focus:border-yellow rounded-[12px] px-4 py-3 text-[15px] outline-none"
          />
          <textarea
            id="disc-body"
            aria-label="Details"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Add details (optional)"
            className="bg-night border border-line focus:border-yellow rounded-[12px] px-4 py-3 text-[15px] outline-none resize-y"
          />
          {error && <p className="text-[#FF6B6B] text-[13px] m-0">{error}</p>}
          <button
            type="submit"
            className="self-end inline-flex items-center gap-2 rounded-full bg-yellow text-night font-semibold text-[14px] px-5 py-2.5 hover:bg-[#FFEA80] transition-colors"
          >
            <Send className="w-4 h-4" /> Post
          </button>
        </form>

        <ul className="mt-8 flex flex-col gap-3">
          {posts.map((d) => (
            <li key={d.id} className="bg-tile border border-line rounded-[22px] p-5">
              <div className="flex items-center gap-3">
                <Image src={d.authorAvatar} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <b className="block text-[14px]">{d.authorName}</b>
                  <span className="text-muted text-[12px]">{d.timeAgo}</span>
                </div>
              </div>
              <h3 className="text-[18px] font-bold tracking-[-0.01em] mt-3 mb-1">{d.title}</h3>
              <p className="text-[#C9C6D6] text-[15px] m-0">{d.preview}</p>
              <button
                type="button"
                onClick={() => setOpenId(openId === d.id ? null : d.id)}
                className="mt-3 inline-flex items-center gap-1.5 text-muted hover:text-white text-[13px]"
                aria-expanded={openId === d.id}
              >
                <MessageCircle className="w-4 h-4" /> {d.replyCount} replies
              </button>
              {openId === d.id && (
                <p className="mt-3 text-[13px] text-muted border-t border-line pt-3 m-0">
                  Replies load here once accounts are connected. For now, join the community to follow this thread.
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}
