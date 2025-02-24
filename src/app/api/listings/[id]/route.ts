// src/app/api/listings/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Directly destructure params from the context argument
    const listingId = Number(params.id);
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { units: true },
    });
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
    return NextResponse.json(listing);
  } catch (error: any) {
    console.error("Error fetching listing:", error);
    const errorDetails = error
      ? error instanceof Error
        ? error.message
        : JSON.stringify(error)
      : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch listing", details: errorDetails },
      { status: 500 }
    );
  }
}
