import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        message: 'Please provide a valid authentication token'
      });
    }

    // For demo purposes, we'll skip actual JWT verification
    // In production, you would verify the JWT token here
    req.user = { id: 'demo-user-id' };
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      message: 'Internal server error during authentication'
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      // For demo purposes, set a demo user
      req.user = { id: 'demo-user-id' };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    logger.warn('Optional auth failed:', error.message);
    req.user = null;
    next();
  }
};