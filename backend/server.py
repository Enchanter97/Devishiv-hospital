from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Devishiv Hospital API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=5, max_length=20)
    email: EmailStr
    message: str = Field(min_length=2, max_length=2000)


class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_name: str
    phone: str
    email: Optional[str] = None
    doctor: str
    date: str  # YYYY-MM-DD
    time_slot: str
    reason: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AppointmentCreate(BaseModel):
    patient_name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=5, max_length=20)
    email: Optional[EmailStr] = None
    doctor: str = Field(min_length=2, max_length=120)
    date: str
    time_slot: str
    reason: Optional[str] = Field(default=None, max_length=1000)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Devishiv Hospital API", "status": "ok"}


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for i in items:
        if isinstance(i.get('created_at'), str):
            i['created_at'] = datetime.fromisoformat(i['created_at'])
    return items


@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(payload: AppointmentCreate):
    appt = Appointment(**payload.model_dump())
    doc = appt.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.appointments.insert_one(doc)
    return appt


@api_router.get("/appointments", response_model=List[Appointment])
async def list_appointments():
    items = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for i in items:
        if isinstance(i.get('created_at'), str):
            i['created_at'] = datetime.fromisoformat(i['created_at'])
    return items


@api_router.get("/doctors")
async def list_doctors():
    return {
        "doctors": [
            {"id": "dr-renu", "name": "Dr. Renu Lakhtakia", "specialty": "Obstetrician & Gynaecologist", "credentials": "MBBS, MD, MRCOG (London)"},
            {"id": "dr-sanjai", "name": "Dr. Sanjai Srivastava", "specialty": "Surgical Gastroenterologist", "credentials": "MS, DNB, MCh (Gastro Surgery, SGPGI)"},
            {"id": "dr-sanjay", "name": "Dr. Sanjay Lakhtakia", "specialty": "Endoscopist & Sonologist", "credentials": "MD (Medicine)"},
            {"id": "dr-ashutosh", "name": "Dr. Ashutosh Mishra", "specialty": "Child Specialist", "credentials": "MBBS, DCH"},
            {"id": "dr-ranjan", "name": "Dr. Ranjan Kumar", "specialty": "Bone & Joint Specialist", "credentials": "MBBS, MS (Orthopaedics)"},
        ]
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
