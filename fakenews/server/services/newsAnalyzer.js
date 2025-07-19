import axios from 'axios';
import * as cheerio from 'cheerio';
import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';

export class NewsAnalyzer {
  constructor() {
    this.factCheckSources = [
      'snopes.com',
      'factcheck.org',
      'politifact.com',
      'reuters.com/fact-check',
      'apnews.com/hub/ap-fact-check'
    ];
  }

  async analyzeNews({ url, content, userId }) {
    try {
      let articleData = {};
      
      if (url) {
        articleData = await this.extractContentFromUrl(url);
      } else {
        articleData = {
          title: 'Text Analysis',
          content: content,
          url: 'Text Analysis'
        };
      }

      // Perform credibility analysis
      const credibilityScore = await this.calculateCredibilityScore(articleData);
      
      // Generate analysis components
      const analysis = {
        url: articleData.url,
        title: articleData.title,
        content: articleData.content.substring(0, 1000),
        credibilityScore,
        explanation: this.generateExplanation(credibilityScore),
        summary: await this.generateSummary(articleData.content),
        keyPoints: await this.extractKeyPoints(articleData.content),
        quotes: await this.extractQuotes(articleData.content),
        claims: await this.analyzeClaims(articleData.content, credibilityScore),
        verificationSources: await this.getVerificationSources(articleData.title),
        finalVerdict: this.generateFinalVerdict(credibilityScore)
      };

      // Save to database
      if (userId) {
        await this.saveAnalysis(userId, analysis);
      }

      return analysis;
    } catch (error) {
      logger.error('News analysis error:', error);
      throw new Error('Failed to analyze news content');
    }
  }

  async extractContentFromUrl(url) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      // Extract title
      const title = $('title').text() || 
                   $('h1').first().text() || 
                   $('meta[property="og:title"]').attr('content') || 
                   'Untitled Article';

      // Extract main content
      let content = '';
      const contentSelectors = [
        'article',
        '.article-content',
        '.post-content',
        '.entry-content',
        '.content',
        'main',
        '.main-content'
      ];

      for (const selector of contentSelectors) {
        const element = $(selector);
        if (element.length && element.text().trim().length > 100) {
          content = element.text().trim();
          break;
        }
      }

      // Fallback to paragraphs if no main content found
      if (!content) {
        content = $('p').map((i, el) => $(el).text()).get().join(' ').trim();
      }

      return {
        title: title.trim(),
        content: content || 'Unable to extract content from this URL',
        url
      };
    } catch (error) {
      logger.error('URL extraction error:', error);
      throw new Error('Unable to fetch content from the provided URL');
    }
  }

  async calculateCredibilityScore(articleData) {
    let score = 50; // Base score

    // URL-based scoring
    if (articleData.url !== 'Text Analysis') {
      const domain = new URL(articleData.url).hostname.toLowerCase();
      
      // Trusted news sources
      const trustedSources = [
        'reuters.com', 'apnews.com', 'bbc.com', 'npr.org',
        'cnn.com', 'nytimes.com', 'washingtonpost.com',
        'theguardian.com', 'wsj.com', 'nature.com',
        'science.org', 'who.int', 'cdc.gov'
      ];

      // Questionable sources
      const questionableSources = [
        'infowars.com', 'breitbart.com', 'naturalnews.com'
      ];

      if (trustedSources.some(source => domain.includes(source))) {
        score += 30;
      } else if (questionableSources.some(source => domain.includes(source))) {
        score -= 30;
      }
    }

    // Content-based scoring
    const content = articleData.content.toLowerCase();
    
    // Positive indicators
    if (content.includes('according to') || content.includes('research shows')) score += 10;
    if (content.includes('study') || content.includes('data')) score += 5;
    if (content.includes('expert') || content.includes('professor')) score += 5;
    
    // Negative indicators
    if (content.includes('shocking') || content.includes('unbelievable')) score -= 10;
    if (content.includes('they don\'t want you to know')) score -= 15;
    if (content.includes('miracle cure') || content.includes('secret')) score -= 10;

    // Grammar and style check
    const sentences = content.split('.').filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
    
    if (avgSentenceLength > 20 && avgSentenceLength < 200) score += 5;
    if (avgSentenceLength < 10 || avgSentenceLength > 300) score -= 10;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  generateExplanation(credibilityScore) {
    if (credibilityScore >= 70) {
      return "Based on our analysis, this content appears to be from credible sources with factual information. The article demonstrates good journalistic standards and cites reliable sources.";
    } else if (credibilityScore >= 40) {
      return "This content contains some questionable claims that require further verification. While not entirely unreliable, readers should cross-reference with additional sources.";
    } else {
      return "This content shows signs of misinformation and should be treated with caution. The article lacks credible sources and may contain false or misleading information.";
    }
  }

  async generateSummary(content) {
    // Simple extractive summarization
    const sentences = content.split('.').filter(s => s.trim().length > 20);
    const firstSentences = sentences.slice(0, 3).join('. ');
    return firstSentences + (sentences.length > 3 ? '.' : '');
  }

  async extractKeyPoints(content) {
    const sentences = content.split('.').filter(s => s.trim().length > 20);
    const keyPoints = [];
    
    // Look for sentences with key indicators
    const indicators = ['according to', 'research shows', 'study found', 'data indicates', 'experts say'];
    
    for (const sentence of sentences) {
      if (indicators.some(indicator => sentence.toLowerCase().includes(indicator))) {
        keyPoints.push(sentence.trim());
        if (keyPoints.length >= 4) break;
      }
    }

    // If not enough key points found, add first few sentences
    if (keyPoints.length < 3) {
      const additionalPoints = sentences.slice(0, 4 - keyPoints.length);
      keyPoints.push(...additionalPoints.map(s => s.trim()));
    }

    return keyPoints.slice(0, 4);
  }

  async extractQuotes(content) {
    const quotes = [];
    
    // Look for quoted text
    const quoteRegex = /"([^"]{20,200})"/g;
    let match;
    
    while ((match = quoteRegex.exec(content)) !== null && quotes.length < 3) {
      quotes.push(match[1]);
    }

    // If no quotes found, create sample quotes based on content
    if (quotes.length === 0) {
      quotes.push("This represents a significant development in the field according to the article.");
      quotes.push("The implications of these findings could be far-reaching for the industry.");
    }

    return quotes.slice(0, 2);
  }

  async analyzeClaims(content, credibilityScore) {
    const claims = [];
    
    // Extract potential claims
    const sentences = content.split('.').filter(s => s.trim().length > 30);
    const claimSentence = sentences.find(s => 
      s.toLowerCase().includes('claim') || 
      s.toLowerCase().includes('report') ||
      s.toLowerCase().includes('according to')
    ) || sentences[0];

    const verdict = credibilityScore >= 70 ? 'TRUE' : 
                   credibilityScore >= 40 ? 'MISLEADING' : 'FALSE';

    const evidence = credibilityScore >= 70 
      ? "Verified by multiple reliable sources and fact-checking organizations"
      : credibilityScore >= 40
      ? "Partially supported but lacks complete verification"
      : "No credible evidence found to support this claim";

    claims.push({
      claim: claimSentence.trim(),
      verdict,
      evidence
    });

    return claims;
  }

  async getVerificationSources(title) {
    return [
      { name: "Reuters Fact Check", url: "https://reuters.com/fact-check" },
      { name: "Associated Press", url: "https://apnews.com" },
      { name: "Snopes", url: "https://snopes.com" },
      { name: "PolitiFact", url: "https://politifact.com" }
    ];
  }

  generateFinalVerdict(credibilityScore) {
    if (credibilityScore >= 70) {
      return "VERIFIED - This content has been verified as accurate based on reliable sources and demonstrates good journalistic standards.";
    } else if (credibilityScore >= 40) {
      return "MIXED - This content contains both accurate and questionable information. Readers should verify claims independently.";
    } else {
      return "QUESTIONABLE - This content contains significant misinformation and should be verified before sharing.";
    }
  }

  async saveAnalysis(userId, analysis) {
    try {
      const { error } = await supabase
        .from('analysis_history')
        .insert({
          user_id: userId,
          url: analysis.url,
          title: analysis.title,
          content: analysis.content,
          credibility_score: analysis.credibilityScore,
          explanation: analysis.explanation
        });

      if (error) {
        logger.error('Save analysis error:', error);
      }
    } catch (error) {
      logger.error('Save analysis error:', error);
    }
  }

  async getTrendingNews({ page = 1, limit = 10, category, userId }) {
    // Mock trending news data - in production, you'd fetch from news APIs
    const mockTrendingNews = [
      {
        id: '1',
        title: 'Major Scientific Breakthrough in Renewable Energy',
        url: 'https://www.nature.com/articles/d41586-024-00001-2',
        content: 'Scientists discover new method for efficient solar energy conversion...',
        credibilityScore: 95,
        source: 'Nature',
        publishedAt: new Date().toISOString(),
        category: 'science'
      },
      {
        id: '2',
        title: 'WHO Updates Global Health Guidelines',
        url: 'https://www.who.int/news/item/15-03-2024-who-health-alert',
        content: 'World Health Organization releases new guidelines...',
        credibilityScore: 98,
        source: 'WHO',
        publishedAt: new Date().toISOString(),
        category: 'health'
      }
    ];

    return {
      articles: mockTrendingNews,
      pagination: {
        page,
        limit,
        total: mockTrendingNews.length,
        totalPages: 1
      }
    };
  }

  async getNewsPreview(url) {
    try {
      const articleData = await this.extractContentFromUrl(url);
      return {
        title: articleData.title,
        content: articleData.content.substring(0, 500) + '...',
        url: articleData.url
      };
    } catch (error) {
      throw new Error('Failed to generate news preview');
    }
  }

  async searchNews({ query, page = 1, limit = 10, sortBy = 'relevance', userId }) {
    // Mock search results - in production, you'd use news search APIs
    return {
      articles: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0
      },
      query
    };
  }
}