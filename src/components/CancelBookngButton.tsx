"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CancelBookingButtonProps {
    bookingId: string;
}

export default function CancelBookingButton({
    bookingId,
}: CancelBookingButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleCancel = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) return;

        setLoading(true);

        try {
            const res = await fetch(
                `http://localhost:8000/my-bookings/${bookingId}/cancel`,
                {
                    method: "PATCH",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            startTransition(() => {
                router.refresh();
            });

        } catch (error) {
            console.error("Cancel booking failed:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="button"
            variant="outline"
            disabled={loading || isPending}
            onClick={handleCancel}
            className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
        >
            <XCircle className="h-4 w-4" />
            {loading || isPending ? "Cancelling..." : "Cancel Booking"}
        </Button>
    );
}