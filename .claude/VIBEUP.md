# VibeUp: shared context for every agent

Read this before you start any VibeUp task.

## The company
- VibeUp is a Gen-Z nightlife platform for Bangalore. The founder describes it as "a mix of District and Playo", plus a way to meet people.
- Stage: a working website prototype. There are **no club partners yet**, all data is mock data, and the mobile app comes later.
- **Founder:** a solo, non-technical founder. Explain things simply, make the call yourself, and recommend one option instead of listing many. Never post, send messages, spend money or sign up for anything on the founder's behalf; prepare it and ask first.

## The product: three pillars on the website
1. **Ticketing (the core).** Find and book events, pay with Razorpay, get a QR ticket checked at entry. For now the VibeUp team lists the events; clubs get a CRM dashboard later.
2. **Communities and crews.** Communities are long-running groups, and only verified users can create one, through an approval form. Crews are small groups going to one event together; private crews are invite-only. Whether crew members need a ticket and how bill-splitting works is still undecided.
3. **Connecting people.**
   - Vibe score: built from bookings, attendance, socialising, ratings and followers.
   - Vibe match: built from shared interests and visiting the same clubs.
   - Chat: only between verified users who follow each other. Women choose their own DM setting.

VibeUp Social (reels and short videos) is **app-only and comes later**.

## Rules
- **Age:** users must be 18+. Some events (usually alcohol-led ones) are 21+, so check Karnataka excise rules before promoting them.
- **Privacy:** India's DPDP Act applies. Collect as little data as possible, get clear consent, and give women safety controls.
- **TikTok is banned in India.** For short video use Instagram Reels and YouTube Shorts.

## Business model
- Clubs use VibeUp free at first.
- Later revenue: ticket commission, paid club promotion, restaurant and club ads, and video ads in the app.

## Brand: "Loud Type + Bento"
Brand book: https://claude.ai/artifact/MEwdUeVP16y7GGYEEVemDE

- **Two jobs, never swapped.** Loud Type (big, stretchy, uppercase Anybody) shouts. Dark rounded tiles do the work.
- **Colours:**
  - night `#0B0B10`, tile `#15151C`, line `#25252F`
  - yellow `#FFE14D` is the primary action, always with night-coloured text on top
  - pink `#FF4FA3` (emphasis), sky `#5CC8FF` (info), lime `#B6F36B` (live), paper `#FFF6E0`
- **Fonts:** Anybody for display, Inter for body, JetBrains Mono for labels.
- **Icons:** Phosphor Fill, imported only through `components/icons.tsx`. Never use lucide-react.
- **Retired, don't bring back:** stickers and the old purple `#8B5CF6`.
- **Voice:** like a friend texting you. Short, warm and specific, using real areas (Indiranagar, Koramangala, HSR, Whitefield, UB City). Buttons start with a verb.
- **Signature lines:** "Don't go solo.", "Find your crowd.", "Your night, sorted."

## Tech
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind 3, React 18.
- **Mock data:** lives in `lib/*.ts`, and events resolve through `lib/event-catalog.ts`.
- **Planned backend:** one backend shared by the website and the app. Supabase (Mumbai region) for auth, Postgres and storage; Vercel for hosting; Razorpay for payments. No self-managed server.
- **Builds:** the project drive (D:) is exFAT and `next build` fails there. Build on a copy on C:. Git needs `-c safe.directory=*`.
- **Git:** work on a branch. Never push to `main` without the founder's OK.

## Where things live
- `marketing/`: launch plan, competitor study, 30-day calendar, reel style, club pitch
- `app/` for pages, `components/` (landing pieces in `components/landing/`), `lib/` for data
