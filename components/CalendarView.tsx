'use client'

import { useState, useEffect } from 'react'
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  color: string
}

interface CalendarViewProps {
  events: Event[]
  onEventsChange: (events: Event[]) => void
}

export default function CalendarView({ events, onEventsChange }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Sample events for demonstration
  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: '1',
        title: 'CS 106 Lecture',
        start: new Date(2024, 0, 15, 10, 0),
        end: new Date(2024, 0, 15, 11, 30),
        color: 'bg-blue-500'
      },
      {
        id: '2',
        title: 'Econ Study Group',
        start: new Date(2024, 0, 15, 14, 0),
        end: new Date(2024, 0, 15, 15, 30),
        color: 'bg-green-500'
      },
      {
        id: '3',
        title: 'Gym Session',
        start: new Date(2024, 0, 15, 18, 0),
        end: new Date(2024, 0, 15, 19, 0),
        color: 'bg-red-500'
      }
    ]
    onEventsChange(sampleEvents)
  }, [onEventsChange])

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const weekStart = startOfWeek(currentDate)
  const weekDaysArray = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date))
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7))
      return newDate
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      {/* Week View */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-4">
          {weekDaysArray.map(date => {
            const dayEvents = getEventsForDate(date)
            const isSelected = isSameDay(date, selectedDate)
            const isCurrentDay = isToday(date)

            return (
              <div
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`min-h-[120px] p-3 border rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-primary-50 border-primary-300'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isCurrentDay ? 'text-primary-600' : 'text-gray-900'
                }`}>
                  {format(date, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
