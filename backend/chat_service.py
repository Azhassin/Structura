from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
import logging
import re
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Navigation routes for the website
NAVIGATION_ROUTES = {
    "home": "/",
    "about": "/about",
    "contact": "/contact",
    "login": "/login",
    "admin": "/admin",
    "portfolio": "/#portfolio",
    "services": "/#services",
}

# Demo website categories and their preview URLs
DEMO_CATEGORIES = {
    "e-commerce": "/demo/e-commerce",
    "ecommerce": "/demo/e-commerce",
    "portfolio": "/demo/portfolio",
    "corporate": "/demo/corporate",
    "blog": "/demo/blog",
    "restaurant": "/demo/restaurant",
    "real estate": "/demo/real-estate",
    "real-estate": "/demo/real-estate",
    "realestate": "/demo/real-estate",
    "healthcare": "/demo/healthcare",
    "health": "/demo/healthcare",
    "medical": "/demo/healthcare",
    "education": "/demo/education",
    "learning": "/demo/education",
    "school": "/demo/education",
}

SYSTEM_MESSAGE = """You are the AI assistant for Structura Studio, a premium web development agency.

IMPORTANT RULES:
1. Keep responses SHORT and TO THE POINT (2-3 sentences max)
2. Be professional but friendly
3. Focus on value - how we can help them

Our services:
- Custom Web Design
- E-commerce Solutions  
- AI Integration
- Mobile-First Development
- SEO & Marketing

NAVIGATION COMMANDS:
When users ask to go somewhere or see something, include a navigation command in your response.

Use this EXACT format: [NAV:/path]

Available navigation commands:
- [NAV:/] - Home page
- [NAV:/about] - About page
- [NAV:/contact] - Contact page
- [NAV:/login] - Login page
- [NAV:/#portfolio] - Portfolio section
- [NAV:/#services] - Services section
- [NAV:/demo/e-commerce] - E-commerce demo
- [NAV:/demo/portfolio] - Portfolio demo
- [NAV:/demo/corporate] - Corporate demo
- [NAV:/demo/blog] - Blog demo
- [NAV:/demo/restaurant] - Restaurant demo
- [NAV:/demo/real-estate] - Real Estate demo
- [NAV:/demo/healthcare] - Healthcare demo
- [NAV:/demo/education] - Education demo

EXAMPLES:
User: "Show me the contact page"
Response: "Taking you to our contact page now! [NAV:/contact]"

User: "I want to see an e-commerce demo"
Response: "Let me show you our e-commerce demo - LuxeCart Pro! [NAV:/demo/e-commerce]"

User: "Where can I see your portfolio?"
Response: "Here's our portfolio with all our work! [NAV:/#portfolio]"

User: "Do you have a restaurant website example?"
Response: "Yes! Check out Bistro Elegante, our restaurant demo! [NAV:/demo/restaurant]"

ALWAYS include the [NAV:] command when the user wants to navigate somewhere or see a demo."""

class ChatService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not self.api_key:
            logger.warning("EMERGENT_LLM_KEY not found in environment variables")
            self.api_key = None
    
    def detect_navigation_intent(self, message: str) -> dict:
        """
        Detect if the user wants to navigate somewhere and return navigation info
        """
        msg_lower = message.lower()
        
        # Check for demo requests
        demo_keywords = ['demo', 'example', 'show me', 'see', 'preview', 'look at', 'view']
        has_demo_intent = any(kw in msg_lower for kw in demo_keywords)
        
        if has_demo_intent:
            for category, path in DEMO_CATEGORIES.items():
                if category in msg_lower:
                    return {
                        "should_navigate": True,
                        "path": path,
                        "type": "demo",
                        "category": category
                    }
        
        # Check for page navigation requests
        nav_keywords = ['go to', 'take me to', 'navigate to', 'where is', 'show me', 'open', 'find']
        has_nav_intent = any(kw in msg_lower for kw in nav_keywords)
        
        if has_nav_intent:
            for page, path in NAVIGATION_ROUTES.items():
                if page in msg_lower:
                    return {
                        "should_navigate": True,
                        "path": path,
                        "type": "page",
                        "page": page
                    }
        
        return {"should_navigate": False}
    
    def extract_navigation_from_response(self, response: str) -> tuple:
        """
        Extract navigation command from AI response
        Returns (cleaned_response, navigation_path)
        """
        nav_pattern = r'\[NAV:([^\]]+)\]'
        matches = re.findall(nav_pattern, response)
        
        if matches:
            nav_path = matches[0]
            # Remove navigation command from displayed message
            cleaned_response = re.sub(nav_pattern, '', response).strip()
            return cleaned_response, nav_path
        
        return response, None
    
    async def get_response(self, session_id: str, user_message: str) -> dict:
        """
        Get AI response for a user message
        Returns dict with 'message' and optionally 'navigate' path
        """
        if not self.api_key:
            return {
                "message": "AI service is temporarily unavailable. Please contact us directly!",
                "navigate": None
            }
        
        try:
            # First, check for direct navigation intent
            nav_intent = self.detect_navigation_intent(user_message)
            
            if nav_intent["should_navigate"]:
                if nav_intent["type"] == "demo":
                    category = nav_intent["category"].replace("-", " ").title()
                    return {
                        "message": f"Taking you to our {category} demo now!",
                        "navigate": nav_intent["path"]
                    }
                elif nav_intent["type"] == "page":
                    page = nav_intent["page"].title()
                    return {
                        "message": f"Taking you to the {page} page!",
                        "navigate": nav_intent["path"]
                    }
            
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
            
            # Extract navigation command if present
            cleaned_response, nav_path = self.extract_navigation_from_response(response)
            
            return {
                "message": cleaned_response,
                "navigate": nav_path
            }
            
        except Exception as e:
            logger.error(f"Error getting chat response: {str(e)}")
            return {
                "message": "Sorry, I'm having a moment. Please try again or contact us directly!",
                "navigate": None
            }

# Create instance lazily
_chat_service_instance = None

def get_chat_service():
    global _chat_service_instance
    if _chat_service_instance is None:
        _chat_service_instance = ChatService()
    return _chat_service_instance
