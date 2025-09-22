'use client'

import { useState } from 'react'
import { Calendar, Loader2 } from 'lucide-react'

interface GoogleCalendarAuthProps {
  onAuthSuccess: () => void
  isAuthenticated: boolean
}

export default function GoogleCalendarAuth({ onAuthSuccess, isAuthenticated }: GoogleCalendarAuthProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would integrate with Google OAuth
      // For the prototype, we'll simulate the auth process
      await new Promise(resolve => setTimeout(resolve, 1500))
      onAuthSuccess()
    } catch (error) {
      console.error('Auth failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-green-600" />
        <span className="text-sm text-green-600 font-medium">Connected</span>
      </div>
    )
  }

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
      ) : (
        <Calendar className="h-5 w-5 mr-2" />
      )}
      {isLoading ? 'Connecting...' : 'Connect Google Calendar'}
    </button>
  )
}
