import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get user's analysis history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'created_at', order = 'desc' } = req.query;
    const userId = req.user.id;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { data: analyses, error, count } = await supabase
      .from('analysis_history')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order(sortBy, { ascending: order === 'asc' })
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      throw error;
    }

    res.json({
      message: 'Analysis history retrieved successfully',
      data: {
        analyses,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          totalPages: Math.ceil(count / parseInt(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Analysis history error:', error);
    res.status(500).json({
      error: 'Failed to fetch analysis history',
      message: error.message
    });
  }
});

// Get specific analysis by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: analysis, error } = await supabase
      .from('analysis_history')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Analysis not found',
          message: 'The requested analysis does not exist or you do not have access to it'
        });
      }
      throw error;
    }

    res.json({
      message: 'Analysis retrieved successfully',
      analysis
    });
  } catch (error) {
    logger.error('Get analysis error:', error);
    res.status(500).json({
      error: 'Failed to fetch analysis',
      message: error.message
    });
  }
});

// Delete analysis
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { error } = await supabase
      .from('analysis_history')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    res.json({
      message: 'Analysis deleted successfully'
    });
  } catch (error) {
    logger.error('Delete analysis error:', error);
    res.status(500).json({
      error: 'Failed to delete analysis',
      message: error.message
    });
  }
});

// Get analysis statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total analyses count
    const { count: totalAnalyses } = await supabase
      .from('analysis_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get analyses by credibility score ranges
    const { data: credibilityStats } = await supabase
      .from('analysis_history')
      .select('credibility_score')
      .eq('user_id', userId);

    const stats = {
      totalAnalyses: totalAnalyses || 0,
      credibilityDistribution: {
        high: credibilityStats?.filter(a => a.credibility_score >= 70).length || 0,
        medium: credibilityStats?.filter(a => a.credibility_score >= 40 && a.credibility_score < 70).length || 0,
        low: credibilityStats?.filter(a => a.credibility_score < 40).length || 0
      },
      averageCredibility: credibilityStats?.length > 0 
        ? Math.round(credibilityStats.reduce((sum, a) => sum + a.credibility_score, 0) / credibilityStats.length)
        : 0
    };

    res.json({
      message: 'Analysis statistics retrieved successfully',
      stats
    });
  } catch (error) {
    logger.error('Analysis stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch analysis statistics',
      message: error.message
    });
  }
});

export default router;