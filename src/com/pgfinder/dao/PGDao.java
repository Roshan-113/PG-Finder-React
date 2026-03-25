package com.pgfinder.dao;

import com.pgfinder.model.PG;
import com.pgfinder.data.MockData;
import java.util.List;
import java.util.stream.Collectors;

// Enhanced PG DAO with filtering - Day 13public class PGDao {
    
    public List<PG> getAllPGs() {
        return MockData.getPGListings();
    }
    
    public PG getPGById(int id) {
        return MockData.getPGListings().stream()
                .filter(pg -> pg.getId() == id)
                .findFirst()
                .orElse(null);
    }
    
    public List<PG> searchPGs(String city, String gender, double minRent, double maxRent) {
        return MockData.getPGListings().stream()
                .filter(pg -> city == null || pg.getCity().equalsIgnoreCase(city))
                .filter(pg -> gender == null || pg.getGender().equalsIgnoreCase(gender))
                .filter(pg -> pg.getRent() >= minRent && pg.getRent() <= maxRent)
                .collect(Collectors.toList());
    }
    
    public boolean addPG(PG pg) {
        // Implementation for adding PG to database
        return true;
    }
    
    public boolean updatePG(PG pg) {
        // Implementation for updating PG in database
        return true;
    }
    
    public boolean deletePG(int id) {
        // Implementation for deleting PG from database
        return true;
    }
}
