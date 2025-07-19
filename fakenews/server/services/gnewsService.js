import fetch from 'node-fetch';
import { logger } from '../utils/logger.js';

export class GNewsService {
  constructor() {
    this.apiKey = process.env.GNEWS_API_KEY;
    this.baseURL = 'https://gnews.io/api/v4';
    this.defaultParams = {
      token: this.apiKey,
      lang: 'en',
      country: 'in', // India
      max: 10
    };
  }

  async getTopHeadlines(category = 'general', page = 1) {
    try {
      if (!this.apiKey || this.apiKey === 'your_gnews_api_key_here') {
        logger.warn('GNews API key not configured, using fallback data');
        return this.getFallbackNews(category);
      }

      const params = new URLSearchParams({
        ...this.defaultParams,
        category: this.mapCategory(category),
        page: page.toString()
      });

      const response = await fetch(`${this.baseURL}/top-headlines?${params}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'TruthGuard/1.0'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid GNews API key');
        } else if (response.status === 429) {
          throw new Error('GNews API rate limit exceeded');
        }
        throw new Error(`GNews API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.articles) {
        throw new Error('Invalid response format from GNews API');
      }

      return this.formatArticles(data.articles);
    } catch (error) {
      logger.error('GNews API error:', error);
      
      // Fallback to mock data if API fails
      logger.info('Using fallback news data due to API error');
      return this.getFallbackNews(category);
    }
  }

  async searchNews(query, page = 1) {
    try {
      if (!this.apiKey || this.apiKey === 'your_gnews_api_key_here') {
        return { articles: [], totalResults: 0 };
      }

      const params = new URLSearchParams({
        ...this.defaultParams,
        q: query,
        page: page.toString()
      });

      const response = await fetch(`${this.baseURL}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`GNews search error: ${response.status}`);
      }

      const data = await response.json();
      return this.formatArticles(data.articles || []);
    } catch (error) {
      logger.error('GNews search error:', error);
      return { articles: [], totalResults: 0 };
    }
  }

  mapCategory(category) {
    const categoryMap = {
      'top': 'general',
      'business': 'business',
      'technology': 'technology',
      'science': 'science',
      'health': 'health',
      'sports': 'sports',
      'entertainment': 'entertainment'
    };
    return categoryMap[category] || 'general';
  }

  formatArticles(articles) {
    return {
      articles: articles.map(article => ({
        id: this.generateId(article.url),
        title: article.title,
        description: article.description,
        link: article.url,
        pubDate: article.publishedAt,
        source_id: this.extractDomain(article.source.url),
        source_name: article.source.name,
        image_url: article.image,
        category: 'news',
        credibilityScore: this.calculateCredibilityScore(article),
        trending: this.isTrending(article),
        views: this.generateViews(),
        shares: this.generateShares()
      })),
      totalResults: articles.length
    };
  }

  calculateCredibilityScore(article) {
    let score = 60; // Base score for GNews articles
    
    // Source-based scoring
    const trustedDomains = [
      'reuters.com', 'apnews.com', 'bbc.com', 'cnn.com',
      'timesofindia.com', 'hindustantimes.com', 'thehindu.com',
      'indianexpress.com', 'ndtv.com'
    ];
    
    const domain = this.extractDomain(article.source.url);
    if (trustedDomains.some(trusted => domain.includes(trusted))) {
      score += 25;
    }
    
    // Content quality indicators
    if (article.description && article.description.length > 100) score += 10;
    if (article.image) score += 5;
    
    // Check for sensational language
    const title = article.title.toLowerCase();
    if (title.includes('shocking') || title.includes('breaking')) score -= 5;
    
    return Math.max(20, Math.min(100, score));
  }

  isTrending(article) {
    // Simple trending logic based on recency and source
    const publishedTime = new Date(article.publishedAt);
    const hoursAgo = (Date.now() - publishedTime.getTime()) / (1000 * 60 * 60);
    return hoursAgo < 6; // Articles published in last 6 hours are trending
  }

  generateViews() {
    return Math.floor(Math.random() * 50000) + 1000;
  }

  generateShares() {
    return Math.floor(Math.random() * 2000) + 100;
  }

  generateId(url) {
    return Buffer.from(url).toString('base64').slice(0, 16);
  }

  extractDomain(url) {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'unknown';
    }
  }

  getFallbackNews(category) {
    const fallbackArticles = [
      {
        id: 'fallback-1',
        title: 'India Achieves Milestone in Digital Payment Infrastructure',
        description: 'The country\'s digital payment ecosystem continues to grow with record-breaking transaction volumes and increased adoption across rural areas.',
        link: 'https://example.com/digital-payments',
        pubDate: new Date().toISOString(),
        source_id: 'business-standard',
        source_name: 'Business Standard',
        image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
        category: 'business',
        credibilityScore: 88,
        trending: true,
        views: 25000,
        shares: 850
      },
      {
        id: 'fallback-2',
        title: 'ISRO Successfully Launches Advanced Weather Monitoring Satellite',
        description: 'The Indian Space Research Organisation launched a new generation weather satellite that will enhance meteorological predictions and climate monitoring capabilities.',
        link: 'https://example.com/isro-satellite',
        pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source_id: 'thehindu',
        source_name: 'The Hindu',
        image_url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
        category: 'science',
        credibilityScore: 95,
        trending: true,
        views: 38420,
        shares: 980
      },
      {
        id: 'fallback-3',
        title: 'New Healthcare Initiative Aims to Provide Universal Coverage in Rural Areas',
        description: 'The government announced a comprehensive healthcare program targeting rural communities with mobile medical units and telemedicine services.',
        link: 'https://example.com/healthcare-initiative',
        pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        source_id: 'ndtv',
        source_name: 'NDTV',
        image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
        category: 'health',
        credibilityScore: 88,
        trending: false,
        views: 22150,
        shares: 650
      }
    ];

    // Filter by category if specified
    let filteredArticles = fallbackArticles;
    if (category && category !== 'top' && category !== 'general') {
      filteredArticles = fallbackArticles.filter(article => article.category === category);
    }

    return {
      articles: filteredArticles,
      totalResults: filteredArticles.length
    };
  }
}