import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import {
    BOOKINGS_COLLECTION,
    readString,
    serializeBooking,
    timeToMinutes,
    type BookingDocument,
} from "@/lib/bookings-server"

export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDb()
    const bookings = await db
        .collection<BookingDocument>(BOOKINGS_COLLECTION)
        .find({
            $or: [
                { userId: session.user.id },
                { userEmail: session.user.email },
            ],
        })
        .sort({ createdAt: -1 })
        .toArray()

    return NextResponse.json({ bookings: bookings.map(serializeBooking) })
}

export async function POST(request: Request) {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json().catch(() => null)) as Record<
        string,
        unknown
    > | null

    if (!body) {
        return NextResponse.json(
            { error: "Invalid request body." },
            { status: 400 }
        )
    }

    const studioId = readString(body.studioId)
    const studioName = readString(body.studioName)
    const date = readString(body.date)
    const startTime = readString(body.startTime)
    const endTime = readString(body.endTime)
    const hourlyRate = Number(body.hourlyRate)

    if (!studioId || !studioName) {
        return NextResponse.json(
            { error: "A studio is required to make a reservation." },
            { status: 400 }
        )
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json(
            { error: "A valid booking date (YYYY-MM-DD) is required." },
            { status: 400 }
        )
    }

    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    if (
        startMinutes === null ||
        endMinutes === null ||
        endMinutes <= startMinutes
    ) {
        return NextResponse.json(
            { error: "A valid start and end time are required." },
            { status: 400 }
        )
    }

    if (!Number.isFinite(hourlyRate) || hourlyRate < 0) {
        return NextResponse.json(
            { error: "A valid hourly rate is required." },
            { status: 400 }
        )
    }

    const hours = (endMinutes - startMinutes) / 60
    const totalAmount = Math.round(hourlyRate * hours * 100) / 100
    const now = new Date()

    const booking: BookingDocument = {
        userId: session.user.id,
        userEmail: session.user.email,
        userName: session.user.name,
        studioId,
        studioName,
        studioImage: readString(body.studioImage) || null,
        studioCategory: readString(body.studioCategory) || null,
        location: readString(body.location) || null,
        date,
        startTime,
        endTime,
        hours,
        hourlyRate,
        totalAmount,
        status: "Pending",
        createdAt: now,
        updatedAt: now,
    }

    const db = await getDb()
    const result = await db
        .collection<BookingDocument>(BOOKINGS_COLLECTION)
        .insertOne(booking)

    return NextResponse.json(
        { booking: serializeBooking({ _id: result.insertedId, ...booking }) },
        { status: 201 }
    )
}
