package com.pgfinder.dao;

import com.pgfinder.model.Review;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

// Enhanced review DAO with sorting - Day 13public class ReviewDao {
    
    private static List<Review> reviews = new ArrayList<>();
    
    public List<Review> getReviewsByPGId(int pgId) {
        return reviews.stream()
                .filter(r -> r.getPgId() == pgId)
                .collect(Collectors.toList());
    }
    
    public Review getReviewById(int id) {
        return reviews.stream()
                .filter(r -> r.getId() == id)
                .findFirst()
                .orElse(null);
    }
    
    public boolean addReview(Review review) {
        reviews.add(review);
        return true;
    }
    
    public boolean updateReview(Review review) {
        Review existingReview = getReviewById(review.getId());
        if (existingReview != null) {
            reviews.remove(existingReview);
            reviews.add(review);
            return true;
        }
        return false;
    }
    
    public boolean deleteReview(int id) {
        return reviews.removeIf(r -> r.getId() == id);
    }
    
    public double getAverageRating(int pgId) {
        List<Review> pgReviews = getReviewsByPGId(pgId);
        if (pgReviews.isEmpty()) return 0.0;
        return pgReviews.stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);
    }
}
