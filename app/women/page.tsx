'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingCart, User } from 'lucide-react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useWishlist } from '../contexts/WishlistContext'
import Toast from '../components/Toast'
import { getProductsByGender } from '../data/products'

export default function WomenPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  })
  const [searchQuery, setSearchQuery] = useState('')

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true })
  }

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      showToast('Removed from Wishlist!', 'success')
    } else {
      addToWishlist(product)
      showToast('Added to Wishlist!', 'success')
    }
  }

  // Get women's products from shared data
  const allWomenProducts = getProductsByGender('women')

  // Filter products based on search query
  const filteredProducts = allWomenProducts.filter(product => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.seller.toLowerCase().includes(searchTerm)
    )
  })

  // Generate water saved values for each product on the client
  const [waterSavedList, setWaterSavedList] = useState<number[]>([])
  useEffect(() => {
    setWaterSavedList(filteredProducts.map(() => Math.floor(Math.random() * 500) + 200))
  }, [filteredProducts.length, searchQuery])

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
            
            {/* Simplified Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/women" className="text-primary-600 font-medium">
                Women
              </Link>
              <Link href="/men" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Men
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
                  placeholder="Search women's fashion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/wishlist" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="h-6 w-6" />
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
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Women's Fashion
          </h1>
          <p className="text-gray-600">
            Discover sustainable women's clothing and accessories
          </p>
        </div>
      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Link 
              key={product.id} 
              href={`/item-detail?id=${product.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleWishlistToggle(product)
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  {isInWishlist(product.id) ? (
                    <AiFillHeart className="h-5 w-5 text-red-500" />
                  ) : (
                    <AiOutlineHeart className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute bottom-3 left-3 bg-eco-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {waterSavedList[index] || 0}L water saved
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-eco-600">{product.points} points</span>
                  <span className="text-sm text-gray-500">{product.size}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">by {product.seller}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Women's Fashion Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">1,247</div>
                <div className="text-gray-600">Women's Items Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-eco-600 mb-2">18,450</div>
                <div className="text-gray-600">Points Earned by Women</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-600 mb-2">234</div>
                <div className="text-gray-600">Active Women Swappers</div>
              </div>
            </div>
          </div>
        </div>
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