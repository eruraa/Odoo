'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Gift, TrendingUp, Users, Award, Coins, Search, Heart, ShoppingCart, User } from 'lucide-react'

export default function PointsPage() {
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
      <div className="bg-eco-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Earn Points, Save the Planet
          </h1>
          <p className="text-xl text-beige-200 max-w-3xl mx-auto">
            Join our sustainable fashion community and earn points for every swap. 
            The more you participate, the more you earn!
          </p>
        </div>
      </div>

      {/* Points Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="bg-eco-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-eco-600" />
              </div>
              <h3 className="text-2xl font-bold text-eco-800 mb-2">Current Balance</h3>
              <div className="text-4xl font-bold text-eco-600 mb-2">1,250 pts</div>
              <p className="text-gray-600">Available for swapping</p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-eco-800 mb-2">Total Earned</h3>
              <div className="text-4xl font-bold text-primary-600 mb-2">3,420 pts</div>
              <p className="text-gray-600">Lifetime points earned</p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-eco-800 mb-2">Level</h3>
              <div className="text-4xl font-bold text-secondary-600 mb-2">Gold</div>
              <p className="text-gray-600">Eco Warrior</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Earn Points */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-800 mb-4">
              How to Earn Points
            </h2>
            <p className="text-eco-600 text-lg">
              Multiple ways to build your points balance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-beige-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Gift className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-eco-800">List an Item</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Upload quality photos and detailed descriptions of your items.
              </p>
              <div className="text-2xl font-bold text-eco-600">+50 pts</div>
              <p className="text-sm text-gray-500">per item listed</p>
            </div>

            <div className="bg-beige-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-eco-800">Successful Swap</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Complete a swap and both parties earn points.
              </p>
              <div className="text-2xl font-bold text-eco-600">+100 pts</div>
              <p className="text-sm text-gray-500">per successful swap</p>
            </div>

            <div className="bg-beige-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-eco-800">Quality Rating</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Receive 5-star ratings from other community members.
              </p>
              <div className="text-2xl font-bold text-eco-600">+25 pts</div>
              <p className="text-sm text-gray-500">per 5-star rating</p>
            </div>

            <div className="bg-beige-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-eco-800">Weekly Activity</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Stay active with regular swaps and interactions.
              </p>
              <div className="text-2xl font-bold text-eco-600">+75 pts</div>
              <p className="text-sm text-gray-500">weekly bonus</p>
            </div>

            <div className="bg-beige-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-eco-800">Refer Friends</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Invite friends to join the sustainable fashion movement.
              </p>
              <div className="text-2xl font-bold text-eco-600">+200 pts</div>
              <p className="text-sm text-gray-500">per successful referral</p>
            </div>

            <div className="bg-beige-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Coins className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-eco-800">Eco Challenges</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Complete monthly sustainability challenges.
              </p>
              <div className="text-2xl font-bold text-eco-600">+150 pts</div>
              <p className="text-sm text-gray-500">per challenge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Points Levels */}
      <section className="bg-eco-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-800 mb-4">
              Points Levels & Benefits
            </h2>
            <p className="text-eco-600 text-lg">
              Unlock exclusive benefits as you earn more points
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold text-eco-800 mb-2">Seed</h3>
              <p className="text-sm text-gray-600 mb-4">0-500 pts</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Basic swapping</li>
                <li>• Community access</li>
                <li>• Standard support</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md border-2 border-eco-300">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-lg font-semibold text-eco-800 mb-2">Sprout</h3>
              <p className="text-sm text-gray-600 mb-4">501-1,500 pts</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Priority listings</li>
                <li>• Extended descriptions</li>
                <li>• Faster support</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md border-2 border-eco-500">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-lg font-semibold text-eco-800 mb-2">Grove</h3>
              <p className="text-sm text-gray-600 mb-4">1,501-3,000 pts</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Featured listings</li>
                <li>• Advanced filters</li>
                <li>• VIP support</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md border-2 border-eco-700">
              <div className="text-4xl mb-4">🌲</div>
              <h3 className="text-lg font-semibold text-eco-800 mb-2">Forest</h3>
              <p className="text-sm text-gray-600 mb-4">3,001+ pts</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Premium features</li>
                <li>• Exclusive events</li>
                <li>• Dedicated support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-800 mb-4">
              Recent Activity
            </h2>
            <p className="text-eco-600 text-lg">
              Track your points history
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-beige-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-eco-800">Listed "Vintage Denim Jacket"</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="text-eco-600 font-bold">+50 pts</div>
            </div>

            <div className="bg-beige-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-eco-800">Successful swap with Sarah</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
              </div>
              <div className="text-eco-600 font-bold">+100 pts</div>
            </div>

            <div className="bg-beige-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-eco-800">Received 5-star rating</p>
                  <p className="text-sm text-gray-600">3 days ago</p>
                </div>
              </div>
              <div className="text-eco-600 font-bold">+25 pts</div>
            </div>

            <div className="bg-beige-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-eco-600 text-white p-2 rounded-full mr-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-eco-800">Weekly activity bonus</p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
              </div>
              <div className="text-eco-600 font-bold">+75 pts</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-eco-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Earning Points?
          </h2>
          <p className="text-xl text-eco-100 mb-8">
            Join thousands of eco-conscious fashion lovers and start building your points balance today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/main" className="bg-white text-eco-600 hover:bg-beige-100 font-bold py-3 px-8 rounded-full transition-colors duration-200">
              Start Swapping
            </Link>
            <Link href="/browse" className="border border-white text-white hover:bg-white hover:text-eco-600 font-bold py-3 px-8 rounded-full transition-colors duration-200">
              Browse Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 