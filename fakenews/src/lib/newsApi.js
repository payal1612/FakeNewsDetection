// Enhanced News API integration with backend
class NewsAPI {
  constructor() {
    this.baseURL = '/api';
  }

  async getTrendingNews(category = 'top', page = 1) {
    try {
      console.log('Fetching trending news:', { category, page });
      
      const url = `${this.baseURL}/news/trending?category=${category}&page=${page}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      return data.data || data;
    } catch (error) {
      console.error('News API error:', error);
      
      // Fallback to local mock data if backend is unavailable
      console.log('Using fallback news data');
      return this.getFallbackNews(category);
    }
  }

  getFallbackNews(category = 'top') {
    const fallbackNews = [
      {
        id: 'fallback-1',
        title: 'India Achieves Milestone in Digital Payment Infrastructure',
        description: 'The country\'s digital payment ecosystem continues to grow with record-breaking transaction volumes and increased adoption across rural areas.',
        link: 'https://example.com/digital-payments',
        pubDate: new Date().toISOString(),
        source_name: 'Tech News India',
        image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
        category: 'technology',
        credibilityScore: 88,
        trending: true,
        views: 25000,
        shares: 850
      },
      {
        id: 'fallback-2',
        title: 'Breakthrough in Renewable Energy Storage Technology',
        description: 'Indian researchers develop innovative battery technology that could revolutionize energy storage for solar and wind power systems.',
        link: 'https://example.com/renewable-energy',
        pubDate: new Date(Date.now() - 3600000).toISOString(),
        source_name: 'Science Today',
        image_url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400',
        category: 'science',
        credibilityScore: 92,
        trending: true,
        views: 18500,
        shares: 620
      },
      {
        id: 'fallback-3',
        title: 'Healthcare Innovation: Telemedicine Reaches Remote Villages',
        description: 'New government initiative brings advanced medical consultation to rural areas through satellite-enabled telemedicine programs.',
        link: 'https://example.com/telemedicine',
        pubDate: new Date(Date.now() - 7200000).toISOString(),
        source_name: 'Health Tribune',
        image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        category: 'health',
        credibilityScore: 90,
        trending: false,
        views: 12300,
        shares: 340
      }
    ];

    // Filter by category if specified
    if (category && category !== 'top' && category !== 'all') {
      return {
        articles: fallbackNews.filter(article => article.category === category),
        totalResults: fallbackNews.filter(article => article.category === category).length
      };
    }

    return {
      articles: fallbackNews,
      totalResults: fallbackNews.length
    };
  }

  formatTimeAgo(dateString) {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now - publishedDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return publishedDate.toLocaleDateString();
  }

  getScoreColor(score) {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }

  getScoreLabel(score) {
    if (score >= 80) return 'Highly Credible';
    if (score >= 60) return 'Credible';
    if (score >= 40) return 'Questionable';
    return 'Unreliable';
  }
}

export const newsAPI = new NewsAPI();