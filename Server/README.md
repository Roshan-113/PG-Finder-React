# PG Accommodation Platform - Backend API

Complete backend implementation with PostgreSQL, Node.js, Express, and JWT authentication.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Create database
psql -U postgres -c "CREATE DATABASE pg_accommodation;"

# Seed sample data
npm run seed

# Start development server
npm run dev
```

Server will run on: http://localhost:5000

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection
│   ├── models/
│   │   ├── index.js             # Model associations
│   │   ├── User.js              # User model
│   │   ├── PG.js                # PG property model
│   │   ├── Room.js              # Room model
│   │   ├── Booking.js           # Booking model
│   │   ├── Payment.js           # Payment model
│   │   ├── Review.js            # Review model
│   │   └── Inquiry.js           # Inquiry model
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── pgController.js      # PG CRUD operations
│   │   ├── roomController.js    # Room management
│   │   ├── bookingController.js # Booking operations
│   │   ├── reviewController.js  # Review management
│   │   └── adminController.js   # Admin operations
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── pg.js                # PG routes
│   │   ├── room.js              # Room routes
│   │   ├── booking.js           # Booking routes
│   │   ├── review.js            # Review routes
│   │   └── admin.js             # Admin routes
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js      # Error handling
│   └── seeders/
│       └── seed.js              # Sample data seeder
├── .env.example                 # Environment template
├── .gitignore
├── package.json
├── server.js                    # Entry point
└── README.md
```

## 🔑 Features

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, Owner, Tenant)
- ✅ Password hashing with bcrypt
- ✅ Protected routes

### User Management
- ✅ User registration and login
- ✅ Profile management
- ✅ Password change
- ✅ User roles (tenant, owner, admin)

### PG Management
- ✅ Create, read, update, delete PGs
- ✅ Search and filter PGs
- ✅ Owner can manage their PGs
- ✅ Admin approval workflow

### Room Management
- ✅ Add rooms to PGs
- ✅ Update room details
- ✅ Track room occupancy
- ✅ Room availability status

### Booking System
- ✅ Create bookings with transactions
- ✅ View booking history
- ✅ Cancel bookings
- ✅ Owner can view their bookings
- ✅ Automatic room occupancy updates

### Review System
- ✅ Submit reviews
- ✅ Admin approval for reviews
- ✅ Rating system (1-5 stars)
- ✅ Multiple rating categories

### Admin Dashboard
- ✅ Dashboard statistics
- ✅ User management
- ✅ PG approval/rejection
- ✅ Review moderation
- ✅ Revenue tracking

## 🗄️ Database Schema

### Tables
- **users** - User accounts (tenant, owner, admin)
- **pgs** - PG properties
- **rooms** - Rooms in PGs
- **bookings** - Booking records
- **payments** - Payment transactions
- **reviews** - User reviews
- **inquiries** - User inquiries

### Relationships
- User → PG (one-to-many)
- PG → Room (one-to-many)
- User → Booking (one-to-many)
- PG → Booking (one-to-many)
- Room → Booking (one-to-many)
- Booking → Payment (one-to-many)
- PG → Review (one-to-many)
- User → Review (one-to-many)

## 🔐 Environment Variables

```env
NODE_ENV=development
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=pg_accommodation
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### PGs
- `GET /api/pgs` - Get all PGs (with filters)
- `GET /api/pgs/:id` - Get PG by ID
- `POST /api/pgs` - Create PG (owner/admin)
- `PUT /api/pgs/:id` - Update PG (owner/admin)
- `DELETE /api/pgs/:id` - Delete PG (owner/admin)
- `GET /api/pgs/owner/my-pgs` - Get owner's PGs

### Rooms
- `GET /api/rooms/pg/:pgId` - Get rooms by PG
- `POST /api/rooms` - Create room (owner/admin)
- `PUT /api/rooms/:id` - Update room (owner/admin)
- `DELETE /api/rooms/:id` - Delete room (owner/admin)

### Bookings
- `POST /api/bookings` - Create booking (tenant)
- `GET /api/bookings/my-bookings` - Get my bookings (tenant)
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/cancel` - Cancel booking (tenant)
- `GET /api/bookings/owner/bookings` - Get owner bookings

### Reviews
- `POST /api/reviews` - Create review (tenant)
- `GET /api/reviews/pg/:pgId` - Get PG reviews
- `PUT /api/reviews/:id` - Update review (tenant)
- `DELETE /api/reviews/:id` - Delete review

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/pgs/pending` - Get pending PGs
- `PUT /api/admin/pgs/:id/approve` - Approve PG
- `PUT /api/admin/pgs/:id/reject` - Reject PG
- `GET /api/admin/reviews/pending` - Get pending reviews
- `PUT /api/admin/reviews/:id/approve` - Approve review
- `PUT /api/admin/users/:id/toggle-status` - Toggle user status
- `DELETE /api/admin/users/:id` - Delete user

## 🧪 Testing

### Sample Login Credentials

After running `npm run seed`:

**Admin:**
- Email: admin@pgplatform.com
- Password: Admin@123

**Owner:**
- Email: owner1@example.com
- Password: Owner@123

**Tenant:**
- Email: tenant1@example.com
- Password: Tenant@123

### Test with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tenant1@example.com","password":"Tenant@123"}'

# Get PGs
curl http://localhost:5000/api/pgs
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode (auto-restart)
npm run dev

# Run in production mode
npm start

# Seed database
npm run seed
```

## 📦 Dependencies

- **express** - Web framework
- **pg** - PostgreSQL client
- **sequelize** - ORM for PostgreSQL
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **helmet** - Security headers
- **morgan** - HTTP logger
- **express-rate-limit** - Rate limiting
- **dotenv** - Environment variables

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based authorization
- ✅ SQL injection prevention (Sequelize)
- ✅ Rate limiting
- ✅ Security headers (Helmet)
- ✅ CORS protection
- ✅ Input validation

## 📝 Notes

- All passwords are hashed before storing
- JWT tokens expire in 7 days (configurable)
- Transactions ensure data consistency
- Foreign keys maintain referential integrity
- Timestamps track creation and updates

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET
3. Configure production database
4. Enable SSL for database connection
5. Use process manager (PM2)
6. Setup reverse proxy (Nginx)
7. Enable HTTPS

## 📚 Documentation

For complete setup guide, see: `../BACKEND_SETUP_GUIDE.md`

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License

---

**Built with ❤️ using Node.js, Express, and PostgreSQL**
