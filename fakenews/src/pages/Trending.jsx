import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle, AlertTriangle, ExternalLink, RefreshCw, Eye, Share2, Clock, Flame, Globe, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsAPI } from '../lib/newsApi';
import { newsAnalyzer } from '../lib/gemini';
import { useHistoryStore } from '../store/history';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Trending = () => {
  const [activeCategory, setActiveCategory] = useState('top');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const { addAnalysis } = useHistoryStore();

  const categories = [
    { key: 'top', label: 'Top Stories', icon: '🔥', color: 'from-red-500 to-orange-500' },
    { key: 'business', label: 'Business', icon: '💼', color: 'from-blue-500 to-cyan-500' },
    { key: 'technology', label: 'Technology', icon: '💻', color: 'from-purple-500 to-pink-500' },
    { key: 'science', label: 'Science', icon: '🔬', color: 'from-green-500 to-emerald-500' },
    { key: 'health', label: 'Health', icon: '🏥', color: 'from-teal-500 to-cyan-500' },
    { key: 'sports', label: 'Sports', icon: '⚽', color: 'from-orange-500 to-red-500' },
    { key: 'entertainment', label: 'Entertainment', icon: '🎬', color: 'from-pink-500 to-purple-500' },
  ];

  useEffect(() => {
    loadTrendingNews();
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      loadTrendingNews(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [activeCategory]);

  const loadTrendingNews = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const newsData = await newsAPI.getTrendingNews(activeCategory);
      setArticles(newsData.articles || []);
      setLastUpdated(new Date());
      
      if (isRefresh) {
        toast.success('News updated successfully!');
      }
    } catch (error) {
      console.error('Failed to load trending news:', error);
      toast.error('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadTrendingNews(true);
  };

  const handleAnalyzeArticle = async (article) => {
    try {
      toast.loading('Analyzing article...', { id: 'analyze' });
      
      const analysis = await newsAnalyzer.analyzeNews(
        article.description || article.title, 
        article.link
      );
      
      // Store in history
      addAnalysis({
        ...analysis,
        inputType: 'url',
        originalInput: article.link
      });

      toast.success('Article analyzed successfully!', { id: 'analyze' });
      
      // Show analysis results
      setSelectedArticle({
        ...article,
        analysis
      });
      setShowPreview(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze article. Please try again.', { id: 'analyze' });
    }
  };

  const filteredAndSortedArticles = articles
    .filter(article => 
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.source_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.views - a.views;
        case 'newest':
          return new Date(b.pubDate) - new Date(a.pubDate);
        case 'credibility':
          return b.credibilityScore - a.credibilityScore;
        case 'popular':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  if (loading) {
    return <LoadingSpinner variant="page" message="Loading latest news from India..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full mb-6">
              <Flame className="h-5 w-5 mr-2" />
              <span className="font-semibold">Live from India</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Trending News{' '}
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                India
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Real-time news from India with AI-powered credibility analysis. 
              Stay informed with verified, up-to-date information.
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                <span>Source: NewsData.io</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Updated {newsAPI.formatTimeAgo(lastUpdated.toISOString())}</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            {/* Category Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeCategory === category.key
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg mr-2">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search and Sort */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="trending">🔥 Trending</option>
                  <option value="newest">🕒 Newest First</option>
                  <option value="credibility">✅ Most Credible</option>
                  <option value="popular">👁️ Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* News Grid */}
          {filteredAndSortedArticles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchTerm ? 'No matching articles found' : 'No news available'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms' : 'Please try refreshing or check back later'}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredAndSortedArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Article Image */}
                    {article.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        
                        {/* Overlays */}
                        <div className="absolute top-3 left-3 flex space-x-2">
                          {article.trending && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                              <Flame className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${newsAPI.getScoreColor(article.credibilityScore)}`}>
                            {article.credibilityScore}%
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Article Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                          {article.source_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {newsAPI.formatTimeAgo(article.pubDate)}
                        </span>
                      </div>

                      {/* Article Title */}
                      <h3 className="text-lg font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                        {article.title}
                      </h3>

                      {/* Article Description */}
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {article.description}
                      </p>

                      {/* Article Stats */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views?.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            {article.shares?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {article.credibilityScore >= 70 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className="ml-1 text-xs font-medium">
                            {newsAPI.getScoreLabel(article.credibilityScore)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <BookmarkButton article={article} />
                          <ShareButton article={article} />
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAnalyzeArticle(article)}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors font-medium"
                          >
                            Analyze
                          </button>
                          
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            <span className="mr-1">Read</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Article Preview Modal */}
          <AnimatePresence>
            {showPreview && selectedArticle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowPreview(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h2>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ✕
                      </button>
                    </div>

                    {selectedArticle.image_url && (
                      <img
                        src={selectedArticle.image_url}
                        alt={selectedArticle.title}
                        className="w-full h-64 object-cover rounded-xl mb-6"
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Source</p>
                        <p className="font-semibold">{selectedArticle.source_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Published</p>
                        <p className="font-semibold">{newsAPI.formatTimeAgo(selectedArticle.pubDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Credibility Score</p>
                        <p className={`font-bold text-lg ${newsAPI.getScoreColor(selectedArticle.credibilityScore).split(' ')[0]}`}>
                          {selectedArticle.credibilityScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-semibold capitalize">{selectedArticle.category}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedArticle.description}</p>
                    </div>

                    {selectedArticle.analysis && (
                      <div className="space-y-4 mb-6">
                        <h3 className="font-semibold">AI Analysis</h3>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-700">{selectedArticle.analysis.explanation}</p>
                        </div>
                        
                        {selectedArticle.analysis.keyPoints && (
                          <div>
                            <h4 className="font-medium mb-2">Key Points</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {selectedArticle.analysis.keyPoints.map((point, index) => (
                                <li key={index} className="text-gray-700 text-sm">{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowPreview(false)}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Close
                      </button>
                      <a
                        href={selectedArticle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read Full Article
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Trending;