import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import { auth } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import {
    BOOKINGS_COLLECTION,
    serializeBooking,
    type BookingDocument,
} from "@/lib/bookings-server"

export async function PATCH(
    request: Request,
    { params }: RouteContext<"/api/bookings/[id]">
) {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
        return NextResponse.json(
            { error: "Booking not found." },
            { status: 404 }
        )
    }

    const body = (await request.json().catch(() => null)) as {
        status?: unknown
    } | null

    if (body?.status !== "Cancelled") {
        return NextResponse.json(
            { error: "Only cancellation is supported." },
            { status: 400 }
        )
    }

    const db = await getDb()
    const collection = db.collection<BookingDocument>(BOOKINGS_COLLECTION)
    const booking = await collection.findOne({ _id: new ObjectId(id) })

    if (!booking) {
        return NextResponse.json(
            { error: "Booking not found." },
            { status: 404 }
        )
    }

    if (
        booking.userId !== session.user.id &&
        booking.userEmail !== session.user.email
    ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    if (booking.status !== "Pending") {
        return NextResponse.json(
            { error: "Only pending bookings can be cancelled." },
            { status: 409 }
        )
    }

    const updatedAt = new Date()

    await collection.updateOne(
        { _id: booking._id },
        { $set: { status: "Cancelled", updatedAt } }
    )

    return NextResponse.json({
        booking: serializeBooking({
            ...booking,
            status: "Cancelled",
            updatedAt,
        }),
    })
}
