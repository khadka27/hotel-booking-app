import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pendingListings = await prisma.listing.findMany({
      where: { approved: false }, // Ensure your schema includes an "approved" field
    })
    return NextResponse.json(pendingListings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pending listings', details: error },
      { status: 500 }
    )
  }
}
