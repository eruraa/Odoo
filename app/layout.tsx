import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { WishlistProvider } from './contexts/WishlistContext'

export const metadata: Metadata = {
  title: 'Swap.Save.Sustain',
  description: 'Turn yesterday\'s clothes into tomorrow\'s style. ReWear it forward.',
  keywords: 'sustainable fashion, second-hand clothing, pre-loved, fashion marketplace, eco-friendly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </body>
    </html>
  )
} 