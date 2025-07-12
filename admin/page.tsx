'use client'

import React, { useState } from 'react'
import { CheckCircle, XCircle, Users, Package, FileText, Ban, UserCheck } from 'lucide-react'

type TabType = 'listings' | 'users' | 'orders'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('listings')
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      uploader: 'EcoFashionista',
      status: 'Pending',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Sustainable Cotton Dress',
      uploader: 'GreenStyle',
      status: 'Approved',
      date: '2024-01-14',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Pre-loved Sneakers',
      uploader: 'SneakerLover',
      status: 'Rejected',
      date: '2024-01-13',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Recycled Wool Sweater',
      uploader: 'WoolWorks',
      status: 'Pending',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Upcycled Jeans',
      uploader: 'DenimDreams',
      status: 'Approved',
      date: '2024-01-11',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop'
    }
  ])

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'EcoFashionista',
      email: 'eco@example.com',
      listings: 5,
      status: 'Active'
    },
    {
      id: 2,
      name: 'GreenStyle',
      email: 'green@example.com',
      listings: 3,
      status: 'Active'
    },
    {
      id: 3,
      name: 'SneakerLover',
      email: 'sneaker@example.com',
      listings: 2,
      status: 'Banned'
    },
    {
      id: 4,
      name: 'WoolWorks',
      email: 'wool@example.com',
      listings: 4,
      status: 'Active'
    },
    {
      id: 5,
      name: 'DenimDreams',
      email: 'denim@example.com',
      listings: 1,
      status: 'Active'
    }
  ]

  // Mock data for orders
  const orders = [
    {
      id: 1,
      itemName: 'Vintage Denim Jacket',
      swapperName: 'EcoFashionista',
      swapDate: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 2,
      itemName: 'Sustainable Cotton Dress',
      swapperName: 'GreenStyle',
      swapDate: '2024-01-14',
      status: 'Pending'
    },
    {
      id: 3,
      itemName: 'Pre-loved Sneakers',
      swapperName: 'SneakerLover',
      swapDate: '2024-01-13',
      status: 'Cancelled'
    },
    {
      id: 4,
      itemName: 'Recycled Wool Sweater',
      swapperName: 'WoolWorks',
      swapDate: '2024-01-12',
      status: 'Completed'
    },
    {
      id: 5,
      itemName: 'Upcycled Jeans',
      swapperName: 'DenimDreams',
      swapDate: '2024-01-11',
      status: 'Pending'
    }
  ]

  const handleApproveListing = (id: number) => {
    setListings(prevListings => 
      prevListings.map(listing => 
        listing.id === id 
          ? { ...listing, status: 'Approved' }
          : listing
      )
    )
    console.log('Approved listing:', id)
    // Add your approval logic here
  }

  const handleRejectListing = (id: number) => {
    setListings(prevListings => 
      prevListings.map(listing => 
        listing.id === id 
          ? { ...listing, status: 'Rejected' }
          : listing
      )
    )
    console.log('Rejected listing:', id)
    // Add your rejection logic here
  }

  const handleBanUser = (id: number) => {
    console.log('Banned user:', id)
    // Add your ban logic here
  }

  const handleUnbanUser = (id: number) => {
    console.log('Unbanned user:', id)
    // Add your unban logic here
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rejected':
      case 'Cancelled':
      case 'Banned':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin Panel</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'listings'
                  ? 'bg-eco-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Manage Listings</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-eco-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Manage Users</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-eco-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Manage Orders</span>
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Manage Listings */}
          {activeTab === 'listings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Listings</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploader
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={listing.image}
                                alt={listing.title}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{listing.uploader}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                            {listing.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {listing.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {listing.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleApproveListing(listing.id)}
                                  className="text-green-600 hover:text-green-900 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-green-50 transition-colors"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  onClick={() => handleRejectListing(listing.id)}
                                  className="text-red-600 hover:text-red-900 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                                >
                                  <XCircle className="h-4 w-4" />
                                  <span>Reject</span>
                                </button>
                              </>
                            )}
                            {listing.status === 'Approved' && (
                              <span className="text-green-600 text-sm">✓ Approved</span>
                            )}
                            {listing.status === 'Rejected' && (
                              <span className="text-red-600 text-sm">✗ Rejected</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Manage Users */}
          {activeTab === 'users' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Listings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.listings}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.status === 'Banned' ? (
                            <button
                              onClick={() => handleUnbanUser(user.id)}
                              className="text-green-600 hover:text-green-900 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-green-50 transition-colors"
                            >
                              <UserCheck className="h-4 w-4" />
                              <span>Unban</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBanUser(user.id)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Ban className="h-4 w-4" />
                              <span>Ban</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Manage Orders */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Swapper Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Swap Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.itemName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.swapperName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.swapDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 