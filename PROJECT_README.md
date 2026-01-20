# CodeForge Web Studio - Complete Project

## 🎉 Project Overview

**CodeForge Web Studio** is a professional web design services website with:
- Dark Matrix-themed design with green-black coding interface
- AI-powered chatbot using OpenAI GPT-5.2
- Full-stack application (React + FastAPI + MongoDB)
- Responsive design with smooth animations
- Contact form with backend integration
- Website catalogue with 8 industry categories

---

## 📦 What's Included

```
codeforge-web-studio-complete/
├── backend/                  # FastAPI Backend
│   ├── server.py            # Main FastAPI application
│   ├── models.py            # Pydantic data models
│   ├── chat_service.py      # OpenAI GPT-5.2 integration
│   ├── routes/
│   │   ├── chat.py         # Chat API endpoints
│   │   └── contact.py      # Contact form endpoints
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
│
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── App.js          # Main React app
│   │   ├── App.css         # Custom animations
│   │   ├── mock.js         # Demo website data
│   │   ├── components/
│   │   │   ├── MatrixRain.jsx   # Binary rain animation
│   │   │   ├── ChatBot.jsx      # AI chatbot component
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   └── ui/              # Shadcn UI components
│   │   └── pages/
│   │       ├── HomePage.jsx     # Landing page
│   │       ├── AboutPage.jsx    # About page
│   │       └── ContactPage.jsx  # Contact page
│   ├── package.json         # Node dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── .env                 # Frontend environment
│
├── contracts.md             # API contracts documentation
└── CODE_SUMMARY.md          # Detailed code overview
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and Yarn
- Python 3.11+
- MongoDB running locally

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# The .env file is already configured with:
# - MONGO_URL="mongodb://localhost:27017"
# - DB_NAME="test_database"
# - EMERGENT_LLM_KEY (for OpenAI integration)

# Start the backend server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend will run on: **http://localhost:8001**

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# The .env file should contain:
# REACT_APP_BACKEND_URL=http://localhost:8001

# Start the development server
yarn start
```

Frontend will run on: **http://localhost:3000**

---

## 🔑 Environment Variables

### Backend (.env)
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=sk-emergent-b141fCd99Fa9d6a0b2
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Note:** The `EMERGENT_LLM_KEY` is a universal key that works with OpenAI, Anthropic, and Google AI models through the emergentintegrations library.

---

## 🎯 Features

### ✅ Frontend Features
- **Matrix Rain Background** - Animated binary (0s and 1s) falling effect
- **Hero Section** - Engaging introduction with floating geometric elements
- **Services Showcase** - 6 service cards with icons and descriptions
- **Website Catalogue** - 8 demo websites across different industries
- **Category Filtering** - Filter websites by E-commerce, Portfolio, Corporate, etc.
- **AI Chatbot** - Floating chat button with real-time AI responses
- **Contact Form** - Fully functional with backend integration
- **Scroll Animations** - Smooth fade-in animations on scroll
- **Responsive Design** - Works perfectly on all devices

### ✅ Backend Features
- **RESTful API** - FastAPI with automatic documentation
- **AI Integration** - OpenAI GPT-5.2 via emergentintegrations
- **Chat Sessions** - Persistent chat history in MongoDB
- **Contact Management** - Store and retrieve form submissions
- **CORS Enabled** - Ready for cross-origin requests
- **Error Handling** - Comprehensive error responses

---

## 📡 API Endpoints

### Chat Endpoints
```
POST /api/chat
Body: { "session_id": "string", "message": "string" }
Response: { "response": "string", "session_id": "string" }

GET /api/chat/history/{session_id}
Response: { "messages": [...] }
```

### Contact Endpoints
```
POST /api/contact
Body: { "name": "string", "email": "string", "subject": "string", "message": "string" }
Response: { "success": true, "message": "Thank you..." }

GET /api/contact/submissions
Response: { "submissions": [...] }
```

### Health Check
```
GET /api/
Response: { "message": "CodeForge Web Studio API is running" }
```

---

## 🎨 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Beautiful UI components
- **Axios** - HTTP client
- **Lucide React** - Modern icon library

### Backend
- **FastAPI** - High-performance Python framework
- **Pydantic** - Data validation
- **Motor** - Async MongoDB driver
- **emergentintegrations** - Universal LLM integration library
- **OpenAI GPT-5.2** - AI-powered chatbot

### Database
- **MongoDB** - NoSQL database for flexible data storage

---

## 📝 Customization Guide

### 1. Update Business Information
Edit `/frontend/src/components/Footer.jsx` and `/frontend/src/pages/ContactPage.jsx`:
- Company email, phone, address
- Social media links

### 2. Modify About Page Content
Edit `/frontend/src/pages/AboutPage.jsx`:
- Company story
- Values and mission
- Team information

### 3. Add More Services
Edit `/frontend/src/mock.js`:
- Add to `services` array
- Update icon mappings

### 4. Customize AI Chatbot Behavior
Edit `/backend/chat_service.py`:
- Modify `SYSTEM_MESSAGE` to change chatbot personality
- Adjust response style and tone

### 5. Change Color Theme
Edit `/frontend/src/index.css` and `/frontend/tailwind.config.js`:
- Modify color variables
- Update Tailwind color scheme

---

## 🧪 Testing

### Test Backend
```bash
# Test health check
curl http://localhost:8001/api/

# Test chat endpoint
curl -X POST http://localhost:8001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id": "test123", "message": "Hello!"}'

# Test contact form
curl -X POST http://localhost:8001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "subject": "Test", "message": "Hello"}'
```

### Test Frontend
- Open http://localhost:3000
- Click chatbot button and test AI responses
- Fill out contact form and submit
- Test navigation between pages
- Try category filtering in catalogue section

---

## 📂 MongoDB Collections

The application creates these collections automatically:

1. **chat_sessions**
   - Stores chat conversations with messages
   - Indexed by session_id

2. **contact_submissions**
   - Stores contact form submissions
   - Includes name, email, subject, message, timestamp

---

## 🔐 Security Notes

1. **API Keys**: The included `EMERGENT_LLM_KEY` is for demo purposes. Replace with your own key for production.

2. **CORS**: Currently set to allow all origins (`*`). Restrict this in production:
   ```env
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Environment Variables**: Never commit `.env` files to version control.

4. **MongoDB**: Ensure MongoDB has authentication enabled for production.

---

## 🚢 Deployment Tips

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
yarn build
# Deploy the 'build' folder
```

### Backend Deployment (Railway/Render/AWS)
```bash
cd backend
# Ensure all dependencies in requirements.txt
# Set environment variables in deployment platform
# Use gunicorn or uvicorn for production
```

### Database
- Use MongoDB Atlas for managed database
- Update `MONGO_URL` in backend .env

---

## 📚 Additional Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Shadcn UI**: https://ui.shadcn.com/
- **MongoDB**: https://www.mongodb.com/docs/

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongosh` or check service
- Verify Python dependencies: `pip install -r requirements.txt`
- Check port 8001 is not in use

### Frontend won't start
- Delete `node_modules` and reinstall: `rm -rf node_modules && yarn install`
- Check port 3000 is not in use
- Verify REACT_APP_BACKEND_URL is correct

### AI Chatbot not responding
- Check backend logs for errors
- Verify EMERGENT_LLM_KEY is set correctly
- Test API endpoint: `curl http://localhost:8001/api/chat`

### Contact form not working
- Open browser console to see error messages
- Check backend is running on correct port
- Verify MongoDB connection

---

**Built with ❤️ using React, FastAPI, MongoDB, and OpenAI**

Enjoy building with CodeForge Web Studio! 🚀
