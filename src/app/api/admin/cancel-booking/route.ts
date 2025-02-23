import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json()
    const updatedBooking = await prisma.booking.update({
      where: { id: Number(bookingId) },
      data: { status: 'Cancelled' },
    })
    return NextResponse.json(updatedBooking)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to cancel booking', details: error },
      { status: 500 }
    )
  }
}
