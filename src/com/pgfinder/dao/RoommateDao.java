package com.pgfinder.dao;

import com.pgfinder.model.Roommate;
import com.pgfinder.data.MockData;
import java.util.List;
import java.util.stream.Collectors;

// Enhanced roommate DAO with matching algorithm - Day 13public class RoommateDao {
    
    public List<Roommate> getAllRoommates() {
        return MockData.getRoommateProfiles();
    }
    
    public Roommate getRoommateById(int id) {
        return MockData.getRoommateProfiles().stream()
                .filter(r -> r.getId() == id)
                .findFirst()
                .orElse(null);
    }
    
    public List<Roommate> searchRoommates(String location, String gender, String budget) {
        return MockData.getRoommateProfiles().stream()
                .filter(r -> location == null || r.getLocation().equalsIgnoreCase(location))
                .filter(r -> gender == null || r.getGender().equalsIgnoreCase(gender))
                .collect(Collectors.toList());
    }
    
    public boolean addRoommate(Roommate roommate) {
        return true;
    }
    
    public boolean updateRoommate(Roommate roommate) {
        return true;
    }
    
    public boolean deleteRoommate(int id) {
        return true;
    }
}
