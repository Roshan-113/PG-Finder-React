import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';

// Public Pages
// Enhanced app routes with error boundaries - Day 13
import { LandingPage } from '../pages/public/Landing';
import { PGListingPage } from '../pages/public/PGListing';
import { PGDetailsPage } from '../pages/public/PGDetails';
import { ReviewsPage } from '../pages/public/Reviews';

// Auth Pages
import { LoginPage } from '../pages/auth/Login';
import { RegisterPage } from '../pages/auth/Register';
import { AdminLoginPage } from '../pages/auth/AdminLogin';

// Tenant Pages
import { RoommateFinder } from '../pages/tenant/RoommateFinder';

// Admin Routes
import { AdminRoutes } from './AdminRoutes';

// Owner Routes
import { OwnerRoutes } from './OwnerRoutes';

export function AppRoutes({ handleNavigate, handleLogin, selectedPG }) {
  return (
    <Routes>
      {/* Admin Routes (standalone with layout) */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Owner Routes (standalone with layout) */}
      <Route path="/owner/*" element={<OwnerRoutes />} />
      
      {/* Auth Routes - No Navigation/Footer */}
      <Route path="/login" element={<LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onNavigate={handleNavigate} />} />
      <Route path="/admin-login" element={<AdminLoginPage onNavigate={handleNavigate} />} />
      
      {/* Public Routes with Navigation/Footer */}
      <Route path="/*" element={
        <>
          <Navigation onNavigate={handleNavigate} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage onNavigate={handleNavigate} />} />
              <Route path="/find-pg" element={<PGListingPage onNavigate={handleNavigate} />} />
              <Route path="/pg-details" element={
                selectedPG ? <PGDetailsPage pgData={selectedPG} onNavigate={handleNavigate} /> : <Navigate to="/find-pg" />
              } />
              <Route path="/find-roommate" element={<RoommateFinder onNavigate={handleNavigate} />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </>
      } />
    </Routes>
  );
}