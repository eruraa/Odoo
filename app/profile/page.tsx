'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { Plus, Edit, Trash2, Eye, Package, History, User } from 'lucide-react'

interface ClothesItem {
  id: string
  title: string
  description?: string
  category: string
  size?: string
  condition: string
  brand?: string
  color?: string
  imageUrl?: string
  price?: number
  isAvailable: boolean
  createdAt: string
}

interface Swap {
  id: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED'
  offeredItem: ClothesItem
  requestedItem?: ClothesItem
  createdAt: string
}

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<'clothes' | 'swaps'>('clothes')
  const [clothes, setClothes] = useState<ClothesItem[]>([])
  const [swaps, setSwaps] = useState<Swap[]>([])
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ClothesItem | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    brand: '',
    color: '',
    imageUrl: '',
    price: ''
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData()
    }
  }, [isAuthenticated])

  const fetchUserData = async () => {
    try {
      const [clothesRes, swapsRes, pointsRes] = await Promise.all([
        fetch('/api/profile/clothes'),
        fetch('/api/profile/swaps'),
        fetch('/api/profile/points')
      ])
      
      if (clothesRes.ok) {
        const clothesData = await clothesRes.json()
        setClothes(clothesData)
      }
      
      if (swapsRes.ok) {
        const swapsData = await swapsRes.json()
        setSwaps(swapsData)
      }

      if (pointsRes.ok) {
        const pointsData = await pointsRes.json()
        setPoints(pointsData.points)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = editingItem 
      ? `/api/profile/clothes/${editingItem.id}`
      : '/api/profile/clothes'
    
    const method = editingItem ? 'PUT' : 'POST'
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('size', formData.size)
      formDataToSend.append('condition', formData.condition)
      formDataToSend.append('brand', formData.brand)
      formDataToSend.append('color', formData.color)
      formDataToSend.append('price', formData.price || '')
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage)
      } else if (formData.imageUrl) {
        formDataToSend.append('imageUrl', formData.imageUrl)
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (response.ok) {
        setShowAddForm(false)
        setEditingItem(null)
        resetForm()
        setSelectedImage(null)
        setImagePreview(null)
        fetchUserData()
      }
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      const response = await fetch(`/api/profile/clothes/${itemId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchUserData()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleEdit = (item: ClothesItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      size: item.size || '',
      condition: item.condition,
      brand: item.brand || '',
      color: item.color || '',
      imageUrl: item.imageUrl || '',
      price: item.price?.toString() || ''
    })
    setSelectedImage(null)
    setImagePreview(null)
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      size: '',
      condition: '',
      brand: '',
      color: '',
      imageUrl: '',
      price: ''
    })
    setSelectedImage(null)
    setImagePreview(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'ACCEPTED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      case 'CANCELLED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isAuthenticated) {
    return (
      <ProtectedRoute>
        <div>Loading...</div>
      </ProtectedRoute>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            {/* Points Display */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-4 text-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">Points Balance</p>
                  <p className="text-2xl font-bold">{points.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('clothes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'clothes'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Package className="inline w-4 h-4 mr-2" />
                My Clothes ({clothes.length})
              </button>
              <button
                onClick={() => setActiveTab('swaps')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'swaps'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <History className="inline w-4 h-4 mr-2" />
                Swap History ({swaps.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'clothes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Clothes</h2>
                  <button
                    onClick={() => {
                      setShowAddForm(true)
                      setEditingItem(null)
                      resetForm()
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>

                {showAddForm && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingItem ? 'Edit Item' : 'Add New Item'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                          </label>
                          <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="">Select category</option>
                            <option value="tops">Tops</option>
                            <option value="bottoms">Bottoms</option>
                            <option value="dresses">Dresses</option>
                            <option value="outerwear">Outerwear</option>
                            <option value="shoes">Shoes</option>
                            <option value="accessories">Accessories</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Size
                          </label>
                          <input
                            type="text"
                            value={formData.size}
                            onChange={(e) => setFormData({...formData, size: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Condition *
                          </label>
                          <select
                            required
                            value={formData.condition}
                            onChange={(e) => setFormData({...formData, condition: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="">Select condition</option>
                            <option value="new">New</option>
                            <option value="like-new">Like New</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brand
                          </label>
                          <input
                            type="text"
                            value={formData.brand}
                            onChange={(e) => setFormData({...formData, brand: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Color
                          </label>
                          <input
                            type="text"
                            value={formData.color}
                            onChange={(e) => setFormData({...formData, color: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image
                          </label>
                          <div className="space-y-3">
                            {/* Image Upload */}
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                                <div className="text-center">
                                  {imagePreview ? (
                                    <img
                                      src={imagePreview}
                                      alt="Preview"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <div>
                                      <div className="text-gray-400 mb-2">
                                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                      </div>
                                      <p className="text-xs text-gray-500">Upload Image</p>
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        setSelectedImage(file)
                                        setImagePreview(URL.createObjectURL(file))
                                        setFormData({...formData, imageUrl: ''})
                                      }
                                    }}
                                  />
                                </div>
                              </label>
                              
                              {/* Or URL Input */}
                              <div className="flex-1">
                                <p className="text-xs text-gray-500 mb-2">Or enter image URL:</p>
                                <input
                                  type="url"
                                  value={formData.imageUrl}
                                  onChange={(e) => {
                                    setFormData({...formData, imageUrl: e.target.value})
                                    setSelectedImage(null)
                                    setImagePreview(null)
                                  }}
                                  placeholder="https://example.com/image.jpg"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                />
                              </div>
                            </div>
                            
                            {/* Remove Image Button */}
                            {(selectedImage || imagePreview) && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedImage(null)
                                  setImagePreview(null)
                                }}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                Remove Image
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                        >
                          {editingItem ? 'Update Item' : 'Add Item'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddForm(false)
                            setEditingItem(null)
                            resetForm()
                          }}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  </div>
                ) : clothes.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No clothes added yet</h3>
                    <p className="text-gray-600">Start by adding your first item to swap!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clothes.map((item) => (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                        {item.imageUrl && (
                          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEdit(item)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {item.category}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {item.condition}
                            </span>
                            {item.size && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {item.size}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{item.brand || 'No brand'}</span>
                            {item.price && <span>${item.price}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'swaps' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Swap History</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  </div>
                ) : swaps.length === 0 ? (
                  <div className="text-center py-8">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No swaps yet</h3>
                    <p className="text-gray-600">Start swapping clothes to see your history here!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {swaps.map((swap) => (
                      <div key={swap.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">Swap Offer</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(swap.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                            {swap.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">You Offered:</h4>
                            <div className="flex items-center space-x-3">
                              {swap.offeredItem.imageUrl && (
                                <img
                                  src={swap.offeredItem.imageUrl}
                                  alt={swap.offeredItem.title}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{swap.offeredItem.title}</p>
                                <p className="text-sm text-gray-600">{swap.offeredItem.category}</p>
                              </div>
                            </div>
                          </div>
                          {swap.requestedItem && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">You Requested:</h4>
                              <div className="flex items-center space-x-3">
                                {swap.requestedItem.imageUrl && (
                                  <img
                                    src={swap.requestedItem.imageUrl}
                                    alt={swap.requestedItem.title}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{swap.requestedItem.title}</p>
                                  <p className="text-sm text-gray-600">{swap.requestedItem.category}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 