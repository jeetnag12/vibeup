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
