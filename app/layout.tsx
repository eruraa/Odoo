import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { WishlistProvider } from './contexts/WishlistContext'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Swap.Save.Sustain',
  description: 'Turn yesterday\'s clothes into tomorrow\'s style. ReWear it forward.',
  keywords: 'sustainable fashion, second-hand clothing, pre-loved, fashion marketplace, eco-friendly',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 