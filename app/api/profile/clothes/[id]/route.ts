import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if the item belongs to the user
    const existingItem = await prisma.clothesItem.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    const updatedItem = await prisma.clothesItem.update({
      where: { id: params.id },
      data: {
        title,
        description,
        category,
        size,
        condition,
        brand,
        color,
        imageUrl,
        price
      }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating clothes item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if the item belongs to the user
    const existingItem = await prisma.clothesItem.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await prisma.clothesItem.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting clothes item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 