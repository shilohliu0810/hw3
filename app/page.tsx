'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Brain, Users, Plus, Play, Pause, Square } from 'lucide-react'
import CalendarView from '@/components/CalendarView'
import TimeBlockSuggestions from '@/components/TimeBlockSuggestions'
import ActivityTracker from '@/components/ActivityTracker'
import SocialFeed from '@/components/SocialFeed'
import GoogleCalendarAuth from '@/components/GoogleCalendarAuth'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('calendar')
  const [events, setEvents] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const tabs = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'suggestions', label: 'AI Suggestions', icon: Brain },
    { id: 'tracker', label: 'Activity Tracker', icon: Clock },
    { id: 'social', label: 'Social Feed', icon: Users },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Calendar</h1>
            </div>
            <GoogleCalendarAuth 
              onAuthSuccess={() => setIsAuthenticated(true)}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthenticated ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Connect Your Google Calendar
            </h2>
            <p className="text-gray-600 mb-8">
              Import your calendar to get AI-powered time blocking suggestions
            </p>
            <GoogleCalendarAuth 
              onAuthSuccess={() => setIsAuthenticated(true)}
              isAuthenticated={isAuthenticated}
            />
          </div>
        ) : (
          <>
            {activeTab === 'calendar' && (
              <CalendarView 
                events={events}
                onEventsChange={setEvents}
              />
            )}
            {activeTab === 'suggestions' && (
              <TimeBlockSuggestions 
                events={events}
                suggestions={suggestions}
                onSuggestionsChange={setSuggestions}
              />
            )}
            {activeTab === 'tracker' && (
              <ActivityTracker />
            )}
            {activeTab === 'social' && (
              <SocialFeed />
            )}
          </>
        )}
      </main>
    </div>
  )
}
