const { Review, PG, User, Booking } = require('../models');

exports.createReview = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'tenant') {
      return res.status(403).json({ success: false, message: 'Only tenants can write reviews' });
    }
    const { pgId, bookingId, rating, comment, cleanlinessRating, foodRating, safetyRating } = req.body;
    const tenantId = req.session.userId;

    const booking = await Booking.findOne({ where: { id: bookingId, tenantId, pgId } });
    if (!booking) return res.status(400).json({ success: false, message: 'You can only review PGs you have booked' });

    const existing = await Review.findOne({ where: { pgId, tenantId } });
    if (existing) return res.status(400).json({ success: false, message: 'You have already reviewed this PG' });

    const review = await Review.create({ pgId, tenantId, bookingId, rating, comment, cleanlinessRating, foodRating, safetyRating, isApproved: false });
    res.status(201).json({ success: true, message: 'Review submitted. Awaiting approval.', data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create review', error: error.message });
  }
};

exports.getPGReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { pgId: req.params.pgId, isApproved: true },
      include: [{ model: User, as: 'tenant', attributes: ['fullName', 'profileImage'] }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.tenantId !== req.session.userId) return res.status(403).json({ success: false, message: 'Not authorized' });
    await review.update(req.body);
    res.json({ success: true, message: 'Review updated', data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update review', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.tenantId !== req.session.userId && req.session.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await review.destroy();
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete review', error: error.message });
  }
};
