'use client'

import { SessionProvider } from "next-auth/react"
import { WishlistProvider } from "./contexts/WishlistContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </SessionProvider>
  )
} 