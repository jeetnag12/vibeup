export interface CrewMember {
  id: string;
  name: string;
  avatar: string;
}

export type CrewStatus = "open" | "full" | "private";

export interface EventCrew {
  id: string;
  eventId: string;
  name: string;
  description: string;
  image?: string;
  memberCount: number;
  maxMembers: number;
  openSpots: number;
  area: string;
  status: CrewStatus;
  interests: string[];
  matchPercentage?: number;
  matchReason?: string;
  members: CrewMember[];

  // Compatibility fields for existing components
  membersCount: number;
  maxSpots: number;
  eventName: string;
  membersAvatars: string[];
  creatorName: string;
  vibeTag: string;
}

export interface LookingAttendee {
  id: string;
  name: string;
  avatar: string;
  vibeScore: number;
  vibeMatch?: number;
  matchReason?: string;
  interests: string[];
  area: string;
  crewStatus: "looking" | "in_crew" | "none";
  bio: string;
}

export const mockEventCrews: EventCrew[] = [
  {
    id: "c1",
    eventId: "saturday-techno-night",
    name: "SATURDAY TECHNO CREW",
    description: "Techno purists from Koramangala & Indiranagar. Catching the headliner right at front-left near the subwoofers.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    memberCount: 8,
    maxMembers: 10,
    openSpots: 2,
    area: "Koramangala",
    status: "open",
    interests: ["Peak Time Techno", "Front Row", "Pre-drinks"],
    matchPercentage: 94,
    matchReason: "Techno · Same area · 2 mutual events",
    creatorName: "Aarav S.",
    vibeTag: "High Energy · Front Row",
    membersCount: 8,
    maxSpots: 10,
    eventName: "Saturday Techno Night",
    membersAvatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
    members: [
      { id: "u1", name: "Aarav Sharma", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" },
      { id: "u2", name: "Pooja Hegde", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" },
      { id: "u3", name: "Rhea Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop" },
      { id: "u4", name: "Dev Patel", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop" },
      { id: "u5", name: "Kunal Ghosh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" },
      { id: "u6", name: "Sneha Reddy", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" },
      { id: "u7", name: "Aditya Roy", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop" },
      { id: "u8", name: "Ananya Rao", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop" },
    ],
  },
  {
    id: "c2",
    eventId: "saturday-techno-night",
    name: "INDIRANAGAR CARPOOLERS",
    description: "Sharing cabs from 100ft Road Indiranagar around 8:45 PM, quick rooftop drinks before heading to XYZ Club.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    memberCount: 4,
    maxMembers: 6,
    openSpots: 2,
    area: "Indiranagar",
    status: "open",
    interests: ["Carpool", "Casual Pre-drinks", "Melodic House"],
    matchPercentage: 91,
    matchReason: "Indiranagar · Shared rides · Electronic",
    creatorName: "Rhea N.",
    vibeTag: "Pre-drinks · Casual",
    membersCount: 4,
    maxSpots: 6,
    eventName: "Saturday Techno Night",
    membersAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
    members: [
      { id: "u3", name: "Rhea Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop" },
      { id: "u6", name: "Sneha Reddy", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" },
      { id: "u7", name: "Aditya Roy", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop" },
      { id: "u2", name: "Pooja Hegde", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" },
    ],
  },
  {
    id: "c3",
    eventId: "saturday-techno-night",
    name: "MIDNIGHT GROOVE COLLECTIVE",
    description: "Dancefloor nonstop until closing at 2:00 AM. Fast bpm, sweat-it-out, modular synthesis fans.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    memberCount: 6,
    maxMembers: 8,
    openSpots: 2,
    area: "Koramangala",
    status: "open",
    interests: ["Acid Techno", "Nonstop Dance", "Late Stay"],
    matchPercentage: 88,
    matchReason: "Techno · 3 mutual friends",
    creatorName: "Dev P.",
    vibeTag: "Dancefloor Nonstop",
    membersCount: 6,
    maxSpots: 8,
    eventName: "Saturday Techno Night",
    membersAvatars: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
    members: [
      { id: "u4", name: "Dev Patel", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop" },
      { id: "u5", name: "Kunal Ghosh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" },
      { id: "u2", name: "Pooja Hegde", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" },
      { id: "u8", name: "Ananya Rao", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop" },
      { id: "u9", name: "Varun Mehta", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop" },
      { id: "u10", name: "Tara Sen", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop" },
    ],
  },
  {
    id: "c4",
    eventId: "saturday-techno-night",
    name: "HSR BASSLINE SYNDICATE",
    description: "HSR Sector 1 & 4 ravers. Meeting near 27th Main before rolling over together to Koramangala.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    memberCount: 10,
    maxMembers: 10,
    openSpots: 0,
    area: "HSR",
    status: "full",
    interests: ["Dark Techno", "HSR Local", "Warehouse Vibes"],
    matchPercentage: 86,
    matchReason: "HSR Sector · Electronic",
    creatorName: "Kabir M.",
    vibeTag: "Bassline & Beats",
    membersCount: 10,
    maxSpots: 10,
    eventName: "Saturday Techno Night",
    membersAvatars: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
    members: [
      { id: "u11", name: "Kabir Mathur", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop" },
      { id: "u12", name: "Nikhil Joshi", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop" },
      { id: "u1", name: "Aarav Sharma", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" },
      { id: "u2", name: "Pooja Hegde", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" },
    ],
  },
  {
    id: "c5",
    eventId: "saturday-techno-night",
    name: "MODULAR SYNTH INNER CIRCLE",
    description: "Sound designers, producers, and audio enthusiasts. Private invite-only meetup with pre-club discussion.",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    memberCount: 5,
    maxMembers: 6,
    openSpots: 1,
    area: "MG Road",
    status: "private",
    interests: ["Hardware Synths", "Deep Techno", "Audio Nerds"],
    matchPercentage: 82,
    matchReason: "Audio Production · MG Road",
    creatorName: "Vikram R.",
    vibeTag: "Synth Geeks Only",
    membersCount: 5,
    maxSpots: 6,
    eventName: "Saturday Techno Night",
    membersAvatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop",
    ],
    members: [
      { id: "u13", name: "Vikram Rao", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" },
      { id: "u4", name: "Dev Patel", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop" },
      { id: "u9", name: "Varun Mehta", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop" },
    ],
  },
  {
    id: "c6",
    eventId: "saturday-techno-night",
    name: "WHITEFIELD NIGHT RIDERS",
    description: "Long commute from ITPL & Whitefield, so we convoy together. Splitting cabs both ways with zero hassle.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    memberCount: 6,
    maxMembers: 8,
    openSpots: 2,
    area: "Whitefield",
    status: "open",
    interests: ["Whitefield Convoy", "Cab Share", "Techno"],
    matchPercentage: 79,
    matchReason: "Whitefield · Cab pooling",
    creatorName: "Ananya K.",
    vibeTag: "Whitefield Convoy",
    membersCount: 6,
    maxSpots: 8,
    eventName: "Saturday Techno Night",
    membersAvatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop",
    ],
    members: [
      { id: "u8", name: "Ananya Rao", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop" },
      { id: "u11", name: "Kabir Mathur", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop" },
      { id: "u10", name: "Tara Sen", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop" },
    ],
  },
  {
    id: "c7",
    eventId: "saturday-techno-night",
    name: "SOLO FIRST-TIMERS CLUB",
    description: "First time at XYZ Club or going solo? Zero pressure, friendly introductions, and walking in together.",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    memberCount: 3,
    maxMembers: 6,
    openSpots: 3,
    area: "Koramangala",
    status: "open",
    interests: ["First Timers", "Solo Welcome", "Chill Vibe"],
    matchPercentage: 92,
    matchReason: "Solo Friendly · Koramangala",
    creatorName: "Meera D.",
    vibeTag: "Zero Ego · Friendly",
    membersCount: 3,
    maxSpots: 6,
    eventName: "Saturday Techno Night",
    membersAvatars: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    ],
    members: [
      { id: "u10", name: "Tara Sen", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop" },
      { id: "u9", name: "Varun Mehta", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop" },
      { id: "u2", name: "Pooja Hegde", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" },
    ],
  },
];

export const mockLookingAttendees: LookingAttendee[] = [
  {
    id: "a1",
    name: "ARJUN VARMA",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop",
    vibeScore: 81,
    vibeMatch: 91,
    matchReason: "Techno · Same area · 2 mutual events",
    interests: ["Techno", "House", "Electronic"],
    area: "INDIRANAGAR",
    crewStatus: "looking",
    bio: "Going solo tonight because flatmates bailed. Looking for fellow techno heads to grab a beer before doors open.",
  },
  {
    id: "a2",
    name: "PRIYA NAIR",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
    vibeScore: 88,
    vibeMatch: 89,
    matchReason: "Peak Time Techno · Koramangala",
    interests: ["Acid Techno", "Vinyl", "Late Night"],
    area: "KORAMANGALA",
    crewStatus: "looking",
    bio: "Just moved to Bangalore. Want to experience the local techno scene with a good crowd.",
  },
  {
    id: "a3",
    name: "ROHAN KAPOOR",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
    vibeScore: 79,
    vibeMatch: 86,
    matchReason: "HSR · Carpool friendly",
    interests: ["Melodic Techno", "Bassline", "HSR"],
    area: "HSR",
    crewStatus: "looking",
    bio: "Driving from HSR Sector 2. Happy to pool cabs and hang out inside.",
  },
  {
    id: "a4",
    name: "SNEHA DESHMUKH",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop",
    vibeScore: 84,
    vibeMatch: 84,
    matchReason: "Electronic · MG Road connection",
    interests: ["Deep House", "Minimal", "Clubbing"],
    area: "MG ROAD",
    crewStatus: "looking",
    bio: "Loves front-row sound and good conversations. Let's form a crew!",
  },
];

export const eventCrewStats = {
  crewsGoing: 12,
  peopleInCrews: 84,
  openSpots: 27,
};

export const meetupAreaOptions = [
  "Koramangala",
  "Indiranagar",
  "HSR",
  "Whitefield",
  "MG Road",
  "Other",
];

export const maxMembersOptions = [4, 6, 8, 10, 15, 20];

export function getCrewsForEvent(eventId: string): EventCrew[] {
  // If specific match exists, return; otherwise return default enriched event crews
  const filtered = mockEventCrews.filter((c) => c.eventId === eventId);
  return filtered.length > 0 ? filtered : mockEventCrews;
}

export function getCrewById(crewId: string): EventCrew | undefined {
  return mockEventCrews.find((c) => c.id === crewId);
}

export interface CrewMemberDetailed {
  id: string;
  name: string;
  avatar: string;
  vibeMatch?: number;
}

export type CrewType =
  | "CLUB NIGHT"
  | "CONCERT"
  | "FESTIVAL"
  | "BAR HOP"
  | "HOUSE PARTY"
  | "LIVE MUSIC"
  | "AFTER PARTY";

export interface Crew {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  eventId: string;
  eventName: string;
  venue: string;
  date: string;
  time: string;
  area: string;
  genres: string[];
  type: CrewType;
  members: CrewMemberDetailed[];
  memberCount: number;
  maxMembers: number;
  activityCount?: string;
  isFull: boolean;
  createdBy: string;
  communityContext?: { id: string; name: string };
  isPopular?: boolean;
  isTonight?: boolean;
  isThisWeekend?: boolean;
  timeframe?: "tonight" | "this-weekend" | "upcoming";
}

export const crewFilterCategories = [
  "ALL",
  "TONIGHT",
  "THIS WEEKEND",
  "NEARBY",
  "TECHNO",
  "HOUSE",
  "HIP-HOP",
  "LIVE MUSIC",
] as const;

export type CrewFilterCategory = (typeof crewFilterCategories)[number];

export const allCrewsData: Crew[] = [
  {
    id: "friday-techno-crew",
    name: "FRIDAY TECHNO CREW",
    description: "Heading out for high-energy warehouse techno. Pre-drinks near MG Road at 9:00 PM before hitting the vault floor.",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    eventId: "cyberpunk-neon-warehouse",
    eventName: "CYBERPUNK NEON WAREHOUSE",
    venue: "Basement Vault",
    date: "Tonight",
    time: "10:00 PM",
    area: "CBD",
    genres: ["TECHNO", "UNDERGROUND"],
    type: "CLUB NIGHT",
    memberCount: 7,
    maxMembers: 10,
    activityCount: "🔥 12 JOINED TODAY",
    isFull: false,
    createdBy: "Arjun Mehta",
    communityContext: {
      id: "bangalore-techno-society",
      name: "Bangalore Techno Society",
    },
    isPopular: true,
    isTonight: true,
    isThisWeekend: true,
    timeframe: "tonight",
    members: [
      { id: "arjun-wav", name: "Arjun Mehta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop", vibeMatch: 96 },
      { id: "priya-grooves", name: "Priya Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop", vibeMatch: 92 },
      { id: "kabir-sound", name: "Kabir Sen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop", vibeMatch: 89 },
      { id: "sanya-mathur", name: "Sanya Mathur", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop", vibeMatch: 94 },
    ],
  },
  {
    id: "indiranagar-carpoolers",
    name: "INDIRANAGAR CARPOOLERS",
    description: "Splitting cabs from 100ft Road Indiranagar around 8:45 PM. Pre-drinks at Toit before heading into the rave.",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    eventId: "saturday-techno-night",
    eventName: "SATURDAY TECHNO ODYSSEY",
    venue: "Pebble Lounge",
    date: "Sat, 17 Oct",
    time: "9:30 PM",
    area: "Indiranagar",
    genres: ["TECHNO", "HOUSE"],
    type: "BAR HOP",
    memberCount: 5,
    maxMembers: 6,
    activityCount: "ACTIVE",
    isFull: false,
    createdBy: "Rhea Nair",
    communityContext: {
      id: "indiranagar-night-owls",
      name: "Indiranagar Night Owls",
    },
    isPopular: true,
    isThisWeekend: true,
    timeframe: "this-weekend",
    members: [
      { id: "priya-grooves", name: "Priya Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop", vibeMatch: 92 },
      { id: "maya-patel", name: "Maya Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop", vibeMatch: 88 },
      { id: "rohan-synth", name: "Rohan Iyer", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop", vibeMatch: 87 },
    ],
  },
  {
    id: "deep-house-sunset-crew",
    name: "DEEP HOUSE SUNSET SQUAD",
    description: "Melodic grooves, warm basslines, and rooftop pre-party vibes. Catching the full guest producer showcase together.",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    eventId: "deep-house-odyssey-vol-4",
    eventName: "DEEP HOUSE ODYSSEY VOL. 4",
    venue: "Fandom",
    date: "Tonight",
    time: "8:30 PM",
    area: "Koramangala",
    genres: ["HOUSE", "DEEP HOUSE"],
    type: "CLUB NIGHT",
    memberCount: 8,
    maxMembers: 10,
    activityCount: "🔥 8 JOINED TODAY",
    isFull: false,
    createdBy: "Maya Patel",
    communityContext: {
      id: "house-heads-bangalore",
      name: "House Heads Bangalore",
    },
    isPopular: true,
    isTonight: true,
    isThisWeekend: true,
    timeframe: "tonight",
    members: [
      { id: "maya-patel", name: "Maya Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop", vibeMatch: 88 },
      { id: "ananya-roy", name: "Ananya Roy", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop", vibeMatch: 85 },
      { id: "tara-kapoor", name: "Tara Kapoor", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop", vibeMatch: 82 },
    ],
  },
  {
    id: "warehouse-after-dark",
    name: "WAREHOUSE AFTER DARK",
    description: "Strictly sub-bass and late-night stamina. Dancing through closing time with fellow underground devouts.",
    coverImage: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
    eventId: "cyberpunk-neon-warehouse",
    eventName: "CYBERPUNK NEON WAREHOUSE",
    venue: "Basement Vault",
    date: "Tonight",
    time: "11:00 PM",
    area: "CBD",
    genres: ["TECHNO", "ACID"],
    type: "AFTER PARTY",
    memberCount: 8,
    maxMembers: 8,
    activityCount: "FULL",
    isFull: true,
    createdBy: "Kabir Sen",
    communityContext: {
      id: "underground-bangalore",
      name: "Underground Bangalore",
    },
    isTonight: true,
    timeframe: "tonight",
    members: [
      { id: "kabir-sound", name: "Kabir Sen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop", vibeMatch: 89 },
      { id: "devansh-bass", name: "Devansh Roy", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop", vibeMatch: 83 },
      { id: "sanya-mathur", name: "Sanya Mathur", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop", vibeMatch: 94 },
    ],
  },
  {
    id: "toit-pre-party-squad",
    name: "TOIT PRE-PARTY SQUAD",
    description: "Communal table craft beer flight & wood-fired pizza pre-drinks on 100ft road before hopping clubs.",
    coverImage: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=800&auto=format&fit=crop",
    eventId: "saturday-house-session",
    eventName: "SATURDAY HOUSE SESSION",
    venue: "Toit Brewpub",
    date: "Sat, 24 Oct",
    time: "7:30 PM",
    area: "Indiranagar",
    genres: ["HOUSE", "MELODIC"],
    type: "BAR HOP",
    memberCount: 4,
    maxMembers: 8,
    activityCount: "ACTIVE",
    isFull: false,
    createdBy: "Priya Nair",
    communityContext: {
      id: "indiranagar-night-owls",
      name: "Indiranagar Night Owls",
    },
    isThisWeekend: true,
    timeframe: "this-weekend",
    members: [
      { id: "priya-grooves", name: "Priya Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop", vibeMatch: 92 },
      { id: "arjun-wav", name: "Arjun Mehta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop", vibeMatch: 96 },
    ],
  },
  {
    id: "hsr-boiler-ravers",
    name: "HSR BOILER RAVERS",
    description: "South Bangalore electronic crew meeting at 27th Main before checking out the center-floor boiler DJ booth.",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    eventId: "saturday-techno-night",
    eventName: "SATURDAY TECHNO ODYSSEY",
    venue: "The Sound Garden",
    date: "Sat, 17 Oct",
    time: "9:00 PM",
    area: "HSR",
    genres: ["TECHNO", "LIVE MUSIC"],
    type: "CLUB NIGHT",
    memberCount: 6,
    maxMembers: 10,
    activityCount: "🔥 6 JOINED TODAY",
    isFull: false,
    createdBy: "Rohan Iyer",
    communityContext: {
      id: "bangalore-techno-society",
      name: "Bangalore Techno Society",
    },
    isPopular: true,
    isThisWeekend: true,
    timeframe: "this-weekend",
    members: [
      { id: "rohan-synth", name: "Rohan Iyer", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop", vibeMatch: 87 },
      { id: "ananya-roy", name: "Ananya Roy", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop", vibeMatch: 85 },
    ],
  },
  {
    id: "whitefield-weekend-shuttlers",
    name: "WHITEFIELD WEEKEND SHUTTLERS",
    description: "East Bangalore carpool convoy heading into Indiranagar for high-voltage commercial and dance anthems.",
    coverImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    eventId: "desi-nights-club-edition",
    eventName: "DESI NIGHTS CLUB EDITION",
    venue: "Loft 38",
    date: "Sat, 24 Oct",
    time: "8:30 PM",
    area: "Whitefield",
    genres: ["BOLLYWOOD", "COMMERCIAL"],
    type: "CLUB NIGHT",
    memberCount: 5,
    maxMembers: 8,
    activityCount: "ACTIVE",
    isFull: false,
    createdBy: "Vikram Malhotra",
    communityContext: {
      id: "whitefield-weekend-crew",
      name: "Whitefield Weekend Crew",
    },
    isThisWeekend: true,
    timeframe: "this-weekend",
    members: [
      { id: "vikram-malhotra", name: "Vikram Malhotra", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop", vibeMatch: 79 },
      { id: "arjun-wav", name: "Arjun Mehta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop", vibeMatch: 96 },
    ],
  },
  {
    id: "bass-culture-cypher-crew",
    name: "808 CYPHER SQUAD",
    description: "Boom bap, UK drill and beat battle enthusiasts meeting up before the subterranean vault showcase.",
    coverImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    eventId: "after-dark-residents-night",
    eventName: "AFTER DARK: SUBTERRANEAN SESSIONS",
    venue: "The Gypsy Warehouse",
    date: "Sat, 24 Oct",
    time: "10:30 PM",
    area: "Koramangala",
    genres: ["HIP-HOP", "TRAP"],
    type: "CONCERT",
    memberCount: 3,
    maxMembers: 6,
    activityCount: "ACTIVE",
    isFull: false,
    createdBy: "Devansh Roy",
    isThisWeekend: true,
    timeframe: "this-weekend",
    members: [
      { id: "devansh-bass", name: "Devansh Roy", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop", vibeMatch: 83 },
      { id: "kabir-sound", name: "Kabir Sen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop", vibeMatch: 89 },
    ],
  },
  {
    id: "live-music-indie-seekers",
    name: "INDIE GIG LOVERS",
    description: "Intimate vinyl listening party and acoustic band showcase. Craft ales and good music discussion.",
    coverImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    eventId: "deep-house-odyssey-vol-4",
    eventName: "DEEP HOUSE ODYSSEY VOL. 4",
    venue: "Sub Terrace & Socials",
    date: "Sun, 25 Oct",
    time: "6:00 PM",
    area: "JP Nagar",
    genres: ["LIVE MUSIC", "INDIE"],
    type: "LIVE MUSIC",
    memberCount: 4,
    maxMembers: 6,
    activityCount: "ACTIVE",
    isFull: false,
    createdBy: "Tara Kapoor",
    communityContext: {
      id: "bangalore-live-music-society",
      name: "Bangalore Live Music Society",
    },
    isThisWeekend: true,
    timeframe: "this-weekend",
    members: [
      { id: "tara-kapoor", name: "Tara Kapoor", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop", vibeMatch: 82 },
      { id: "maya-patel", name: "Maya Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop", vibeMatch: 88 },
    ],
  },
];

// ==================================================
// DETAILED CREW TYPES & DATA FOR /crews/[crewId]
// ==================================================

export interface DetailedCrewMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  vibeMatch: number;
  role?: string;
}

export interface DetailedCrewEvent {
  id: string;
  name: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  area: string;
}

export interface DetailedCrewMeetup {
  time: string;
  location: string;
  arrival: string;
  venue: string;
  mapQuery: string;
  notes?: string;
}

export interface DetailedCrewDiscussion {
  id: string;
  sender: string;
  username: string;
  avatar: string;
  text: string;
  time: string;
}

export interface DetailedCrewActivity {
  id: string;
  text: string;
  time: string;
  type?: "join" | "update" | "status";
}

export interface RelatedCrewSummary {
  id: string;
  name: string;
  memberCount: number;
  maxMembers: number;
  vibe: string;
  area: string;
  coverImage: string;
}

export interface DetailedCrew {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tags: string[];
  area: string;
  event: DetailedCrewEvent;
  memberCount: number;
  maxMembers: number;
  status: "OPEN" | "FULL" | "CLOSED";
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    role: string;
  };
  members: DetailedCrewMember[];
  vibeTags: string[];
  energy: "HIGH" | "MEDIUM" | "CHILL" | "VERY HIGH";
  music: string;
  style: string;
  meetup: DetailedCrewMeetup;
  discussion: DetailedCrewDiscussion[];
  activity: DetailedCrewActivity[];
  relatedCrews: RelatedCrewSummary[];
  community?: {
    id: string;
    name: string;
  };
}

export const detailedCrewsDatabase: Record<string, DetailedCrew> = {
  "friday-techno-crew": {
    id: "friday-techno-crew",
    name: "FRIDAY TECHNO CREW",
    description: "Small group heading to Friday Techno Night. Looking for a few more people who are into underground sounds.",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    tags: ["TECHNO", "HOUSE", "NIGHTLIFE"],
    area: "INDIRANAGAR",
    event: {
      id: "cyberpunk-neon-warehouse",
      name: "FRIDAY TECHNO NIGHT",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      date: "FRIDAY",
      time: "10:00 PM",
      venue: "TOIT",
      area: "INDIRANAGAR, BANGALORE",
    },
    memberCount: 7,
    maxMembers: 10,
    status: "OPEN",
    creator: {
      id: "arjun-wav",
      name: "ARJUN",
      username: "@arjun.wav",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
      role: "CREW ORGANIZER",
    },
    members: [
      {
        id: "arjun-wav",
        name: "ARJUN",
        username: "@arjun.wav",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 87,
        role: "CREW ORGANIZER",
      },
      {
        id: "priya-grooves",
        name: "PRIYA",
        username: "@priya.groove",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 91,
      },
      {
        id: "rahul-kapoor",
        name: "RAHUL",
        username: "@rahul.k",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 82,
      },
      {
        id: "sanya-mathur",
        name: "SANYA",
        username: "@sanya.techno",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 94,
      },
      {
        id: "kabir-sound",
        name: "KABIR",
        username: "@kabir.live",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 89,
      },
      {
        id: "maya-patel",
        name: "MAYA",
        username: "@maya.beats",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 88,
      },
      {
        id: "rohan-synth",
        name: "ROHAN",
        username: "@rohan.modular",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 87,
      },
    ],
    vibeTags: [
      "TECHNO",
      "UNDERGROUND",
      "DANCE FLOOR",
      "LATE NIGHT",
      "WEEKEND",
      "INDIRANAGAR",
    ],
    energy: "HIGH",
    music: "TECHNO",
    style: "UNDERGROUND",
    meetup: {
      time: "9:30 PM",
      location: "INDIRANAGAR METRO",
      arrival: "10:00 PM",
      venue: "TOIT",
      mapQuery: "Indiranagar Metro Station, Bangalore",
      notes: "Gather outside Exit B near the bakery before walking over to Toit together.",
    },
    discussion: [
      {
        id: "msg-1",
        sender: "ARJUN",
        username: "@arjun.wav",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
        text: "Anyone reaching Indiranagar around 9:30?",
        time: "45 mins ago",
      },
      {
        id: "msg-2",
        sender: "PRIYA",
        username: "@priya.groove",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
        text: "I'll be near the metro.",
        time: "32 mins ago",
      },
      {
        id: "msg-3",
        sender: "RAHUL",
        username: "@rahul.k",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop",
        text: "Perfect, I'll join from there.",
        time: "18 mins ago",
      },
    ],
    activity: [
      {
        id: "act-1",
        text: "PRIYA JOINED THE CREW",
        time: "1 hour ago",
        type: "join",
      },
      {
        id: "act-2",
        text: "RAHUL JOINED THE CREW",
        time: "45 mins ago",
        type: "join",
      },
      {
        id: "act-3",
        text: "ARJUN UPDATED THE MEETING POINT",
        time: "30 mins ago",
        type: "update",
      },
      {
        id: "act-4",
        text: "3 SPOTS REMAINING",
        time: "Just now",
        type: "status",
      },
    ],
    relatedCrews: [
      {
        id: "indiranagar-carpoolers",
        name: "INDIRANAGAR CARPOOLERS",
        memberCount: 5,
        maxMembers: 6,
        vibe: "Pre-drinks & Carpool",
        area: "Indiranagar",
        coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "warehouse-after-dark",
        name: "WAREHOUSE AFTER DARK",
        memberCount: 8,
        maxMembers: 8,
        vibe: "Sub-bass & Closing Sets",
        area: "CBD",
        coverImage: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "hsr-boiler-ravers",
        name: "HSR BOILER RAVERS",
        memberCount: 6,
        maxMembers: 10,
        vibe: "Boiler Room Style",
        area: "HSR",
        coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
      },
    ],
    community: {
      id: "bangalore-techno-society",
      name: "BANGALORE TECHNO SOCIETY",
    },
  },
  "indiranagar-carpoolers": {
    id: "indiranagar-carpoolers",
    name: "INDIRANAGAR CARPOOLERS",
    description: "Splitting cabs from 100ft Road Indiranagar around 8:45 PM. Pre-drinks at Toit before heading into the rave.",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    tags: ["TECHNO", "HOUSE", "BAR HOP"],
    area: "INDIRANAGAR",
    event: {
      id: "saturday-techno-night",
      name: "SATURDAY TECHNO ODYSSEY",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
      date: "SATURDAY",
      time: "9:30 PM",
      venue: "PEBBLE LOUNGE",
      area: "SADASHIVANAGAR, BANGALORE",
    },
    memberCount: 5,
    maxMembers: 6,
    status: "OPEN",
    creator: {
      id: "priya-grooves",
      name: "PRIYA",
      username: "@priya.groove",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
      role: "CREW ORGANIZER",
    },
    members: [
      {
        id: "priya-grooves",
        name: "PRIYA",
        username: "@priya.groove",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 92,
        role: "CREW ORGANIZER",
      },
      {
        id: "maya-patel",
        name: "MAYA",
        username: "@maya.beats",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 88,
      },
      {
        id: "rohan-synth",
        name: "ROHAN",
        username: "@rohan.modular",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 87,
      },
      {
        id: "arjun-wav",
        name: "ARJUN",
        username: "@arjun.wav",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 96,
      },
      {
        id: "sanya-mathur",
        name: "SANYA",
        username: "@sanya.techno",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 94,
      },
    ],
    vibeTags: ["CARPOOL", "CASUAL PRE-DRINKS", "HOUSE", "TECHNO", "INDIRANAGAR"],
    energy: "MEDIUM",
    music: "TECHNO & HOUSE",
    style: "COMMUNAL",
    meetup: {
      time: "8:45 PM",
      location: "TOIT 100FT ROAD",
      arrival: "9:30 PM",
      venue: "PEBBLE LOUNGE",
      mapQuery: "Toit Brewpub, Indiranagar, Bangalore",
      notes: "Booking a 6-seater cab right outside Toit once everyone finishes pre-drinks.",
    },
    discussion: [
      {
        id: "msg-1",
        sender: "PRIYA",
        username: "@priya.groove",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
        text: "I'll arrive at Toit around 8:30 PM to grab an outdoor table.",
        time: "1 hour ago",
      },
      {
        id: "msg-2",
        sender: "MAYA",
        username: "@maya.beats",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
        text: "See you there! Ordering the tinted brew flight.",
        time: "40 mins ago",
      },
    ],
    activity: [
      { id: "act-1", text: "MAYA JOINED THE CREW", time: "2 hours ago", type: "join" },
      { id: "act-2", text: "PRIYA BOOKED CAB PRE-SCHEDULE", time: "1 hour ago", type: "update" },
      { id: "act-3", text: "1 SPOT REMAINING", time: "30 mins ago", type: "status" },
    ],
    relatedCrews: [
      {
        id: "friday-techno-crew",
        name: "FRIDAY TECHNO CREW",
        memberCount: 7,
        maxMembers: 10,
        vibe: "Underground Floor",
        area: "Indiranagar",
        coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "toit-pre-party-squad",
        name: "TOIT PRE-PARTY SQUAD",
        memberCount: 4,
        maxMembers: 8,
        vibe: "Craft Beer & Melodic House",
        area: "Indiranagar",
        coverImage: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=600&auto=format&fit=crop",
      },
    ],
    community: {
      id: "indiranagar-night-owls",
      name: "INDIRANAGAR NIGHT OWLS",
    },
  },
  "c1": {
    id: "c1",
    name: "SATURDAY TECHNO CREW",
    description: "Techno purists from Koramangala & Indiranagar. Catching the headliner right at front-left near the subwoofers.",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    tags: ["TECHNO", "FRONT ROW", "HIGH ENERGY"],
    area: "KORAMANGALA",
    event: {
      id: "saturday-techno-night",
      name: "SATURDAY TECHNO ODYSSEY",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      date: "SATURDAY",
      time: "10:00 PM",
      venue: "PEBBLE LOUNGE",
      area: "SADASHIVANAGAR, BANGALORE",
    },
    memberCount: 8,
    maxMembers: 10,
    status: "OPEN",
    creator: {
      id: "arjun-wav",
      name: "AARAV",
      username: "@aarav.s",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
      role: "CREW ORGANIZER",
    },
    members: [
      {
        id: "arjun-wav",
        name: "AARAV",
        username: "@aarav.s",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 94,
        role: "CREW ORGANIZER",
      },
      {
        id: "priya-grooves",
        name: "PRIYA",
        username: "@priya.groove",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 91,
      },
      {
        id: "rahul-kapoor",
        name: "DEV",
        username: "@dev.p",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 88,
      },
      {
        id: "sanya-mathur",
        name: "SANYA",
        username: "@sanya.techno",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
        vibeMatch: 92,
      },
    ],
    vibeTags: ["TECHNO", "FRONT ROW", "PEAK TIME", "SUBWOOFER", "KORAMANGALA"],
    energy: "VERY HIGH",
    music: "PEAK TIME TECHNO",
    style: "UNDERGROUND",
    meetup: {
      time: "9:00 PM",
      location: "KORAMANGALA 5TH BLOCK",
      arrival: "10:00 PM",
      venue: "PEBBLE LOUNGE",
      mapQuery: "Koramangala 5th Block, Bangalore",
      notes: "Meeting at the corner cafe before heading straight to the sound booth.",
    },
    discussion: [
      {
        id: "msg-1",
        sender: "AARAV",
        username: "@aarav.s",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
        text: "Headliner starts at 11 sharp, let's enter by 10:15.",
        time: "30 mins ago",
      },
    ],
    activity: [
      { id: "act-1", text: "DEV JOINED THE CREW", time: "2 hours ago", type: "join" },
      { id: "act-2", text: "2 SPOTS REMAINING", time: "1 hour ago", type: "status" },
    ],
    relatedCrews: [
      {
        id: "friday-techno-crew",
        name: "FRIDAY TECHNO CREW",
        memberCount: 7,
        maxMembers: 10,
        vibe: "Underground Vault",
        area: "Indiranagar",
        coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
      },
    ],
    community: {
      id: "bangalore-techno-society",
      name: "BANGALORE TECHNO SOCIETY",
    },
  },
};

export function getDetailedCrew(crewId: string): DetailedCrew {
  if (detailedCrewsDatabase[crewId]) {
    return detailedCrewsDatabase[crewId];
  }

  // Check if it exists in allCrewsData and synthesize detailed crew
  const basicCrew = allCrewsData.find((c) => c.id === crewId);
  if (basicCrew) {
    return {
      id: basicCrew.id,
      name: basicCrew.name,
      description: basicCrew.description,
      coverImage: basicCrew.coverImage,
      tags: [...basicCrew.genres, basicCrew.type],
      area: basicCrew.area.toUpperCase(),
      event: {
        id: basicCrew.eventId,
        name: basicCrew.eventName,
        image: basicCrew.coverImage,
        date: basicCrew.date.toUpperCase(),
        time: basicCrew.time,
        venue: basicCrew.venue.toUpperCase(),
        area: `${basicCrew.area.toUpperCase()}, BANGALORE`,
      },
      memberCount: basicCrew.memberCount,
      maxMembers: basicCrew.maxMembers,
      status: basicCrew.isFull ? "FULL" : "OPEN",
      creator: {
        id: "arjun-wav",
        name: basicCrew.createdBy.toUpperCase(),
        username: `@${basicCrew.createdBy.toLowerCase().replace(/\s+/g, ".")}`,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
        role: "CREW ORGANIZER",
      },
      members: basicCrew.members.map((m) => ({
        id: m.id,
        name: m.name.toUpperCase(),
        username: `@${m.name.toLowerCase().replace(/\s+/g, ".")}`,
        avatar: m.avatar,
        vibeMatch: m.vibeMatch || 88,
        role: m.name === basicCrew.createdBy ? "CREW ORGANIZER" : undefined,
      })),
      vibeTags: [...basicCrew.genres, "NIGHTLIFE", basicCrew.area.toUpperCase(), "WEEKEND"],
      energy: "HIGH",
      music: basicCrew.genres.join(" & "),
      style: "COMMUNAL",
      meetup: {
        time: "9:00 PM",
        location: `${basicCrew.area.toUpperCase()} CENTRAL METRO`,
        arrival: basicCrew.time,
        venue: basicCrew.venue.toUpperCase(),
        mapQuery: `${basicCrew.venue}, ${basicCrew.area}, Bangalore`,
        notes: "Public central meeting point before entering together.",
      },
      discussion: [
        {
          id: "msg-1",
          sender: basicCrew.createdBy.toUpperCase(),
          username: `@${basicCrew.createdBy.toLowerCase().replace(/\s+/g, ".")}`,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
          text: `Hey everyone! Let's assemble around 9:00 PM in ${basicCrew.area}.`,
          time: "1 hour ago",
        },
      ],
      activity: [
        { id: "act-1", text: `${basicCrew.createdBy.toUpperCase()} CREATED THE CREW`, time: "3 hours ago", type: "update" },
        { id: "act-2", text: `${Math.max(0, basicCrew.maxMembers - basicCrew.memberCount)} SPOTS REMAINING`, time: "Just now", type: "status" },
      ],
      relatedCrews: [
        {
          id: "friday-techno-crew",
          name: "FRIDAY TECHNO CREW",
          memberCount: 7,
          maxMembers: 10,
          vibe: "Underground",
          area: "Indiranagar",
          coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
        },
        {
          id: "indiranagar-carpoolers",
          name: "INDIRANAGAR CARPOOLERS",
          memberCount: 5,
          maxMembers: 6,
          vibe: "Pre-drinks & Carpool",
          area: "Indiranagar",
          coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
        },
      ],
      community: basicCrew.communityContext,
    };
  }

  // Graceful fallback to default Friday Techno Crew
  return detailedCrewsDatabase["friday-techno-crew"];
}


