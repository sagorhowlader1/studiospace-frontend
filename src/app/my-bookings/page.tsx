import { Suspense } from "react";
import Link from "next/link";
import { CalendarDays, CalendarX, Clock } from "lucide-react";

import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { BookingStatusBadge } from "@/components/booking-status-badge";
import { CancelBookingButton } from "@/components/cancel-booking-button";
import { StudioImage } from "@/components/studio-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { type Booking } from "@/lib/bookings";

const BOOKINGS_API_URL = "http://localhost:8000";

const BOOKING_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatBookingDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return BOOKING_DATE_FORMATTER.format(parsed);
}

function formatBookingTime(time: string): string {
  const [hours = "0", minutes = "0"] = time.split(":");
  const hour = Number(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minutes} ${period}`;
}

async function getUserBookings(email: string): Promise<Booking[]> {
  const url = `${BOOKINGS_API_URL}/my-bookings/${encodeURIComponent(email)}`;
  const res = await fetch(url, { cache: "no-store" });

  let bookings: Booking[] = [];

  if (res.ok) {
    const data = (await res.json()) as Booking[] | { bookings?: Booking[] };
    const list = Array.isArray(data) ? data : data.bookings ?? [];
    bookings = list;
  }

  return bookings;
}

function BookingCard({ booking }: { booking: Booking }) {
  const isPending = booking.status === "Pending";
  const isCancelled = booking.status === "Cancelled";

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4">
        {/* Studio */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/10">
              <StudioImage
                src={booking.studioImage ?? ""}
                alt={booking.studioName}
                category={booking.studioCategory ?? booking.studioName}
                seed={booking.studioId}
                className="size-14 rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{booking.studioName}</h3>
              {booking.location ? (
                <p className="text-muted-foreground truncate text-sm">
                  {booking.location}
                </p>
              ) : null}
            </div>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <CalendarDays className="size-3.5" />
              Date
            </span>
            <span className="text-sm font-medium">
              {formatBookingDate(booking.date)}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Clock className="size-3.5" />
              Time
            </span>
            <span className="text-sm font-medium">
              {formatBookingTime(booking.startTime)} –{" "}
              {formatBookingTime(booking.endTime)}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
            <span className="text-muted-foreground text-xs">Duration</span>
            <span className="text-sm font-medium">
              {booking.hours} {booking.hours === 1 ? "hour" : "hours"}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2.5">
            <span className="text-muted-foreground text-xs">Total</span>
            <span className="text-sm font-medium">
              ${booking.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t pt-3">
          <p className="text-sm">
            Total due:{" "}
            <span className="font-semibold">${booking.totalAmount.toFixed(2)}</span>
          </p>
          {isPending ? (
            <CancelBookingButton bookingId={booking.id} />
          ) : (
            <p className="text-muted-foreground text-xs">
              {isCancelled
                ? "This booking was cancelled."
                : "Free cancellation up to 24 hours before your booking."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function BookingsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-14 rounded-lg" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function MyBookingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) redirect("/login");

  const bookings = await getUserBookings(email);

  return (
    <>
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          My Bookings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          View your reservations and manage upcoming studio bookings.
        </p>
      </header>

      {bookings.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX className="size-4" />
            </EmptyMedia>
            <EmptyTitle>No bookings yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t made any reservations yet. Find a studio and book
              your first creative session.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button render={<Link href="/explore-studios" />}>Browse Studios</Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </>
  );
}

export default function MyBookingsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Suspense fallback={<BookingsSkeleton />}>
        <MyBookingsContent />
      </Suspense>
    </main>
  );
}
