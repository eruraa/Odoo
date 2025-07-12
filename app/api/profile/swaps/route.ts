import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const swaps = await prisma.swap.findMany({
      where: {
        OR: [
          { offeredBy: user.id },
          { acceptedBy: user.id }
        ]
      },
      include: {
        offeredItem: true,
        requestedItem: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(swaps)
  } catch (error) {
    console.error('Error fetching swaps:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 