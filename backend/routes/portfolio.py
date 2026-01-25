from fastapi import APIRouter, HTTPException, Depends
from models import PortfolioCreate, PortfolioUpdate, PortfolioResponse
from routes.auth import get_admin_user
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime
import uuid
from typing import List

logger = logging.getLogger(__name__)

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


@router.get("/portfolio", response_model=List[PortfolioResponse])
async def get_all_portfolio():
    """Get all portfolio projects (public)"""
    try:
        projects = await db.portfolio.find(
            {}, {"_id": 0, "id": 1, "title": 1, "description": 1, "category": 1, "image": 1, "features": 1, "demo_url": 1, "created_at": 1, "updated_at": 1}
        ).sort("created_at", -1).limit(100).to_list(100)
        
        result = []
        for project in projects:
            # Parse dates
            created_at = project.get("created_at", datetime.utcnow().isoformat())
            updated_at = project.get("updated_at", created_at)
            
            if isinstance(created_at, str):
                created_at = datetime.fromisoformat(created_at)
            if isinstance(updated_at, str):
                updated_at = datetime.fromisoformat(updated_at)
            
            result.append(PortfolioResponse(
                id=project["id"],
                title=project["title"],
                description=project["description"],
                category=project["category"],
                image=project["image"],
                features=project.get("features", []),
                demo_url=project.get("demo_url"),
                created_at=created_at,
                updated_at=updated_at
            ))
        
        return result
        
    except Exception as e:
        logger.error(f"Error fetching portfolio: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch portfolio")


@router.get("/portfolio/{project_id}", response_model=PortfolioResponse)
async def get_portfolio_project(project_id: str):
    """Get a single portfolio project (public)"""
    try:
        project = await db.portfolio.find_one({"id": project_id}, {"_id": 0})
        
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        created_at = project.get("created_at", datetime.utcnow().isoformat())
        updated_at = project.get("updated_at", created_at)
        
        if isinstance(created_at, str):
            created_at = datetime.fromisoformat(created_at)
        if isinstance(updated_at, str):
            updated_at = datetime.fromisoformat(updated_at)
        
        return PortfolioResponse(
            id=project["id"],
            title=project["title"],
            description=project["description"],
            category=project["category"],
            image=project["image"],
            features=project.get("features", []),
            demo_url=project.get("demo_url"),
            created_at=created_at,
            updated_at=updated_at
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch project")


@router.post("/portfolio", response_model=PortfolioResponse)
async def create_portfolio_project(
    project_data: PortfolioCreate,
    admin: dict = Depends(get_admin_user)
):
    """Create a new portfolio project (admin only)"""
    try:
        project_id = str(uuid.uuid4())
        now = datetime.utcnow()
        
        project_doc = {
            "id": project_id,
            "title": project_data.title,
            "description": project_data.description,
            "category": project_data.category,
            "image": project_data.image,
            "features": project_data.features,
            "demo_url": project_data.demo_url,
            "created_at": now.isoformat(),
            "updated_at": now.isoformat()
        }
        
        await db.portfolio.insert_one(project_doc)
        
        logger.info(f"Portfolio project created: {project_data.title} by {admin['email']}")
        
        return PortfolioResponse(
            id=project_id,
            title=project_data.title,
            description=project_data.description,
            category=project_data.category,
            image=project_data.image,
            features=project_data.features,
            demo_url=project_data.demo_url,
            created_at=now,
            updated_at=now
        )
        
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")


@router.put("/portfolio/{project_id}", response_model=PortfolioResponse)
async def update_portfolio_project(
    project_id: str,
    project_data: PortfolioUpdate,
    admin: dict = Depends(get_admin_user)
):
    """Update a portfolio project (admin only)"""
    try:
        # Check if project exists
        existing = await db.portfolio.find_one({"id": project_id})
        if not existing:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Build update dict with only provided fields
        update_dict = {"updated_at": datetime.utcnow().isoformat()}
        
        if project_data.title is not None:
            update_dict["title"] = project_data.title
        if project_data.description is not None:
            update_dict["description"] = project_data.description
        if project_data.category is not None:
            update_dict["category"] = project_data.category
        if project_data.image is not None:
            update_dict["image"] = project_data.image
        if project_data.features is not None:
            update_dict["features"] = project_data.features
        if project_data.demo_url is not None:
            update_dict["demo_url"] = project_data.demo_url
        
        await db.portfolio.update_one({"id": project_id}, {"$set": update_dict})
        
        # Fetch updated project
        updated = await db.portfolio.find_one({"id": project_id}, {"_id": 0})
        
        created_at = updated.get("created_at", datetime.utcnow().isoformat())
        updated_at = updated.get("updated_at", created_at)
        
        if isinstance(created_at, str):
            created_at = datetime.fromisoformat(created_at)
        if isinstance(updated_at, str):
            updated_at = datetime.fromisoformat(updated_at)
        
        logger.info(f"Portfolio project updated: {project_id} by {admin['email']}")
        
        return PortfolioResponse(
            id=updated["id"],
            title=updated["title"],
            description=updated["description"],
            category=updated["category"],
            image=updated["image"],
            features=updated.get("features", []),
            demo_url=updated.get("demo_url"),
            created_at=created_at,
            updated_at=updated_at
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update project")


@router.delete("/portfolio/{project_id}")
async def delete_portfolio_project(
    project_id: str,
    admin: dict = Depends(get_admin_user)
):
    """Delete a portfolio project (admin only)"""
    try:
        # Check if project exists
        existing = await db.portfolio.find_one({"id": project_id})
        if not existing:
            raise HTTPException(status_code=404, detail="Project not found")
        
        await db.portfolio.delete_one({"id": project_id})
        
        logger.info(f"Portfolio project deleted: {project_id} by {admin['email']}")
        
        return {"success": True, "message": "Project deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete project")
