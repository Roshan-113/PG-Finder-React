import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Logout Handler Component
function LogoutHandler({ setUser }) {
  useEffect(() => {
    setUser(null);
  }, [setUser]);
  
  return <Navigate to="/login" replace />;
}

// Google OAuth Success Handler
function GoogleAuthSuccess({ setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');
    const redirect = params.get('redirect') || '/';
    if (userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        const userWithRole = { ...userData, role: userData.userType };
        setUser(userWithRole);
        localStorage.setItem('pgfinder_user', JSON.stringify(userWithRole));
        navigate(redirect, { replace: true });
      } catch { navigate('/login', { replace: true }); }
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, setUser]);
  return <div style={{ padding: '4rem', textAlign: 'center' }}>Signing you in with Google...</div>;
}

// Public Pages
import Landing from './pages/public/Landing';
import FindPG from './pages/public/FindPG';
import PGDetails from './pages/public/PGDetails';
import FindRoommate from './pages/public/FindRoommate';
import Reviews from './pages/public/Reviews';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import HelpCenter from './pages/public/HelpCenter';
import RoommateFinder from './pages/public/RoommateFinder';
import Blog from './pages/public/Blog';
import Careers from './pages/public/Careers';
import FAQ from './pages/public/FAQ';
import Privacy from './pages/public/Privacy';
import TermsOfService from './pages/public/TermsOfService';
import Safety from './pages/public/Safety';
import CookiePolicy from './pages/public/CookiePolicy';
import RoommateProfile from './pages/public/RoommateProfile';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminLogin from './pages/auth/AdminLogin';
import ChangePassword from './pages/auth/ChangePassword';

// Tenant Pages
import TenantDashboard from './pages/tenant/Dashboard';
import TenantBookings from './pages/tenant/Bookings';
import TenantSavedPGs from './pages/tenant/SavedPGs';
import TenantMessages from './pages/tenant/Messages';
import TenantProfile from './pages/tenant/Profile';
import TenantSettings from './pages/tenant/Settings';
import TenantNotifications from './pages/tenant/Notifications';
import TenantWriteReview from './pages/tenant/WriteReview';
import TenantSearchPG from './pages/tenant/SearchPG';
import TenantPayment from './pages/tenant/Payment';
import TenantBookingConfirmation from './pages/tenant/BookingConfirmation';
import TenantRoommateReplacement from './pages/tenant/RoommateReplacement';
import TenantBooking from './pages/tenant/Booking';
import TenantHelpCenter from './pages/tenant/HelpCenter';
import TenantCities from './pages/tenant/Cities';

// Booking Pages
import BookingForm from './pages/booking/BookingForm';
import BookingSuccess from './pages/booking/BookingSuccess';
import BookingPayment from './pages/booking/Payment';

// Owner Pages
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerListings from './pages/owner/Listings';
import OwnerAddPG from './pages/owner/AddPG';
import OwnerBookings from './pages/owner/Bookings';
import OwnerEditPG from './pages/owner/EditPG';
import OwnerInquiries from './pages/owner/Inquiries';
import OwnerEarnings from './pages/owner/Earnings';
import OwnerReviews from './pages/owner/Reviews';
import OwnerProfile from './pages/owner/Profile';
import OwnerSettings from './pages/owner/Settings';
import OwnerDocuments from './pages/owner/Documents';
import OwnerManageRooms from './pages/owner/ManageRooms';
import OwnerNotifications from './pages/owner/Notifications';
import OwnerPhotos from './pages/owner/Photos';
import OwnerViewListing from './pages/owner/ViewListing';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminListings from './pages/admin/Listings';
import AdminApprovals from './pages/admin/Approvals';
import AdminReports from './pages/admin/Reports';
import AdminReviews from './pages/admin/Reviews';
import AdminSettings from './pages/admin/Settings';
import AdminInquiries from './pages/admin/Inquiries';
import AdminTestPage from './pages/admin/TestPage';

// Layout Components
import AdminLayout from './components/layouts/AdminLayout';
import OwnerLayout from './components/layouts/OwnerLayout';
import TenantLayout from './components/layouts/TenantLayout';

import './styles/globals.css';
import './styles/dashboard.css';

// Routes that should NOT show the global Navigation/Footer
const NO_CHROME_PREFIXES = [
  '/login', '/register', '/forgot-password', '/change-password',
  '/admin/login',
  '/admin/', '/owner/', '/tenant/',
  '/booking/',
];

function AppContent({ user, setUser }) {
  const location = useLocation();
  const path = location.pathname;

  // For tenant users, always use TenantLayout (except for auth pages)
  const isAuthPage = ['/login', '/register', '/forgot-password', '/change-password', '/admin/login'].includes(path);
  const isAdminPage = path.startsWith('/admin/');
  const isOwnerPage = path.startsWith('/owner/');
  const isBookingPage = path.startsWith('/booking/');
  
  // If tenant is logged in and not on auth/admin/owner pages, use TenantLayout (including booking pages)
  const useTenantLayout = user?.role === 'tenant' && !isAuthPage && !isAdminPage && !isOwnerPage;
  
  // Hide global nav/footer for auth pages, admin, owner pages, and when using TenantLayout
  const hideChrome = isAuthPage || isAdminPage || isOwnerPage || useTenantLayout;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hideChrome && <Navigation isAuthenticated={!!user} userRole={user?.role} />}
      <main style={{ flex: 1 }}>
        <Routes>
          {/* ── Public Routes ── */}
          <Route path="/" element={useTenantLayout ? <TenantLayout><Landing /></TenantLayout> : <Landing />} />
          <Route path="/find-pg" element={useTenantLayout ? <TenantLayout><FindPG /></TenantLayout> : <FindPG />} />
          <Route path="/pg/:id" element={useTenantLayout ? <TenantLayout><PGDetails /></TenantLayout> : <PGDetails />} />
          <Route path="/find-roommate" element={useTenantLayout ? <TenantLayout><FindRoommate /></TenantLayout> : <FindRoommate />} />
          <Route path="/roommate-finder" element={useTenantLayout ? <TenantLayout><RoommateFinder /></TenantLayout> : <RoommateFinder />} />
          <Route path="/roommate-profile/:id" element={useTenantLayout ? <TenantLayout><RoommateProfile /></TenantLayout> : <RoommateProfile />} />
          <Route path="/reviews" element={useTenantLayout ? <TenantLayout><Reviews /></TenantLayout> : <Reviews />} />
          <Route path="/about" element={useTenantLayout ? <TenantLayout><About /></TenantLayout> : <About />} />
          <Route path="/contact" element={useTenantLayout ? <TenantLayout><Contact /></TenantLayout> : <Contact />} />
          <Route path="/help-center" element={useTenantLayout ? <TenantLayout><HelpCenter /></TenantLayout> : <HelpCenter />} />
          <Route path="/blog" element={useTenantLayout ? <TenantLayout><Blog /></TenantLayout> : <Blog />} />
          <Route path="/careers" element={useTenantLayout ? <TenantLayout><Careers /></TenantLayout> : <Careers />} />
          <Route path="/faq" element={useTenantLayout ? <TenantLayout><FAQ /></TenantLayout> : <FAQ />} />
          <Route path="/privacy" element={useTenantLayout ? <TenantLayout><Privacy /></TenantLayout> : <Privacy />} />
          <Route path="/terms-of-service" element={useTenantLayout ? <TenantLayout><TermsOfService /></TenantLayout> : <TermsOfService />} />
          <Route path="/safety" element={useTenantLayout ? <TenantLayout><Safety /></TenantLayout> : <Safety />} />
          <Route path="/cookie-policy" element={useTenantLayout ? <TenantLayout><CookiePolicy /></TenantLayout> : <CookiePolicy />} />

          {/* ── Auth Routes (no nav/footer — full-screen layouts) ── */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/logout" element={<LogoutHandler setUser={setUser} />} />
          <Route path="/auth/google/success" element={<GoogleAuthSuccess setUser={setUser} />} />

          {/* ── Tenant Routes (TenantLayout has its own nav + footer) ── */}
          <Route path="/tenant/dashboard" element={<Navigate to="/tenant/bookings" replace />} />
          <Route path="/tenant/bookings" element={<TenantLayout><TenantBookings /></TenantLayout>} />
          <Route path="/tenant/saved-pgs" element={<TenantLayout><TenantSavedPGs /></TenantLayout>} />
          <Route path="/tenant/messages" element={<TenantLayout><TenantMessages /></TenantLayout>} />
          <Route path="/tenant/profile" element={<TenantLayout><TenantProfile /></TenantLayout>} />
          <Route path="/tenant/settings" element={<TenantLayout><TenantSettings /></TenantLayout>} />
          <Route path="/tenant/notifications" element={<TenantLayout><TenantNotifications /></TenantLayout>} />
          <Route path="/tenant/write-review" element={<TenantLayout><TenantWriteReview /></TenantLayout>} />
          <Route path="/tenant/search-pg" element={<TenantLayout><TenantSearchPG /></TenantLayout>} />
          <Route path="/tenant/payment" element={<TenantLayout><TenantPayment /></TenantLayout>} />
          <Route path="/tenant/booking-confirmation" element={<TenantLayout><TenantBookingConfirmation /></TenantLayout>} />
          <Route path="/tenant/roommate-replacement" element={<TenantLayout><TenantRoommateReplacement /></TenantLayout>} />
          <Route path="/tenant/booking" element={<TenantLayout><TenantBooking /></TenantLayout>} />
          <Route path="/tenant/help-center" element={<TenantLayout><TenantHelpCenter /></TenantLayout>} />
          <Route path="/tenant/cities" element={<TenantLayout><TenantCities /></TenantLayout>} />

          {/* ── Booking Routes (with TenantLayout when tenant is logged in) ── */}
          <Route path="/booking/form/:id" element={useTenantLayout ? <TenantLayout><BookingForm /></TenantLayout> : <BookingForm />} />
          <Route path="/booking/payment" element={useTenantLayout ? <TenantLayout><BookingPayment /></TenantLayout> : <BookingPayment />} />
          <Route path="/booking/success" element={useTenantLayout ? <TenantLayout><BookingSuccess /></TenantLayout> : <BookingSuccess />} />

          {/* ── Owner Routes (OwnerLayout has its own sidebar + header) ── */}
          <Route path="/owner/dashboard" element={<OwnerLayout><OwnerDashboard /></OwnerLayout>} />
          <Route path="/owner/listings" element={<OwnerLayout><OwnerListings /></OwnerLayout>} />
          <Route path="/owner/add-pg" element={<OwnerLayout><OwnerAddPG /></OwnerLayout>} />
          <Route path="/owner/edit-pg/:id" element={<OwnerLayout><OwnerEditPG /></OwnerLayout>} />
          <Route path="/owner/view-listing/:id" element={<OwnerLayout><OwnerViewListing /></OwnerLayout>} />
          <Route path="/owner/bookings" element={<OwnerLayout><OwnerBookings /></OwnerLayout>} />
          <Route path="/owner/inquiries" element={<OwnerLayout><OwnerInquiries /></OwnerLayout>} />
          <Route path="/owner/earnings" element={<OwnerLayout><OwnerEarnings /></OwnerLayout>} />
          <Route path="/owner/reviews" element={<OwnerLayout><OwnerReviews /></OwnerLayout>} />
          <Route path="/owner/profile" element={<OwnerLayout><OwnerProfile /></OwnerLayout>} />
          <Route path="/owner/settings" element={<OwnerLayout><OwnerSettings /></OwnerLayout>} />
          <Route path="/owner/documents" element={<OwnerLayout><OwnerDocuments /></OwnerLayout>} />
          <Route path="/owner/manage-rooms" element={<OwnerLayout><OwnerManageRooms /></OwnerLayout>} />
          <Route path="/owner/notifications" element={<OwnerLayout><OwnerNotifications /></OwnerLayout>} />
          <Route path="/owner/photos" element={<OwnerLayout><OwnerPhotos /></OwnerLayout>} />

          {/* ── Admin Routes (AdminLayout has its own sidebar + header) ── */}
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          <Route path="/admin/listings" element={<AdminLayout><AdminListings /></AdminLayout>} />
          <Route path="/admin/approvals" element={<AdminLayout><AdminApprovals /></AdminLayout>} />
          <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
          <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
          <Route path="/admin/test-page" element={<AdminLayout><AdminTestPage /></AdminLayout>} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}

function App() {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('pgfinder_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist user to localStorage whenever it changes
  const handleSetUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('pgfinder_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('pgfinder_user');
    }
  };

  return (
    <Router>
      <AppContent user={user} setUser={handleSetUser} />
    </Router>
  );
}

export default App;
