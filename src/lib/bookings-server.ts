import type { WithId } from "mongodb"

import type { BookingStatus } from "@/lib/bookings"

export const BOOKINGS_COLLECTION = "bookings"

/** Shape of a reservation stored in the `bookings` collection. */
export interface BookingDocument {
    userId: string
    userEmail: string
    userName: string
    studioId: string
    studioName: string
    studioImage: string | null
    studioCategory: string | null
    location: string | null
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
    createdAt: Date
    updatedAt: Date
}

/** Converts a Mongo document into the JSON shape consumed by the client. */
export function serializeBooking(booking: WithId<BookingDocument>) {
    return {
        id: booking._id.toString(),
        studioId: booking.studioId,
        studioName: booking.studioName,
        studioImage: booking.studioImage,
        studioCategory: booking.studioCategory,
        location: booking.location,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        hours: booking.hours,
        hourlyRate: booking.hourlyRate,
        totalAmount: booking.totalAmount,
        status: booking.status,
        createdAt: toIsoString(booking.createdAt),
        updatedAt: toIsoString(booking.updatedAt),
    }
}

/** Tolerates dates stored as either `Date` or ISO strings. */
function toIsoString(value: unknown): string {
    if (value instanceof Date) return value.toISOString()
    if (typeof value === "string") return value
    return ""
}

export function readString(value: unknown): string {
    return typeof value === "string" ? value.trim() : ""
}

/** Returns minutes since midnight, or null when the value is not a valid HH:mm time. */
export function timeToMinutes(value: string): number | null {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value)
    if (!match) return null

    const hours = Number(match[1])
    const minutes = Number(match[2])
    if (hours > 23 || minutes > 59) return null

    return hours * 60 + minutes
}
