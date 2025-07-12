'use client'

import { useWishlist } from '../contexts/WishlistContext'
import Toast from '../components/Toast'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAllProducts } from '../data/products'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export default function ItemDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [item, setItem] = useState<any>(null)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [addressForm, setAddressForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })
  const [addressSubmitting, setAddressSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  })
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const searchParams = useSearchParams()

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true })
  }

  useEffect(() => {
    const itemId = searchParams.get('id')
    if (itemId) {
      const allProducts = getAllProducts()
      const foundItem = allProducts.find(product => product.id.toString() === itemId)
      if (foundItem) {
        setItem({
          id: foundItem.id,
          title: foundItem.name,
          category: foundItem.category,
          size: foundItem.size,
          condition: foundItem.condition,
          points: foundItem.points,
          originalPoints: foundItem.originalPoints,
          description: foundItem.description,
          images: [
            foundItem.image,
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&h=600&fit=crop'
          ],
          uploader: {
            name: foundItem.seller,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            location: 'San Francisco, CA'
          }
        })
      } else {
        setItem(getMockItem())
      }
    } else {
      setItem(getMockItem())
    }
  }, [searchParams])

  const getMockItem = () => ({
    id: '1',
    title: 'Vintage Denim Jacket',
    category: 'Jackets',
    size: 'M',
    condition: 'Good',
    points: 150,
    originalPoints: 300,
    description: 'Classic vintage denim jacket in excellent condition. This timeless piece features a comfortable fit and authentic vintage styling. Perfect for layering or as a statement piece. Made from high-quality denim with minimal wear.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&h=600&fit=crop'
    ],
    uploader: {
      name: 'EcoFashionista',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      location: 'San Francisco, CA'
    }
  })

  const handleWishlistToggle = () => {
    if (!item) return;
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
      showToast('Removed from Wishlist!', 'success')
    } else {
      addToWishlist(item)
      showToast('Added to Wishlist!', 'success')
    }
  }

  const handleConfirmSwap = async () => {
    if (!item) return;
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clothesItemId: item.id })
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
    setTimeout(() => {
      setAddressSubmitting(false)
      setShowAddressModal(false)
      setAddressForm({ name: '', address: '', city: '', state: '', zip: '' })
      showToast('Order placed! Delivery details saved.', 'success')
    }, 1000)
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-16">
      {/* Header */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">Re-wear</h1>
          <div className="flex items-center gap-6">
            <span className="text-gray-700 font-medium">Item Details</span>
          </div>
        </div>
      </div>

      {/* Main Card Layout */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Image Gallery */}
        <div className="md:w-1/2 p-8 flex flex-col items-center justify-center bg-gray-50">
          <div className="w-full aspect-square mb-4 flex items-center justify-center">
            <img
              src={item.images[selectedImage]}
              alt={item.title}
              className="rounded-xl object-contain w-full h-full max-h-[400px] bg-white shadow"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {item.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`border-2 rounded-lg p-1 transition-all ${selectedImage === idx ? 'border-primary-600' : 'border-gray-200'}`}
              >
                <img src={img} alt="thumb" className="w-16 h-16 object-cover rounded-md" />
              </button>
            ))}
          </div>
        </div>

        {/* Details & Actions */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{item.title}</h2>
              <button
                onClick={handleWishlistToggle}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                aria-label="Toggle Wishlist"
              >
                {isInWishlist(item.id) ? (
                  <AiFillHeart className="h-6 w-6 text-red-500" />
                ) : (
                  <AiOutlineHeart className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-eco-600 text-white px-3 py-1 rounded-full text-sm font-medium">{item.category}</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Size: {item.size}</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Condition: {item.condition}</span>
            </div>
            <p className="text-lg text-gray-700 mb-6">{item.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-eco-600">{item.points} pts</span>
              {item.originalPoints && (
                <span className="text-base text-gray-400 line-through">{item.originalPoints} pts</span>
              )}
            </div>
          </div>

          {/* Uploader & Actions */}
          <div className="flex items-center gap-4 mt-8">
            <img
              src={item.uploader.image}
              alt={item.uploader.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary-600"
            />
            <div>
              <div className="font-semibold text-gray-800">{item.uploader.name}</div>
              <div className="text-sm text-gray-500">{item.uploader.location}</div>
            </div>
            <div className="flex-1" />
            <button
              className="bg-eco-600 hover:bg-eco-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors"
              onClick={handleConfirmSwap}
            >
              Swap Now
            </button>
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
  )
}
