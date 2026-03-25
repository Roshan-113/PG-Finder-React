// Type definitions for PG Finder
// Enhanced with better type safety - Day 13

export interface PGListing {
  id: number;
  name: string;
  location: string;
  rent: number;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
  gender: string;
  sharingType: string;
  availableRooms: number;
  amenities: string[];
}

export interface RoommateProfile {
  id: number;
  name: string;
  age: number;
  gender: string;
  occupation: string;
  location: string;
  budget: number;
  bio: string;
  lifestyle: string[];
  compatibility: number;
  verified: boolean;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'tenant' | 'owner' | 'admin';
  status: 'active' | 'inactive';
}
