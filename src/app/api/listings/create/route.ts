// src/app/api/listings/create/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      vendorId,
      type,
      name,
      address,
      description,
      facilities,
      pricing,
      images,
    } = await req.json();
    const newListing = await prisma.listing.create({
      data: {
        vendorId,
        type,
        name,
        address,
        description,
        facilities,
        pricing,
        images,
      },
    });
    return NextResponse.json(newListing);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create listing", details: error },
      { status: 500 }
    );
  }
}
