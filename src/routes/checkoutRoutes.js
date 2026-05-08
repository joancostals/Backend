const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/create-session', authenticateToken, checkoutController.createSession);

module.exports = router;
