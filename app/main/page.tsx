'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Filter, Heart, ShoppingCart } from 'lucide-react'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { UserProfile } from '../components/UserProfile'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { GiClothes } from 'react-icons/gi'
import { useWishlist } from '../contexts/WishlistContext'
import Toast from '../components/Toast'
import { getAllProducts } from '../data/products'

export default function MainPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<any>(null)
  const [cartLoading, setCartLoading] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [addressForm, setAddressForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })
  const [addressSubmitting, setAddressSubmitting] = useState(false)
  const [hoveredSwap, setHoveredSwap] = useState<number | null>(null)
  const hideSwapTimeout = useRef<NodeJS.Timeout | null>(null)

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

  const handleConfirmSwap = async (product: any) => {
    // Add to cart
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clothesItemId: product.id })
      })
      if (res.ok) {
        setShowAddressModal(true)
      } else {
        showToast('Failed to add to cart', 'error')
      }
    } catch (e) {
      showToast('Error adding to cart', 'error')
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value })
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddressSubmitting(true)
    // Here you would send the address to your backend if needed
    setTimeout(() => {
      setAddressSubmitting(false)
      setShowAddressModal(false)
      setAddressForm({ name: '', address: '', city: '', state: '', zip: '' })
      showToast('Order placed! Delivery details saved.', 'success')
    }, 1000)
  }

  const fetchCart = async () => {
    setCartLoading(true)
    try {
      const res = await fetch('/api/cart')
      if (res.ok) {
        const data = await res.json()
        setCart(data)
      }
    } catch (e) {
      setCart(null)
    } finally {
      setCartLoading(false)
    }
  }

  useEffect(() => {
    if (isCartOpen) {
      fetchCart()
    }
  }, [isCartOpen])

  // Get all products from shared data
  const allProducts = getAllProducts()

  // Filter products based on search query
  const filteredProducts = allProducts.filter((product: any) => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.seller.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              {/* Logo - Extreme Left */}
              <div className="flex items-center mr-8">
                <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-600">
                  <GiClothes className="w-8 h-8" />
                  <span>Re-wear</span>
                </Link>
              </div>
              
              {/* Navigation Links */}
              <div className="flex items-center space-x-8 mr-8">
                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Home
                </Link>
                <Link href="/women" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Women
                </Link>
                <Link href="/men" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Men
              </Link>
            </div>
            
              {/* Search Bar - Center */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for sustainable fashion..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

              {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
                <Link href="/wishlist" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="h-6 w-6" />
                </Link>
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-6 w-6" />
              </button>
                <Link href="/profile" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Profile
                </Link>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <UserProfile />
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
            Discover Sustainable Fashion
          </h1>
          <p className="text-gray-600">
            Browse our collection of pre-loved clothing and accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
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
                                                  <div className="space-y-3">
                  {/* Points and Swap Button Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-eco-600">
                        {product.points} pts
                    </span>
                    </div>
                    <div 
                      className="relative group"
                      onMouseEnter={() => {
                        if (hideSwapTimeout.current) clearTimeout(hideSwapTimeout.current)
                        setHoveredSwap(product.id)
                      }}
                      onMouseLeave={() => {
                        hideSwapTimeout.current = setTimeout(() => setHoveredSwap(id => (id === product.id ? null : id)), 500)
                      }}
                    >
                      <button className="bg-eco-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-eco-700 transition-colors">
                        Swap Now
                      </button>
                      
                      {/* Tooltip/Overlay */}
                      <div className={`absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-opacity duration-200 ${hoveredSwap === product.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 text-sm">Swap Details</h4>
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
                            <button className="w-full bg-eco-600 text-white py-2 px-3 rounded text-sm hover:bg-eco-700 transition-colors" onClick={() => handleConfirmSwap(product)}>
                              Confirm Swap
                            </button>
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Water Saving Badge */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
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

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsCartOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : !cart || !cart.items || cart.items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Your cart is empty.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item: any) => (
                  <li key={item.id} className="py-4 flex items-center space-x-4">
                    <img src={item.clothesItem.imageUrl} alt={item.clothesItem.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{item.clothesItem.title}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Delivery Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form onSubmit={handleAddressSubmit} className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowAddressModal(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input name="name" value={addressForm.name} onChange={handleAddressChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input name="address" value={addressForm.address} onChange={handleAddressChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">City</label>
              <input name="city" value={addressForm.city} onChange={handleAddressChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">State</label>
              <input name="state" value={addressForm.state} onChange={handleAddressChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input name="zip" value={addressForm.zip} onChange={handleAddressChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <button type="submit" className="w-full bg-eco-600 text-white py-2 px-3 rounded text-sm hover:bg-eco-700 transition-colors" disabled={addressSubmitting}>
              {addressSubmitting ? 'Saving...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
    </ProtectedRoute>
  )
} 