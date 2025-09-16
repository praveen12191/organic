# FastAPI Backend Setup

## Prerequisites

1. Python 3.8+
2. MongoDB Atlas account

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file with your MongoDB connection string:
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/organic_products?retryWrites=true&w=majority
```

4. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `POST /api/upload` - Upload product image
- `POST /api/seed-data` - Seed sample data (development)

## MongoDB Atlas Setup

1. Create a free account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string and add it to the `.env` file

## Connecting React Frontend

Update the API calls in `ProductContext.jsx` to point to your FastAPI server:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```