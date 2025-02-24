// src/app/api/bookings/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { customerId, listingId, unitId, startTime, endTime } =
      await request.json();

    const booking = await prisma.booking.create({
      data: {
        customerId: Number(customerId),
        listingId: Number(listingId),
        unitId: Number(unitId),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: "PENDING", // Ensure this matches your enum definition exactly
      },
    });
    return NextResponse.json(booking);
  } catch (error: any) {
    console.error("Error creating booking:", error);
    const errorDetails = error
      ? error instanceof Error
        ? error.message
        : JSON.stringify(error)
      : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create booking", details: errorDetails },
      { status: 500 }
    );
  }
}
