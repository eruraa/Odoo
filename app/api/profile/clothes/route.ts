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

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const size = formData.get('size') as string
    const condition = formData.get('condition') as string
    const brand = formData.get('brand') as string
    const color = formData.get('color') as string
    const imageUrl = formData.get('imageUrl') as string
    const price = formData.get('price') as string
    const imageFile = formData.get('image') as File | null

    if (!title || !category || !condition) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let finalImageUrl = imageUrl

    // Handle image upload if file is provided
    if (imageFile) {
      try {
        // Convert file to base64 for storage (in production, use a proper image hosting service)
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        const mimeType = imageFile.type
        finalImageUrl = `data:${mimeType};base64,${base64}`
      } catch (error) {
        console.error('Error processing image:', error)
        finalImageUrl = imageUrl // Fallback to URL if file processing fails
      }
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
        imageUrl: finalImageUrl,
        price: price ? parseFloat(price) : null,
        userId: user.id
      }
    })

    return NextResponse.json(clothesItem, { status: 201 })
  } catch (error) {
    console.error('Error creating clothes item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 