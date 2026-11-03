import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MapPin, ShieldCheck, Star } from "lucide-react";

import { BookingCard } from "@/components/BookingCard";
import { StudioImage } from "@/components/studio-image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { headers } from "next/headers";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CATEGORY_BADGE_COLOR,
  fetchStudio,
  getAmenityIcon,
  getRating,
  hashString,
  type Studio,
} from "@/lib/studio-style";

export default async function ExploreStudiosDetailsPage({
  params,
}: PageProps<"/explore-studios/[id]">
) {
  const headersList = await headers()
  const token = await headersList.get('authorization')
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Button
        variant="ghost"
        size="sm"
        render={<Link href="/explore-studios" />}
        className="mb-4 -ml-2"
      >
        <ArrowLeft data-icon="inline-start" />
        Back to studios
      </Button>
      <Suspense fallback={<DetailsSkeleton />}>
        <StudioDetails id={id} />
      </Suspense>
    </main>
  );
}

async function StudioDetails({ id }: { id: string }) {
  const studio = await fetchStudio(id);
  if (!studio) notFound();

  const rating = getRating(studio._id);
  const reviewCount = 3 + (hashString(`${studio._id}-count`) % 12);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
      <div className="flex flex-col gap-8">
        <Gallery studio={studio} />
        <Header studio={studio} rating={rating} reviewCount={reviewCount} />
        <SpecsGrid studio={studio} />
        <section>
          <SectionTitle >About this workspace</SectionTitle>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {studio.overview}
          </p>
        </section>
        <section>
          <SectionTitle>Amenities</SectionTitle>
          <AmenitiesList amenities={studio.amenities} />
        </section>
        <HostCard ownerName={studio.ownerName} ownerEmail={studio.ownerEmail} />
        <ReviewsSection studioId={studio._id} reviewCount={reviewCount} />
      </div>

      <BookingCard studio={studio} rating={rating} reviewCount={reviewCount} />
    </div>
  );
}

function Gallery({ studio }: { studio: Studio }) {
  const GALLERY_SIZE = 4;

  return (
    <Carousel
      opts={{ loop: true }}
      className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
    >
      <CarouselContent className="m-0">
        {Array.from({ length: GALLERY_SIZE }).map((_, i) => (
          <CarouselItem key={i}>
            <StudioImage
              src={i === 0 ? studio.imageUrl : ""}
              alt={`${studio.title} — photo ${i + 1}`}
              category={studio.category}
              seed={i === 0 ? studio._id : `${studio._id}-gallery-${i}`}
              className="h-72 w-full sm:h-96"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-background/80 left-4" />
      <CarouselNext className="bg-background/80 right-4" />
    </Carousel>
  );
}

function Header({
  studio,
  rating,
  reviewCount,
}: {
  studio: Studio;
  rating: number;
  reviewCount: number;
}) {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium text-white ${
            CATEGORY_BADGE_COLOR[studio.category] ?? "bg-primary"
          }`}
        >
          {studio.category}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
          <span className="text-muted-foreground font-normal">
            ({reviewCount} reviews)
          </span>
        </span>
      </div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        {studio.title}
      </h1>
      <p className="text-muted-foreground flex items-center gap-1 text-sm">
        <MapPin className="size-4 shrink-0 text-amber-500" />
        {studio.location}
      </p>
    </header>
  );
}

function SpecsGrid({ studio }: { studio: Studio }) {
  const specs = [
    { label: "Hourly rate", value: `$${studio.hourlyRate}` },
    { label: "Security deposit", value: `$${studio.securityDeposit}` },
    { label: "Max capacity", value: `${studio.maxCapacity} creators` },
    { label: "Amenities", value: `${studio.amenities.length} included` },
  ];

  return (
    <Card className="grid grid-cols-2 gap-px overflow-hidden bg-muted sm:grid-cols-4">
      {specs.map((spec) => (
        <div key={spec.label} className="bg-card p-4">
          <p className="text-muted-foreground text-xs">{spec.label}</p>
          <p className="mt-1 font-semibold">{spec.value}</p>
        </div>
      ))}
    </Card>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading mb-3 text-lg font-semibold">{children}</h2>;
}

function AmenitiesList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {amenities.map((amenity) => {
        const Icon = getAmenityIcon(amenity);
        return (
          <li
            key={amenity}
            className="bg-muted/50 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
          >
            <Icon className="size-4" />
            {amenity}
          </li>
        );
      })}
    </ul>
  );
}

function HostCard({
  ownerName,
  ownerEmail,
}: {
  ownerName: string;
  ownerEmail: string;
}) {
  return (
    <section>
      <SectionTitle>Host</SectionTitle>
      <Card className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarFallback>{getInitials(ownerName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 font-medium">
            {ownerName}
            <Badge variant="secondary">
              <ShieldCheck data-icon="inline-start" />
              Verified
            </Badge>
          </p>
          <p className="text-muted-foreground text-xs">{ownerEmail}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          render={<a href={`mailto:${ownerEmail}`} />}
        >
          <Mail data-icon="inline-start" />
          Contact
        </Button>
      </Card>
    </section>
  );
}

// Placeholder reviews until the API serves real ones — values are derived
// deterministically from the studio id.
const REVIEWERS = [
  "Maya Chen",
  "Jordan Diaz",
  "Priya Patel",
  "Sam Okafor",
  "Lena Novak",
  "Marcus Lee",
];
const REVIEW_COMMENTS = [
  "Great space and plenty of natural light. Booking again for sure.",
  "Everything was exactly as described — check-in was smooth.",
  "Spacious, clean, and the equipment rental saved us a trip.",
  "Perfect for our shoot; the host was responsive and helpful.",
  "Well-maintained studio with thoughtful amenities throughout.",
];

function ReviewsSection({
  studioId,
  reviewCount,
}: {
  studioId: string;
  reviewCount: number;
}) {
  const reviews = Array.from({ length: 3 }).map((_, i) => {
    const seed = hashString(`${studioId}-review-${i}`);
    return {
      name: REVIEWERS[seed % REVIEWERS.length],
      comment: REVIEW_COMMENTS[(seed * 7 + i) % REVIEW_COMMENTS.length],
      stars: 4 + (seed % 3 === 0 ? 0 : 1),
    };
  });

  return (
    <section>
      <SectionTitle>Reviews ({reviewCount})</SectionTitle>
      <div className="flex flex-col gap-4">
        {reviews.map((review, i) => (
          <div key={i} className="flex gap-3">
            <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
              {getInitials(review.name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{review.name}</p>
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`size-3.5 ${
                        s < review.stars
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
        <p className="text-muted-foreground/70 text-xs">
          Showing sample reviews — live reviews will appear here once available.
        </p>
      </div>
    </section>
  );
}

function DetailsSkeleton() {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
      <div className="flex flex-col gap-8">
        <Skeleton className="h-72 w-full rounded-xl sm:h-96" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
      <Skeleton className="h-72 w-full rounded-xl" />
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}