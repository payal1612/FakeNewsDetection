import React, { useState } from 'react';
import { Bookmark, Search, Filter, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { useBookmarkStore } from '../store/bookmarks';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';

const Bookmarks = () => {
  const { bookmarks, removeBookmark, clearBookmarks, searchBookmarks } = useBookmarkStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredBookmarks = searchBookmarks(searchTerm)
    .filter(bookmark => filterCategory === 'all' || bookmark.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt);
        case 'oldest':
          return new Date(a.bookmarkedAt) - new Date(b.bookmarkedAt);
        case 'credibility':
          return (b.credibilityScore || 0) - (a.credibilityScore || 0);
        case 'title':
          return a.title?.localeCompare(b.title) || 0;
        default:
          return 0;
      }
    });

  const categories = [...new Set(bookmarks.map(b => b.category).filter(Boolean))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (!score) return 'text-gray-500 bg-gray-100';
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Bookmark className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Saved Articles</h1>
                <p className="text-gray-600">Your bookmarked news articles and analyses</p>
              </div>
            </div>
            {bookmarks.length > 0 && (
              <button
                onClick={clearBookmarks}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Bookmark className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Bookmarks</p>
                  <p className="text-2xl font-bold text-gray-900">{bookmarks.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Filter className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookmarks.filter(b => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(b.bookmarkedAt) > weekAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="credibility">Highest Credibility</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Bookmarks Grid */}
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchTerm || filterCategory !== 'all' ? 'No matching bookmarks found' : 'No bookmarks yet'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterCategory !== 'all' 
                  ? 'Try adjusting your search terms or filters' 
                  : 'Start bookmarking articles to build your collection'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  {bookmark.urlToImage && (
                    <img
                      src={bookmark.urlToImage}
                      alt={bookmark.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {bookmark.source?.name || bookmark.category}
                      </span>
                      {bookmark.credibilityScore && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(bookmark.credibilityScore)}`}>
                          {bookmark.credibilityScore}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {bookmark.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {bookmark.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(bookmark.bookmarkedAt)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookmarkButton article={bookmark} />
                        <ShareButton article={bookmark} />
                      </div>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-purple-600 hover:text-purple-800 text-sm"
                      >
                        <span className="mr-1">Read</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;