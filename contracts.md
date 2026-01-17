# API Contracts & Integration Plan - CodeForge Web Studio

## Backend Implementation Overview

### 1. AI Chatbot Integration
**Technology:** OpenAI GPT-5.2 via emergentintegrations library

**Mock Data Location:** `/app/frontend/src/mock.js`
- `mockChatMessages` - Initial greeting message
- `mockChatResponses` - Array of pre-defined responses

**Backend Requirements:**
- Install emergentintegrations library
- Create chat session management with MongoDB
- Store chat history persistently
- Implement streaming/non-streaming responses

**API Endpoint:**
```
POST /api/chat
Request Body:
{
  "session_id": "string (UUID)",
  "message": "string",
  "user_id": "optional string"
}

Response:
{
  "response": "string",
  "session_id": "string"
}
```

**MongoDB Schema:**
```python
ChatSession:
  - session_id: str (unique)
  - messages: List[Message]
  - created_at: datetime
  - updated_at: datetime

Message:
  - role: str ("user" | "assistant")
  - content: str
  - timestamp: datetime
```

### 2. Contact Form Submission
**Mock Data Location:** Form data is currently console.logged only

**Backend Requirements:**
- Store contact form submissions in MongoDB
- Optional: Send email notification to admin

**API Endpoint:**
```
POST /api/contact
Request Body:
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}

Response:
{
  "success": true,
  "message": "Thank you for contacting us!"
}
```

**MongoDB Schema:**
```python
ContactSubmission:
  - id: str (UUID)
  - name: str
  - email: str
  - subject: str
  - message: str
  - submitted_at: datetime
```

### 3. Frontend Integration Changes

**Files to Update:**
1. `/app/frontend/src/components/ChatBot.jsx`
   - Replace mock responses with real API calls
   - Add session_id management (localStorage)
   - Handle API errors gracefully

2. `/app/frontend/src/pages/ContactPage.jsx`
   - Replace console.log with API call
   - Show success/error messages

**Environment Variables:**
- Backend already has `EMERGENT_LLM_KEY` configured
- Frontend uses `REACT_APP_BACKEND_URL` for API calls

### 4. Implementation Steps
1. Install emergentintegrations in backend
2. Create MongoDB models for chat sessions and contact submissions
3. Implement chat API endpoint with OpenAI integration
4. Implement contact form API endpoint
5. Update frontend to use real APIs
6. Test all flows

### 5. System Message for AI Chatbot
```
You are a helpful AI assistant for CodeForge Web Studio, a professional web development agency. 
You help potential clients understand our services, answer questions about web development, 
and guide them through the process of starting their project. Be professional, friendly, and knowledgeable 
about web technologies, e-commerce, portfolio sites, corporate websites, and AI integration.
```
