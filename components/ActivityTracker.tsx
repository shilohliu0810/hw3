'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Square, Clock, Trophy, Target, Plus } from 'lucide-react'

interface Activity {
  id: string
  name: string
  category: string
  duration: number // in seconds
  startTime?: Date
  isActive: boolean
}

interface ActivityTrackerProps {}

export default function ActivityTracker({}: ActivityTrackerProps) {
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', name: 'CS Study Session', category: 'study-cs', duration: 0, isActive: false },
    { id: '2', name: 'Gym Workout', category: 'gym', duration: 0, isActive: false },
    { id: '3', name: 'Reading Time', category: 'reading', duration: 0, isActive: false },
  ])
  const [currentTime, setCurrentTime] = useState(0)

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startActivity = (activityId: string) => {
    setActivities(prev => prev.map(activity => ({
      ...activity,
      isActive: activity.id === activityId,
      startTime: activity.id === activityId ? new Date() : activity.startTime
    })))
    setCurrentTime(0)
  }

  const pauseActivity = (activityId: string) => {
    setActivities(prev => prev.map(activity => {
      if (activity.id === activityId) {
        return {
          ...activity,
          isActive: false,
          duration: activity.duration + currentTime
        }
      }
      return activity
    }))
  }

  const stopActivity = (activityId: string) => {
    setActivities(prev => prev.map(activity => {
      if (activity.id === activityId) {
        return {
          ...activity,
          isActive: false,
          duration: activity.duration + currentTime
        }
      }
      return activity
    }))
    setCurrentTime(0)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'study-cs': 'bg-blue-500',
      'study-econ': 'bg-green-500',
      'gym': 'bg-red-500',
      'reading': 'bg-purple-500',
      'personal': 'bg-yellow-500'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500'
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      'study-cs': 'CS Study',
      'study-econ': 'Econ Study',
      'gym': 'Gym',
      'reading': 'Reading',
      'personal': 'Personal'
    }
    return labels[category as keyof typeof labels] || category
  }

  const activeActivity = activities.find(a => a.isActive)
  const totalTimeToday = activities.reduce((sum, activity) => sum + activity.duration, 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Time Today</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatTime(totalTimeToday)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Activities Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {activities.filter(a => a.duration > 0).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Current Session</p>
              <p className="text-2xl font-semibold text-gray-900">
                {activeActivity ? formatTime(currentTime) : '00:00:00'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Activity Display */}
      {activeActivity && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Currently tracking: {activeActivity.name}
              </h3>
              <p className="text-primary-100">
                {getCategoryLabel(activeActivity.category)} • Started at {activeActivity.startTime?.toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">
                {formatTime(currentTime)}
              </div>
              <div className="text-primary-100 text-sm">
                Session time
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Activity Tracker</h2>
            <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="h-5 w-5 mr-2" />
              Add Activity
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${getCategoryColor(activity.category)}`}>
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                    <p className="text-sm text-gray-600">
                      {getCategoryLabel(activity.category)} • Total: {formatTime(activity.duration)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {activity.isActive ? (
                    <>
                      <button
                        onClick={() => pauseActivity(activity.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Pause"
                      >
                        <Pause className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => stopActivity(activity.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Stop"
                      >
                        <Square className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startActivity(activity.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Start"
                    >
                      <Play className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
