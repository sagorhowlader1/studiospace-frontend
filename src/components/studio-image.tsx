"use client";

import { useState } from "react";
import {
  Aperture,
  Camera,
  Clapperboard,
  Heart,
  Music2,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Deterministic gradients + icons per studio category, used as the final
// fallback when both the listing's imageUrl and the seeded placeholder fail.
const CATEGORY_ART: Array<{
  match: string[];
  icon: LucideIcon;
  gradient: string;
}> = [
  {
    match: ["photo", "studio"],
    icon: Camera,
    gradient: "from-orange-400 via-rose-400 to-purple-500",
  },
  {
    match: ["music", "sound", "podcast"],
    icon: Music2,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    match: ["film", "stage"],
    icon: Clapperboard,
    gradient: "from-slate-700 via-gray-800 to-black",
  },
  {
    match: ["dance", "workshop"],
    icon: Sparkles,
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
  },
  {
    match: ["co-working", "loft", "lounge"],
    icon: Aperture,
    gradient: "from-amber-400 via-orange-400 to-red-400",
  },
];

function artForCategory(category: string) {
  const normalized = category.toLowerCase();
  return (
    CATEGORY_ART.find((art) => art.match.some((m) => normalized.includes(m))) ??
    CATEGORY_ART[CATEGORY_ART.length - 1]
  );
}

interface StudioImageProps {
  /** Primary image URL from the API. */
  src: string;
  alt: string;
  category: string;
  /** Stable per-card seed so every card gets a different placeholder photo. */
  seed: string;
  className?: string;
}

/**
 * Image with a three-stage fallback chain:
 * API imageUrl → seeded per-card photo → category gradient.
 */
export function StudioImage({
  src,
  alt,
  category,
  seed,
  className = "h-52 w-full",
}: StudioImageProps) {
  // stage 0: API url (falls straight through when empty), stage 1: seeded
  // placeholder, stage 2+: category gradient
  const [stage, setStage] = useState(0);
  const { icon: Icon, gradient } = artForCategory(category);

  if (stage >= 2) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br ${gradient} ${className}`}
        aria-label={alt}
        role="img"
      >
        <div className="flex flex-col items-center gap-1 text-white/90">
          <Icon className="size-8" />
          <span className="max-w-[80%] truncate text-xs font-medium tracking-wide uppercase">
            {category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={stage === 0 && src ? src : `https://picsum.photos/seed/${seed}/800/600`}
      alt={alt}
      loading="lazy"
      onError={() => setStage((s) => s + 1)}
      className={`bg-muted object-cover ${className}`}
    />
  );
}

export function FavoriteButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "Remove from favorites" : "Save to favorites"}
      onClick={() => setLiked((v) => !v)}
      className="bg-background/90 text-foreground hover:bg-background flex size-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors"
    >
      <Heart
        className={`size-4 transition-colors ${
          liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
        }`}
      />
    </button>
  );
}
