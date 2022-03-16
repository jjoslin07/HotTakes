// Improt express app
const express = require('express');
const router = express.Router();

// Import middelware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// Import sauce controller
const sauceCtrl = require('../controllers/sauce');

// Routes for suace
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, multer, sauceCtrl.likeSauce);

// Export routes
module.exports = router;