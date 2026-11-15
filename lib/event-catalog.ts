// Every event the site links to, keyed by its URL id.
// getEventById() in events-data.ts uses this so /events/<id> always shows the right event.
// When Supabase is connected this file is replaced by an `events` table.

export const IMG = {
  techno: "photo-1516450360452-9312f5e86fc7",
  rave: "photo-1566737236500-c8ac43014a67",
  redRoom: "photo-1545128485-c400e7702796",
  lasers: "photo-1514525253161-7a46d19cd819",
  decks: "photo-1470225620780-dba8ba36b745",
  confetti: "photo-1492684223066-81342ee5ff30",
  liveCrowd: "photo-1501386761578-eac5c94b800a",
  concert: "photo-1540039155733-5bb30b53aa14",
  rooftop: "photo-1758272133713-52c6bb9f74f0",
  rooftopCity: "photo-1758272133693-d2124dbe00de",
  mic: "photo-1511671782779-c97d3d27a1d4",
  jazz: "photo-1511192336575-5a79af67a629",
  lounge: "photo-1572116469696-31de0f17cc34",
  bar: "photo-1575444758702-4a6b9222336e",
  neonSign: "photo-1508700115892-45ecd05ae2ad",
  clubFloor: "photo-1574391884720-bbc3740c59d1",
  pub: "photo-1517457373958-b7bdd4587205",
  stage: "photo-1585699324551-f6c309eedeca",
} as const;

export type ImgKey = keyof typeof IMG;

export const unsplash = (key: ImgKey, w = 1200) =>
  `https://images.unsplash.com/${IMG[key]}?q=80&w=${w}&auto=format&fit=crop`;

export interface CatalogEvent {
  id: string;
  title: string;
  category: string; // short tag, e.g. "TECHNO"
  genre: string; // longer line, e.g. "Techno · House"
  venue: string;
  area: string;
  date: string; // "Sat, 19 Jul"
  time: string; // "10:00 PM"
  price: number; // starting price in ₹
  going: number;
  img: ImgKey;
  age?: "18+" | "21+";
}

const E = (
  id: string,
  title: string,
  category: string,
  genre: string,
  venue: string,
  area: string,
  date: string,
  time: string,
  price: number,
  going: number,
  img: ImgKey,
  age: "18+" | "21+" = "18+"
): CatalogEvent => ({ id, title, category, genre, venue, area, date, time, price, going, img, age });

export const eventCatalog: CatalogEvent[] = [
  // Landing + weekend carousel
  E("techno-night-playboy", "Techno Night", "TECHNO", "Techno · Industrial", "Playboy Club", "Indiranagar", "Sat, 19 Jul", "10:00 PM", 999, 128, "techno", "21+"),
  E("bollywood-saturdays-toit", "Bollywood Saturdays", "BOLLYWOOD", "Bollywood · Retro remixes", "Toit", "Koramangala", "Sat, 19 Jul", "9:00 PM", 599, 96, "confetti"),
  E("parvaaz-live-phoenix", "Parvaaz Live", "LIVE MUSIC", "Indie rock · Live band", "Phoenix Marketcity", "Whitefield", "Sun, 20 Jul", "7:00 PM", 1299, 211, "liveCrowd"),
  E("sundowner-the-skyye", "Sundowner", "ROOFTOP", "Deep house · Sunset set", "The Skyye", "UB City", "Sun, 20 Jul", "6:00 PM", 799, 48, "rooftop"),
  E("comedy-night-canvas", "Comedy Night", "COMEDY", "Stand-up · Open mic", "Canvas Laugh", "Indiranagar", "Fri, 18 Jul", "8:00 PM", 699, 73, "mic"),
  E("underground-rave-secret", "Underground Rave", "ELECTRONIC", "Techno · Acid · Rave", "Secret venue", "Central BLR", "Sat, 19 Jul", "11:00 PM", 1499, 164, "redRoom", "21+"),
  E("jazz-evening-windmills", "Jazz Evening", "JAZZ", "Jazz · Soul", "Windmills Craftworks", "Whitefield", "Sun, 20 Jul", "8:00 PM", 899, 39, "jazz"),

  // Discover
  E("e1", "Berghain Sessions Vol. 12", "TECHNO", "Techno · Minimal", "Playboy Club", "Indiranagar", "Sat, 19 Jul", "10:00 PM", 999, 182, "techno", "21+"),
  E("e2", "Desi Nights: Saturday Edition", "BOLLYWOOD", "Bollywood · Punjabi", "Toit Brewpub", "Koramangala", "Sat, 19 Jul", "9:00 PM", 599, 143, "confetti"),
  E("e3", "Parvaaz Live in Bangalore", "LIVE MUSIC", "Indie rock · Live band", "Phoenix Marketcity", "Whitefield", "Sun, 20 Jul", "7:00 PM", 1299, 211, "liveCrowd"),
  E("e4", "Sundowner Sessions", "ROOFTOP", "Deep house · Sunset set", "The Skyye", "UB City", "Sun, 20 Jul", "5:30 PM", 799, 64, "rooftop"),
  E("e5", "Deep House Odyssey", "HOUSE", "Deep house · Melodic", "Fandom", "Koramangala", "Fri, 18 Jul", "10:00 PM", 699, 118, "lasers"),
  E("e6", "Late Night Standup Jam", "COMEDY", "Stand-up · Open mic", "The Humming Tree", "Indiranagar", "Sat, 19 Jul", "9:30 PM", 499, 57, "mic"),
  E("e7", "Underground Cypher & Beats", "HIP HOP", "Hip hop · Cypher", "Vapour", "Indiranagar", "Fri, 18 Jul", "9:00 PM", 399, 88, "redRoom"),
  E("e8", "Skyline Lounge Sunset Sessions", "ROOFTOP", "Lounge · Chill house", "High Ultra Lounge", "Malleshwaram", "Sun, 20 Jul", "6:00 PM", 899, 71, "rooftopCity", "21+"),
  E("e9", "Cyberpunk Neon Rave", "ELECTRONIC", "Techno · Cyberpunk", "Pebble The Jungle Lounge", "Palace Grounds", "Sat, 19 Jul", "10:00 PM", 1199, 236, "rave", "21+"),
  E("e10", "Retro Disco Masala", "BOLLYWOOD", "Retro · Disco", "Badmaash", "Church Street", "Fri, 18 Jul", "9:00 PM", 750, 94, "confetti"),
  E("e11", "Indie Rock Night Live", "LIVE MUSIC", "Indie rock", "BFlat Bar", "Indiranagar", "Sat, 19 Jul", "8:30 PM", 500, 66, "concert"),
  E("e12", "Dreamscapes Audiovisual", "ELECTRONIC", "Ambient · Audiovisual", "Sunburn Union", "Koramangala", "Sun, 20 Jul", "8:00 PM", 850, 102, "lasers"),

  // Logged-in home
  E("techno-after-dark", "Techno After Dark", "TECHNO", "Techno · Warehouse", "The Warehouse", "Indiranagar", "Tonight", "10:00 PM", 999, 184, "techno", "21+"),
  E("neon-friday", "Neon Friday", "HOUSE", "House · Disco", "Neon Room", "Koramangala", "Tonight", "9:00 PM", 799, 226, "lasers"),
  E("afro-nights", "Afro Nights", "AFRO HOUSE", "Afro house · Amapiano", "Night Shift", "MG Road", "Tonight", "10:00 PM", 899, 142, "liveCrowd"),
  E("rooftop-sessions", "Rooftop Sessions", "ROOFTOP", "House · Sunset", "Skyline", "Church Street", "Tonight", "8:30 PM", 699, 310, "rooftopCity"),
  E("cyberpunk-neon-warehouse", "Cyberpunk Neon Warehouse", "TECHNO", "Techno · Industrial", "Basement Vault", "Indiranagar", "Fri, 16 Oct", "10:00 PM", 899, 168, "redRoom", "21+"),
  E("saturday-techno-night", "Saturday Techno Night", "TECHNO", "Techno · House · Electronic", "Basement Vault", "Indiranagar", "Sat, 17 Oct", "9:30 PM", 799, 284, "rave", "21+"),
  E("deep-house-odyssey-vol-4", "Deep House Odyssey Vol. 4", "HOUSE", "Deep house · Melodic", "Fandom", "Koramangala", "Sun, 18 Oct", "6:00 PM", 699, 195, "lasers"),
  E("after-dark-residents-night", "After Dark: Residents Night", "HOUSE", "House · Residents", "Club Room", "MG Road", "Sat, 24 Oct", "10:00 PM", 699, 121, "clubFloor"),

  // Carousel + trending components
  E("techno-bunker", "Underground Vault Rave", "TECHNO", "Techno · Hard techno", "Basement Vault", "Indiranagar", "Tonight", "10:00 PM", 999, 152, "redRoom", "21+"),
  E("neon-odyssey", "Neon Odyssey Vol. 4", "HOUSE", "House · Disco", "The Humming Tree", "Indiranagar", "Sat, 19 Jul", "9:00 PM", 799, 133, "lasers"),
  E("rooftop-sundowner", "Sundowner Frequencies", "ROOFTOP", "Deep house · Sunset set", "The Skyye", "UB City", "Sun, 20 Jul", "5:30 PM", 1199, 87, "rooftop", "21+"),
  E("desi-grooves", "Desi Saturday Madness", "BOLLYWOOD", "Bollywood · Bhangra", "Toit Brewpub", "Koramangala", "Sat, 19 Jul", "9:30 PM", 599, 174, "confetti"),
  E("afro-frequencies", "Subterranean Sessions", "AFRO HOUSE", "Afro house · Deep", "Fandom", "Koramangala", "Fri, 18 Jul", "10:00 PM", 899, 109, "decks"),
  E("berghain-sessions-vol-12", "Berghain Sessions Vol. 12", "TECHNO", "Techno · Minimal", "Playboy Club", "Indiranagar", "Sat, 19 Jul", "10:00 PM", 999, 182, "techno", "21+"),
  E("desi-nights-saturday", "Desi Nights: Saturday Edition", "BOLLYWOOD", "Bollywood · Punjabi", "Toit Brewpub", "Koramangala", "Sat, 19 Jul", "9:00 PM", 599, 143, "confetti"),
  E("parvaaz-live-bangalore", "Parvaaz Live in Bangalore", "LIVE MUSIC", "Indie rock · Live band", "Phoenix Marketcity", "Whitefield", "Sun, 20 Jul", "7:00 PM", 1299, 211, "liveCrowd"),
  E("sundowner-sessions", "Sundowner Sessions", "ROOFTOP", "Deep house · Sunset set", "The Skyye", "UB City", "Sun, 20 Jul", "5:30 PM", 799, 64, "rooftop"),
  E("underground-vault-rave", "Underground Vault Rave", "TECHNO", "Techno · Hard techno", "Basement Vault", "CBD", "Sat, 19 Jul", "11:00 PM", 899, 152, "redRoom", "21+"),

  // Club pages
  E("desi-nights-club-edition", "Desi Nights Club Edition", "BOLLYWOOD", "Bollywood · Punjabi", "Loft 38", "Indiranagar", "Sat, 10 Oct", "9:30 PM", 699, 132, "confetti"),
  E("parvaaz-acoustic-live", "Parvaaz Acoustic Live", "LIVE MUSIC", "Acoustic · Indie", "BFlat Bar", "Indiranagar", "Sun, 11 Oct", "7:30 PM", 899, 98, "concert"),
  E("skyline-sunset-sessions", "Skyline Sunset Sessions", "ROOFTOP", "Lounge · Chill house", "The Skyye", "UB City", "Sun, 04 Oct", "5:30 PM", 999, 76, "rooftopCity", "21+"),
  E("jungle-psy-chronicles", "Jungle Psy Chronicles", "PSYTRANCE", "Psytrance · Progressive", "Pebble The Jungle Lounge", "Palace Grounds", "Sat, 17 Oct", "8:00 PM", 1199, 205, "rave"),
  E("hsr-boiler-sessions", "HSR Boiler Sessions", "TECHNO", "Techno · Boiler room", "The Sound Garden", "HSR Layout", "Fri, 23 Oct", "9:00 PM", 699, 117, "decks"),
  E("friday-techno-night", "Friday Techno Night", "TECHNO", "Techno · Industrial", "Pebble Lounge", "Indiranagar", "Fri, 02 Oct", "10:00 PM", 799, 156, "techno", "21+"),
  E("saturday-house-session", "Saturday House Session", "HOUSE", "House · Disco", "Pebble Lounge", "Indiranagar", "Sat, 03 Oct", "9:30 PM", 899, 141, "lasers"),
  E("sunday-sunset-social", "Sunday Sunset Social", "ROOFTOP", "Chill house · Social", "Pebble Lounge rooftop", "Indiranagar", "Sun, 04 Oct", "5:00 PM", 499, 88, "rooftop"),
  E("bass-culture", "Bass Culture: Subterranean", "BASS", "Drum & bass · Dubstep", "Basement Vault", "Indiranagar", "Fri, 16 Oct", "10:00 PM", 999, 163, "redRoom", "21+"),
  E("after-dark", "After Dark: Residents Night", "HOUSE", "House · Residents", "Club Room", "MG Road", "Sat, 24 Oct", "10:00 PM", 699, 121, "clubFloor"),
];

const bySlug = new Map(eventCatalog.map((e) => [e.id, e]));

const KEYWORD_IMAGES: [RegExp, ImgKey, string][] = [
  [/roof|sunset|sundown|skyline|sky/i, "rooftop", "ROOFTOP"],
  [/comedy|standup|stand-up|laugh|mic/i, "mic", "COMEDY"],
  [/bolly|desi|retro|masala|bhangra/i, "confetti", "BOLLYWOOD"],
  [/jazz|soul|blues/i, "jazz", "JAZZ"],
  [/live|gig|band|acoustic|parvaaz|indie|rock/i, "liveCrowd", "LIVE MUSIC"],
  [/house|deep|disco/i, "lasers", "HOUSE"],
  [/rave|psy|cyber|neon/i, "rave", "ELECTRONIC"],
  [/techno|warehouse|bunker|vault|bass/i, "techno", "TECHNO"],
];

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => (/^vol$/i.test(w) ? "Vol." : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/** Look up an event by URL id. Unknown ids still get a sensible page built from the slug. */
export function findCatalogEvent(id: string): CatalogEvent {
  const hit = bySlug.get(id);
  if (hit) return hit;
  const match = KEYWORD_IMAGES.find(([re]) => re.test(id));
  return E(
    id,
    titleFromSlug(id) || "VibeUp Night",
    match?.[2] ?? "NIGHTLIFE",
    "Nightlife · Bangalore",
    "Venue announced soon",
    "Bangalore",
    "This weekend",
    "9:00 PM",
    799,
    64,
    match?.[1] ?? "clubFloor"
  );
}

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
