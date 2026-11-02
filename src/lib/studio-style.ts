import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Camera,
  CircleCheck,
  Clapperboard,
  Clock,
  Coffee,
  Music2,
  Sparkles,
  SquareParking,
  Sun,
  VolumeX,
  Wifi,
  Wind,
  Wrench,
} from "lucide-react";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  rating?: number;
}

/**
 * The API response has no rating/review fields yet, so related values are
 * derived from a hash of the document id. Deterministic, so server and
 * client markup match and values stay stable per studio.
 */
export function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) % 1000;
  }
  return hash;
}

export function getRating(id: string): number {
  const hash = hashString(id);
  return Math.round((3.8 + (hash % 12) / 10) * 10) / 10;
}

// Accent color for the category badge shown on top of card images.
export const CATEGORY_BADGE_COLOR: Record<string, string> = {
  "Music Suite": "bg-amber-500",
  "Film Stage": "bg-violet-600",
  "Photo Studio": "bg-pink-500",
  "Dance Studio": "bg-emerald-500",
  "Podcast Lounge": "bg-teal-600",
  "Co-working Loft": "bg-sky-500",
  Workshop: "bg-orange-600",
};

export function getAmenityIcon(amenity: string): LucideIcon {
  const normalized = amenity.toLowerCase();
  const pairs: Array<{ match: string[]; icon: LucideIcon }> = [
    { match: ["wi-fi", "wifi"], icon: Wifi },
    { match: ["parking"], icon: SquareParking },
    { match: ["makeup"], icon: Camera },
    { match: ["light"], icon: Sun },
    { match: ["equipment"], icon: Wrench },
    { match: ["air conditioning"], icon: Wind },
    { match: ["sound"], icon: VolumeX },
    { match: ["coffee"], icon: Coffee },
    { match: ["24/7"], icon: Clock },
    { match: ["green room"], icon: Clapperboard },
    { match: ["wheelchair"], icon: Accessibility },
    { match: ["podcast"], icon: Music2 },
    { match: ["dance", "workshop"], icon: Sparkles },
  ];
  return (
    pairs.find((pair) => pair.match.some((m) => normalized.includes(m)))?.icon ??
    CircleCheck
  );
}

export const STUDIOS_API = `${process.env.NEXT_PUBLIC_API_URL}/explore-studios`


export async function fetchStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(STUDIOS_API,)
//     {
//     headers: {
//     authorization: 'user logged in'
//   }
// }
  if (!res.ok) return [];
    return (await res.json()) as Studio[];
  } catch {
    return [];
  }
}

export async function fetchStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(`${STUDIOS_API}/${id}`);
    if (!res.ok) return null;
    return (await res.json()) as Studio;
  } catch {
    return null;
  }
}

export const FEATURED_STUDIOS_LIMIT = 6;

export async function fetchFeaturedStudios(
  limit: number = FEATURED_STUDIOS_LIMIT,
): Promise<Studio[]> {
  try {
    const res = await fetch(`${STUDIOS_API}/featured-studios?limit=${limit}`);
    if (!res.ok) return [];
    const data = await res.json();
    const list: Studio[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.studios)
        ? data.studios
        : [];
    // Backend applies the sort (top-rated / newest) and limit(6) in MongoDB.
    return list.slice(0, limit);
  } catch {
    return [];
  }
}
