# PixelForge-AZ Studio - Product Requirements Document

## Original Problem Statement
A professional portfolio website for a web design studio called "PixelForge-AZ Studio" with:
- Modern, clean design suitable for entrepreneurs
- AI chatbot integration using OpenAI GPT-5.2
- User-controlled scroll animations
- Dynamic background color transitions (Blue-Teal theme)
- Full backend with authentication and admin panel

## What's Been Implemented

### Frontend Features
1. **Pages**
   - Homepage with hero, services (animated icons), portfolio section
   - About page with story and values sections
   - Contact page with email/phone contact form
   - Login/Register page
   - Admin Panel (dashboard, portfolio management, submissions)

2. **Design Theme - Blue/Teal Gradient**
   - Primary colors: Blue (#0ea5e9) to Teal (#14b8a6)
   - Scroll-based background gradient transition
   - Consistent color scheme across all pages

3. **Interactive Features**
   - Service icon animations on hover (palette, cart, phone, bot, search, wrench)
   - Value icon animations (target, heart, rocket, medal)
   - Card pop-up animations
   - Portfolio category filter

### Backend Features
1. **Authentication System**
   - JWT token-based auth
   - User registration (first user = admin)
   - Login/logout
   - Protected routes

2. **Portfolio Management (CRUD)**
   - Create, Read, Update, Delete projects
   - Public read access
   - Admin-only write access

3. **Contact Form**
   - Form submission storage in MongoDB
   - Email sending (requires Resend API key)
   - AI-enhanced message formatting

4. **AI Chatbot**
   - OpenAI GPT-5.2 integration
   - Session management
   - Short, professional responses
   - Demo request handling

5. **Admin Panel**
   - Dashboard with statistics
   - Portfolio project management
   - Contact submission viewer
   - Mark as read / delete submissions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Portfolio
- `GET /api/portfolio` - List all (public)
- `GET /api/portfolio/{id}` - Get one (public)
- `POST /api/portfolio` - Create (admin)
- `PUT /api/portfolio/{id}` - Update (admin)
- `DELETE /api/portfolio/{id}` - Delete (admin)

### Admin
- `GET /api/admin/dashboard` - Stats
- `GET /api/admin/submissions` - All submissions
- `PUT /api/admin/submissions/{id}/read` - Mark read
- `DELETE /api/admin/submissions/{id}` - Delete
- `GET /api/admin/users` - List users

### Chat & Contact
- `POST /api/chat` - Chat with AI
- `GET /api/chat/history/{session_id}` - Chat history
- `POST /api/contact` - Submit form
- `POST /api/contact/send-email` - Submit with email

## Database Schema (MongoDB)
- `users`: id, email, name, password (hashed), is_admin, created_at
- `portfolio`: id, title, description, category, image, features, demo_url, created_at, updated_at
- `contact_submissions`: id, name, email, subject, message, submitted_at, is_read
- `chat_sessions`: session_id, messages[], created_at, updated_at

## Admin Credentials
- Email: admin@pixelforge.com
- Password: admin123

## Environment Variables
```
# Backend (.env)
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
EMERGENT_LLM_KEY=sk-emergent-xxx
RESEND_API_KEY= (optional, for email)
RECIPIENT_EMAIL=naseemazhan@outlook.com
JWT_SECRET=pixelforge-az-secret-key-2024

# Frontend (.env)
REACT_APP_BACKEND_URL=https://...
```

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
│   ├── chat_service.py
│   ├── models.py
│   └── server.py
├── frontend/src/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── AdminPage.jsx
│   └── components/
│       ├── Header.jsx
│       ├── Footer.jsx
│       ├── ChatBot.jsx
│       └── ...
```

## Completed Features
- ✅ Full authentication system
- ✅ Portfolio CRUD backend
- ✅ Admin panel frontend
- ✅ Contact submissions management
- ✅ Dashboard statistics
- ✅ Dynamic portfolio loading from API
- ✅ All icon animations
- ✅ Blue-teal theme

## Pending
- Email sending (needs Resend API key)
