import { NextRequest, NextResponse } from 'next/server'
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

    const clothes = await prisma.clothesItem.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(clothes)
  } catch (error) {
    console.error('Error fetching clothes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { title, description, category, size, condition, brand, color, imageUrl, price } = body

    if (!title || !category || !condition) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const clothesItem = await prisma.clothesItem.create({
      data: {
        title,
        description,
        category,
        size,
        condition,
        brand,
        color,
        imageUrl,
        price,
        userId: user.id
      }
    })

    return NextResponse.json(clothesItem, { status: 201 })
  } catch (error) {
    console.error('Error creating clothes item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 