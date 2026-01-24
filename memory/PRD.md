# Structura Studio - Product Requirements Document

## Original Problem Statement
A professional portfolio website for a web design studio called "Structura Studio" with:
- Modern, clean design with blue-to-teal color palette
- AI chatbot integration with navigation capabilities
- Dynamic portfolio section with demo previews for each category
- Contact form with email integration
- Admin panel with authentication

## What's Been Implemented

### Frontend Features
1. **Pages**
   - Homepage with hero, services (animated icons), portfolio section
   - About page with story and values sections
   - Contact page with email/phone contact form
   - Login/Register page
   - Admin Panel (dashboard, portfolio management, submissions)
   - **8 Demo Preview Pages** (E-commerce, Portfolio, Corporate, Blog, Restaurant, Real Estate, Healthcare, Education)

2. **Design Theme - Blue/Teal Gradient**
   - Primary colors: Blue (#0ea5e9) to Teal (#14b8a6)
   - Scroll-based background gradient transition
   - Fixed 'g' clipping issue in gradient text

3. **Interactive Features**
   - Service icon animations on hover
   - Portfolio cards with "View Demo →" overlay on hover
   - Click-through to demo preview pages
   - Card pop-up animations
   - Portfolio category filter

4. **AI Chatbot with Navigation**
   - Detects navigation intents (pages, demos)
   - Auto-redirects users to requested destinations
   - "Go there now" button for manual navigation
   - Supports: home, about, contact, portfolio, services, all 8 demo categories

### Backend Features
1. **Authentication System**
   - JWT token-based auth
   - User registration (first user = admin)
   - Login/logout
   - Protected routes

2. **Portfolio Management (CRUD)**
   - 8 demo projects pre-seeded (one per category)
   - Create, Read, Update, Delete projects
   - Public read access / Admin-only write access

3. **Contact Form with Email**
   - Form submission storage in MongoDB
   - **Email sending via Resend API** (configured)
   - AI-enhanced message formatting
   - Sends to: naseemazhan@outlook.com

4. **AI Chatbot Service**
   - OpenAI GPT-5.2 via Emergent LLM Key
   - Navigation command detection
   - Session management
   - Short, professional responses

5. **Admin Panel**
   - Dashboard with statistics
   - Portfolio project management
   - Contact submission viewer

## Demo Preview Pages
Each portfolio category has a fully-designed demo page:

| Category | Demo Name | Theme Color | Route |
|----------|-----------|-------------|-------|
| E-commerce | LuxeCart Pro | Purple | /demo/e-commerce |
| Portfolio | CreativeShowcase | Amber/Dark | /demo/portfolio |
| Corporate | TechCorp Solutions | Blue | /demo/corporate |
| Blog | TechInsider Blog | Emerald | /demo/blog |
| Restaurant | Bistro Elegante | Amber/Gold | /demo/restaurant |
| Real Estate | PrimeProperty Hub | Sky Blue | /demo/real-estate |
| Healthcare | MedCare Clinic | Teal | /demo/healthcare |
| Education | LearnHub Academy | Violet | /demo/education |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Portfolio
- `GET /api/portfolio` - List all (public)
- `POST /api/portfolio` - Create (admin)
- `PUT /api/portfolio/{id}` - Update (admin)
- `DELETE /api/portfolio/{id}` - Delete (admin)

### Chat (with Navigation)
- `POST /api/chat` - Chat with AI (returns `response`, `session_id`, `navigate`)
- `GET /api/chat/history/{session_id}` - Chat history

### Contact
- `POST /api/contact` - Submit form (saves to DB)
- `POST /api/contact/send-email` - Submit with email notification

### Admin
- `GET /api/admin/dashboard` - Stats
- `GET /api/admin/submissions` - All contact submissions
- `PUT /api/admin/submissions/{id}/read` - Mark read
- `DELETE /api/admin/submissions/{id}` - Delete

## Environment Variables
```
# Backend (.env)
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
EMERGENT_LLM_KEY=sk-emergent-xxx
RESEND_API_KEY=re_xxx (configured)
RECIPIENT_EMAIL=naseemazhan@outlook.com

# Frontend (.env)
REACT_APP_BACKEND_URL=https://...
```

## Contact Information (on website)
- Email: naseemazhan@outlook.com
- Phone: +44 7342328508

## File Structure
```
/app
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── chat.py
│   │   ├── contact.py
│   │   ├── portfolio.py
│   │   └── admin.py
│   ├── chat_service.py (with navigation detection)
│   ├── models.py
│   └── server.py
├── frontend/src/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── AdminPage.jsx
│   │   ├── DemoPage.jsx (router for demos)
│   │   └── demos/
│   │       ├── EcommerceDemo.jsx
│   │       ├── PortfolioDemo.jsx
│   │       ├── CorporateDemo.jsx
│   │       ├── BlogDemo.jsx
│   │       ├── RestaurantDemo.jsx
│   │       ├── RealEstateDemo.jsx
│   │       ├── HealthcareDemo.jsx
│   │       └── EducationDemo.jsx
│   └── components/
│       ├── Header.jsx
│       ├── Footer.jsx
│       ├── ChatBot.jsx (with navigation)
│       └── ...
```

## Completed Features (January 2026)
- ✅ Full authentication system (JWT)
- ✅ Portfolio CRUD backend
- ✅ Admin panel frontend
- ✅ Contact form with Resend email integration
- ✅ AI Chatbot with OpenAI GPT-5.2
- ✅ Complete rebrand to "Structura"
- ✅ Fixed 'g' clipping in hero text
- ✅ 8 Demo preview pages (one per category)
- ✅ Clickable portfolio cards → demo pages
- ✅ Chatbot navigation (auto-redirect to pages/demos)
- ✅ "View Demo →" hover overlay on portfolio cards
- ✅ Updated contact info (email & phone)
- ✅ Removed 3D tilt effect from contact cards
- ✅ "Get Started" button → Contact form scroll

## Future Enhancements
- User role management (admin vs editor)
- Email notifications for new contact submissions
- Animation performance refinement
- Add more portfolio content via admin
