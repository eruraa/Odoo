'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WishlistItem {
  id: number
  name: string
  points: number
  image: string
  condition: string
  size: string
  seller: string
}

interface WishlistContextType {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('rewear-wishlist')
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist))
        } catch (error) {
          console.error('Error loading wishlist from localStorage:', error)
        }
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rewear-wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prev => {
      const exists = prev.find(wishlistItem => wishlistItem.id === item.id)
      if (!exists) {
        return [...prev, item]
      }
      return prev
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return wishlist.some(item => item.id === id)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
} 