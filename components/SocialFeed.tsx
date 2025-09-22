'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share, Trophy, Clock, User, Plus } from 'lucide-react'

interface ActivityPost {
  id: string
  user: {
    name: string
    avatar: string
  }
  activity: {
    name: string
    category: string
    duration: number
    description?: string
  }
  timestamp: Date
  likes: number
  comments: number
  isLiked: boolean
}

interface SocialFeedProps {}

export default function SocialFeed({}: SocialFeedProps) {
  const [posts, setPosts] = useState<ActivityPost[]>([
    {
      id: '1',
      user: { name: 'Alex Chen', avatar: '👨‍💻' },
      activity: {
        name: 'CS Study Session',
        category: 'study-cs',
        duration: 7200, // 2 hours
        description: 'Crushed through algorithms and data structures today! 💪'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 12,
      comments: 3,
      isLiked: false
    },
    {
      id: '2',
      user: { name: 'Sarah Kim', avatar: '👩‍🎓' },
      activity: {
        name: 'Gym Workout',
        category: 'gym',
        duration: 3600, // 1 hour
        description: 'Morning workout complete! Feeling energized for the day 🏋️‍♀️'
      },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      likes: 8,
      comments: 1,
      isLiked: true
    },
    {
      id: '3',
      user: { name: 'Mike Johnson', avatar: '👨‍🎓' },
      activity: {
        name: 'Reading Time',
        category: 'reading',
        duration: 1800, // 30 minutes
        description: 'Finished another chapter of "Atomic Habits" 📚'
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      likes: 5,
      comments: 2,
      isLiked: false
    }
  ])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
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

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  const shareActivity = () => {
    // In a real app, this would open a share dialog
    alert('Share functionality would be implemented here!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Trophy className="h-6 w-6 mr-3 text-primary-600" />
              Activity Feed
            </h2>
            <p className="text-gray-600 mt-1">
              Share your achievements and see what your friends are up to
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Share Activity
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border p-6">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                  {post.user.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                  <p className="text-sm text-gray-500">{formatTimestamp(post.timestamp)}</p>
                </div>
              </div>
              <button
                onClick={shareActivity}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share className="h-5 w-5" />
              </button>
            </div>

            {/* Activity Card */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(post.activity.category)}`}>
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.activity.name}</h4>
                    <p className="text-sm text-gray-600">
                      {getCategoryLabel(post.activity.category)} • {formatTime(post.activity.duration)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatTime(post.activity.duration)}
                  </div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
              </div>
              {post.activity.description && (
                <p className="mt-3 text-gray-700">{post.activity.description}</p>
              )}
            </div>

            {/* Engagement */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {formatTimestamp(post.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No activities yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start tracking activities and share them with your friends!
          </p>
          <button className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mx-auto">
            <Plus className="h-5 w-5 mr-2" />
            Share Your First Activity
          </button>
        </div>
      )}
    </div>
  )
}
