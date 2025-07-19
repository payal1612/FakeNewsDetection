import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Calendar, Search, Trash2, BarChart3, Filter, Download, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { useHistoryStore } from '../store/history';

const History = () => {
  const { analyses, removeAnalysis, clearHistory, getStats } = useHistoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const stats = getStats();

  const filteredAnalyses = analyses
    .filter(analysis => {
      const matchesSearch = analysis.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           analysis.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           analysis.originalInput?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'credible' && analysis.credibilityScore >= 70) ||
                           (filterBy === 'questionable' && analysis.credibilityScore >= 40 && analysis.credibilityScore < 70) ||
                           (filterBy === 'unreliable' && analysis.credibilityScore < 40);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'highest-score':
          return b.credibilityScore - a.credibilityScore;
        case 'lowest-score':
          return a.credibilityScore - b.credibilityScore;
        default:
          return 0;
      }
    });

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
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(analysis);
    setShowModal(true);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this analysis?')) {
      removeAnalysis(id);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      clearHistory();
    }
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(analyses, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `truthguard-history-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportHistory}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </button>
            </div>
          </div>
          <p className="text-gray-600">View and manage all your news verification analyses</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Analyses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Credible</p>
                <p className="text-2xl font-bold text-green-600">{stats.credible}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Questionable</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.questionable}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Avg. Score</p>
                <p className="text-2xl font-bold text-purple-600">{stats.averageScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search analyses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Results</option>
              <option value="credible">Credible (70%+)</option>
              <option value="questionable">Questionable (40-69%)</option>
              <option value="unreliable">Unreliable (&lt;40%)</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest-score">Highest Score</option>
              <option value="lowest-score">Lowest Score</option>
            </select>
          </div>
        </div>

        {/* Analysis List */}
        {filteredAnalyses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm || filterBy !== 'all' ? 'No matching analyses found' : 'No analysis history yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterBy !== 'all' 
                ? 'Try adjusting your search terms or filters' 
                : 'Start analyzing news to build your history'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAnalyses.map((analysis) => (
              <div 
                key={analysis.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleViewDetails(analysis)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(analysis.timestamp)}
                    </div>
                    <button
                      onClick={(e) => handleDelete(analysis.id, e)}
                      className="text-red-500 hover:text-red-700 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {analysis.title}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {analysis.content?.substring(0, 150)}
                      {analysis.content?.length > 150 && '...'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Input Type:</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {analysis.inputType === 'url' ? 'URL Analysis' : 'Text Analysis'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Credibility:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(analysis.credibilityScore)}`}>
                      {analysis.credibilityScore}%
                    </span>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analysis Detail Modal */}
        {showModal && selectedAnalysis && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAnalysis.title}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Analysis Date</p>
                    <p className="font-semibold">{formatDate(selectedAnalysis.timestamp)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Credibility Score</p>
                    <p className={`font-bold text-lg ${getScoreColor(selectedAnalysis.credibilityScore).split(' ')[0]}`}>
                      {selectedAnalysis.credibilityScore}%
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    <p className="text-gray-700">{selectedAnalysis.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Points</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedAnalysis.keyPoints?.map((point, index) => (
                        <li key={index} className="text-gray-700">{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Final Verdict</h3>
                    <p className="text-gray-700">{selectedAnalysis.finalVerdict}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;