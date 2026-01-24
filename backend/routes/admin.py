from fastapi import APIRouter, HTTPException, Depends
from routes.auth import get_admin_user
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime
from typing import List

logger = logging.getLogger(__name__)

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


@router.get("/admin/dashboard")
async def get_dashboard_stats(admin: dict = Depends(get_admin_user)):
    """Get admin dashboard statistics"""
    try:
        # Get counts
        portfolio_count = await db.portfolio.count_documents({})
        submissions_count = await db.contact_submissions.count_documents({})
        unread_count = await db.contact_submissions.count_documents({"is_read": False})
        users_count = await db.users.count_documents({})
        chat_sessions_count = await db.chat_sessions.count_documents({})
        
        # Get recent submissions
        recent_submissions = await db.contact_submissions.find(
            {}, {"_id": 0}
        ).sort("submitted_at", -1).limit(5).to_list(5)
        
        return {
            "stats": {
                "portfolio_projects": portfolio_count,
                "total_submissions": submissions_count,
                "unread_submissions": unread_count,
                "total_users": users_count,
                "chat_sessions": chat_sessions_count
            },
            "recent_submissions": recent_submissions
        }
        
    except Exception as e:
        logger.error(f"Error fetching dashboard stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch dashboard stats")


@router.get("/admin/submissions")
async def get_all_submissions(
    admin: dict = Depends(get_admin_user),
    skip: int = 0,
    limit: int = 20
):
    """Get all contact submissions with pagination"""
    try:
        submissions = await db.contact_submissions.find(
            {}, {"_id": 0}
        ).sort("submitted_at", -1).skip(skip).limit(limit).to_list(limit)
        
        total = await db.contact_submissions.count_documents({})
        
        return {
            "submissions": submissions,
            "total": total,
            "skip": skip,
            "limit": limit
        }
        
    except Exception as e:
        logger.error(f"Error fetching submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")


@router.put("/admin/submissions/{submission_id}/read")
async def mark_submission_read(
    submission_id: str,
    admin: dict = Depends(get_admin_user)
):
    """Mark a submission as read"""
    try:
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"is_read": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        return {"success": True, "message": "Submission marked as read"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking submission read: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update submission")


@router.delete("/admin/submissions/{submission_id}")
async def delete_submission(
    submission_id: str,
    admin: dict = Depends(get_admin_user)
):
    """Delete a contact submission"""
    try:
        result = await db.contact_submissions.delete_one({"id": submission_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        logger.info(f"Submission deleted: {submission_id} by {admin['email']}")
        
        return {"success": True, "message": "Submission deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete submission")


@router.get("/admin/users")
async def get_all_users(admin: dict = Depends(get_admin_user)):
    """Get all users (admin only)"""
    try:
        users = await db.users.find(
            {}, {"_id": 0, "password": 0}
        ).sort("created_at", -1).to_list(100)
        
        return {"users": users}
        
    except Exception as e:
        logger.error(f"Error fetching users: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch users")
