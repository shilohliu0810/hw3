'use client'

import { useState, useEffect } from 'react'
import { Brain, Clock, BookOpen, Dumbbell, Coffee, Check, X } from 'lucide-react'

interface TimeBlock {
  id: string
  category: 'study-cs' | 'study-econ' | 'reading' | 'gym' | 'personal'
  title: string
  duration: number // in minutes
  startTime: string
  endTime: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

interface TimeBlockSuggestionsProps {
  events: any[]
  suggestions: TimeBlock[]
  onSuggestionsChange: (suggestions: TimeBlock[]) => void
}

const categoryConfig = {
  'study-cs': { icon: Brain, color: 'bg-blue-500', label: 'CS Study' },
  'study-econ': { icon: BookOpen, color: 'bg-green-500', label: 'Econ Study' },
  'reading': { icon: BookOpen, color: 'bg-purple-500', label: 'Reading' },
  'gym': { icon: Dumbbell, color: 'bg-red-500', label: 'Gym' },
  'personal': { icon: Coffee, color: 'bg-yellow-500', label: 'Personal Time' },
}

export default function TimeBlockSuggestions({ events, suggestions, onSuggestionsChange }: TimeBlockSuggestionsProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate AI suggestions based on free time
  const generateSuggestions = async () => {
    setIsGenerating(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newSuggestions: TimeBlock[] = [
      {
        id: '1',
        category: 'study-cs',
        title: 'Review CS 106 Algorithms',
        duration: 90,
        startTime: '09:00',
        endTime: '10:30',
        description: 'Focus on sorting algorithms and data structures',
        priority: 'high'
      },
      {
        id: '2',
        category: 'study-econ',
        title: 'Econ Problem Set',
        duration: 60,
        startTime: '11:00',
        endTime: '12:00',
        description: 'Complete microeconomics problem set 3',
        priority: 'medium'
      },
      {
        id: '3',
        category: 'gym',
        title: 'Morning Workout',
        duration: 45,
        startTime: '07:00',
        endTime: '07:45',
        description: 'Cardio and strength training',
        priority: 'medium'
      },
      {
        id: '4',
        category: 'reading',
        title: 'Read "Atomic Habits"',
        duration: 30,
        startTime: '20:00',
        endTime: '20:30',
        description: 'Chapter 5: The Best Way to Start a New Habit',
        priority: 'low'
      },
      {
        id: '5',
        category: 'personal',
        title: 'Personal Project Time',
        duration: 60,
        startTime: '15:00',
        endTime: '16:00',
        description: 'Work on side project or hobby',
        priority: 'low'
      }
    ]
    
    onSuggestionsChange(newSuggestions)
    setIsGenerating(false)
  }

  const acceptSuggestion = (suggestionId: string) => {
    // In a real app, this would add the suggestion to the calendar
    console.log('Accepted suggestion:', suggestionId)
    // Remove from suggestions
    onSuggestionsChange(suggestions.filter(s => s.id !== suggestionId))
  }

  const rejectSuggestion = (suggestionId: string) => {
    // Remove from suggestions
    onSuggestionsChange(suggestions.filter(s => s.id !== suggestionId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Brain className="h-6 w-6 mr-3 text-primary-600" />
              AI Time Block Suggestions
            </h2>
            <p className="text-gray-600 mt-1">
              Get personalized suggestions for your free time based on your goals
            </p>
          </div>
          <button
            onClick={generateSuggestions}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Brain className="h-5 w-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Suggestions'}
          </button>
        </div>
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const config = categoryConfig[suggestion.category]
            const Icon = config.icon
            
            return (
              <div key={suggestion.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${config.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {suggestion.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          suggestion.priority === 'high' 
                            ? 'bg-red-100 text-red-800'
                            : suggestion.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{suggestion.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {suggestion.startTime} - {suggestion.endTime}
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{suggestion.duration} min</span>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {config.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => acceptSuggestion(suggestion.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Accept suggestion"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => rejectSuggestion(suggestion.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject suggestion"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No suggestions yet
          </h3>
          <p className="text-gray-600 mb-6">
            Click "Generate Suggestions" to get AI-powered time block recommendations
          </p>
          <button
            onClick={generateSuggestions}
            disabled={isGenerating}
            className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mx-auto"
          >
            <Brain className="h-5 w-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Suggestions'}
          </button>
        </div>
      )}
    </div>
  )
}
