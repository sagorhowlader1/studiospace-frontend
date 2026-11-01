

const MyBookingsPage = () => {
    return (
        <div>
            My Bookings Page
        </div>
    );
};

export default MyBookingsPage;




// "use client"

// import * as React from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { format, parseISO } from "date-fns"
// import {
//     Building2Icon,
//     CalendarIcon,
//     ClockIcon,
//     MapPinIcon,
//     RefreshCwIcon,
// } from "lucide-react"

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardTitle } from "@/components/ui/card"
// import {
//     Empty,
//     EmptyContent,
//     EmptyDescription,
//     EmptyHeader,
//     EmptyMedia,
//     EmptyTitle,
// } from "@/components/ui/empty"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Spinner } from "@/components/ui/spinner"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { toast } from "@/components/ui/toast"
// import { authClient } from "@/lib/auth-client"
// import {
//     BOOKING_STATUSES,
//     type Booking,
//     type BookingStatus,
// } from "@/lib/bookings"

// type BookingFilter = "all" | BookingStatus

// const STATUS_STYLES: Record<BookingStatus, string> = {
//     Pending:
//         "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400",
//     Confirmed:
//         "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
//     Completed:
//         "border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-400",
//     Cancelled: "border-destructive/30 bg-destructive/10 text-destructive",
// }

// const currencyFormatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
// })

// function formatCurrency(value: number) {
//     return Number.isFinite(value) ? currencyFormatter.format(value) : "—"
// }

// function formatBookingDate(value: string) {
//     try {
//         return format(parseISO(value), "EEE, MMM d, yyyy")
//     } catch {
//         return value
//     }
// }

// function formatTimestamp(value: string) {
//     try {
//         return format(parseISO(value), "MMM d, yyyy")
//     } catch {
//         return value
//     }
// }

// function formatTime(value: string) {
//     const [hours, minutes] = value.split(":").map(Number)

//     if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
//         return value
//     }

//     const period = hours >= 12 ? "PM" : "AM"
//     const hour = hours % 12 || 12

//     return `${hour}:${String(minutes).padStart(2, "0")} ${period}`
// }

// async function requestBookings(signal?: AbortSignal): Promise<Booking[]> {
//     const res = await fetch("/api/bookings", { signal, cache: "no-store" })

//     if (!res.ok) {
//         throw new Error(
//             res.status === 401
//                 ? "Please sign in to view your bookings."
//                 : "Could not load your bookings."
//         )
//     }

//     const data = (await res.json()) as { bookings: Booking[] }

//     return data.bookings
// }

// function getErrorMessage(err: unknown) {
//     return err instanceof Error
//         ? err.message
//         : "Something went wrong, Please try again!"
// }

// function BookingCard({
//     booking,
//     onCancel,
// }: {
//     booking: Booking
//     onCancel: (booking: Booking) => void
// }) {
//     return (
//         <Card>
//             <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
//                 <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-20 sm:w-28">
//                     {booking.studioImage ? (
//                         // eslint-disable-next-line @next/next/no-img-element -- studio images are user-supplied remote URLs
//                         <img
//                             src={booking.studioImage}
//                             alt={booking.studioName}
//                             className="h-full w-full object-cover"
//                         />
//                     ) : (
//                         <div className="grid h-full w-full place-items-center text-muted-foreground">
//                             <Building2Icon className="size-6" />
//                         </div>
//                     )}
//                 </div>

//                 <div className="min-w-0 flex-1 space-y-1.5">
//                     <div className="flex flex-wrap items-center gap-2">
//                         <CardTitle className="text-base">
//                             {booking.studioName}
//                         </CardTitle>
//                         {booking.studioCategory ? (
//                             <Badge variant="secondary">
//                                 {booking.studioCategory}
//                             </Badge>
//                         ) : null}
//                         <Badge
//                             variant="outline"
//                             className={STATUS_STYLES[booking.status]}
//                         >
//                             {booking.status}
//                         </Badge>
//                     </div>

//                     <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
//                         <span className="inline-flex items-center gap-1">
//                             <CalendarIcon className="size-3.5" />
//                             {formatBookingDate(booking.date)}
//                         </span>
//                         <span className="inline-flex items-center gap-1">
//                             <ClockIcon className="size-3.5" />
//                             {formatTime(booking.startTime)} –{" "}
//                             {formatTime(booking.endTime)}
//                         </span>
//                         {booking.location ? (
//                             <span className="inline-flex items-center gap-1">
//                                 <MapPinIcon className="size-3.5" />
//                                 {booking.location}
//                             </span>
//                         ) : null}
//                     </div>

//                     <p className="text-xs text-muted-foreground">
//                         Booked on {formatTimestamp(booking.createdAt)}
//                     </p>
//                 </div>

//                 <div className="flex items-end justify-between gap-3 sm:flex-col sm:items-end">
//                     <div className="text-right">
//                         <p className="text-lg font-semibold">
//                             {formatCurrency(booking.totalAmount)}
//                         </p>
//                         <p className="text-xs text-muted-foreground">total</p>
//                     </div>
//                     {booking.status === "Pending" ? (
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="cursor-pointer text-destructive hover:text-destructive"
//                             onClick={() => onCancel(booking)}
//                         >
//                             Cancel Booking
//                         </Button>
//                     ) : null}
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

// export function MyBookingsPage() {
//     const router = useRouter()
//     const { data: session, isPending } = authClient.useSession()
//     const userId = session?.user.id

//     const [bookings, setBookings] = React.useState<Booking[]>([])
//     const [isLoading, setIsLoading] = React.useState(true)
//     const [error, setError] = React.useState<string | null>(null)
//     const [filter, setFilter] = React.useState<BookingFilter>("all")
//     const [cancelTarget, setCancelTarget] = React.useState<Booking | null>(null)
//     const [isCancelling, setIsCancelling] = React.useState(false)

//     React.useEffect(() => {
//         if (isPending || !userId) return

//         const controller = new AbortController()

//         const load = async () => {
//             try {
//                 const next = await requestBookings(controller.signal)
//                 setBookings(next)
//             } catch (err) {
//                 if (controller.signal.aborted) return
//                 setError(getErrorMessage(err))
//             } finally {
//                 if (!controller.signal.aborted) setIsLoading(false)
//             }
//         }

//         void load()

//         return () => controller.abort()
//     }, [isPending, userId])

//     const handleRetry = async () => {
//         setIsLoading(true)
//         setError(null)

//         try {
//             setBookings(await requestBookings())
//         } catch (err) {
//             setError(getErrorMessage(err))
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const counts = React.useMemo(() => {
//         const result: Record<BookingFilter, number> = {
//             all: bookings.length,
//             Pending: 0,
//             Confirmed: 0,
//             Completed: 0,
//             Cancelled: 0,
//         }

//         for (const booking of bookings) {
//             result[booking.status] += 1
//         }

//         return result
//     }, [bookings])

//     const visibleBookings = React.useMemo(
//         () =>
//             filter === "all"
//                 ? bookings
//                 : bookings.filter((booking) => booking.status === filter),
//         [bookings, filter]
//     )

//     const handleCancel = async () => {
//         if (!cancelTarget) return

//         setIsCancelling(true)

//         try {
//             const res = await fetch(`/api/bookings/${cancelTarget.id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ status: "Cancelled" }),
//             })

//             const data = (await res.json().catch(() => null)) as {
//                 booking?: Booking
//                 error?: string
//             } | null

//             if (!res.ok || !data?.booking) {
//                 throw new Error(
//                     data?.error ?? "Could not cancel this booking."
//                 )
//             }

//             const cancelled = data.booking

//             setBookings((prev) =>
//                 prev.map((booking) =>
//                     booking.id === cancelled.id ? cancelled : booking
//                 )
//             )
//             toast.add({
//                 type: "success",
//                 title: "Booking cancelled.",
//                 description: `${cancelTarget.studioName} reservation was cancelled.`,
//             })
//             setCancelTarget(null)
//         } catch (err) {
//             toast.add({
//                 type: "error",
//                 title:
//                     err instanceof Error
//                         ? err.message
//                         : "Could not cancel this booking.",
//             })
//         } finally {
//             setIsCancelling(false)
//         }
//     }

//     if (isPending) {
//         return (
//             <div className="grid min-h-svh place-items-center bg-background px-4 py-10">
//                 <p className="text-sm text-muted-foreground">Loading…</p>
//             </div>
//         )
//     }

//     if (!session) {
//         return (
//             <div className="grid min-h-svh place-items-center bg-background px-4 py-10">
//                 <Card className="w-full max-w-sm text-center">
//                     <div className="space-y-1.5 p-6">
//                         <CardTitle className="text-xl">
//                             Sign in required
//                         </CardTitle>
//                         <p className="text-sm text-muted-foreground">
//                             You need to be logged in to view your bookings.
//                         </p>
//                     </div>
//                     <CardContent className="flex gap-3">
//                         <Button
//                             className="h-10 flex-1 cursor-pointer"
//                             onClick={() => router.push("/login")}
//                         >
//                             Login
//                         </Button>
//                         <Button
//                             className="h-10 flex-1 cursor-pointer"
//                             variant="outline"
//                             onClick={() => router.push("/registration")}
//                         >
//                             Create Account
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-svh bg-background px-4 py-10">
//             <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
//                 <div className="space-y-1">
//                     <h1 className="text-2xl font-semibold tracking-tight">
//                         My Bookings
//                     </h1>
//                     <p className="text-sm text-muted-foreground">
//                         {bookings.length === 0
//                             ? "Reservations you make will appear here."
//                             : `${bookings.length} reservation${
//                                   bookings.length === 1 ? "" : "s"
//                               } in total.`}
//                     </p>
//                 </div>

//                 {isLoading ? (
//                     <div className="flex flex-col gap-4">
//                         {[0, 1, 2].map((index) => (
//                             <Card key={index}>
//                                 <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
//                                     <Skeleton className="h-28 w-full shrink-0 rounded-lg sm:h-20 sm:w-28" />
//                                     <div className="flex-1 space-y-2">
//                                         <Skeleton className="h-4 w-1/2" />
//                                         <Skeleton className="h-4 w-2/3" />
//                                         <Skeleton className="h-4 w-1/3" />
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         ))}
//                     </div>
//                 ) : error ? (
//                     <Card>
//                         <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
//                             <p className="text-sm text-destructive">{error}</p>
//                             <Button
//                                 variant="outline"
//                                 className="cursor-pointer"
//                                 onClick={() => void handleRetry()}
//                             >
//                                 <RefreshCwIcon />
//                                 Try again
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ) : bookings.length === 0 ? (
//                     <Empty className="border">
//                         <EmptyHeader>
//                             <EmptyMedia variant="icon">
//                                 <CalendarIcon />
//                             </EmptyMedia>
//                             <EmptyTitle>No bookings yet</EmptyTitle>
//                             <EmptyDescription>
//                                 Reserve a studio and your reservations will show
//                                 up here.
//                             </EmptyDescription>
//                         </EmptyHeader>
//                         <EmptyContent>
//                             <Button
//                                 className="cursor-pointer"
//                                 render={<Link href="/" />}
//                             >
//                                 Browse studios
//                             </Button>
//                         </EmptyContent>
//                     </Empty>
//                 ) : (
//                     <>
//                         <Tabs
//                             value={filter}
//                             onValueChange={(value) =>
//                                 setFilter(value as BookingFilter)
//                             }
//                         >
//                             <TabsList className="w-full justify-start overflow-x-auto">
//                                 <TabsTrigger value="all">
//                                     All ({counts.all})
//                                 </TabsTrigger>
//                                 {BOOKING_STATUSES.map((status) => (
//                                     <TabsTrigger key={status} value={status}>
//                                         {status} ({counts[status]})
//                                     </TabsTrigger>
//                                 ))}
//                             </TabsList>
//                         </Tabs>

//                         <div className="flex flex-col gap-4">
//                             {visibleBookings.length === 0 ? (
//                                 <p className="py-8 text-center text-sm text-muted-foreground">
//                                     No {filter.toLowerCase()} bookings.
//                                 </p>
//                             ) : (
//                                 visibleBookings.map((booking) => (
//                                     <BookingCard
//                                         key={booking.id}
//                                         booking={booking}
//                                         onCancel={setCancelTarget}
//                                     />
//                                 ))
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>

//             <AlertDialog
//                 open={!!cancelTarget}
//                 onOpenChange={(open) => {
//                     if (!open && !isCancelling) {
//                         setCancelTarget(null)
//                     }
//                 }}
//             >
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <AlertDialogTitle>
//                             Cancel this booking?
//                         </AlertDialogTitle>
//                         <AlertDialogDescription>
//                             {cancelTarget
//                                 ? `Your reservation at ${cancelTarget.studioName} on ${formatBookingDate(cancelTarget.date)} will be cancelled. This can't be undone.`
//                                 : null}
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                         <AlertDialogCancel disabled={isCancelling}>
//                             Keep booking
//                         </AlertDialogCancel>
//                         <AlertDialogAction
//                             variant="destructive"
//                             className="cursor-pointer"
//                             disabled={isCancelling}
//                             onClick={() => void handleCancel()}
//                         >
//                             {isCancelling ? (
//                                 <>
//                                     <Spinner />
//                                     Cancelling…
//                                 </>
//                             ) : (
//                                 "Yes, cancel booking"
//                             )}
//                         </AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </div>
//     )
// }

// export default MyBookingsPage
