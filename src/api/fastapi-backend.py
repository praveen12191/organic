"""
FastAPI Backend for Organic Products E-commerce

This file contains the FastAPI backend code structure.
To run this backend, you'll need to:

1. Create a virtual environment: python -m venv venv
2. Activate it: source venv/bin/activate (Linux/Mac) or venv\Scripts\activate (Windows)
3. Install dependencies: pip install fastapi uvicorn motor python-multipart python-dotenv
4. Set up MongoDB Atlas and add your connection string to .env
5. Run the server: uvicorn main:app --reload

Note: This code should be saved as a separate Python file (e.g., main.py) 
in your backend directory, not in the React project.
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv
import uuid

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Organic Products API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL")
client = AsyncIOMotorClient(MONGODB_URL)
database = client.organic_products
products_collection = database.products

# Pydantic models
class ProductBase(BaseModel):
    name: str
    price: float
    discount: float = 0.0
    description: str
    category: str
    image: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    name: Optional[str] = None
    price: Optional[float] = None
    discount: Optional[float] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None

class Product(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        json_encoders = {
            ObjectId: str
        }

# Helper functions
def product_helper(product) -> dict:
    return {
        "id": str(product["_id"]),
        "name": product["name"],
        "price": product["price"],
        "discount": product.get("discount", 0.0),
        "description": product["description"],
        "category": product["category"],
        "image": product.get("image"),
        "created_at": product.get("created_at"),
        "updated_at": product.get("updated_at")
    }

# Routes
@app.get("/")
async def root():
    return {"message": "Organic Products API"}

@app.get("/api/products", response_model=List[Product])
async def get_products():
    """Get all products"""
    products = []
    async for product in products_collection.find():
        products.append(product_helper(product))
    return products

@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    try:
        product = await products_collection.find_one({"_id": ObjectId(product_id)})
        if product:
            return product_helper(product)
        raise HTTPException(status_code=404, detail="Product not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID")

@app.post("/api/products", response_model=Product)
async def create_product(product: ProductCreate):
    """Create a new product"""
    product_dict = product.dict()
    product_dict["created_at"] = datetime.utcnow()
    product_dict["updated_at"] = datetime.utcnow()
    
    result = await products_collection.insert_one(product_dict)
    new_product = await products_collection.find_one({"_id": result.inserted_id})
    return product_helper(new_product)

@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductUpdate):
    """Update a product"""
    try:
        # Remove None values from update data
        update_data = {k: v for k, v in product.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await products_collection.update_one(
            {"_id": ObjectId(product_id)}, 
            {"$set": update_data}
        )
        
        if result.matched_count:
            updated_product = await products_collection.find_one({"_id": ObjectId(product_id)})
            return product_helper(updated_product)
        
        raise HTTPException(status_code=404, detail="Product not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID")

@app.delete("/api/products/{product_id}")
async def delete_product(product_id: str):
    """Delete a product"""
    try:
        result = await products_collection.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count:
            return {"message": "Product deleted successfully"}
        raise HTTPException(status_code=404, detail="Product not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID")

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    """Upload product image"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Create uploads directory if it doesn't exist
    os.makedirs("uploads", exist_ok=True)
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = f"uploads/{unique_filename}"
    
    # Save file
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    return {"image_url": f"/uploads/{unique_filename}"}

# Serve uploaded images
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Sample data seeding (run once)
@app.post("/api/seed-data")
async def seed_data():
    """Seed sample products (for development)"""
    sample_products = [
        {
            "name": "Organic Basmati Rice",
            "price": 24.99,
            "discount": 3.00,
            "description": "Premium quality long-grain basmati rice, aged to perfection.",
            "category": "rice",
            "image": "https://images.pexels.com/photos/4110098/pexels-photo-4110098.jpeg",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Mixed Quinoa Grains",
            "price": 18.50,
            "discount": 2.50,
            "description": "Nutritious tri-color quinoa blend featuring white, red, and black varieties.",
            "category": "grains",
            "image": "https://images.pexels.com/photos/7262354/pexels-photo-7262354.jpeg",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # Add more sample products...
    ]
    
    # Check if data already exists
    existing_count = await products_collection.count_documents({})
    if existing_count > 0:
        return {"message": "Data already seeded"}
    
    await products_collection.insert_many(sample_products)
    return {"message": f"Seeded {len(sample_products)} sample products"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)