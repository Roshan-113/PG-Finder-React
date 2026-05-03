const express = require('express');
const router = express.Router();
const { createReview, getPGReviews, updateReview, deleteReview } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/pg/:pgId', getPGReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
