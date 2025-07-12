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

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            clothesItem: true
          }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: {
          items: {
            include: {
              clothesItem: true
            }
          }
        }
      })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error fetching cart:', error)
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

    const { clothesItemId } = await request.json()

    if (!clothesItemId) {
      return NextResponse.json({ error: 'Clothes item ID is required' }, { status: 400 })
    }

    // Verify the clothes item exists and is available
    const clothesItem = await prisma.clothesItem.findUnique({
      where: { id: clothesItemId }
    })

    if (!clothesItem) {
      return NextResponse.json({ error: 'Clothes item not found' }, { status: 404 })
    }

    if (!clothesItem.isAvailable) {
      return NextResponse.json({ error: 'Item is not available' }, { status: 400 })
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id }
      })
    }

    // Add item to cart (or update quantity if already exists)
    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_clothesItemId: {
          cartId: cart.id,
          clothesItemId: clothesItemId
        }
      },
      update: {
        quantity: {
          increment: 1
        }
      },
      create: {
        cartId: cart.id,
        clothesItemId: clothesItemId,
        quantity: 1
      },
      include: {
        clothesItem: true
      }
    })

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const clothesItemId = searchParams.get('clothesItemId')

    if (!clothesItemId) {
      return NextResponse.json({ error: 'Clothes item ID is required' }, { status: 400 })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id }
    })

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    // Remove item from cart
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        clothesItemId: clothesItemId
      }
    })

    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error) {
    console.error('Error removing item from cart:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 