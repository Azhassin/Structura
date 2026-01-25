from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import route modules
from routes import chat, contact, auth, portfolio, admin


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(
    title="Structura Studio API",
    description="Backend API for Structura Studio website",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "Structura Studio API is running"}


# Include route modules
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(chat.router, tags=["chat"])
api_router.include_router(contact.router, tags=["contact"])
api_router.include_router(portfolio.router, tags=["portfolio"])
api_router.include_router(admin.router, tags=["admin"])

# Include the router in the main app
app.include_router(api_router)

# Health check endpoint for Kubernetes (placed before middleware for faster response)
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "structura-studio-api"}

# Also add health check under /api for consistency
@app.get("/api/health")
async def api_health_check():
    return {"status": "healthy", "service": "structura-studio-api"}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
