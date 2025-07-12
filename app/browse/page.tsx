'use client'

import React from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react'

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-beige-50">
      {/* Announcement Bar */}
      <div className="bg-eco-600 text-white text-center py-2 px-4">
        <p className="text-sm font-medium">
          ♻️ Join the swap revolution. Earn points for every exchange!
        </p>
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-eco-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white flex items-center">
                ReWear ♻️
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-beige-200 transition-colors font-medium">
                Home
              </Link>
              <Link href="/browse" className="text-white hover:text-beige-200 transition-colors font-medium">
                Browse
              </Link>
              <Link href="/closet" className="text-white hover:text-beige-200 transition-colors font-medium">
                My Closet
              </Link>
              <Link href="/points" className="text-white hover:text-beige-200 transition-colors font-medium">
                Earn Points
              </Link>
              <Link href="/why-rewear" className="text-white hover:text-beige-200 transition-colors font-medium">
                Why ReWear?
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-beige-200 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <Link href="/wishlist" className="text-white hover:text-beige-200 transition-colors">
                <Heart className="h-5 w-5" />
              </Link>
              <button className="text-white hover:text-beige-200 transition-colors">
                <ShoppingBag className="h-5 w-5" />
              </button>
              <Link href="/signin" className="text-white hover:text-beige-200 transition-colors">
                <User className="h-5 w-5" />
              </Link>
              <button className="md:hidden text-white hover:text-beige-200 transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-beige-100 py-20 overflow-hidden">
        {/* Background Clothing Collage */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 transform rotate-12">
            <div className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop" 
                alt="Dress"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          </div>
          <div className="absolute top-20 right-20 transform -rotate-6">
            <div className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&h=200&fit=crop" 
                alt="Jacket"
                className="w-28 h-28 object-cover rounded"
              />
            </div>
          </div>
          <div className="absolute bottom-20 left-1/4 transform rotate-3">
            <div className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop" 
                alt="Shoes"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          </div>
          <div className="absolute bottom-10 right-1/3 transform -rotate-12">
            <div className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" 
                alt="Sweater"
                className="w-36 h-36 object-cover rounded"
              />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-6">
            <div className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop" 
                alt="Jeans"
                className="w-40 h-40 object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-eco-800 mb-6 leading-tight">
            Your Closet, Reimagined
          </h1>
          <p className="text-xl md:text-2xl text-eco-700 mb-8 max-w-2xl mx-auto">
            Swap clothes. Save the planet. Feel great.
          </p>
          <button className="bg-eco-600 hover:bg-eco-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Start Swapping
          </button>
        </div>
      </section>

      {/* Spinning Text */}
      <div className="bg-white py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-spin-slow">
            <span className="text-2xl font-bold text-eco-600 tracking-widest">
              REUSE • RELOVE • REWEAR •
            </span>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-eco-600 text-lg">
              Find your perfect sustainable style
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group cursor-pointer">
              <div className="bg-beige-100 rounded-lg p-6 text-center hover:bg-beige-200 transition-colors duration-300">
                <div className="text-4xl mb-4">👗</div>
                <h3 className="text-lg font-semibold text-eco-800">Women</h3>
                <p className="text-sm text-eco-600 mt-2">Fashion for her</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-beige-100 rounded-lg p-6 text-center hover:bg-beige-200 transition-colors duration-300">
                <div className="text-4xl mb-4">👔</div>
                <h3 className="text-lg font-semibold text-eco-800">Men</h3>
                <p className="text-sm text-eco-600 mt-2">Style for him</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-beige-100 rounded-lg p-6 text-center hover:bg-beige-200 transition-colors duration-300">
                <div className="text-4xl mb-4">📏</div>
                <h3 className="text-lg font-semibold text-eco-800">Shop by Size</h3>
                <p className="text-sm text-eco-600 mt-2">Perfect fit</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-beige-100 rounded-lg p-6 text-center hover:bg-beige-200 transition-colors duration-300">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-lg font-semibold text-eco-800">Home</h3>
                <p className="text-sm text-eco-600 mt-2">Back to start</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="bg-beige-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-eco-800 mb-2">
                Featured Swaps
              </h2>
              <p className="text-eco-600 text-lg">
                Trending items from our community
              </p>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-eco-700">Sort by:</span>
              <select className="border border-eco-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-500 hover:border-eco-400 transition-colors bg-white">
                <option value="relevance">Relevance</option>
                <option value="lowest-points">Lowest Points</option>
                <option value="most-swapped">Most Swapped</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop" 
                alt="Vintage Dress"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-eco-800 mb-2">Vintage Summer Dress</h3>
                <p className="text-eco-600 mb-4">Size M • Excellent condition</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-eco-600">150 pts</span>
                  <div className="relative group">
                    <button className="bg-eco-600 text-white px-4 py-2 rounded-full hover:bg-eco-700 transition-colors">
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
                            <span className="text-gray-900 font-medium">Excellent</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Size:</span>
                            <span className="text-gray-900 font-medium">M</span>
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
            
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=300&fit=crop" 
                alt="Denim Jacket"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-eco-800 mb-2">Classic Denim Jacket</h3>
                <p className="text-eco-600 mb-4">Size L • Good condition</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-eco-600">200 pts</span>
                  <div className="relative group">
                    <button className="bg-eco-600 text-white px-4 py-2 rounded-full hover:bg-eco-700 transition-colors">
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
                            <span className="text-eco-600 font-medium">3-4 days</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">EcoPoints earned:</span>
                            <span className="text-eco-600 font-medium">+15 pts</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Condition:</span>
                            <span className="text-gray-900 font-medium">Good</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Size:</span>
                            <span className="text-gray-900 font-medium">L</span>
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
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop" 
                alt="Sneakers"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-eco-800 mb-2">Retro Sneakers</h3>
                <p className="text-eco-600 mb-4">Size 9 • Excellent condition</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-eco-600">180 pts</span>
                  <div className="relative group">
                    <button className="bg-eco-600 text-white px-4 py-2 rounded-full hover:bg-eco-700 transition-colors">
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
                            <span className="text-eco-600 font-medium">1-2 days</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">EcoPoints earned:</span>
                            <span className="text-eco-600 font-medium">+12 pts</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Condition:</span>
                            <span className="text-gray-900 font-medium">Excellent</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Size:</span>
                            <span className="text-gray-900 font-medium">9</span>
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-eco-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ReWear ♻️</h3>
              <p className="text-beige-200">
                Sustainable fashion marketplace for conscious consumers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-beige-200">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/browse" className="hover:text-white transition-colors">Browse</Link></li>
                <li><Link href="/closet" className="hover:text-white transition-colors">My Closet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-beige-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-beige-200 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-beige-200 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-eco-700 mt-8 pt-8 text-center text-beige-200">
            <p>&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 