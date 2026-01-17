from fastapi import APIRouter, HTTPException
from models import ContactRequest, ContactResponse, ContactSubmission
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

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(request: ContactRequest):
    """
    Handle contact form submissions
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

@router.get("/contact/submissions")
async def get_contact_submissions():
    """
    Get all contact submissions (for admin)
    """
    try:
        submissions = await db.contact_submissions.find().sort("submitted_at", -1).to_list(100)
        return {"submissions": submissions}
        
    except Exception as e:
        logger.error(f"Error getting contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve submissions")