'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Heart, ShoppingCart, User, Trash2 } from 'lucide-react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useWishlist } from '../contexts/WishlistContext'
import Toast from '../components/Toast'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true })
  }

  const handleRemoveFromWishlist = (id: number, name: string) => {
    removeFromWishlist(id)
    showToast(`Removed ${name} from wishlist!`, 'success')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                Re-wear
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for sustainable fashion..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/wishlist" className="p-2 text-red-500 hover:text-red-600 transition-colors">
                <AiFillHeart className="h-6 w-6" />
              </Link>
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <User className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No items in wishlist yet</h2>
            <p className="text-gray-600 mb-8">Start adding items to your wishlist to see them here!</p>
            <Link href="/main" className="btn-primary px-8 py-3">
              Browse Items
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button 
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors z-10"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-eco-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {item.condition}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {item.seller}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-eco-600">
                        {item.points} pts
                      </span>
                    </div>
                    <button className="btn-eco text-sm px-3 py-1">
                      Swap Now
                    </button>
                  </div>
                  
                  {/* Water Saving Badge */}
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      💧 You saved {Math.floor(Math.random() * 500) + 200}L of water!
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
} 