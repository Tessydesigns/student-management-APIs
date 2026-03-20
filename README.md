# Student Management API

## Overview

This project is a RESTful API built with **Node.js** and **Express.js** for managing student records. It supports full CRUD operations, filtering, sorting, middleware, authentication, and database integration.

---

## Features

* CRUD operations (Create, Read, Update, Delete)
* Filtering and sorting of student data
* Middleware (logging and validation)
* Structured routing using Express Router
* JWT authentication for protected routes
* MongoDB database integration with Mongoose

---

## Project Structure

```
student-management-APIs/
│
├── middleware/
│   ├── logger.mjs
│   ├── validateId.mjs
│   ├── validateStudent.mjs
│   ├── validatePatchStudent.mjs
│   └── auth.mjs
│
└── src/
    ├── config/
    │   └── db.mjs
    ├── models/
    │   ├── Student.mjs
    │   └── User.mjs
    ├── routes/
    │   ├── studentRoutes.mjs
    │   └── authRoutes.mjs
    └── index.mjs
```

---

## Authentication (JWT)

* Users log in via `/auth/login`
* A JWT token is returned
* Protected routes require:

```
Authorization: Bearer <token>
```

---

## API Endpoints

* `GET /students` → Get all students (with filtering & sorting)
* `GET /students/:id` → Get one student
* `POST /students` → Create student (protected)
* `PUT /students/:id` → Replace student (protected)
* `PATCH /students/:id` → Update student (protected)
* `DELETE /students/:id` → Delete student (protected)

---

## Middleware

* **Logger** → Logs incoming requests
* **Validation** → Ensures correct input data
* **Auth (JWT)** → Protects routes and verifies users

---

## MongoDB Integration

* Uses **MongoDB + Mongoose** for persistent storage
* Connection set in `.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
```

* Data stored in:

  * `Student` collection
  * `User` collection

---

## Authentication with Database

* Users are stored in MongoDB
* Passwords are hashed using bcrypt
* Login validates credentials and returns a JWT

---

## Request Flow

```
Request
→ Logger Middleware
→ Auth Middleware (if protected)
→ Validation Middleware
→ Route Handler
→ MongoDB
→ Response
```

---

## Tools Used

* Node.js
* Express.js
* MongoDB + Mongoose
* dotenv
* jsonwebtoken (JWT)
* bcryptjs
* Nodemon
* Thunder Client

---

## Summary

This project demonstrates a **complete backend system** with:

* structured routing
* middleware and validation
* JWT authentication
* MongoDB database integration

It represents a transition from a basic API to a **real-world, scalable backend application**.
