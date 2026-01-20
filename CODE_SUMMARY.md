# CodeForge Web Studio - Complete Code Files

## Project Structure
```
/app/
├── backend/
│   ├── .env
│   ├── server.py
│   ├── models.py
│   ├── chat_service.py
│   └── routes/
│       ├── __init__.py
│       ├── chat.py
│       └── contact.py
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.css
    │   ├── mock.js
    │   ├── components/
    │   │   ├── MatrixRain.jsx
    │   │   ├── ChatBot.jsx
    │   │   ├── Header.jsx
    │   │   └── Footer.jsx
    │   └── pages/
    │       ├── HomePage.jsx
    │       ├── AboutPage.jsx
    │       └── ContactPage.jsx
    ├── package.json
    └── tailwind.config.js
```

## BACKEND FILES

### 1. server.py
Located at: `/app/backend/server.py`
- Main FastAPI application
- Configures CORS, MongoDB connection
- Includes chat and contact route modules
- Health check endpoints

### 2. models.py
Located at: `/app/backend/models.py`
- Pydantic models for data validation
- ChatMessage, ChatSession, ChatRequest, ChatResponse
- ContactSubmission, ContactRequest, ContactResponse

### 3. chat_service.py
Located at: `/app/backend/chat_service.py`
- OpenAI GPT-5.2 integration using emergentintegrations
- System message configuration for CodeForge brand
- Error handling and fallback responses

### 4. routes/chat.py
Located at: `/app/backend/routes/chat.py`
- POST /api/chat - Handle chat messages
- GET /api/chat/history/{session_id} - Get chat history
- MongoDB integration for persistent chat sessions

### 5. routes/contact.py
Located at: `/app/backend/routes/contact.py`
- POST /api/contact - Handle contact form submissions
- GET /api/contact/submissions - Get all submissions (admin)
- MongoDB storage for contact data

### 6. .env
Located at: `/app/backend/.env`
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=sk-emergent-b141fCd99Fa9d6a0b2
```

## FRONTEND FILES

### 7. App.js
Located at: `/app/frontend/src/App.js`
- Main React application
- Routes configuration (Home, About, Contact)

### 8. App.css
Located at: `/app/frontend/src/App.css`
- Scroll animations
- Floating animations
- Custom scrollbar styling

### 9. index.css
Located at: `/app/frontend/src/index.css`
- Tailwind CSS imports
- Dark theme configuration
- CSS variables for colors

### 10. mock.js
Located at: `/app/frontend/src/mock.js`
- Demo website data (8 categories)
- Services data
- Chat mock data (no longer used after backend integration)

### 11. components/MatrixRain.jsx
Located at: `/app/frontend/src/components/MatrixRain.jsx`
- Canvas-based Matrix rain effect
- Binary (0s and 1s) animation
- Responsive to window resize

### 12. components/ChatBot.jsx
Located at: `/app/frontend/src/components/ChatBot.jsx`
- AI chatbot UI component
- Real-time communication with backend API
- Session management with localStorage
- Message history display

### 13. components/Header.jsx
Located at: `/app/frontend/src/components/Header.jsx`
- Fixed navigation header
- Mobile-responsive menu
- Active page highlighting
- Logo with hover effects

### 14. components/Footer.jsx
Located at: `/app/frontend/src/components/Footer.jsx`
- Social media links
- Quick links
- Contact information
- Copyright notice

### 15. pages/HomePage.jsx
Located at: `/app/frontend/src/pages/HomePage.jsx`
- Hero section with animations
- Services showcase (6 services)
- Website catalogue with category filters (8 categories)
- CTA sections
- Scroll animations

### 16. pages/AboutPage.jsx
Located at: `/app/frontend/src/pages/AboutPage.jsx`
- Company story
- Values section (4 values)
- Stats section
- Team section placeholder

### 17. pages/ContactPage.jsx
Located at: `/app/frontend/src/pages/ContactPage.jsx`
- Contact form with validation
- Real-time form submission to backend
- Contact information cards
- Success/error handling
- Map placeholder section

## KEY FEATURES

### Backend
✅ FastAPI REST API
✅ OpenAI GPT-5.2 AI chatbot integration
✅ MongoDB for data persistence
✅ Chat session management
✅ Contact form processing
✅ CORS enabled
✅ Error handling

### Frontend
✅ React with React Router
✅ Tailwind CSS + shadcn/ui components
✅ Matrix rain animation background
✅ Dark green-black coding theme
✅ Fully responsive design
✅ Scroll animations
✅ Real-time AI chatbot
✅ Form validation
✅ Local storage for chat sessions

## API ENDPOINTS

### Chat Endpoints
- `POST /api/chat` - Send message and get AI response
- `GET /api/chat/history/{session_id}` - Get chat history

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact/submissions` - Get all submissions (admin)

### Health Check
- `GET /api/` - API status check

## ENVIRONMENT VARIABLES

### Backend (.env)
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name
- `CORS_ORIGINS` - Allowed CORS origins
- `EMERGENT_LLM_KEY` - OpenAI API key via Emergent

### Frontend (.env)
- `REACT_APP_BACKEND_URL` - Backend API URL

## INSTALLATION & SETUP

### Backend
```bash
cd /app/backend
pip install -r requirements.txt
# Ensure MongoDB is running
# Start with supervisorctl or:
uvicorn server:app --host 0.0.0.0 --port 8001
```

### Frontend
```bash
cd /app/frontend
yarn install
yarn start
```

## DEPLOYMENT NOTES
- Backend runs on port 8001
- Frontend runs on port 3000
- MongoDB runs on port 27017
- All services managed by supervisor
- Environment variables configured in .env files

## CUSTOMIZATION POINTS
1. Replace placeholder content in About page
2. Update contact information in Footer and Contact page
3. Add your own demo website images
4. Customize AI chatbot system message
5. Add email notification for contact forms
6. Extend services and categories as needed

---
**Built with:** React, FastAPI, MongoDB, OpenAI GPT-5.2, Tailwind CSS, shadcn/ui
