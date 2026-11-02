"use client";


import { ShieldCheck, Star, Users } from "lucide-react";

import { BookingDialog } from "@/components/booking-dialog";
import { FavoriteButton } from "@/components/studio-image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import type { Studio } from "@/lib/studio-style";

export function BookingCard({
  studio,
  rating,
  reviewCount,
}: {
  studio: Studio;
  rating: number;
  reviewCount: number;
}) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  

  return (
    <Card className="p-4 lg:sticky lg:top-24">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="inline-flex w-fit items-center gap-1 text-sm font-medium">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {rating.toFixed(1)}
            <span className="text-muted-foreground font-normal">
              ({reviewCount} reviews)
            </span>
          </span>
          <p>
            <span className="text-3xl font-semibold">${studio.hourlyRate}</span>
            <span className="text-muted-foreground text-sm"> /hour</span>
          </p>
        </div>
        <Separator />
        <div className="flex flex-col gap-3 text-sm">
          <p className="flex items-center justify-between">
            <ShieldCheck className="text-muted-foreground size-4" />
            <span className="text-muted-foreground">Security deposit</span>
            <span className="font-medium">${studio.securityDeposit}</span>
          </p>
          <p className="flex items-center justify-between">
            <Users className="text-muted-foreground size-4" />
            <span className="text-muted-foreground">Max capacity</span>
            <span className="font-medium">{studio.maxCapacity} creators</span>
          </p>
        </div>
        <Separator />
        <BookingDialog
        user = {user?.email}
          studioId={studio._id}
          title={studio.title}
          hourlyRate={studio.hourlyRate}
          securityDeposit={studio.securityDeposit}
          className="w-full"
        />
        <form>
          <div className="flex cursor-pointer justify-end">
            <FavoriteButton />
          </div>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          Free cancellation up to 24 hours before your booking.
        </p>
      </div>
    </Card>
  );
}