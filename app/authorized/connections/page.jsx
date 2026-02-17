"use client"
import React, { useState } from 'react'

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all', 'sent', 'received'
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      username: '@alice_j',
      avatar: 'AJ',
      bio: 'Digital artist & photographer',
      requestStatus: 'none',
      mutualFriends: 5
    },
    {
      id: 2,
      name: 'Bob Smith',
      username: '@bob_smith',
      avatar: 'BS',
      bio: 'Software developer | Tech enthusiast',
      requestStatus: 'sent',
      mutualFriends: 3
    },
    {
      id: 3,
      name: 'Carol Davis',
      username: '@carol_d',
      avatar: 'CD',
      bio: 'Travel blogger ✈️',
      requestStatus: 'received',
      mutualFriends: 8
    },
    {
      id: 4,
      name: 'David Wilson',
      username: '@david_w',
      avatar: 'DW',
      bio: 'Fitness coach 💪',
      requestStatus: 'friends',
      mutualFriends: 12
    },
    {
      id: 5,
      name: 'Eva Brown',
      username: '@eva_b',
      avatar: 'EB',
      bio: 'Music lover | Pianist 🎹',
      requestStatus: 'none',
      mutualFriends: 2
    },
    {
      id: 6,
      name: 'Frank Miller',
      username: '@frank_m',
      avatar: 'FM',
      bio: 'Photographer | Nature lover',
      requestStatus: 'none',
      mutualFriends: 0
    },
    {
      id: 7,
      name: 'Grace Lee',
      username: '@grace_l',
      avatar: 'GL',
      bio: 'Food blogger 🍳',
      requestStatus: 'sent',
      mutualFriends: 4
    },
    {
      id: 8,
      name: 'Henry Clark',
      username: '@henry_c',
      avatar: 'HC',
      bio: 'Gamer | Streamer',
      requestStatus: 'received',
      mutualFriends: 6
    },
    {
      id: 9,
      name: 'Ivy Martinez',
      username: '@ivy_m',
      avatar: 'IM',
      bio: 'Yoga instructor 🧘',
      requestStatus: 'none',
      mutualFriends: 3
    },
    {
      id: 10,
      name: 'Jack Thompson',
      username: '@jack_t',
      avatar: 'JT',
      bio: 'Coffee enthusiast ☕',
      requestStatus: 'none',
      mutualFriends: 1
    }
  ])

  // Filter users based on search and active tab
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'sent') return matchesSearch && user.requestStatus === 'sent'
    if (activeTab === 'received') return matchesSearch && user.requestStatus === 'received'
    return matchesSearch
  })

  const handleSendRequest = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, requestStatus: 'sent' }
        : user
    ))
  }

  const handleCancelRequest = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, requestStatus: 'none' }
        : user
    ))
  }

  const handleAcceptRequest = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, requestStatus: 'friends' }
        : user
    ))
  }

  const handleDeclineRequest = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, requestStatus: 'none' }
        : user
    ))
  }

  const getRequestButton = (user) => {
    switch(user.requestStatus) {
      case 'none':
        return (
          <button
            onClick={() => handleSendRequest(user.id)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors active:bg-indigo-800"
          >
            Send Request
          </button>
        )
      case 'sent':
        return (
          <button
            onClick={() => handleCancelRequest(user.id)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-300 transition-colors active:bg-gray-400"
          >
            Cancel Request
          </button>
        )
      case 'received':
        return (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleAcceptRequest(user.id)}
              className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors active:bg-indigo-800"
            >
              Accept
            </button>
            <button
              onClick={() => handleDeclineRequest(user.id)}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-300 transition-colors active:bg-gray-400"
            >
              Decline
            </button>
          </div>
        )
      case 'friends':
        return (
          <span className="inline-block w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm font-medium text-center">
            ✓ Friends
          </span>
        )
      default:
        return null
    }
  }

  const getCounts = () => ({
    sent: users.filter(u => u.requestStatus === 'sent').length,
    received: users.filter(u => u.requestStatus === 'received').length,
    friends: users.filter(u => u.requestStatus === 'friends').length
  })

  const counts = getCounts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Find People
            </h1>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Connect with other SecuMate users</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search Bar - Always Visible */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <svg
              className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            
            {/* Search Results Count */}
            {searchTerm && (
              <div className="absolute right-3 top-2.5 sm:right-4 sm:top-3.5 text-xs sm:text-sm text-gray-500">
                {filteredUsers.length} results
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="lg:hidden bg-white rounded-xl shadow-sm p-4 mb-4 animate-slideDown">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setActiveTab('all')
                  setShowMobileFilters(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Users
              </button>
              <button
                onClick={() => {
                  setActiveTab('sent')
                  setShowMobileFilters(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  activeTab === 'sent'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>Sent Requests</span>
                {counts.sent > 0 && (
                  <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {counts.sent}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab('received')
                  setShowMobileFilters(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  activeTab === 'received'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>Received Requests</span>
                {counts.received > 0 && (
                  <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {counts.received}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Desktop Tabs */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors relative flex items-center space-x-2 ${
                activeTab === 'sent'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>Sent Requests</span>
              {counts.sent > 0 && (
                <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  activeTab === 'sent' ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
                }`}>
                  {counts.sent}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors relative flex items-center space-x-2 ${
                activeTab === 'received'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>Received Requests</span>
              {counts.received > 0 && (
                <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  activeTab === 'received' ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
                }`}>
                  {counts.received}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Users Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 lg:p-6"
              >
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start space-y-3 sm:space-y-0 sm:space-x-4 lg:space-y-3 lg:space-x-0">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-semibold">
                      {user.avatar}
                    </div>
                    {user.requestStatus === 'friends' && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0 w-full">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-600 truncate">{user.username}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                      {user.bio}
                    </p>
                    
                    {/* Mutual Friends - Mobile Optimized */}
                    {user.mutualFriends > 0 && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        {user.mutualFriends} mutual friend{user.mutualFriends !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Button - Full width on mobile */}
                <div className="mt-4 sm:mt-5 lg:mt-6">
                  {getRequestButton(user)}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12 lg:py-16">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">No users found</h3>
              <p className="text-xs sm:text-sm text-gray-500 px-4">
                {searchTerm ? 'Try a different search term' : 'No users match the selected filter'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Summary Stats - Responsive Cards */}
        <div className="mt-6 sm:mt-8 lg:mt-10">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Connection Summary</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                  {counts.friends}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Friends</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                  {counts.sent}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Sent</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                  {counts.received}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Received</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Page