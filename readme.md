# MERN Stack Product & Brand Management API

This API allows users to manage brands and products, including adding brands, uploading product images, and implementing a blocking system to restrict access to certain users' products.

## Setup & Installation

### Clone the Repository\*\*

git clone <repository-url>
cd <project-folder>

### Install Dependencies\*\*

npm install

### Setup Environment Variables\*\*

Create a `.env` file in the root folder and add:

```env
PORT=8000
MONGO_URI=<your-mongodb-connection-string>
TOKEN_Key=<your-jwt-secret>
REFRESH_TOKEN_KEY=<your-refresh-token_secret>
```

### Start the Server

npm start

Server will run at `http://localhost:5000/`

## API Endpoints

### ** Authentication APIs**

#### **Register a New User**

- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user with a profile photo.
- **Request:**

{
"username": "ram",
"email": "ram@example.com",
"password": "password123"
}

- **Response:**

{
"success": true,
"message": "User registered successfully",
"response": {
"\_id": "userId",
"username": "ram",
"email": "ram@example.com"
}
}

#### **Login**

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate user and return access & refresh tokens.

### ** Brand APIs**

#### **Add a Brand**

- **Endpoint:** `POST /api/brands`
- **Description:** Add a new brand with a logo and categories.
- **Request:**

{
"brandName": "Nike",
"categories": ["Shoes", "Clothing"]
}

- **Response:**

{
"success": true,
"message": "Brand added successfully",
"brand": {
"\_id": "brandId",
"brandName": "Nike",
"categories": ["Shoes", "Clothing"]
}
}

#### **Fetch All Brands**

- **Endpoint:** `GET /api/brands`
- **Description:** Retrieve all brands with their categories.

### ** Product APIs**

#### **Add a Product**

- **Endpoint:** `POST /api/products`
- **Description:** Add a new product with an image (Only if the brand and category exist).
- **Request:**

{
"productName": "Running Shoes",
"description": "High-quality running shoes",
"price": 99.99,
"category": "Shoes",
"brand": "Nike"
}

- **Response:**

{
"success": true,
"message": "Product added successfully",
"product": { "\_id": "productId", "productName": "Running Shoes" }
}

#### **Fetch All Products (With Filtering & Sorting)**

- **Endpoint:** `GET /api/products?sort=price&filter=brand:Nike`
- **Description:** Retrieve all products, filtered by brand or category.

### ** Blocking System APIs**

#### **Block a User**

- **Endpoint:** `POST /api/users/block`
- **Description:** Block a user to prevent them from viewing your products.

#### **Unblock a User**

- **Endpoint:** `POST /api/users/unblock`
- **Description:** Unblock a user.

---

## Technologies Used

**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Authentication:** JWT
**File Uploads:** Multer
**Security:** bcrypt.js for password hashing
