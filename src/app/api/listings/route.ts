import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      where: { approved: true },
      include: { units: true },
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch listings", details: error },
      { status: 500 }
    );
  }
}
