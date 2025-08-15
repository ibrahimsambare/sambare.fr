from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: EmailStr
    sujet: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

class ContactMessageCreate(BaseModel):
    nom: str
    email: EmailStr
    sujet: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: str = None

def send_simple_email(nom: str, email: str, sujet: str, message: str) -> bool:
    """Fonction simple d'envoi d'email"""
    try:
        api_key = os.environ.get('SENDGRID_API_KEY')
        sender_email = os.environ.get('SENDER_EMAIL', 'contact@sambare.fr')
        
        logging.info(f"Envoi email simple - Sender: {sender_email}, API Key present: {bool(api_key)}")
        
        sg = SendGridAPIClient(api_key)
        
        html_content = f"""
        <html>
            <body>
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom:</strong> {nom}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Sujet:</strong> {sujet}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f5f5f5; padding: 15px;">
                    <p>{message}</p>
                </div>
            </body>
        </html>
        """
        
        mail = Mail(
            from_email=sender_email,
            to_emails='contact@sambare.fr',
            subject=f"[Contact] {sujet}",
            html_content=html_content
        )
        
        response = sg.send(mail)
        logging.info(f"Email envoyé. Status: {response.status_code}")
        
        return response.status_code == 202
        
    except Exception as e:
        logging.error(f"Erreur envoi email simple: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World from Memphis Ingénierie & Technologies"}

@api_router.post("/contact", response_model=ContactResponse)
async def create_contact_message(contact_data: ContactMessageCreate):
    """
    Endpoint pour traiter les soumissions du formulaire de contact
    """
    try:
        # Créer l'objet ContactMessage
        contact_message = ContactMessage(**contact_data.dict())
        
        # Sauvegarder en base de données
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        # Envoyer l'email via SendGrid
        email_sent = send_simple_email(
            nom=contact_data.nom,
            email=contact_data.email,
            sujet=contact_data.sujet,
            message=contact_data.message
        )
        
        if email_sent:
            # Mettre à jour le statut en base si l'email est envoyé
            await db.contact_messages.update_one(
                {"id": contact_message.id},
                {"$set": {"status": "email_sent"}}
            )
            
            return ContactResponse(
                success=True,
                message="Message envoyé avec succès ! Nous vous répondrons rapidement.",
                id=contact_message.id
            )
        else:
            return ContactResponse(
                success=False,
                message="Erreur lors de l'envoi de l'email. Veuillez réessayer.",
                id=contact_message.id
            )
            
    except Exception as e:
        logging.error(f"Erreur lors du traitement du contact: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Une erreur inattendue s'est produite. Veuillez réessayer."
        )

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """
    Endpoint pour récupérer tous les messages de contact (pour l'admin)
    """
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(1000)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logging.error(f"Erreur lors de la récupération des messages: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la récupération des messages"
        )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
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