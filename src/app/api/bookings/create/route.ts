import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { customerId, listingId, unitId, startTime, endTime } = await req.json()
    const booking = await prisma.booking.create({
      data: {
        customerId,
        listingId,
        unitId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'Pending',
      },
    })
    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking', details: error }, { status: 500 })
  }
}
