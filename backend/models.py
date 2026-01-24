from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, ForwardRef
from datetime import datetime
import uuid


# ========== AUTH MODELS ==========
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    is_admin: bool = False
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ========== CHAT MODELS ==========
class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatSession(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    messages: List['ChatMessage'] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    response: str
    session_id: str
    navigate: Optional[str] = None


# ========== CONTACT MODELS ==========
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    submitted_at: datetime
    is_read: bool = False


# ========== PORTFOLIO MODELS ==========
class PortfolioCreate(BaseModel):
    title: str
    description: str
    category: str
    image: str
    features: List[str] = []
    demo_url: Optional[str] = None

class PortfolioUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    features: Optional[List[str]] = None
    demo_url: Optional[str] = None

class PortfolioResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str
    image: str
    features: List[str] = []
    demo_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
