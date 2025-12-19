---

# Task Manager Backend

## Project Overview

This is the **backend API** for the Task Manager application.
It provides **user authentication (register/login)** and **task CRUD operations**, secured with **JWT authentication**. Built with **Node.js, Express, and MongoDB**.

---

## Features

* **User Authentication:** Register and login with email and password
* **JWT Security:** Protects all task-related routes
* **Task Management:** Create, read, update, delete tasks
* **Data Validation:** Ensures required fields are present
* **Error Handling:** Structured error responses

---

## Tech Stack

* **Node.js** and **Express.js**
* **MongoDB** and **Mongoose**
* **JWT** for authentication
* **bcrypt** for password hashing
* **dotenv** for environment variables

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `backend` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretkey
```

### 4. Start Server

```bash
npm run dev
```

* Server runs at `http://localhost:5000`

---

## API Endpoints

### **Auth**

| Endpoint             | Method | Description          |
| -------------------- | ------ | -------------------- |
| `/api/auth/register` | POST   | Register a new user  |
| `/api/auth/login`    | POST   | Login and return JWT |

**Register Request Example:**

```json
POST /api/auth/register
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Login Response Example:**

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN_HERE"
  }
}
```

---

### **Tasks (Protected, JWT required)**

| Endpoint         | Method | Description   |
| ---------------- | ------ | ------------- |
| `/api/tasks`     | GET    | Get all tasks |
| `/api/tasks`     | POST   | Create a task |
| `/api/tasks/:id` | PUT    | Update a task |
| `/api/tasks/:id` | DELETE | Delete a task |

**Task Example:**

```json
{
  "title": "My First Task",
  "description": "This is a test task",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-12-20"
}
```

---

## Response Formats

**Success Response:**

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": [{ "field": "title", "message": "Title cannot be empty" }]
  }
}
```

---

## Notes

* Make sure your IP is whitelisted in MongoDB Atlas
* JWT token must be sent in the **Authorization header** as `Bearer <token>` for protected routes
* Passwords are hashed using **bcrypt**

---

## Author

**Kishan Kumar**

---
