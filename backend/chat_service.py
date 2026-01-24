from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Demo website categories and their preview URLs from the portfolio
DEMO_WEBSITES = {
    "e-commerce": {
        "name": "LuxeCart Pro",
        "url": "/#portfolio",
        "description": "Full-featured e-commerce with secure payments"
    },
    "portfolio": {
        "name": "CreativeShowcase",
        "url": "/#portfolio",
        "description": "Stunning portfolio for creative professionals"
    },
    "corporate": {
        "name": "TechCorp Solutions",
        "url": "/#portfolio",
        "description": "Professional corporate website"
    },
    "blog": {
        "name": "TechInsider Blog",
        "url": "/#portfolio",
        "description": "Modern blog platform"
    },
    "restaurant": {
        "name": "Bistro Elegante",
        "url": "/#portfolio",
        "description": "Restaurant website with online ordering"
    },
    "real estate": {
        "name": "PrimeProperty Hub",
        "url": "/#portfolio",
        "description": "Real estate listing platform"
    },
    "healthcare": {
        "name": "MedCare Clinic",
        "url": "/#portfolio",
        "description": "Healthcare provider website"
    },
    "education": {
        "name": "LearnHub Academy",
        "url": "/#portfolio",
        "description": "Online education platform"
    }
}

SYSTEM_MESSAGE = """You are the AI assistant for PixelForge-AZ Studio, a premium web development agency.

IMPORTANT RULES:
1. Keep responses SHORT and TO THE POINT (2-3 sentences max for most queries)
2. Be professional but friendly
3. Focus on value - how we can help them
4. Don't be overly verbose or use filler words

Our services:
- Custom Web Design
- E-commerce Solutions  
- AI Integration
- Mobile-First Development
- SEO & Marketing

DEMO REQUESTS:
If someone asks about demos or examples of any website category (e-commerce, portfolio, corporate, blog, restaurant, real estate, healthcare, education), respond with:
"Check out our [category] demo in the portfolio section! [DEMO_LINK:/category]"

Replace [category] with the actual category name. The [DEMO_LINK:/category] tag will be converted to a clickable link.

Examples:
- "See our e-commerce demo! [DEMO_LINK:/e-commerce]"
- "View our portfolio examples! [DEMO_LINK:/portfolio]"

Keep it brief, professional, and helpful. Guide users to take action (view demos, contact us, etc.)."""

class ChatService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not self.api_key:
            logger.warning("EMERGENT_LLM_KEY not found in environment variables")
            self.api_key = None
    
    def process_demo_links(self, response: str) -> str:
        """
        Process demo link tags and convert them to actual navigation instructions
        """
        import re
        
        # Find all demo link patterns
        demo_pattern = r'\[DEMO_LINK:/([^\]]+)\]'
        matches = re.findall(demo_pattern, response)
        
        for category in matches:
            category_lower = category.lower().strip()
            if category_lower in DEMO_WEBSITES:
                demo = DEMO_WEBSITES[category_lower]
                # Replace with a clear instruction to navigate
                replacement = f"Click here to see it: {demo['url']} (scroll to {demo['name']} in our portfolio)"
                response = response.replace(f"[DEMO_LINK:/{category}]", replacement)
            else:
                # Generic portfolio link
                response = response.replace(f"[DEMO_LINK:/{category}]", "Visit our portfolio section to see examples!")
        
        return response
    
    async def get_response(self, session_id: str, user_message: str) -> str:
        """
        Get AI response for a user message
        """
        if not self.api_key:
            return "AI service is temporarily unavailable. Please contact us directly!"
        
        try:
            # Check for direct demo requests first
            msg_lower = user_message.lower()
            for category, demo in DEMO_WEBSITES.items():
                if category in msg_lower and ('demo' in msg_lower or 'example' in msg_lower or 'show' in msg_lower or 'see' in msg_lower):
                    return f"Here's our {category} demo: {demo['name']} - {demo['description']}. Visit our portfolio section to see it in action!"
            
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
            
            # Process any demo links
            response = self.process_demo_links(response)
            
            return response
            
        except Exception as e:
            logger.error(f"Error getting chat response: {str(e)}")
            return "Sorry, I'm having a moment. Please try again or contact us directly!"

# Create instance lazily
_chat_service_instance = None

def get_chat_service():
    global _chat_service_instance
    if _chat_service_instance is None:
        _chat_service_instance = ChatService()
    return _chat_service_instance
