export interface ReviewAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface EventReview {
  id: string;
  eventId: string;
  author: ReviewAuthor;
  verifiedAttendee: boolean;
  overallRating: number;
  musicRating: number;
  crowdRating: number;
  venueRating: number;
  experienceRating: number;
  text: string;
  createdAt: string;
  helpfulCount: number;
  tags?: string[];
  recommend?: boolean;
}

export interface ReviewDimensions {
  music: number;
  crowd: number;
  venue: number;
  experience: number;
}

export interface EventInsight {
  tag: string;
  label: string;
  percentage: number;
  category: "vibe" | "sound" | "crowd" | "venue";
}

export const mockEventReviews: EventReview[] = [
  {
    id: "rev-1",
    eventId: "saturday-techno-night",
    author: {
      id: "u-maya",
      name: "MAYA SHARMA",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
    },
    verifiedAttendee: true,
    overallRating: 5.0,
    musicRating: 5.0,
    crowdRating: 4.8,
    venueRating: 4.5,
    experienceRating: 5.0,
    text: "Great crowd and the music stayed consistent throughout the night. The sound system in the main room is properly tuned for heavy sub-bass—no ear fatigue even after 3 hours. Arrive before 10 PM to avoid the entry rush.",
    createdAt: "2 DAYS AGO",
    helpfulCount: 24,
    tags: ["High Energy", "Techno-Heavy"],
    recommend: true,
  },
  {
    id: "rev-2",
    eventId: "saturday-techno-night",
    author: {
      id: "u-pranav",
      name: "PRANAV MENON",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
    },
    verifiedAttendee: true,
    overallRating: 4.8,
    musicRating: 5.0,
    crowdRating: 4.6,
    venueRating: 4.4,
    experienceRating: 4.8,
    text: "Music was exactly what I came for. The headliner played an absolute masterclass of hypnotic industrial techno. Venue bar got a little crowded around midnight, but the dancefloor energy was respectful and locked-in.",
    createdAt: "3 DAYS AGO",
    helpfulCount: 18,
    tags: ["Underground", "Crowded"],
    recommend: true,
  },
  {
    id: "rev-3",
    eventId: "saturday-techno-night",
    author: {
      id: "u-ananya",
      name: "ANANYA IYER",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
    },
    verifiedAttendee: true,
    overallRating: 4.6,
    musicRating: 4.7,
    crowdRating: 4.5,
    venueRating: 4.6,
    experienceRating: 4.7,
    text: "Found a crew through VibeUp and ended up staying till close. The rooftop area outside provides great ventilation when you need a break from the floor. Perfect if you're into underground techno and friendly people.",
    createdAt: "5 DAYS AGO",
    helpfulCount: 14,
    tags: ["Good for Groups", "Late-Night"],
    recommend: true,
  },
  {
    id: "rev-4",
    eventId: "saturday-techno-night",
    author: {
      id: "u-rohan",
      name: "ROHAN DAS",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop",
    },
    verifiedAttendee: true,
    overallRating: 4.5,
    musicRating: 4.8,
    crowdRating: 4.3,
    venueRating: 4.5,
    experienceRating: 4.5,
    text: "Solid production quality with minimal lighting and strobe work that lets the music lead. Security is attentive and makes solo attendees feel comfortable. Would definitely come back for the next edition.",
    createdAt: "1 WEEK AGO",
    helpfulCount: 9,
    tags: ["Solo-Friendly", "High Energy"],
    recommend: true,
  },
  {
    id: "rev-5",
    eventId: "saturday-techno-night",
    author: {
      id: "u-tara",
      name: "TARA SEN",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=240&auto=format&fit=crop",
    },
    verifiedAttendee: true,
    overallRating: 4.7,
    musicRating: 4.9,
    crowdRating: 4.7,
    venueRating: 4.4,
    experienceRating: 4.8,
    text: "Great venue and production. Arrive early if you want good parking near 100ft road. The warmup DJ set the mood nicely with deep minimal grooves before the tempo picked up after 11 PM.",
    createdAt: "1 WEEK AGO",
    helpfulCount: 11,
    tags: ["Late-Night", "Techno-Heavy"],
    recommend: true,
  },
  {
    id: "rev-6",
    eventId: "saturday-techno-night",
    author: {
      id: "u-kabir",
      name: "KABIR MEHTA",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240&auto=format&fit=crop",
    },
    verifiedAttendee: true,
    overallRating: 4.4,
    musicRating: 4.6,
    crowdRating: 4.4,
    venueRating: 4.3,
    experienceRating: 4.4,
    text: "High octane beats from start to finish. Drinks are slightly on the premium side, but bartenders were fast. The crowd understands rave etiquette which makes a massive difference in Bangalore.",
    createdAt: "2 WEEKS AGO",
    helpfulCount: 7,
    tags: ["High Energy", "Crowded"],
    recommend: true,
  },
];

export const mockReviewSummary = {
  overallRating: 4.7,
  totalReviews: 126,
  dimensions: {
    music: 4.8,
    crowd: 4.6,
    venue: 4.5,
    experience: 4.7,
  } as ReviewDimensions,
  highlights: [
    "Music was exactly what I came for. The crowd was great.",
    "Great venue and production. Arrive early.",
    "Perfect if you're into underground techno.",
    "Found a crew through VibeUp and ended up staying till close.",
  ],
  insights: [
    { tag: "HIGH ENERGY", label: "High Energy", percentage: 92, category: "vibe" },
    { tag: "UNDERGROUND", label: "Underground", percentage: 88, category: "vibe" },
    { tag: "TECHNO-HEAVY", label: "Techno-Heavy", percentage: 95, category: "sound" },
    { tag: "CROWDED", label: "Crowded Peak Hours", percentage: 78, category: "crowd" },
    { tag: "LATE-NIGHT", label: "Late-Night Stay", percentage: 85, category: "vibe" },
    { tag: "GOOD FOR GROUPS", label: "Good for Groups", percentage: 84, category: "crowd" },
    { tag: "SOLO-FRIENDLY", label: "Solo-Friendly", percentage: 80, category: "crowd" },
  ] as EventInsight[],
};

export function getReviewsForEvent(eventId: string): EventReview[] {
  const filtered = mockEventReviews.filter((r) => r.eventId === eventId);
  return filtered.length > 0 ? filtered : mockEventReviews;
}
