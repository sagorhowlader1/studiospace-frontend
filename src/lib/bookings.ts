export const BOOKING_STATUSES = [
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
] as const

export type BookingStatus = (typeof BOOKING_STATUSES)[number]

/** A reservation as returned by `/api/bookings`. */
export interface Booking {
    id: string
    studioId: string
    studioName: string
    studioImage?: string | null
    studioCategory?: string | null
    location?: string | null
    /** YYYY-MM-DD */
    date: string
    /** HH:mm */
    startTime: string
    /** HH:mm */
    endTime: string
    hours: number
    hourlyRate: number
    totalAmount: number
    status: BookingStatus
    createdAt: string
    updatedAt: string
}
