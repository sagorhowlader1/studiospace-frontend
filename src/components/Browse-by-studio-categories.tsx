import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Aperture,
  Clapperboard,
  Mic,
  Music2,
  Palette,
  Camera,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchStudios } from "@/lib/studio-style";

interface CategoryConfig {
  /** The category name used by the API's explore-studios payload. */
  match: string;
  title: string;
  icon: LucideIcon;
  // Chip colors with dark-mode counterparts.
  chip: string;
  blurb: string;
}

// Curated copy for the disciplines we know about. Categories present in the
// API but missing here fall back to the DEFAULT config.
const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    match: "Photo Studio",
    title: "Photo Studios",
    icon: Camera,
    chip: "bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400",
    blurb:
      "Daylight studios, natural light lofts, and product lighting setups.",
  },
  {
    match: "Film Stage",
    title: "Sound Stages",
    icon: Clapperboard,
    chip: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    blurb:
      "Acoustic-treated volumes, green screens, catwalk power, and cine lifts.",
  },
  {
    match: "Podcast Lounge",
    title: "Podcast Rooms",
    icon: Mic,
    chip: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    blurb:
      "Primely quiet, video-ready rooms with multi-cam rigs and 10Gb fiber.",
  },
  {
    match: "Music Suite",
    title: "Music Suites",
    icon: Music2,
    chip: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    blurb:
      "Dolby Atmos mix rooms, analog consoles, active looms, and live rooms.",
  },
  {
    match: "Workshop",
    title: "Art Workshops",
    icon: Palette,
    chip: "bg-pink-100 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
    blurb:
      "Ceramic kilns, print benches, prop shops, and new media build spaces.",
  },
  {
    match: "Dance Studio",
    title: "Dance Studios",
    icon: Sparkles,
    chip: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",
    blurb: "Sprung-floors, mirrored walls, and rehearsal-ready lighting rigs.",
  },
  {
    match: "Co-working Loft",
    title: "Co-working Lofts",
    icon: Aperture,
    chip: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
    blurb: "Shared creative lofts with desks, gear storage, and green rooms.",
  },
]

const DEFAULT_CONFIG: CategoryConfig = {
  match: "",
  title: "Studios",
  icon: Sparkles,
  chip: "bg-primary/10 text-primary",
  blurb: "Curated, verified spaces ready to book by the hour.",
}

function spaceCount(count: number) {
  return `${count} ${count === 1 ? "Space" : "Spaces"}`
}

async function CategoriesGrid() {
  const studios = await fetchStudios()

  // Count live listings per category, then render in the curated order.
  const counts = new Map<string, number>()
  for (const studio of studios) {
    counts.set(studio.category, (counts.get(studio.category) ?? 0) + 1)
  }

  const cards: Array<CategoryConfig & { count: number }> = []
  for (const config of CATEGORY_CONFIG) {
    const count = counts.get(config.match)
    if (count === undefined) continue
    cards.push({ ...config, count })
    counts.delete(config.match)
  }
  // Any category without curated copy gets the default card.
  for (const category of counts.keys()) {
    cards.push({ ...DEFAULT_CONFIG, title: category, count: counts.get(category)! })
  }

  if (cards.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {cards.map(({ icon: Icon, chip, title, blurb, count }) => (
        <Link
          key={title}
          href="/explore-studios"
          className="group"
        >
          <Card className="h-full flex flex-col gap-0 p-4 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
            <span
              className={`grid size-10 place-items-center rounded-xl ${chip}`}
            >
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-sm font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed line-clamp-2">
              {blurb}
            </p>
            <div className="mt-auto text-muted-foreground flex items-center justify-between text-xs">
              <span>{spaceCount(count)}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-44 shrink-0 rounded-xl" />
      ))}
    </div>
  )
}

export default function BrowseByStudioCategories() {
  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="text-brand text-xs font-bold tracking-widest uppercase">
          Curated Production Categories
        </p>
        <div className="mt-1 mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Browse by Creative Discipline
          </h2>
          <Link
            href="/explore-studios"
            className="text-brand inline-flex shrink-0 items-center gap-1.5 text-sm font-bold underline-offset-4 hover:underline"
          >
            Explore All Workspaces
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <Suspense fallback={<CategoriesGridSkeleton />}>
          <CategoriesGrid />
        </Suspense>
      </div>
    </section>
  )
}
