'use client'

import { useAuth } from '../hooks/useAuth'
import { User, LogOut } from 'lucide-react'

export function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || 'User'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600" />
          </div>
        )}
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-700">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        title="Sign out"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  )
} 