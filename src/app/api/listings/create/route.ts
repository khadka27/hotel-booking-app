// src/app/api/listings/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  // Retrieve session and verify user is a vendor
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, name, address, description, facilities, pricing, images } =
      await request.json();
    // Extract vendor ID from session (as a number)
    const vendorId = Number(session.user.id);
    const newListing = await prisma.listing.create({
      data: {
        vendorId,
        type,
        name,
        address,
        description,
        facilities,
        pricing: Number(pricing),
        images,
        approved: false, // New listings must be approved by an admin
      },
    });
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create listing", details: error },
      { status: 500 }
    );
  }
}
