# 🏠 PG Finder — Full Stack Platform

A complete, production-ready **full-stack web application** for PG (Paying Guest) accommodation — built with React, Node.js, Express, and PostgreSQL.

---

## 🖥️ Live Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@pgplatform.com | Admin@123 |
| **Owner** | owner1@example.com | Owner@123 |
| **Tenant** | tenant1@example.com | Tenant@123 |

---

## ✨ Features

- ✅ **3-Role Authentication** — Admin, Owner, Tenant with JWT
- ✅ **PG Management** — Complete CRUD for PG listings
- ✅ **Room Management** — Add, update, delete rooms per PG
- ✅ **Booking System** — Transaction-based booking with automatic room updates
- ✅ **Razorpay Payments** — Integrated payment gateway with order verification
- ✅ **Review System** — Rating & review with admin moderation
- ✅ **Admin Dashboard** — Stats, charts, user management, approvals
- ✅ **Owner Dashboard** — Listings, bookings, earnings, inquiries
- ✅ **Tenant Dashboard** — Search PGs, bookings, saved PGs, roommate finder
- ✅ **Advanced Search & Filter** — City, price, type, amenities
- ✅ **Google OAuth Ready** — OAuth credentials configured
- ✅ **Responsive UI** — Works on all screen sizes

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router DOM v7, Vite |
| Backend | Node.js, Express.js |
| Database | PostgreSQL 14+ |
| ORM | Sequelize |
| Authentication | JWT + bcryptjs |
| Payment | Razorpay |
| Security | Helmet, CORS, Rate Limiting |
| Dev Tools | Nodemon, dotenv |

---

## 📁 Project Structure

```
PG-Finder/
├── Client/                        # React Frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── admin/             # Dashboard, Users, Approvals, Reviews
│   │   │   ├── owner/             # Dashboard, AddPG, Bookings, Earnings
│   │   │   ├── tenant/            # Dashboard, SearchPG, Bookings, SavedPGs
│   │   │   ├── public/            # Landing, FindPG, PGDetails, Roommate
│   │   │   └── auth/              # Login, Register, ForgotPassword
│   │   ├── components/
│   │   │   ├── layouts/           # AdminLayout, OwnerLayout, TenantLayout
│   │   │   └── ui/                # Button, Input, Modal, Card, Table...
│   │   ├── hooks/
│   │   │   └── useFormValidation.js  # Custom validation hook
│   │   ├── services/
│   │   │   └── api.js             # Centralized API service layer
│   │   └── styles/                # Role-based CSS files
│   └── package.json
│
└── Server/                        # Node.js + Express Backend
    ├── src/
    │   ├── config/
    │   │   └── database.js        # PostgreSQL connection
    │   ├── models/                # 7 Sequelize models
    │   │   ├── User.js
    │   │   ├── PG.js
    │   │   ├── Room.js
    │   │   ├── Booking.js
    │   │   ├── Payment.js
    │   │   ├── Review.js
    │   │   └── Inquiry.js
    │   ├── controllers/           # Business logic
    │   ├── routes/                # API route definitions
    │   ├── middleware/            # Auth, role-check, error handling
    │   └── seeders/               # Sample data
    ├── .env
    ├── package.json
    └── server.js                  # Entry point
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL 14+

### 1. Clone & Install

```bash
# Install frontend dependencies
cd Client
npm install

# Install backend dependencies
cd ../Server
npm install
```

### 2. Create Database

```bash
psql -U postgres
CREATE DATABASE pg_finder;
\q
```

### 3. Configure Environment

```bash
# Edit Server/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pg_finder
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Seed Database

```bash
cd Server
npm run seed
```

### 5. Start Backend

```bash
cd Server
npm run dev
# Runs on http://localhost:5000
```

### 6. Start Frontend

```bash
cd Client
npm run dev
# Runs on http://localhost:5173
```

---

## 🗄️ Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts — admin, owner, tenant |
| `pgs` | PG property listings |
| `rooms` | Rooms within each PG |
| `bookings` | Booking records with status |
| `payments` | Razorpay payment transactions |
| `reviews` | Tenant reviews with admin approval |
| `inquiries` | Tenant-to-owner inquiries |

### Relationships
```
User (owner)  →  has many PGs
PG            →  has many Rooms, Bookings, Reviews, Inquiries
User (tenant) →  has many Bookings
Booking       →  has one Payment
```

### Sample Data
- 5 Users (1 admin, 2 owners, 2 tenants)
- 4 PG properties · 8 Rooms · 2 Bookings · 2 Payments · 2 Reviews

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register          Register user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user
PUT    /api/auth/profile           Update profile
PUT    /api/auth/change-password   Change password
```

### PG Listings
```
GET    /api/pgs                    Get all PGs (with filters)
GET    /api/pgs/:id                Get PG details
POST   /api/pgs                    Create PG (owner)
PUT    /api/pgs/:id                Update PG (owner)
DELETE /api/pgs/:id                Delete PG (owner)
GET    /api/pgs/owner/my-pgs       Get owner's PGs
```

### Bookings
```
POST   /api/bookings               Create booking
GET    /api/bookings/my-bookings   Tenant's bookings
GET    /api/bookings/:id           Booking details
PUT    /api/bookings/:id/cancel    Cancel booking
GET    /api/bookings/owner/bookings Owner's bookings
```

### Payments
```
POST   /api/payments/create-order  Create Razorpay order
POST   /api/payments/verify        Verify payment signature
GET    /api/payments/:bookingId    Get payment details
```

### Reviews
```
POST   /api/reviews                Submit review
GET    /api/reviews/pg/:pgId       Get PG reviews
PUT    /api/reviews/:id            Update review
DELETE /api/reviews/:id            Delete review
```

### Admin
```
GET    /api/admin/dashboard              Dashboard stats
GET    /api/admin/users                  All users
DELETE /api/admin/users/:id             Delete user
PUT    /api/admin/users/:id/toggle-status Toggle user status
GET    /api/admin/pgs/pending            Pending PGs
PUT    /api/admin/pgs/:id/approve        Approve PG
PUT    /api/admin/pgs/:id/reject         Reject PG
GET    /api/admin/reviews/pending        Pending reviews
PUT    /api/admin/reviews/:id/approve    Approve review
```

---

## 💳 Payment Integration (Razorpay)

### Test Keys (Already Configured)
- **Key ID**: `rzp_test_SVIqxh9e1lGkPp`
- **Secret**: `d79dG0NPUuTIdOGxoS4f32VS`

### Test Card
```
Card Number : 4111 1111 1111 1111
Expiry      : Any future date
CVV         : Any 3 digits
```

### Payment Flow
```
1. Tenant creates booking     →  POST /api/bookings
2. Backend creates order      →  POST /api/payments/create-order
3. Razorpay checkout opens    →  User pays with test card
4. Backend verifies signature →  POST /api/payments/verify
5. Booking confirmed          →  Status updated in DB
```

---

## 🔒 Security

- ✅ JWT authentication (7-day expiry)
- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ Role-based route authorization (admin / owner / tenant)
- ✅ SQL injection prevention via Sequelize parameterized queries
- ✅ Rate limiting — 100 requests / 15 min per IP
- ✅ Security headers via Helmet
- ✅ CORS — only frontend origin allowed
- ✅ Input validation with express-validator

---

## 🧪 Test APIs

```bash
# Get all PGs
curl http://localhost:5000/api/pgs

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tenant1@example.com","password":"Tenant@123"}'
```

Or use **Postman** — set `Authorization: Bearer YOUR_TOKEN` header.

---

## 🐛 Troubleshooting

**Database connection failed**
```bash
# Verify PostgreSQL is running and check Server/.env
DB_PASSWORD=your_actual_password
```

**Port already in use**
```bash
# Change in Server/.env
PORT=5001
```

**Frontend not connecting to backend**
```bash
# Check Client/.env
VITE_API_URL=http://localhost:5000/api
```

---

## 🔐 Google OAuth

Credentials ready in `.env`. To activate:
```bash
npm install passport passport-google-oauth20
```

---

## 📄 License

MIT License

---

**Made with ❤️ using React, Node.js, Express, PostgreSQL, and Razorpay**
