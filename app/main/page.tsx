'use client'

import React from 'react'
import Link from 'next/link'
import { Search, Filter, Heart, ShoppingCart } from 'lucide-react'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { UserProfile } from '../components/UserProfile'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useWishlist } from '../contexts/WishlistContext'
import Toast from '../components/Toast'
import { useState } from 'react'

export default function MainPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  })

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

  // Mock data for products with points system
  const products = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      points: 150,
      originalPoints: 300,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
      category: "Jackets",
      condition: "Good",
      seller: "EcoFashionista",
      size: "M",
      description: "Classic vintage denim jacket in excellent condition"
    },
    {
      id: 2,
      name: "Sustainable Cotton Dress",
      points: 120,
      originalPoints: 250,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      category: "Dresses",
      condition: "Excellent",
      seller: "GreenStyle",
      size: "S",
      description: "Eco-friendly cotton dress perfect for summer"
    },
    {
      id: 3,
      name: "Pre-loved Sneakers",
      points: 100,
      originalPoints: 200,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      category: "Shoes",
      condition: "Good",
      seller: "SneakerLover",
      size: "8",
      description: "Comfortable sneakers with minimal wear"
    },
    {
      id: 4,
      name: "Recycled Wool Sweater",
      points: 180,
      originalPoints: 350,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "Sweaters",
      condition: "Excellent",
      seller: "WoolWorks",
      size: "L",
      description: "Warm wool sweater made from recycled materials"
    },
    {
      id: 5,
      name: "Upcycled Jeans",
      points: 140,
      originalPoints: 280,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      category: "Pants",
      condition: "Good",
      seller: "DenimDreams",
      size: "30x32",
      description: "Upcycled denim jeans with unique styling"
    },
    {
      id: 6,
      name: "Vintage Silk Blouse",
      points: 200,
      originalPoints: 400,
      image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=400&fit=crop",
      category: "Tops",
      condition: "Excellent",
      seller: "SilkCollector",
      size: "M",
      description: "Elegant vintage silk blouse in pristine condition"
    }
  ]

  const categories = ["All", "Dresses", "Tops", "Pants", "Jackets", "Sweaters", "Shoes", "Accessories"]
  const conditions = ["All", "Excellent", "Good", "Fair"]

  return (
    <ProtectedRoute>
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
              <Link href="/wishlist" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="h-6 w-6" />
              </Link>
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <UserProfile />
                </button>
              </div>
            </div>
          </div>
        </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      category === "All" 
                        ? "bg-primary-600 text-white" 
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <span className="text-sm font-medium text-gray-700">Condition:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-gray-400 transition-colors bg-white">
                <option value="relevance">Relevance</option>
                <option value="lowest-points">Lowest Points</option>
                <option value="most-swapped">Most Swapped</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button 
                  onClick={() => handleWishlistToggle(product)}
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
                    <button className="btn-eco text-sm px-3 py-1">
                      Swap Now
                    </button>
                      
                      {/* Tooltip/Overlay */}
                      <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 text-sm">Swap Details</h4>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
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
                              <button className="flex-1 bg-eco-600 text-white py-2 px-3 rounded text-sm hover:bg-eco-700 transition-colors">
                                Confirm Swap
                              </button>
                              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 transition-colors flex items-center justify-center">
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
                      💧 You saved {Math.floor(Math.random() * 500) + 200}L of water!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary px-8 py-3">
            Load More Items
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Making a Difference Together
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">2,847</div>
                <div className="text-gray-600">Items Saved from Landfill</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-eco-600 mb-2">45,230</div>
                <div className="text-gray-600">Points Earned by Community</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-600 mb-2">456</div>
                <div className="text-gray-600">Active Swappers</div>
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
  </ProtectedRoute>
  )
} 