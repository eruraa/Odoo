'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingCart, User } from 'lucide-react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useWishlist } from '../contexts/WishlistContext'
import Toast from '../components/Toast'
import { getProductsByGender } from '../data/products'

export default function MenPage() {
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

  // Get men's products from shared data
  const allMenProducts = getProductsByGender('men')

  // Filter products based on search query
  const filteredProducts = allMenProducts.filter(product => {
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
              <Link href="/women" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Women
              </Link>
              <Link href="/men" className="text-primary-600 font-medium">
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
                  placeholder="Search men's fashion..."
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Men's Fashion
          </h1>
          <p className="text-gray-600">
            Discover sustainable men's clothing and accessories
          </p>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Link
                key={product.id}
                href={`/item-detail?id=${product.id}`}
                className="card hover:shadow-lg transition-shadow duration-200"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button 
                    onClick={e => {
                      e.preventDefault();
                      handleWishlistToggle(product);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors z-10"
                  >
                    {isInWishlist(product.id) ? (
                      <AiFillHeart className="h-5 w-5 text-red-500" />
                    ) : (
                      <AiOutlineHeart className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  <div className="absolute bottom-2 left-2 bg-eco-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {product.condition}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {product.seller}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-eco-600">
                        {product.points} pts
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPoints} pts
                      </span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={e => e.preventDefault()}
                        className="btn-eco text-sm px-3 py-1"
                      >
                        Swap Now
                      </button>
                        {/* Tooltip/Overlay */}
                        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900 text-sm">Swap Details</h4>
                              <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={e => e.preventDefault()}>
                                <Heart className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Estimated delivery:</span>
                                <span className="text-eco-600 font-medium">2-3 days</span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">EcoPoints earned:</span>
                                <span className="text-eco-600 font-medium">+10 pts</span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Condition:</span>
                                <span className="text-gray-900 font-medium">{product.condition}</span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Size:</span>
                                <span className="text-gray-900 font-medium">{product.size}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex space-x-2">
                                <button className="flex-1 bg-eco-600 text-white py-2 px-3 rounded text-sm hover:bg-eco-700 transition-colors" onClick={e => e.preventDefault()}>
                                  Confirm Swap
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 transition-colors flex items-center justify-center" onClick={e => e.preventDefault()}>
                                  <Heart className="h-4 w-4 mr-1" />
                                  Wishlist
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Arrow */}
                          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                        </div>
                    </div>
                    
                    {/* Water Saving Badge */}
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                        💧 You saved {waterSavedList[idx] || 0}L of water!
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : null}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary px-8 py-3">
              Load More Items
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Men's Fashion Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">1,600</div>
                <div className="text-gray-600">Men's Items Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-eco-600 mb-2">26,780</div>
                <div className="text-gray-600">Points Earned by Men</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-600 mb-2">222</div>
                <div className="text-gray-600">Active Men Swappers</div>
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