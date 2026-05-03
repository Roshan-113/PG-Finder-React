# PG Finder - React Frontend

A complete React frontend for the PG Finder application, converted from JSP with the exact same UI/UX.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
client/
├── src/
│   ├── components/       # Reusable components (Navigation, Footer, etc.)
│   ├── pages/           # Page components
│   │   ├── auth/        # Login, Register, ForgotPassword
│   │   ├── tenant/      # Tenant dashboard pages
│   │   ├── owner/       # Owner dashboard pages
│   │   └── admin/       # Admin dashboard pages
│   ├── data/            # Mock data (mockData.js)
│   ├── styles/          # CSS files (globals.css, dashboard.css)
│   ├── App.jsx          # Main app component with routing
│   └── main.jsx         # Entry point
├── index.html
└── package.json
```

## ✅ What's Already Created

- ✅ Project setup with Vite
- ✅ React Router configuration
- ✅ Global CSS styles (exact same as JSP)
- ✅ Dashboard CSS styles
- ✅ Mock data for all entities
- ✅ Navigation component (responsive)
- ✅ Footer component
- ✅ App.jsx with routing setup
- ✅ Folder structure

## 📝 What You Need to Create

### Page Components

Create these files following the patterns in `CREATE_PAGES_GUIDE.md`:

#### Public Pages
- [ ] `src/pages/Landing.jsx` - Home page with hero and search
- [ ] `src/pages/FindPG.jsx` - PG listing with filters
- [ ] `src/pages/PGDetails.jsx` - Individual PG details
- [ ] `src/pages/FindRoommate.jsx` - Roommate finder
- [ ] `src/pages/Reviews.jsx` - All reviews

#### Auth Pages
- [ ] `src/pages/auth/Login.jsx`
- [ ] `src/pages/auth/Register.jsx`
- [ ] `src/pages/auth/ForgotPassword.jsx`

#### Tenant Pages
- [ ] `src/pages/tenant/Dashboard.jsx`
- [ ] `src/pages/tenant/Bookings.jsx`
- [ ] `src/pages/tenant/SavedPGs.jsx`
- [ ] `src/pages/tenant/Messages.jsx`
- [ ] `src/pages/tenant/Profile.jsx`
- [ ] `src/pages/tenant/Settings.jsx`

#### Owner Pages
- [ ] `src/pages/owner/Dashboard.jsx`
- [ ] `src/pages/owner/Listings.jsx`
- [ ] `src/pages/owner/AddPG.jsx`
- [ ] `src/pages/owner/EditPG.jsx`
- [ ] `src/pages/owner/Bookings.jsx`
- [ ] `src/pages/owner/Inquiries.jsx`
- [ ] `src/pages/owner/Earnings.jsx`
- [ ] `src/pages/owner/Reviews.jsx`

#### Admin Pages
- [ ] `src/pages/admin/Dashboard.jsx`
- [ ] `src/pages/admin/Users.jsx`
- [ ] `src/pages/admin/Listings.jsx`
- [ ] `src/pages/admin/Approvals.jsx`
- [ ] `src/pages/admin/Reviews.jsx`
- [ ] `src/pages/admin/Reports.jsx`
- [ ] `src/pages/admin/Settings.jsx`

### Reusable Components
- [ ] `src/components/PGCard.jsx` - PG listing card
- [ ] `src/components/RoommateCard.jsx` - Roommate card
- [ ] `src/components/ReviewCard.jsx` - Review display
- [ ] `src/components/Sidebar.jsx` - Dashboard sidebar

## 🎨 Styling Guidelines

1. **Use existing CSS classes** from `globals.css`
2. **Inline styles** for component-specific styling
3. **CSS variables** for colors (already defined)
4. **Responsive design** - mobile-first approach
5. **Font Awesome icons** - already included in index.html

### Example Styling

```jsx
// Using CSS classes
<div className="card">
  <h3 className="text-xl font-semibold">Title</h3>
</div>

// Using inline styles
<div style={{
  backgroundColor: 'var(--color-primary-600)',
  padding: '1rem',
  borderRadius: '0.5rem'
}}>
  Content
</div>
```

## 📊 Mock Data Usage

All data is in `src/data/mockData.js`:

```jsx
import { mockPGListings, mockRoommates, mockReviews, mockUser } from '../data/mockData';

// Use in component
const FindPG = () => {
  const [listings, setListings] = useState(mockPGListings);
  // ...
};
```

## 🔄 React Patterns to Follow

### State Management
```jsx
const [state, setState] = useState(initialValue);
```

### Navigation
```jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/path');
```

### URL Parameters
```jsx
import { useParams } from 'react-router-dom';
const { id } = useParams();
```

### Form Handling
```jsx
const [formData, setFormData] = useState({ field: '' });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle submission
};
```

## 🎯 Key Features

- ✅ No backend required (uses mock data)
- ✅ Fully responsive design
- ✅ Same UI/UX as JSP version
- ✅ React Router for navigation
- ✅ Controlled forms
- ✅ Component-based architecture
- ✅ Modern React hooks (useState, useEffect)

## 📖 Documentation

- `PROJECT_STRUCTURE.md` - Detailed project structure
- `CREATE_PAGES_GUIDE.md` - Step-by-step guide to create each page
- JSP files in `PG-Finder java/src/main/webapp/WEB-INF/views/` - Reference for UI

## 🛠️ Development Tips

1. **Start with simple pages** (Login, Register)
2. **Copy JSP structure** and convert to JSX
3. **Test each page** before moving to next
4. **Use browser DevTools** for responsive testing
5. **Check console** for errors

## 📱 Responsive Breakpoints

```css
/* Mobile: default */
/* Tablet: 768px */
@media (min-width: 768px) { }
/* Desktop: 1024px */
@media (min-width: 1024px) { }
```

## 🎨 Color Palette

Already defined in CSS variables:
- Primary: Blue (#2563eb)
- Secondary: Green (#22c55e)
- Gray scale: 50-900
- Utility: Red, Amber, etc.

## 🚦 Next Steps

1. Create Landing.jsx (home page)
2. Create FindPG.jsx (PG listing)
3. Create Login.jsx and Register.jsx
4. Create dashboard pages
5. Test all routes
6. Add form validation
7. Polish UI/UX

## 📞 Support

Refer to:
- Original JSP files for UI reference
- `CREATE_PAGES_GUIDE.md` for detailed instructions
- `mockData.js` for available data structures

## 🎉 Success Criteria

- [ ] All pages render without errors
- [ ] Navigation works correctly
- [ ] Forms are functional
- [ ] Responsive on mobile/tablet/desktop
- [ ] Matches JSP UI exactly
- [ ] Mock data displays correctly

---

**Note**: This is a frontend-only application. All data is static/mock. No API calls are made.
