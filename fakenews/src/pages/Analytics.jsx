import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Eye, Share2, Calendar, Filter } from 'lucide-react';
import { useHistoryStore } from '../store/history';
import { useBookmarkStore } from '../store/bookmarks';

const Analytics = () => {
  const { analyses } = useHistoryStore();
  const { bookmarks } = useBookmarkStore();
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    generateAnalytics();
  }, [analyses, bookmarks, timeRange]);

  const generateAnalytics = () => {
    const now = new Date();
    const daysBack = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    // Filter data by time range
    const recentAnalyses = analyses.filter(a => new Date(a.timestamp) >= startDate);
    const recentBookmarks = bookmarks.filter(b => new Date(b.bookmarkedAt) >= startDate);

    // Credibility distribution
    const credibilityDistribution = [
      { name: 'Highly Credible (80-100%)', value: recentAnalyses.filter(a => a.credibilityScore >= 80).length, color: '#10B981' },
      { name: 'Credible (60-79%)', value: recentAnalyses.filter(a => a.credibilityScore >= 60 && a.credibilityScore < 80).length, color: '#3B82F6' },
      { name: 'Questionable (40-59%)', value: recentAnalyses.filter(a => a.credibilityScore >= 40 && a.credibilityScore < 60).length, color: '#F59E0B' },
      { name: 'Unreliable (0-39%)', value: recentAnalyses.filter(a => a.credibilityScore < 40).length, color: '#EF4444' }
    ];

    // Daily activity
    const dailyActivity = [];
    for (let i = daysBack - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const dateStr = date.toISOString().split('T')[0];
      const dayAnalyses = recentAnalyses.filter(a => a.timestamp.split('T')[0] === dateStr);
      const dayBookmarks = recentBookmarks.filter(b => b.bookmarkedAt.split('T')[0] === dateStr);
      
      dailyActivity.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        analyses: dayAnalyses.length,
        bookmarks: dayBookmarks.length,
        avgCredibility: dayAnalyses.length > 0 
          ? Math.round(dayAnalyses.reduce((sum, a) => sum + a.credibilityScore, 0) / dayAnalyses.length)
          : 0
      });
    }

    // Source analysis
    const sourceStats = {};
    recentAnalyses.forEach(analysis => {
      if (analysis.url && analysis.url !== 'Text Analysis') {
        try {
          const domain = new URL(analysis.url).hostname.replace('www.', '');
          sourceStats[domain] = (sourceStats[domain] || 0) + 1;
        } catch (e) {
          // Invalid URL
        }
      }
    });

    const topSources = Object.entries(sourceStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([domain, count]) => ({ domain, count }));

    setAnalyticsData({
      credibilityDistribution,
      dailyActivity,
      topSources,
      totalAnalyses: recentAnalyses.length,
      totalBookmarks: recentBookmarks.length,
      avgCredibility: recentAnalyses.length > 0 
        ? Math.round(recentAnalyses.reduce((sum, a) => sum + a.credibilityScore, 0) / recentAnalyses.length)
        : 0,
      mostActiveDay: dailyActivity.reduce((max, day) => 
        day.analyses > max.analyses ? day : max, { analyses: 0, date: 'N/A' }
      )
    });
  };

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Insights into your news verification activity</p>
              </div>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Analyses</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalAnalyses || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Share2 className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Bookmarks</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalBookmarks || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Avg. Credibility</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.avgCredibility || 0}%</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Most Active Day</p>
                  <p className="text-lg font-bold text-gray-900">{analyticsData.mostActiveDay?.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Daily Activity Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.dailyActivity || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="analyses" stroke="#8B5CF6" strokeWidth={2} name="Analyses" />
                  <Line type="monotone" dataKey="bookmarks" stroke="#10B981" strokeWidth={2} name="Bookmarks" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Credibility Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Credibility Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.credibilityDistribution || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(analyticsData.credibilityDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Sources */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Most Analyzed Sources</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.topSources || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="domain" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Credibility Trends */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Average Daily Credibility Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.dailyActivity || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Avg Credibility']} />
                <Line 
                  type="monotone" 
                  dataKey="avgCredibility" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  name="Avg Credibility"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;