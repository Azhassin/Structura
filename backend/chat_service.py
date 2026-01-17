from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

SYSTEM_MESSAGE = """
You are a helpful AI assistant for CodeForge Web Studio, a professional web development agency. 
You help potential clients understand our services, answer questions about web development, 
and guide them through the process of starting their project. Be professional, friendly, and knowledgeable 
about web technologies, e-commerce, portfolio sites, corporate websites, and AI integration.

Our services include:
- Custom Web Design
- E-commerce Solutions
- Responsive Development
- AI Integration
- SEO Optimization
- Maintenance & Support

We specialize in creating websites for various industries including e-commerce, portfolios, 
corporate sites, blogs, restaurants, real estate, healthcare, and education.
"""

class ChatService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not self.api_key:
            raise ValueError("EMERGENT_LLM_KEY not found in environment variables")
    
    async def get_response(self, session_id: str, user_message: str) -> str:
        """
        Get AI response for a user message
        """
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

chat_service = ChatService()