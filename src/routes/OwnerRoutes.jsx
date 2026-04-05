import { Routes, Route, Navigate } from 'react-router-dom';
import { OwnerLayout } from '../components/layout/OwnerLayout';
import { OwnerDashboard } from '../pages/owner/OwnerDashboard';
import { ListingsPage } from '../pages/owner/Listings';
import { AddPG } from '../pages/owner/AddPG';
import { EditPG } from '../pages/owner/EditPG';
import { PGDetails } from '../pages/owner/PGDetails';
import { ManageRooms } from '../pages/owner/ManageRooms';
import { Availability } from '../pages/owner/Availability';
import { OwnerBookings } from '../pages/owner/OwnerBookings';
import { InquiriesPage } from '../pages/owner/Inquiries';
import { OwnerReviews } from '../pages/owner/OwnerReviews';
import { PGPhotos } from '../pages/owner/PGPhotos';
import { Earnings } from '../pages/owner/Earnings';
import { OwnerProfile } from '../pages/owner/OwnerProfile';
import { OwnerSettings } from '../pages/owner/OwnerSettings';

export function OwnerRoutes() {
  return (
    <OwnerLayout>
      <Routes>
        <Route index element={<OwnerDashboard />} />
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="add-pg" element={<AddPG />} />
        <Route path="edit-pg/:id" element={<EditPG />} />
        <Route path="pg-details/:id" element={<PGDetails />} />
        <Route path="manage-rooms" element={<ManageRooms />} />
        <Route path="availability" element={<Availability />} />
        <Route path="bookings" element={<OwnerBookings />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="reviews" element={<OwnerReviews />} />
        <Route path="photos" element={<PGPhotos />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="profile" element={<OwnerProfile />} />
        <Route path="settings" element={<OwnerSettings />} />
        <Route path="*" element={<Navigate to="/owner/dashboard" replace />} />
      </Routes>
    </OwnerLayout>
  );
}
