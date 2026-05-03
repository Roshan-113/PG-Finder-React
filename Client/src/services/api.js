// Central API service - all calls go to Node.js/Express backend with PostgreSQL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (method, endpoint, data = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // send session cookies
  };
  if (data) options.body = JSON.stringify(data);
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
};

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  register:       (data)         => request('POST', '/auth/register', data),
  login:          (data)         => request('POST', '/auth/login', data),
  logout:         ()             => request('POST', '/auth/logout'),
  me:             ()             => request('GET',  '/auth/me'),
  forgotPassword: (email)        => request('POST', '/auth/forgot-password', { email }),
  resetPassword:  (token, data)  => request('POST', `/auth/reset-password/${token}`, data),
  verifyEmail:    (token)        => request('GET',  `/auth/verify-email/${token}`),
};

// ── Profile ───────────────────────────────────────────────────
export const profileAPI = {
  get:            ()             => request('GET',  '/profile'),
  update:         (data)         => request('PUT',  '/profile', data),
  changePassword: (data)         => request('PUT',  '/profile/change-password', data),
};

// ── PG Listings ───────────────────────────────────────────────
export const pgAPI = {
  getAll:   (params = {}) => request('GET', `/pgs?${new URLSearchParams(params)}`),
  search:   (params = {}) => request('GET', `/pgs/search?${new URLSearchParams(params)}`),
  getById:  (id)          => request('GET',    `/pgs/${id}`),
  getMyPGs: ()            => request('GET',    '/pgs/owner/my-pgs'),
  create:   (data)        => request('POST',   '/pgs', data),
  update:   (id, data)    => request('PUT',    `/pgs/${id}`, data),
  delete:   (id)          => request('DELETE', `/pgs/${id}`),
};

// ── Bookings ──────────────────────────────────────────────────
export const bookingAPI = {
  create:           (data)     => request('POST', '/bookings', data),
  getById:          (id)       => request('GET',  `/bookings/${id}`),
  getConfirmation:  (id)       => request('GET',  `/bookings/${id}/confirmation`),
  getMyBookings:    ()         => request('GET',  '/bookings/tenant/my-bookings'),
  getOwnerBookings: ()         => request('GET',  '/bookings/owner/bookings'),
  cancel:           (id)       => request('PUT',  `/bookings/${id}/cancel`),
  updateStatus:     (id, action) => request('PUT', `/bookings/${id}/status`, { action }),
  updatePayment:    (id, data) => request('PUT',  `/bookings/${id}/payment`, data),
  getPGForBooking:  (pgId)     => request('GET',  `/bookings/pg/${pgId}`),
};

// ── Payments ──────────────────────────────────────────────────
export const paymentAPI = {
  createOrder: (bookingId)  => request('POST', '/payments/create-order', { bookingId }),
  verify:      (data)       => request('POST', '/payments/verify', data),
  getDetails:  (bookingId)  => request('GET',  `/payments/${bookingId}`),
};

// ── Reviews ───────────────────────────────────────────────────
export const reviewAPI = {
  create:  (data)     => request('POST',   '/reviews', data),
  getByPG: (pgId)     => request('GET',    `/reviews/pg/${pgId}`),
  update:  (id, data) => request('PUT',    `/reviews/${id}`, data),
  delete:  (id)       => request('DELETE', `/reviews/${id}`),
};

// ── Rooms ─────────────────────────────────────────────────────
export const roomAPI = {
  create:  (data)     => request('POST',   '/rooms', data),
  getByPG: (pgId)     => request('GET',    `/rooms/pg/${pgId}`),
  update:  (id, data) => request('PUT',    `/rooms/${id}`, data),
  delete:  (id)       => request('DELETE', `/rooms/${id}`),
};

// ── Messages ──────────────────────────────────────────────────
export const messageAPI = {
  getConversations: ()             => request('GET',  '/messages/conversations'),
  getMessages:      (userId)       => request('GET',  `/messages/${userId}`),
  send:             (data)         => request('POST', '/messages', data),
};

// ── Notifications ─────────────────────────────────────────────
export const notificationAPI = {
  getAll:     ()   => request('GET', '/notifications'),
  markRead:   (id) => request('PUT', `/notifications/${id}/read`),
  markAllRead:()   => request('PUT', '/notifications/read-all'),
};

// ── Saved PGs ─────────────────────────────────────────────────
export const savedPGAPI = {
  getAll:  ()     => request('GET',    '/saved-pgs'),
  save:    (pgId) => request('POST',   `/saved-pgs/${pgId}`),
  remove:  (pgId) => request('DELETE', `/saved-pgs/${pgId}`),
};

// ── Inquiries ─────────────────────────────────────────────────
export const inquiryAPI = {
  send:        (data)       => request('POST', '/inquiries', data),
  getOwner:    ()           => request('GET',  '/inquiries/owner'),
  getMy:       ()           => request('GET',  '/inquiries/my'),
  reply:       (id, reply)  => request('PUT',  `/inquiries/${id}/reply`, { reply }),
};

// ── Roommates ─────────────────────────────────────────────────
export const roommateAPI = {
  getAll:   (params = {}) => request('GET', `/roommates?${new URLSearchParams(params)}`),
  getById:  (id)          => request('GET', `/roommates/${id}`),
};

// ── Admin ─────────────────────────────────────────────────────
export const adminAPI = {
  getDashboard:      ()         => request('GET', '/admin/dashboard'),
  getUsers:          (p)        => request('GET', `/admin/users?${new URLSearchParams(p || {})}`),
  deleteUser:        (id)       => request('DELETE', `/admin/users/${id}`),
  toggleUser:        (id)       => request('PUT',    `/admin/users/${id}/toggle-status`),
  getAllPGs:          (p)        => request('GET', `/admin/pgs?${new URLSearchParams(p || {})}`),
  getPendingPGs:     ()         => request('GET', '/admin/pgs/pending'),
  approvePG:         (id)       => request('PUT', `/admin/pgs/${id}/approve`),
  rejectPG:          (id)       => request('PUT', `/admin/pgs/${id}/reject`),
  getPendingReviews: ()         => request('GET', '/admin/reviews/pending'),
  approveReview:     (id)       => request('PUT', `/admin/reviews/${id}/approve`),
  getInquiries:      (p)        => request('GET', `/admin/inquiries?${new URLSearchParams(p || {})}`),
  getReports:        (p)        => request('GET', `/admin/reports?${new URLSearchParams(p || {})}`),
  updateReport:      (id, data) => request('PUT', `/admin/reports/${id}`, data),
  getSettings:       ()         => request('GET', '/admin/settings'),
  updateSetting:     (key, val) => request('PUT', `/admin/settings/${key}`, { value: val }),
};
