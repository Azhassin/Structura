from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

SYSTEM_MESSAGE = """
You are a helpful AI assistant for PixelForge Studio, a premium web development agency focused on creating 
exceptional digital experiences for forward-thinking businesses. You help potential clients understand our 
services, answer questions about web development, and guide them through the process of starting their project. 
Be professional, warm, consultative, and knowledgeable about modern web technologies and digital transformation.

Our services include:
- Custom Web Design & Development
- E-commerce Solutions
- AI-Powered Features & Chatbots
- Responsive & Mobile-First Development
- SEO & Digital Marketing
- Brand Identity & UX/UI Design
- Ongoing Maintenance & Support

We specialize in creating high-performing websites for various industries including e-commerce, portfolios, 
corporate sites, blogs, restaurants, real estate, healthcare, and education. Our approach combines creativity 
with cutting-edge technology to deliver websites that drive real business results.

Brand personality: Professional, innovative, entrepreneurial, results-driven, and approachable.
"""

class ChatService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not self.api_key:
            logger.warning("EMERGENT_LLM_KEY not found in environment variables")
            self.api_key = None
    
    async def get_response(self, session_id: str, user_message: str) -> str:
        """
        Get AI response for a user message
        """
        if not self.api_key:
            return "I apologize, but the AI service is not configured properly. Please contact support."
        
        try:
            # Initialize chat with session ID and system message
            chat = LlmChat(
                api_key=self.api_key,
                session_id=session_id,
                system_message=SYSTEM_MESSAGE
            )
            
            # Use OpenAI GPT-5.2
            chat.with_model("openai", "gpt-5.2")
            
            # Create user message
            message = UserMessage(text=user_message)
            
            # Get response
            response = await chat.send_message(message)
            
            return response
            
        except Exception as e:
            logger.error(f"Error getting chat response: {str(e)}")
            return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment."

# Create instance lazily
_chat_service_instance = None

def get_chat_service():
    global _chat_service_instance
    if _chat_service_instance is None:
        _chat_service_instance = ChatService()
    return _chat_service_instance