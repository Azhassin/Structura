from fastapi import APIRouter, HTTPException
from models import ChatRequest, ChatResponse, ChatSession, ChatMessage
from chat_service import get_chat_service
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat messages and return AI responses
    """
    try:
        # Generate session ID if not provided
        session_id = request.session_id if request.session_id else ChatSession().session_id
        
        # Get existing session or create new one
        existing_session = await db.chat_sessions.find_one({"session_id": session_id})
        
        # Create user message
        user_message = ChatMessage(
            role="user",
            content=request.message,
            timestamp=datetime.utcnow()
        )
        
        # Get AI response (now returns dict with message and navigate)
        chat_service = get_chat_service()
        ai_response = await chat_service.get_response(session_id, request.message)
        
        ai_response_text = ai_response.get("message", "")
        navigate_path = ai_response.get("navigate")
        
        # Create assistant message
        assistant_message = ChatMessage(
            role="assistant",
            content=ai_response_text,
            timestamp=datetime.utcnow()
        )
        
        # Update or create session
        if existing_session:
            # Append messages to existing session
            await db.chat_sessions.update_one(
                {"session_id": session_id},
                {
                    "$push": {
                        "messages": {
                            "$each": [
                                user_message.dict(),
                                assistant_message.dict()
                            ]
                        }
                    },
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
        else:
            # Create new session
            new_session = ChatSession(
                session_id=session_id,
                messages=[user_message, assistant_message],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            await db.chat_sessions.insert_one(new_session.dict())
        
        return ChatResponse(
            response=ai_response_text,
            session_id=session_id,
            navigate=navigate_path
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process chat message")

@router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """
    Get chat history for a session
    """
    try:
        session = await db.chat_sessions.find_one({"session_id": session_id})
        if not session:
            return {"messages": []}
        
        return {"messages": session.get("messages", [])}
        
    except Exception as e:
        logger.error(f"Error getting chat history: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve chat history")
