const BookingService = require('../services/bookingService');
const bookingService = new BookingService();

class BookingController {
  // Get booking form data for a PG
  async getBookingForm(req, res) {
    try {
      const { pgId } = req.params;
      
      if (!req.session.userId || req.session.userRole !== 'tenant') {
        return res.status(403).json({
          success: false,
          message: 'Only tenants can book PGs'
        });
      }

      const pgData = await bookingService.getPGForBooking(parseInt(pgId));
      
      if (!pgData) {
        return res.status(404).json({
          success: false,
          message: 'PG not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: pgData
      });
    } catch (error) {
      console.error('Get booking form error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch booking form data'
      });
    }
  }

  // Create new booking (matching Java flow)
  async createBooking(req, res) {
    try {
      const { pgId, moveInDate, duration, specialRequests } = req.body;
      
      if (!req.session.userId || req.session.userRole !== 'tenant') {
        return res.status(403).json({
          success: false,
          message: 'Only tenants can create bookings'
        });
      }

      const tenantId = req.session.userId;
      
      const result = await bookingService.createBooking({
        tenantId,
        pgId: parseInt(pgId),
        moveInDate,
        duration: parseInt(duration) || 1,
        specialRequests
      });

      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        bookingId: result.booking.id,
        data: result.booking
      });
    } catch (error) {
      console.error('Create booking error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create booking'
      });
    }
  }

  // Get booking by ID
  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      
      if (!req.session.userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const booking = await bookingService.getBookingById(parseInt(id));
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      // Check if user has access to this booking
      if (booking.tenant_id !== req.session.userId && 
          booking.owner_id !== req.session.userId &&
          req.session.userRole !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('Get booking error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch booking'
      });
    }
  }

  // Get tenant's bookings
  async getTenantBookings(req, res) {
    try {
      if (!req.session.userId || req.session.userRole !== 'tenant') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const bookings = await bookingService.getTenantBookings(req.session.userId);
      
      return res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      console.error('Get tenant bookings error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch bookings'
      });
    }
  }

  // Get owner's bookings
  async getOwnerBookings(req, res) {
    try {
      if (!req.session.userId || req.session.userRole !== 'owner') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const bookings = await bookingService.getOwnerBookings(req.session.userId);
      
      return res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      console.error('Get owner bookings error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch bookings'
      });
    }
  }

  // Cancel booking
  async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      
      if (!req.session.userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const result = await bookingService.cancelBooking(parseInt(id), req.session.userId);
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully'
      });
    } catch (error) {
      console.error('Cancel booking error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to cancel booking'
      });
    }
  }

  // Update payment status
  async updatePaymentStatus(req, res) {
    try {
      const { id } = req.params;
      const { paymentStatus, bookingStatus, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
      
      if (!req.session.userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const result = await bookingService.updatePaymentStatus(
        parseInt(id),
        req.session.userId,
        {
          paymentStatus,
          bookingStatus,
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature
        }
      );
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      return res.status(200).json({
        success: true,
        message: 'Payment status updated successfully',
        data: result.booking
      });
    } catch (error) {
      console.error('Update payment status error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update payment status'
      });
    }
  }

  // Get booking confirmation
  async getBookingConfirmation(req, res) {
    try {
      const { id } = req.params;
      
      if (!req.session.userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const booking = await bookingService.getBookingById(parseInt(id));
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      if (booking.tenant_id !== req.session.userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('Get booking confirmation error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch booking confirmation'
      });
    }
  }
  // Owner: accept or reject booking
  async updateBookingStatus(req, res) {
    try {
      if (!req.session.userId || req.session.userRole !== 'owner') {
        return res.status(403).json({ success: false, message: 'Owners only' });
      }
      const { id } = req.params;
      const { action } = req.body; // 'accept' or 'reject'
      const newStatus = action === 'accept' ? 'confirmed' : 'rejected';
      
      const { Booking, PG, Notification } = require('../models');
      const booking = await Booking.findByPk(id, {
        include: [{ model: PG, as: 'pg', attributes: ['id', 'name', 'ownerId'] }]
      });
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
      if (booking.pg.ownerId !== req.session.userId) return res.status(403).json({ success: false, message: 'Not authorized' });
      
      await booking.update({ status: newStatus });
      
      // Notify tenant
      await Notification.create({
        userId: booking.tenantId,
        notificationType: 'booking',
        title: action === 'accept' ? 'Booking Confirmed!' : 'Booking Rejected',
        message: action === 'accept' 
          ? `Your booking for ${booking.pg.name} has been confirmed by the owner!`
          : `Your booking for ${booking.pg.name} has been rejected by the owner.`,
        relatedId: booking.id
      }).catch(() => {});
      
      return res.json({ success: true, message: `Booking ${newStatus}` });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new BookingController();
