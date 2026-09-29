export interface ClubReviewCategoryScores {
  music: number;
  crowd: number;
  vibe: number;
  venue: number;
  value: number;
}

export interface ClubDetailedReview {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  rating: number;
  categories: ClubReviewCategoryScores;
  text: string;
  eventId?: string;
  eventName?: string;
  date: string;
  helpfulCount: number;
  tag?: string;
}

export interface ClubReviewsPayload {
  overallRating: number;
  totalReviews: number;
  starsBreakdown: Array<{ star: number; count: number; percentage: number }>;
  categoryRatings: ClubReviewCategoryScores;
  highlights: string[];
  reviews: ClubDetailedReview[];
}

export const defaultReviewHighlights = [
  "GREAT MUSIC",
  "GOOD CROWD",
  "HIGH ENERGY",
  "GOOD FOR GROUPS",
  "LATE NIGHT",
  "LIVE MUSIC",
  "CRAFT BEERS",
  "VIP DECKS",
];

const mockReviewsDatabase: Record<string, ClubDetailedReview[]> = {
  "xyz-club": [
    {
      id: "cr-1",
      userId: "u-101",
      userName: "Arjun Verma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 5.0, crowd: 4.8, vibe: 5.0, venue: 4.7, value: 4.4 },
      text: "Music was excellent and the crowd was energetic without feeling overcrowded. The Funktion-One sound system delivers pure bass without distorting your ears.",
      eventId: "saturday-techno-night",
      eventName: "SATURDAY TECHNO NIGHT",
      date: "2 days ago",
      helpfulCount: 24,
      tag: "Verified Attendee",
    },
    {
      id: "cr-2",
      userId: "u-102",
      userName: "Maya Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 4.9, crowd: 4.7, vibe: 4.9, venue: 4.5, value: 4.2 },
      text: "Strict door curation makes all the difference here. People are here specifically for the underground music, zero unnecessary shoving on the floor.",
      eventId: "friday-techno-night",
      eventName: "FRIDAY TECHNO NIGHT",
      date: "5 days ago",
      helpfulCount: 19,
      tag: "Regular Attendee",
    },
    {
      id: "cr-3",
      userId: "u-103",
      userName: "Karan Johar",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
      rating: 4,
      categories: { music: 4.7, crowd: 4.2, vibe: 4.6, venue: 4.4, value: 3.9 },
      text: "Lighting visuals and smoke machine synchronization were surreal. Drinks are slightly on the steeper side, but worth the premium for top international bookings.",
      eventId: "saturday-techno-night",
      eventName: "SATURDAY TECHNO NIGHT",
      date: "1 week ago",
      helpfulCount: 15,
      tag: "VibeUp Member",
    },
    {
      id: "cr-4",
      userId: "u-104",
      userName: "Ananya Rao",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 5.0, crowd: 4.9, vibe: 5.0, venue: 4.8, value: 4.5 },
      text: "Stayed until 1:45 AM. The transition between opening deep house and the peak acid set was immaculate. Door staff was polite and well-organized.",
      eventId: "friday-techno-night",
      eventName: "FRIDAY TECHNO NIGHT",
      date: "2 weeks ago",
      helpfulCount: 31,
      tag: "Verified Attendee",
    },
    {
      id: "cr-5",
      userId: "u-105",
      userName: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
      rating: 4,
      categories: { music: 4.5, crowd: 4.3, vibe: 4.4, venue: 4.2, value: 4.0 },
      text: "One of the best acoustics in Bangalore. Air conditioning could be slightly cooler near the front DJ booth, but overall top tier night.",
      eventId: "saturday-techno-night",
      eventName: "SATURDAY TECHNO NIGHT",
      date: "3 weeks ago",
      helpfulCount: 8,
      tag: "Music Explorer",
    },
    {
      id: "cr-6",
      userId: "u-106",
      userName: "Divya Krishnan",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
      rating: 3,
      categories: { music: 4.0, crowd: 3.5, vibe: 3.8, venue: 4.0, value: 3.5 },
      text: "Great DJ lineup, but parking around 80ft road on Saturday night is hectic. Highly recommend taking an Uber or arriving before 9:30 PM.",
      eventId: "friday-techno-night",
      eventName: "FRIDAY TECHNO NIGHT",
      date: "1 month ago",
      helpfulCount: 12,
    },
  ],
  "toit-brewpub": [
    {
      id: "cr-11",
      userId: "u-201",
      userName: "Rohan Malhotra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 4.6, crowd: 4.8, vibe: 4.9, venue: 4.7, value: 4.6 },
      text: "The gold standard for weekend pre-drinks and casual nightlife in Indiranagar. The Basmati Blonde craft ale paired with wood-fired pizzas is unbeatable.",
      eventName: "WEEKEND BREWHOUSE SOCIAL",
      date: "Yesterday",
      helpfulCount: 42,
      tag: "Verified Attendee",
    },
    {
      id: "cr-12",
      userId: "u-202",
      userName: "Tara Singhania",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 4.4, crowd: 4.7, vibe: 4.8, venue: 4.8, value: 4.4 },
      text: "Lively banter, buzzing energy, and exceptional hospitality. Even with long queues outside, tables turn over smoothly.",
      eventName: "SUNDAY SUNSET SOCIAL",
      date: "4 days ago",
      helpfulCount: 28,
      tag: "Regular Attendee",
    },
    {
      id: "cr-13",
      userId: "u-203",
      userName: "Kabir Mehta",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
      rating: 4,
      categories: { music: 4.3, crowd: 4.5, vibe: 4.6, venue: 4.5, value: 4.3 },
      text: "Bands play classic rock and upbeat indie tunes during special showcase evenings. Best spot to warm up before heading out to a club.",
      eventName: "INDIE ACOUSTIC SESSIONS",
      date: "1 week ago",
      helpfulCount: 16,
      tag: "VibeUp Member",
    },
    {
      id: "cr-14",
      userId: "u-204",
      userName: "Sanya Roy",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 4.5, crowd: 4.8, vibe: 4.9, venue: 4.6, value: 4.5 },
      text: "Great for big groups. Communal seating makes it effortless to chat with neighboring tables and plan where to head next.",
      eventName: "WEEKEND BREWHOUSE SOCIAL",
      date: "2 weeks ago",
      helpfulCount: 22,
      tag: "Verified Attendee",
    },
  ],
};

export function getClubReviewsData(
  clubId: string,
  clubName: string,
  baseRating: number = 4.7
): ClubReviewsPayload {
  const normalizedId = clubId.toLowerCase().trim();

  // If reviews exist for this specific key
  if (mockReviewsDatabase[normalizedId]) {
    const list = mockReviewsDatabase[normalizedId];
    return generatePayloadFromList(list, baseRating);
  }

  // Otherwise generate high quality contextual mock reviews for any club
  const genericReviews: ClubDetailedReview[] = [
    {
      id: `rev-${clubId}-1`,
      userId: "usr-1",
      userName: "Arjun Verma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 4.8, crowd: 4.6, vibe: 4.9, venue: 4.5, value: 4.2 },
      text: `Music was excellent and the crowd was energetic without feeling overcrowded. Easily one of the most reliable weekend spots at ${clubName}.`,
      eventId: "friday-techno-night",
      eventName: "FRIDAY TECHNO NIGHT",
      date: "2 days ago",
      helpfulCount: 28,
      tag: "Verified Attendee",
    },
    {
      id: `rev-${clubId}-2`,
      userId: "usr-2",
      userName: "Maya Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 4.7, crowd: 4.8, vibe: 4.8, venue: 4.6, value: 4.4 },
      text: `Great crowd on Saturday. Music was solid and the dance floor stayed packed straight until closing. Staff was super polite at the door.`,
      eventId: "saturday-house-session",
      eventName: "SATURDAY HOUSE SESSION",
      date: "5 days ago",
      helpfulCount: 21,
      tag: "Regular Attendee",
    },
    {
      id: `rev-${clubId}-3`,
      userId: "usr-3",
      userName: "Devansh Roy",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
      rating: 4,
      categories: { music: 4.5, crowd: 4.4, vibe: 4.6, venue: 4.3, value: 3.9 },
      text: `Incredible cocktail curation and pre-drinks vibe. Gets quite packed past 10:30 PM so get in early if you want good table spots.`,
      eventId: "sunday-sunset-social",
      eventName: "SUNDAY SUNSET SOCIAL",
      date: "1 week ago",
      helpfulCount: 16,
      tag: "VibeUp Member",
    },
    {
      id: `rev-${clubId}-4`,
      userId: "usr-4",
      userName: "Ananya Sen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&auto=format&fit=crop",
      rating: 5,
      categories: { music: 4.9, crowd: 4.7, vibe: 4.9, venue: 4.7, value: 4.3 },
      text: `The lighting visuals during the guest producer set were mesmerizing. One of the rare places taking Bangalore nightlife sound seriously.`,
      eventId: "bass-culture",
      eventName: "BASS CULTURE: SUBTERRANEAN",
      date: "2 weeks ago",
      helpfulCount: 19,
      tag: "Verified Attendee",
    },
    {
      id: `rev-${clubId}-5`,
      userId: "usr-5",
      userName: "Karan Verma",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=160&auto=format&fit=crop",
      rating: 4,
      categories: { music: 4.4, crowd: 4.2, vibe: 4.5, venue: 4.1, value: 4.0 },
      text: `Sound system here is genuinely top-notch. Clean low-end without ear fatigue and very little casual talking on the center dancefloor.`,
      eventId: "after-dark",
      eventName: "AFTER DARK: RESIDENTS NIGHT",
      date: "3 weeks ago",
      helpfulCount: 11,
      tag: "Music Explorer",
    },
  ];

  return generatePayloadFromList(genericReviews, baseRating);
}

function generatePayloadFromList(
  reviews: ClubDetailedReview[],
  baseRating: number
): ClubReviewsPayload {
  const total = 1284; // realistic community reviews total
  const breakdown = [
    { star: 5, count: 924, percentage: 72 },
    { star: 4, count: 231, percentage: 18 },
    { star: 3, count: 77, percentage: 6 },
    { star: 2, count: 38, percentage: 3 },
    { star: 1, count: 14, percentage: 1 },
  ];

  const categoryScores: ClubReviewCategoryScores = {
    music: 4.7,
    crowd: 4.5,
    vibe: 4.8,
    venue: 4.4,
    value: 4.1,
  };

  return {
    overallRating: baseRating || 4.7,
    totalReviews: total,
    starsBreakdown: breakdown,
    categoryRatings: categoryScores,
    highlights: defaultReviewHighlights,
    reviews,
  };
}
