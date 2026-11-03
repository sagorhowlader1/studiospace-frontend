"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

interface BookingDialogProps {
  studioId: string;
  title: string;
  hourlyRate: number;
  securityDeposit: number;
  triggerLabel?: string;
  className?: string;
  user?: string
}

const DURATION_OPTIONS = ["1", "2", "3", "4", "6", "8", "12"];

// Booking modal — currently a local confirmation flow; wire the submit
// handler to the real bookings API when it's ready.
export function BookingDialog({
  studioId,
  title,
  hourlyRate,
  securityDeposit,
  triggerLabel = "Book Workspace Now",
  className,
  user
}: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [hours, setHours] = useState("2");

  const hoursNum = Number(hours) || 0;
  const subtotal = hoursNum * hourlyRate;
  const total = subtotal + securityDeposit;



  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: user,
      title,
      time,
      date,
      hours,
      location
   
    };

     if (!date) {
      toast.add({ type: "error", title: "Please pick a booking date." });
      return;
    }
    toast.add({
      type: "success",
      title: "Booking confirmed!",
      description: `${title} — ${date} at ${time} for ${hoursNum}h. Total due: $${total} (incl. deposit).`,
    });
    setOpen(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const bookingData = await res.json();
      console.log(bookingData);

      if(bookingData){
        setOpen(false)
      }
    } catch (error) {
      console.error("Booking request failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className={className} />}>
        {triggerLabel}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book &ldquo;{title}&rdquo;</DialogTitle>
          <DialogDescription>
            ${hourlyRate}/hour &middot; Deposit ${securityDeposit} &middot; Id{" "}
            {studioId.slice(-6)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBooking} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-date">Date</Label>
              <Input
                id="booking-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-time">Start time</Label>
              <Input
                id="booking-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="booking-hours">Duration</Label>
            <NativeSelect
              id="booking-hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            >
              {DURATION_OPTIONS.map((h) => (
                <NativeSelectOption key={h} value={h}>
                  {h} {h === "1" ? "hour" : "hours"}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <Separator className="my-1" />
          <div className="text-sm">
            <div className="text-muted-foreground flex justify-between">
              <span>
                ${hourlyRate} &times; {hoursNum} {hoursNum === 1 ? "hour" : "hours"}
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="text-muted-foreground mt-1 flex justify-between">
              <span>Security deposit</span>
              <span>${securityDeposit}</span>
            </div>
            <div className="mt-1 flex justify-between font-medium">
              <span>Total due</span>
              <span>${total}</span>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button type="submit">Confirm Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
