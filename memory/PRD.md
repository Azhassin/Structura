# PixelForge Studio - Product Requirements Document

## Original Problem Statement
A professional portfolio website for a web design studio called "PixelForge Studio" with:
- Modern, clean design suitable for entrepreneurs
- AI chatbot integration using OpenAI GPT-5.2
- User-controlled scroll animations
- Dynamic background color transitions (Blue-Teal theme)

## What's Been Implemented

### Core Features
1. **Full-Stack Architecture**
   - React frontend with TailwindCSS and Shadcn UI
   - FastAPI backend with MongoDB
   - AI chatbot using OpenAI GPT-5.2 (Emergent LLM Key)

2. **Pages Implemented**
   - Homepage with hero, services (animated icons), portfolio section
   - About page with story and values sections (team removed)
   - Contact page with email/phone only (location/hours removed)

3. **Design Theme - Blue/Teal Gradient**
   - Primary colors: Blue (#0ea5e9) to Teal (#14b8a6)
   - Scroll-based background gradient transition
   - Consistent color scheme across all pages

4. **Interactive Features**
   - Service icon animations on hover:
     - Palette: color inversion
     - Cart: rolling animation
     - Phone: ringing animation
     - Bot: reacting animation
     - Search: zoom animation
     - Wrench: turning animation
   - Value icon animations (About page):
     - Target: arrow hitting bullseye
     - Heart: fill with white
     - Rocket: launch upwards
     - Medal: shining effect
   - Portfolio filter (fixed category switching bug)
   - 3D card tilt effects on hover

5. **Chatbot Features**
   - Short, professional responses
   - Demo request handling with portfolio links
   - Session management

6. **Contact Form with Email (REQUIRES API KEY)**
   - Form submission saves to MongoDB
   - Email sending to naseemazhan@outlook.com via Resend
   - AI-enhanced message formatting

## API Endpoints
- `POST /api/chat` - Chat with AI assistant
- `GET /api/chat/history/{session_id}` - Get chat history
- `POST /api/contact` - Submit contact form (DB only)
- `POST /api/contact/send-email` - Submit with email sending
- `GET /api/contact/submissions` - Get all submissions

## Environment Variables Required
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
EMERGENT_LLM_KEY=sk-emergent-xxx
RESEND_API_KEY=re_xxx (REQUIRED for email functionality)
SENDER_EMAIL=onboarding@resend.dev
```

## Database Schema (MongoDB)
- `chat_sessions`: session_id, messages[], created_at, updated_at
- `contact_submissions`: name, email, subject, message, submitted_at

## Completed in Latest Session (Dec 2025)
- ✅ Removed "Trusted by 500+ businesses" badge from hero
- ✅ Removed stats section (projects, satisfaction, team)
- ✅ Added animated icons for services section
- ✅ Fixed portfolio category filter glitch
- ✅ Added value icon animations on About page
- ✅ Removed Team section from About page
- ✅ Removed Location and Business Hours from Contact page
- ✅ Updated chatbot for shorter responses
- ✅ Added demo request handling in chatbot
- ✅ Set up email integration with AI enhancement (needs API key)

## Pending/Notes
- **RESEND_API_KEY REQUIRED**: Email functionality needs Resend API key to work
- Without key, form saves to DB but doesn't send emails

## Backlog / Future Tasks
1. **P1**: Get Resend API key for email functionality
2. **P1**: Backend for portfolio section (replace mock data)
3. **P2**: Add more demo websites to portfolio
4. **P3**: Blog functionality
5. **P3**: Newsletter subscription
