import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pendingBookings = await prisma.booking.findMany({
      where: { status: "Pending" },
    });
    return NextResponse.json(pendingBookings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pending bookings", details: error },
      { status: 500 }
    );
  }
}
