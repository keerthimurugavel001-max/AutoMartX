from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import engine, SessionLocal

# Database tables create pandrathu
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AutoMartX API")

# CORS Setup (Frontend connect panna)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Users APIs ---
@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(name=user.name, email=user.email, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


# --- Categories APIs ---
@app.post("/categories/", response_model=schemas.CategoryResponse)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    db_category = models.Category(name=category.name, description=category.description)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@app.get("/categories/", response_model=list[schemas.CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()


# --- Vehicles APIs ---
@app.post("/vehicles/", response_model=schemas.VehicleResponse)
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    db_vehicle = models.Vehicle(
        seller_id=vehicle.seller_id,
        category_id=vehicle.category_id,
        brand=vehicle.brand,
        model=vehicle.model,
        price=vehicle.price,
        status=vehicle.status
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

@app.get("/vehicles/", response_model=list[schemas.VehicleResponse])
def get_vehicles(db: Session = Depends(get_db)):
    return db.query(models.Vehicle).all()

@app.get("/vehicles/{vehicle_id}", response_model=schemas.VehicleResponse)
def get_vehicle_by_id(vehicle_id: int, db: Session = Depends(get_db)):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Intha ID-la car kidaikkala!")
    return vehicle

@app.put("/vehicles/{vehicle_id}", response_model=schemas.VehicleResponse)
def update_vehicle(vehicle_id: int, updated_data: schemas.VehicleCreate, db: Session = Depends(get_db)):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Intha ID-la car kidaikkala!")
    
    vehicle.seller_id = updated_data.seller_id
    vehicle.category_id = updated_data.category_id
    vehicle.brand = updated_data.brand
    vehicle.model = updated_data.model
    vehicle.price = updated_data.price
    vehicle.status = updated_data.status
    
    db.commit()
    db.refresh(vehicle)
    return vehicle

@app.delete("/vehicles/{vehicle_id}")
def delete_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()
    if vehicle:
        db.delete(vehicle)
        db.commit()
        return {"message": "Car azhikapattu vittathu (Deleted successfully)!"}
    raise HTTPException(status_code=404, detail="Antha ID-la car kidaikkala!")

# Base Check API
@app.get("/")
def read_root():
    return {"message": "AutoMartX Backend is Running!"}