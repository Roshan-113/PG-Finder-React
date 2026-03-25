import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ListingsPage } from '../pages/admin/Listings';
import { UsersPage } from '../pages/admin/Users';
import { ApprovalsPage } from '../pages/admin/Approvals';
import { Reviews } from '../pages/admin/Reviews';
import { Reports } from '../pages/admin/Reports';
import { Settings } from '../pages/admin/Settings';

// Enhanced admin routes with lazy loading - Day 13export function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="bookings" element={<AdminDashboard />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reports" element={<Reports />} />
        <Route path="payments" element={<AdminDashboard />} />
        <Route path="inquiries" element={<AdminDashboard />} />
        <Route path="notifications" element={<AdminDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}