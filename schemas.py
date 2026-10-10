from pydantic import BaseModel
from typing import Optional

# --- Users ---
class UserCreate(BaseModel):
    name: str
    email: str
    role: str

class UserResponse(BaseModel):
    id: int
    name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None
    trust_score: Optional[float] = None

    class Config:
        from_attributes = True

# --- Categories ---
class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True

# --- Vehicles ---
class VehicleCreate(BaseModel):
    seller_id: int
    category_id: int
    brand: str
    model: str
    price: float
    status: str

# 👇 INTHA EDATHULA THAAN PUTHSUA UPDATE PANNIRUKKOM 👇
class VehicleResponse(BaseModel):
    id: int
    brand: str
    model: str
    price: float
    status: str
    
    # Data illanaalum error varama thadukka "Optional" use pandrom 👇
    seller: Optional[UserResponse] = None
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True