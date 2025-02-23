/* eslint-disable @typescript-eslint/no-unused-vars */
// File: src/app/api/vendor/listings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import path as needed

export async function GET(request: Request) {
  // Retrieve the session using NextAuth
  const session = await getServerSession(authOptions);

  // Check if session exists and if the user has the 'VENDOR' role
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract the vendor's ID from the session
  // Assumes that session.user.id holds the vendor's ID
  const vendorId = Number(session.user.id);

  try {
    const listings = await prisma.listing.findMany({
      where: { vendorId },
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vendor listings", details: error },
      { status: 500 }
    );
  }
}
