"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';

const features = [
  {
    icon: "♻️",
    title: "Eco-Friendly",
    desc: "Every swap saves resources and reduces fashion waste. Join the movement for a greener planet!",
  },
  {
    icon: "💸",
    title: "Save & Earn",
    desc: "Swap instead of shop! Earn points for every exchange and save money while refreshing your closet.",
  },
  {
    icon: "🛍️",
    title: "Curated Styles",
    desc: "Discover unique, quality-checked pieces from the community. Find your next favorite look!",
  },
  {
    icon: "👥",
    title: "Community First",
    desc: "Connect with like-minded swappers. Share, support, and grow a sustainable fashion community.",
  },
];

const faqs = [
  {
    question: "How do I earn points?",
    answer:
      "You earn points every time you list an item or complete a swap. The more you engage, the more you earn!",
  },
  {
    question: "Can I return a swapped item?",
    answer:
      "Currently, swaps are final. However, you can relist the item back on ReWear to earn points again!",
  },
  {
    question: "Is the clothing quality checked?",
    answer:
      "Yes, our team manually reviews all listings to ensure quality, cleanliness, and accuracy.",
  },
  {
    question: "How does ReWear ensure safety in swaps?",
    answer:
      "We verify users and encourage public meetup points or prepaid delivery to ensure safety and trust.",
  },
];

export default function WhyRewearPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-eco-800 mb-4">Why ReWear?</h1>
        <p className="text-lg text-eco-700 max-w-2xl mx-auto">
          Discover the benefits of joining our eco-friendly, community-driven clothing swap platform.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="bg-white border border-eco-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-eco-300 cursor-pointer group"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 className="text-xl font-bold text-eco-800 mb-2">{feature.title}</h3>
            <p className="text-eco-700 text-base">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-eco-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="divide-y divide-eco-100">
          {faqs.map((faq, idx) => (
            <div key={faq.question}>
              <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none focus:ring-2 focus:ring-eco-500"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="text-lg font-medium text-eco-800">{faq.question}</span>
                <span className={`ml-4 text-eco-600 transition-transform duration-200 ${openIndex === idx ? 'rotate-90' : ''}`}>▶</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                aria-hidden={openIndex !== idx}
              >
                <p className="text-eco-700 text-base pb-4 pl-1 pr-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
              </div>
      </div>
    </div>
  );
} 