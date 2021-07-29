// Import express app
const express = require('express');
const router = express.Router();

// Import user controller
const userCtrl = require('../controllers/user');
// User routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// Export user routes
module.exports = router;