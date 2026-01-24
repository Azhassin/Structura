from fastapi import APIRouter, HTTPException
from models import ContactRequest, ContactResponse, ContactSubmission
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from datetime import datetime
from emergentintegrations.llm.chat import LlmChat, UserMessage

logger = logging.getLogger(__name__)

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'naseemazhan@outlook.com')

# Emergent LLM key for AI enhancement
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

async def enhance_message_with_ai(name: str, email: str, subject: str, message: str) -> str:
    """
    Enhance the user's message with AI to make it clearer and more structured
    """
    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"contact_enhance_{datetime.utcnow().timestamp()}",
            system_message="You are a helpful assistant that reformats client inquiries to be clear and professional."
        )
        
        chat.with_model("openai", "gpt-4o-mini")
        
        prompt = f"""Reformat this client inquiry for a web design studio:

Name: {name}
Email: {email}  
Subject: {subject}
Message: {message}

Make it:
1. Professional and clear
2. Use bullet points for requirements
3. Keep all original info
4. Be concise

Output as clean HTML with inline styles. No greetings - just the requirements."""

        user_msg = UserMessage(text=prompt)
        response = await chat.send_message(user_msg)
        
        return response
        
    except Exception as e:
        logger.error(f"AI enhancement failed: {str(e)}")
        return f"<p>{message}</p>"

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(request: ContactRequest):
    """
    Handle contact form submissions (stores in DB only)
    """
    try:
        # Create contact submission
        submission = ContactSubmission(
            name=request.name,
            email=request.email,
            subject=request.subject,
            message=request.message,
            submitted_at=datetime.utcnow()
        )
        
        # Store in database
        await db.contact_submissions.insert_one(submission.dict())
        
        logger.info(f"Contact form submitted by {request.name} ({request.email})")
        
        return ContactResponse(
            success=True,
            message="Thank you for contacting us! We'll get back to you soon."
        )
        
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@router.post("/contact/send-email", response_model=ContactResponse)
async def send_contact_email(request: ContactRequest):
    """
    Handle contact form submissions with email sending
    """
    try:
        # First store in database
        submission = ContactSubmission(
            name=request.name,
            email=request.email,
            subject=request.subject,
            message=request.message,
            submitted_at=datetime.utcnow()
        )
        await db.contact_submissions.insert_one(submission.dict())
        
        # Check if Resend is configured
        if not RESEND_API_KEY:
            logger.warning("RESEND_API_KEY not configured, skipping email send")
            return ContactResponse(
                success=True,
                message="Thank you for contacting us! We'll get back to you soon."
            )
        
        # Enhance message with AI
        enhanced_message = await enhance_message_with_ai(
            request.name, 
            request.email, 
            request.subject, 
            request.message
        )
        
        # Create beautiful HTML email
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0fdfa; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(20, 184, 166, 0.15);">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">New Client Inquiry</h1>
                    <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 14px;">PixelForge Studio</p>
                </div>
                
                <!-- Client Info -->
                <div style="padding: 30px;">
                    <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e0f2fe;">
                        <h2 style="color: #0d9488; margin: 0 0 15px 0; font-size: 18px;">👤 Client Information</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">Name:</td>
                                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">{request.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
                                <td style="padding: 8px 0; color: #0ea5e9; font-size: 14px;">
                                    <a href="mailto:{request.email}" style="color: #0ea5e9; text-decoration: none;">{request.email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subject:</td>
                                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">{request.subject}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Original Message -->
                    <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #94a3b8;">
                        <h3 style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">📝 Original Message:</h3>
                        <p style="color: #475569; margin: 0; font-size: 14px; line-height: 1.6;">{request.message}</p>
                    </div>
                    
                    <!-- AI Enhanced Message -->
                    <div style="background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #14b8a6;">
                        <h3 style="color: #0d9488; margin: 0 0 15px 0; font-size: 14px;">✨ AI-Enhanced Summary:</h3>
                        <div style="color: #1e293b; font-size: 14px; line-height: 1.8;">
                            {enhanced_message}
                        </div>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                        Received via PixelForge Studio Contact Form<br>
                        <span style="color: #0ea5e9;">{datetime.utcnow().strftime('%B %d, %Y at %H:%M UTC')}</span>
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Send email using Resend
        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "reply_to": request.email,
            "subject": f"[PixelForge] {request.subject} - from {request.name}",
            "html": html_content
        }
        
        email_result = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Email sent successfully to {RECIPIENT_EMAIL}, ID: {email_result.get('id')}")
        
        return ContactResponse(
            success=True,
            message="Thank you for contacting us! Your message has been sent and we'll get back to you soon."
        )
        
    except Exception as e:
        logger.error(f"Error sending contact email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

@router.get("/contact/submissions")
async def get_contact_submissions():
    """
    Get all contact submissions (for admin)
    """
    try:
        submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(100)
        return {"submissions": submissions}
        
    except Exception as e:
        logger.error(f"Error getting contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve submissions")
