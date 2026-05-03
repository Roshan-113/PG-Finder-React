const express = require('express');
const router = express.Router();
const pgController = require('../controllers/pgController');

// IMPORTANT: specific routes BEFORE param routes
router.get('/owner/my-pgs', pgController.getOwnerPGs);
router.get('/search', pgController.searchPGs);
router.get('/', pgController.getAllPGs);
router.get('/:id', pgController.getPGById);
router.post('/', pgController.createPG);
router.put('/:id', pgController.updatePG);
router.delete('/:id', pgController.deletePG);

module.exports = router;
