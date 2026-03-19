<h2>Student Management API</h2>

<p>Description</p>

<p>This project is a RESTful API built using <bold>Node.js</bold> and <bold>Express.js</bold>. It allows users to manage student records through standard CRUD operations.</p>

<h3>The API includes:</h3>

* Filtering and sorting
* Middleware for logging and validation
* Structured routing
* JWT-based authentication

<p>This project demonstrates a clean and modular backend architecture following real-world best practices.</p>

<h3>Features</h3>

* CRUD operations (Create, Read, Update, Delete)
* Filtering by username, course, and module
* Sorting results (ascending and descending)
* Middleware for logging and validation
* Structured routing using Express Router
* JWT authentication for protected routes

<u></u>

## Project Structure

```
student-management-APIs
│
├── middleware/
│   ├── logger.mjs
│   ├── validateId.mjs
│   ├── validateStudent.mjs
│   ├── validatePatchStudent.mjs
│   └── auth.mjs
│
└── src/
    ├── index.mjs
    └── routes/
        ├── studentRoutes.mjs
        └── authRoutes.mjs
```

---

## Installation

1. Clone the repository

```bash
git clone <your-repo-url>
```

2. Navigate into the project

```bash
cd student-management-APIs
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file

```env
PORT=3000
JWT_SECRET=mysecretkey
```

5. Start the server

```bash
npm run dev
```

---

## API Base URL

```
http://localhost:3000
```

---

## Authentication (JWT)

### Login

```
POST /auth/login
```

Body:

```json
{
  "username": "admin"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

---

### Using the Token

Protected routes require a JWT token in the request headers:

```
Authorization: Bearer <token>
```

---

## API Endpoints

### Get all students

```
GET /students
```

Optional query parameters:

* `username`
* `course`
* `module`
* `sortBy`
* `order` (asc or desc)

---

### Get student by ID

```
GET /students/:id
```

---

### Create student (Protected)

```
POST /students
```

---

### Replace student (Protected)

```
PUT /students/:id
```

---

### Update student (Protected)

```
PATCH /students/:id
```

---

### Delete student (Protected)

```
DELETE /students/:id
```

---

## Middleware

### Logger Middleware

Logs all incoming requests:

```js
console.log(`${req.method} ${req.url}`);
```

---

### Validation Middleware

#### validateStudentId

* Ensures ID is a valid number
* Prevents invalid route parameters

#### validateStudent

* Ensures all required fields exist
* Used in POST and PUT

#### validatePatchStudent

* Ensures at least one field is provided
* Used in PATCH

---

### Authentication Middleware (JWT)

* Verifies JWT tokens
* Blocks unauthorized requests
* Attaches decoded user to `req.user`

---

## Routing Structure

Routes are organized using Express Router:

```
src/routes/studentRoutes.mjs
src/routes/authRoutes.mjs
```

Main server file:

```js
app.use("/students", studentRoutes);
app.use("/auth", authRoutes);
```

---

## Request Flow

```
Request
→ Logger Middleware
→ Authentication Middleware (JWT)
→ Validation Middleware
→ Route Handler
→ Response
```

---

## Testing

The API was tested using **Thunder Client**.

### JWT Testing Flow

1. Login to get token:

```
POST /auth/login
```

2. Copy the token

3. Use in headers:

```
Authorization: Bearer <token>
```

4. Test protected routes

---

## Example Errors

### No Token

```json
{
  "message": "No token provided"
}
```

---

### Invalid Token

```json
{
  "message": "Invalid token"
}
```

---

### Invalid ID

```json
{
  "message": "Invalid student id"
}
```

---

### Validation Error

```json
{
  "message": "username, course and module must be non-empty strings"
}
```

---

## Tools Used

* Node.js
* Express.js
* dotenv
* jsonwebtoken
* Nodemon
* Thunder Client

---

## Summary

This project demonstrates:

* Building a RESTful API
* Implementing middleware and validation
* Structuring routes using Express Router
* Securing endpoints using JWT authentication
* Testing endpoints using Thunder Client

---

## Future Improvements

* Connect to a database (MongoDB / SQL)
* Add user registration and password hashing
* Implement role-based access control
* Add refresh tokens
* Use MVC architecture

---
