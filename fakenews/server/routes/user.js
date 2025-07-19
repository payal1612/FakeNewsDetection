import express from 'express';

const router = express.Router();

// Mock user routes for development
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 1,
      email: 'demo@example.com',
      name: 'Demo User',
      createdAt: new Date().toISOString()
    }
  });
});

router.put('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 1,
      email: req.body.email || 'demo@example.com',
      name: req.body.name || 'Demo User',
      updatedAt: new Date().toISOString()
    }
  });
});

export default router;