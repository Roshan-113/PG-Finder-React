package com.pgfinder.dao;

import com.pgfinder.model.Booking;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

// Enhanced booking DAO with better query methods - Day 13public class BookingDao {
    
    private static List<Booking> bookings = new ArrayList<>();
    
    public List<Booking> getBookingsByUserId(int userId) {
        return bookings.stream()
                .filter(b -> b.getUserId() == userId)
                .collect(Collectors.toList());
    }
    
    public List<Booking> getBookingsByPGId(int pgId) {
        return bookings.stream()
                .filter(b -> b.getPgId() == pgId)
                .collect(Collectors.toList());
    }
    
    public Booking getBookingById(int id) {
        return bookings.stream()
                .filter(b -> b.getId() == id)
                .findFirst()
                .orElse(null);
    }
    
    public boolean addBooking(Booking booking) {
        bookings.add(booking);
        return true;
    }
    
    public boolean updateBooking(Booking booking) {
        Booking existingBooking = getBookingById(booking.getId());
        if (existingBooking != null) {
            bookings.remove(existingBooking);
            bookings.add(booking);
            return true;
        }
        return false;
    }
    
    public boolean cancelBooking(int id) {
        Booking booking = getBookingById(id);
        if (booking != null) {
            booking.setStatus("Cancelled");
            return true;
        }
        return false;
    }
    
    public List<Booking> getAllBookings() {
        return new ArrayList<>(bookings);
    }
}
