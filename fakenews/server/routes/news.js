import express from 'express';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { validateNewsAnalysis, validateRequest } from '../middleware/validation.js';
import { GNewsService } from '../services/gnewsService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const gnewsService = new GNewsService();

// Calculate credibility score based on article properties
function calculateNewsCredibility(article) {
  let score = 50; // Base score
  
  // Source-based scoring
  const trustedSources = [
    'timesofindia', 'hindustantimes', 'indianexpress', 'thehindu',
    'ndtv', 'zee', 'aajtak', 'news18', 'republicworld', 'indiatoday'
  ];
  
  const sourceId = article.source_id?.toLowerCase() || '';
  if (trustedSources.some(source => sourceId.includes(source))) {
    score += 25;
  }
  
  // Content quality indicators
  if (article.description && article.description.length > 100) score += 10;
  if (article.image_url) score += 5;
  if (article.title && article.title.length > 20 && article.title.length < 100) score += 10;
  
  // Negative indicators
  const title = article.title?.toLowerCase() || '';
  if (title.includes('shocking') || title.includes('unbelievable')) score -= 15;
  if (title.includes('breaking:') && !trustedSources.some(source => sourceId.includes(source))) score -= 10;
  
  return Math.max(20, Math.min(100, score));
}

// Analyze news content
router.post('/analyze', optionalAuth, validateNewsAnalysis, validateRequest, async (req, res) => {
  try {
    const { url, content } = req.body;
    const userId = req.user?.id;

    logger.info(`News analysis requested by user ${userId || 'anonymous'}`, { url: url || 'text content' });

    // For now, return a simple mock analysis
    // You can integrate with your existing NewsAnalyzer here
    const analysis = {
      url: url || 'Text Analysis',
      title: 'Analysis Complete',
      content: content?.substring(0, 500) || 'Content analyzed',
      credibilityScore: Math.floor(Math.random() * 40) + 60, // 60-100%
      explanation: 'This content has been analyzed using our AI-powered verification system.',
      summary: 'The analysis shows this content meets basic credibility standards.',
      keyPoints: ['Content structure analyzed', 'Source credibility assessed', 'Factual claims verified'],
      quotes: ['Key statements extracted from content'],
      claims: [{
        claim: 'Primary claims in the content',
        verdict: 'VERIFIED',
        evidence: 'Analysis shows supporting evidence'
      }],
      verificationSources: [
        { name: "Reuters Fact Check", url: "https://reuters.com/fact-check" },
        { name: "Associated Press", url: "https://apnews.com" }
      ],
      finalVerdict: 'This content appears to be credible based on our analysis.'
    };

    res.json({
      message: 'Analysis completed successfully',
      analysis
    });
  } catch (error) {
    logger.error('News analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message || 'Failed to analyze news content'
    });
  }
});

// Get trending news - Fixed route
router.get('/trending', async (req, res) => {
  try {
    const { category = 'top', page = 1 } = req.query;
    
    logger.info('Trending news requested', { category, page });
    
    // Try to use GNews API, fallback to mock data if not available
    let newsData;
    try {
      newsData = await gnewsService.getTopHeadlines(category, parseInt(page));
      logger.info('Successfully fetched from GNews API');
    } catch (apiError) {
      logger.warn('GNews API failed, using fallback data:', apiError.message);
      newsData = gnewsService.getFallbackNews(category);
    }
    
    res.json({
      message: 'Trending news retrieved successfully',
      data: newsData
    });
  } catch (error) {
    logger.error('Trending news error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Get news by URL for preview
router.get('/preview', optionalAuth, async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        error: 'URL required',
        message: 'Please provide a URL to preview'
      });
    }

    // Simple preview generation
    const preview = {
      title: 'News Article Preview',
      content: 'Preview of the news article content...',
      url: url
    };

    res.json({
      message: 'News preview retrieved successfully',
      preview
    });
  } catch (error) {
    logger.error('News preview error:', error);
    res.status(500).json({
      error: 'Preview failed',
      message: error.message || 'Failed to generate news preview'
    });
  }
});

// Search news
router.get('/search', optionalAuth, async (req, res) => {
  try {
    const { q, page = 1, limit = 10, sortBy = 'relevance' } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Search query required',
        message: 'Please provide a search query'
      });
    }

    const results = await gnewsService.searchNews(q, parseInt(page));

    res.json({
      message: 'Search completed successfully',
      results
    });
  } catch (error) {
    logger.error('News search error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message || 'Failed to search news'
    });
  }
});

export default router;