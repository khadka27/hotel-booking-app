// src/app/api/reviews/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  // Retrieve session and ensure user is a customer
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "CUSTOMER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bookingId, rating, comments } = await request.json();
    const customerId = Number(session.user.id);
    const review = await prisma.review.create({
      data: {
        bookingId,
        customerId,
        rating,
        comments,
      },
    });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create review", details: error },
      { status: 500 }
    );
  }
}
