import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { listingId } = await request.json()
    const deletedListing = await prisma.listing.delete({
      where: { id: Number(listingId) },
    })
    return NextResponse.json(deletedListing)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reject listing', details: error },
      { status: 500 }
    )
  }
}
