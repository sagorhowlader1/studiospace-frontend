
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Clock,
  Building2,
  Hourglass,
  XCircle,
  CalendarCheck,
} from "lucide-react";
import { CancelBookingButton } from "@/components/cancel-booking-button";

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
};

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  const res = await fetch(
    `http://localhost:8000/my-bookings/${user.email}`
  );

  const data = await res.json();

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-primary mb-2">
            YOUR BOOKINGS
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            My Bookings
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage your studio reservations and booking details.
          </p>
        </div>

        {/* Booking List */}
        {data.length > 0 ? (
          <div className="grid gap-5">
            {data.map((booking: any) => (
              <div
                key={booking._id}
                className="bg-background border rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                  {/* Studio Information */}
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-7 w-7 text-primary" />
                    </div>

                    <div>

                      <p className="text-sm text-muted-foreground mt-1">
                        Title: {booking.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Email: {booking.email}
                      </p>
                      

                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">

                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {booking.date}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {booking.time}
                        </div>

                        <div className="flex items-center gap-2">
                          <Hourglass className="h-4 w-4" />
                          {booking.hours} Hours
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Status and Action */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4">

                    {booking.status === "Pending" && (

                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium text-sm transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                        Cancel Booking
                      </button>

                    )}
                    {booking.status === "Pending" && (
                      <CancelBookingButton bookingId={booking._id.toString()} />
                    )}

                    {booking.status === "Confirmed" && (
                      <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                        <CalendarCheck className="h-4 w-4" />
                        Reservation Confirmed
                      </div>

                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* Empty State */
          <div className="bg-background border rounded-2xl py-20 px-5 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CalendarDays className="h-10 w-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              No Bookings Yet
            </h2>

            <p className="text-muted-foreground max-w-md mx-auto mb-7">
              You haven't booked any studio yet.
              Explore available studios and reserve your
              perfect creative workspace.
            </p>

            <a
              href="/studios"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Studios
            </a>
          </div>

        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
