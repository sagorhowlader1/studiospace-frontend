"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface CancelBookingButtonProps {
  bookingId: string;
}

export function CancelBookingButton({
  bookingId,
}: CancelBookingButtonProps) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = React.useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking.");
      }

      toast.add({
        type: "success",
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      });

      router.refresh();
    } catch (error) {
      console.error("Cancel booking failed:", error);
      toast.add({
        type: "error",
        title: "Could not cancel booking",
        description: "Please try again in a moment.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCancel}
      disabled={isCancelling}
    >
      {isCancelling && <Loader2Icon className="animate-spin" />}
      Cancel Booking
    </Button>
  );
}
