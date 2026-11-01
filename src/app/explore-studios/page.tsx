

import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Users } from "lucide-react";

import { FavoriteButton, StudioImage } from "@/components/studio-image";
import {
  CATEGORY_BADGE_COLOR,
  fetchStudios,
  getRating,
  type Studio,
} from "@/lib/studio-style";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function StudiosGrid() {
  const studios = await fetchStudios();

  if (studios.length === 0) {
    return (
      <div className="rounded-xl border border-dashed py-16 text-center">
        <p className="font-medium">No studios found</p>
        <p className="text-muted-foreground mt-1 text-sm">
          Check back later — new studios are added regularly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

function StudioCard({ studio }: { studio: Studio }) {

  const rating = getRating(studio._id);

  return (
    <Card className="gap-0 py-0">
      {/* Image with overlaid category badge, favorite button, price + rating */}
      <div className="relative">
        <StudioImage
          src={studio.imageUrl}
          alt={studio.title}
          category={studio.category}
          seed={studio._id}
          className="h-52 w-full"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm ${
            CATEGORY_BADGE_COLOR[studio.category] ?? "bg-primary"
          }`}
        >
          {studio.category}
        </span>
        <div className="absolute top-3 right-3">
          <FavoriteButton />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/70 to-transparent p-3">
          <p className="text-white">
            <span className="text-lg font-semibold">${studio.hourlyRate}</span>
            <span className="text-sm text-white/80"> /hr</span>
          </p>
          <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          <MapPin className="size-3.5 shrink-0 text-amber-500" />
          <span className="truncate">{studio.location}</span>
        </p>
        <h3 className="line-clamp-1 font-semibold">{studio.title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {studio.overview}
        </p>

        <div className="text-muted-foreground mt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="bg-muted/50 rounded-lg border px-2 py-1">
            <Users className="mr-1 inline size-3.5" />
            Up to {studio.maxCapacity} creators
          </span>
          <span className="bg-muted/50 rounded-lg border px-2 py-1">
            Deposit: ${studio.securityDeposit}
          </span>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Button render={<Link href={`/explore-studios/${studio._id}`} />} className="w-full">
          View Details
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </Card>
  );
}

function StudiosGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="gap-0 py-0">
          <Skeleton className="h-52 w-full rounded-none" />
          <div className="flex flex-1 flex-col gap-3 p-4">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
            <Skeleton className="mt-1 h-6 w-full" />
          </div>
          <div className="p-4 pt-0">
            <Skeleton className="h-8 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function AllStudiosPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Explore Studios
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Browse all available creative studios and find the perfect space for
          your next project.
        </p>
      </header>
      <Suspense fallback={<StudiosGridSkeleton />}>
        <StudiosGrid />
      </Suspense>
    </main>
  );
}
