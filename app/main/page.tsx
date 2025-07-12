import React from 'react'
import Link from 'next/link'
import { Search, Filter, Heart, ShoppingCart, User, LogOut } from 'lucide-react'

export default function MainPage() {
  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      price: 45,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
      category: "Jackets",
      condition: "Good",
      seller: "EcoFashionista"
    },
    {
      id: 2,
      name: "Sustainable Cotton Dress",
      price: 35,
      originalPrice: 89,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      category: "Dresses",
      condition: "Excellent",
      seller: "GreenStyle"
    },
    {
      id: 3,
      name: "Pre-loved Sneakers",
      price: 28,
      originalPrice: 75,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      category: "Shoes",
      condition: "Good",
      seller: "SneakerLover"
    },
    {
      id: 4,
      name: "Recycled Wool Sweater",
      price: 42,
      originalPrice: 110,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "Sweaters",
      condition: "Excellent",
      seller: "WoolWorks"
    },
    {
      id: 5,
      name: "Upcycled Jeans",
      price: 38,
      originalPrice: 95,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      category: "Pants",
      condition: "Good",
      seller: "DenimDreams"
    },
    {
      id: 6,
      name: "Vintage Silk Blouse",
      price: 55,
      originalPrice: 140,
      image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=400&fit=crop",
      category: "Tops",
      condition: "Excellent",
      seller: "SilkCollector"
    }
  ]

  const categories = ["All", "Dresses", "Tops", "Pants", "Jackets", "Sweaters", "Shoes", "Accessories"]
  const conditions = ["All", "Excellent", "Good", "Fair"]

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
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
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
        {/* Filters */}
        <div className="mb-8">
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
                <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
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
                    <span className="text-lg font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <button className="btn-primary text-sm px-3 py-1">
                    Add to Cart
                  </button>
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
                <div className="text-3xl font-bold text-eco-600 mb-2">1,234</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-600 mb-2">456</div>
                <div className="text-gray-600">Active Sellers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 