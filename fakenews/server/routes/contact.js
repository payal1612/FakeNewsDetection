import express from 'express';

const router = express.Router();

// Mock contact routes for development
router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  
  // Simulate processing
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: Date.now(),
        name,
        email,
        message,
        submittedAt: new Date().toISOString()
      }
    });
  }, 500);
});

export default router;