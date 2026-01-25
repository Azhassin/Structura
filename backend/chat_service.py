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
4. ONLY include navigation commands when the user EXPLICITLY asks to see/view/go somewhere

Our services:
- Custom Web Design
- E-commerce Solutions  
- AI Integration
- Mobile-First Development
- SEO & Marketing

AVAILABLE DEMOS (mention these when relevant):
We have live demos for: E-commerce, Portfolio, Corporate, Blog, Restaurant, Real Estate, Healthcare, and Education websites.

WHEN USER MENTIONS WANTING A WEBSITE:
If someone says they want to build a specific type of website (e.g., "I want a restaurant website"), DO NOT navigate automatically. Instead:
1. Acknowledge their need
2. Mention that we have a demo for that type
3. Ask if they'd like to see it

Example:
User: "I want to build a restaurant website"
Response: "Great choice! We specialize in restaurant websites with features like online menus, reservations, and ordering. We actually have a live demo called Bistro Elegante - would you like to see it?"

User: "Yes, show me"
Response: "Here's our Restaurant demo!" [NAV:/demo/restaurant]

NAVIGATION COMMANDS - USE ONLY WHEN EXPLICITLY REQUESTED:
Only use [NAV:/path] when the user says YES to seeing a demo, or explicitly asks:
- "Yes", "Sure", "Show me", "Take me to...", "Can I see...", "Go to...", "View the..."

Available navigation commands:
- [NAV:/] - Home page
- [NAV:/about] - About page
- [NAV:/contact] - Contact page
- [NAV:/#portfolio] - Portfolio section
- [NAV:/#services] - Services section
- [NAV:/demo/e-commerce] - E-commerce demo (LuxeCart Pro)
- [NAV:/demo/portfolio] - Portfolio demo (CreativeShowcase)
- [NAV:/demo/corporate] - Corporate demo (TechCorp Solutions)
- [NAV:/demo/blog] - Blog demo (TechInsider)
- [NAV:/demo/restaurant] - Restaurant demo (Bistro Elegante)
- [NAV:/demo/real-estate] - Real Estate demo (PrimeProperty Hub)
- [NAV:/demo/healthcare] - Healthcare demo (MedCare Clinic)
- [NAV:/demo/education] - Education demo (LearnHub Academy)

DEMO NAMES FOR REFERENCE:
- E-commerce: LuxeCart Pro
- Portfolio: CreativeShowcase
- Corporate: TechCorp Solutions
- Blog: TechInsider
- Restaurant: Bistro Elegante
- Real Estate: PrimeProperty Hub
- Healthcare: MedCare Clinic
- Education: LearnHub Academy

Remember: Be helpful, mention demos when relevant, but only navigate when explicitly requested."""

class ChatService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not self.api_key:
            logger.warning("EMERGENT_LLM_KEY not found in environment variables")
            self.api_key = None
    
    def detect_explicit_navigation_intent(self, message: str) -> dict:
        """
        Detect if the user EXPLICITLY wants to navigate somewhere.
        Only triggers on clear navigation requests, not general mentions.
        """
        msg_lower = message.lower().strip()
        
        # Explicit navigation phrases - user must use one of these
        explicit_nav_phrases = [
            'show me', 'take me to', 'go to', 'navigate to', 
            'can i see', 'let me see', 'i want to see', 'i\'d like to see',
            'open', 'view the', 'view your', 'see the', 'see your',
            'where is', 'where can i find'
        ]
        
        # Check if the message contains an explicit navigation phrase
        has_explicit_intent = any(phrase in msg_lower for phrase in explicit_nav_phrases)
        
        if not has_explicit_intent:
            return {"should_navigate": False}
        
        # Check for demo requests with explicit intent
        demo_keywords = ['demo', 'example', 'preview', 'sample']
        has_demo_keyword = any(kw in msg_lower for kw in demo_keywords)
        
        if has_explicit_intent:
            # Check for specific demo category
            for category, path in DEMO_CATEGORIES.items():
                if category in msg_lower:
                    if has_demo_keyword or any(phrase in msg_lower for phrase in ['show me', 'can i see', 'let me see', 'view']):
                        return {
                            "should_navigate": True,
                            "path": path,
                            "type": "demo",
                            "category": category
                        }
            
            # Check for page navigation
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
            # Check for explicit navigation intent first
            nav_intent = self.detect_explicit_navigation_intent(user_message)
            
            if nav_intent["should_navigate"]:
                if nav_intent["type"] == "demo":
                    category = nav_intent["category"].replace("-", " ").title()
                    return {
                        "message": f"Here's our {category} demo for you!",
                        "navigate": nav_intent["path"]
                    }
                elif nav_intent["type"] == "page":
                    page = nav_intent["page"].title()
                    return {
                        "message": f"Taking you to the {page} page!",
                        "navigate": nav_intent["path"]
                    }
            
            # For all other messages, use AI without forcing navigation
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
            
            # Extract navigation command if AI included one (should be rare now)
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
