import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { listingId } = await request.json()
    const updatedListing = await prisma.listing.update({
      where: { id: Number(listingId) },
      data: { approved: true },
    })
    return NextResponse.json(updatedListing)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to approve listing', details: error },
      { status: 500 }
    )
  }
}
