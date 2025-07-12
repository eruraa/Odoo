'use client'

import React from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Heart, Coins, TrendingUp, Search, ShoppingCart, User } from 'lucide-react'

export default function ClosetPage() {
  // Mock data for user's closet
  const myItems = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      points: 150,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
      condition: "Good",
      size: "M",
      status: "active",
      views: 24,
      likes: 8,
      listedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Sustainable Cotton Dress",
      points: 120,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      condition: "Excellent",
      size: "S",
      status: "active",
      views: 18,
      likes: 12,
      listedDate: "2024-01-10"
    },
    {
      id: 3,
      name: "Retro Sneakers",
      points: 100,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      condition: "Good",
      size: "8",
      status: "swapped",
      views: 32,
      likes: 15,
      listedDate: "2024-01-05"
    }
  ]

  const recentSwaps = [
    {
      id: 1,
      itemName: "Retro Sneakers",
      swappedWith: "Sarah M.",
      pointsEarned: 100,
      date: "2024-01-20",
      status: "completed"
    },
    {
      id: 2,
      itemName: "Vintage Silk Blouse",
      swappedWith: "Mike R.",
      pointsEarned: 120,
      date: "2024-01-18",
      status: "completed"
    }
  ]

  return (
    <div className="min-h-screen bg-beige-50">
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

      {/* Header */}
      <div className="bg-eco-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Closet</h1>
              <p className="text-beige-200">Manage your sustainable fashion items</p>
            </div>
            <Link href="/add-item" className="bg-eco-600 hover:bg-eco-700 text-white px-6 py-3 rounded-full flex items-center transition-colors">
              <Plus className="h-5 w-5 mr-2" />
              Add Item
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="bg-eco-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Coins className="h-6 w-6 text-eco-600" />
              </div>
              <div className="text-2xl font-bold text-eco-800">1,250</div>
              <div className="text-sm text-gray-600">Points Balance</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-eco-800">3</div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="bg-secondary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="text-2xl font-bold text-eco-800">35</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="bg-beige-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="h-6 w-6 text-beige-600" />
              </div>
              <div className="text-2xl font-bold text-eco-800">74</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
          </div>
        </div>
      </section>

      {/* My Items */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-eco-800">My Items</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm border border-eco-300 rounded-lg text-eco-700 hover:bg-eco-50 transition-colors">
                All Items
              </button>
              <button className="px-4 py-2 text-sm bg-eco-600 text-white rounded-lg">
                Active
              </button>
              <button className="px-4 py-2 text-sm border border-eco-300 rounded-lg text-eco-700 hover:bg-eco-50 transition-colors">
                Swapped
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {item.status === 'active' ? (
                      <span className="bg-eco-500 text-white px-2 py-1 rounded-full text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">
                        Swapped
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-eco-800 mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-eco-600 font-bold">{item.points} pts</span>
                    <span className="text-sm text-gray-600">Size {item.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Condition: {item.condition}</span>
                    <span>Listed: {new Date(item.listedDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {item.likes}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-eco-600 text-white py-2 px-3 rounded text-sm hover:bg-eco-700 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 transition-colors">
                      View
                    </button>
                    <button className="bg-red-100 text-red-600 py-2 px-3 rounded text-sm hover:bg-red-200 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Swaps */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-eco-800 mb-6">Recent Swaps</h2>
          
          <div className="space-y-4">
            {recentSwaps.map((swap) => (
              <div key={swap.id} className="bg-beige-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-eco-800">
                      Swapped "{swap.itemName}" with {swap.swappedWith}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(swap.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-eco-600 font-bold">+{swap.pointsEarned} pts</div>
                  <div className="text-sm text-gray-600 capitalize">{swap.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points History */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-eco-800 mb-6">Points History</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-beige-50 rounded-lg">
                <div>
                  <p className="font-medium text-eco-800">Listed "Vintage Denim Jacket"</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <div className="text-eco-600 font-bold">+50 pts</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-beige-50 rounded-lg">
                <div>
                  <p className="font-medium text-eco-800">Successful swap with Sarah</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
                <div className="text-eco-600 font-bold">+100 pts</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-beige-50 rounded-lg">
                <div>
                  <p className="font-medium text-eco-800">Received 5-star rating</p>
                  <p className="text-sm text-gray-600">3 days ago</p>
                </div>
                <div className="text-eco-600 font-bold">+25 pts</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-beige-50 rounded-lg">
                <div>
                  <p className="font-medium text-eco-800">Weekly activity bonus</p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
                <div className="text-eco-600 font-bold">+75 pts</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/points" className="text-eco-600 hover:text-eco-700 font-medium">
                View Full Points History →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-8 bg-eco-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-eco-800 mb-6 text-center">Tips for Better Swaps</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-lg font-semibold text-eco-800 mb-2">Great Photos</h3>
              <p className="text-gray-600 text-sm">
                Take clear, well-lit photos from multiple angles to showcase your items better.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-eco-800 mb-2">Detailed Descriptions</h3>
              <p className="text-gray-600 text-sm">
                Include size, material, condition, and any unique features in your descriptions.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-eco-800 mb-2">Quick Responses</h3>
              <p className="text-gray-600 text-sm">
                Respond promptly to swap requests to keep the community active and engaged.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 