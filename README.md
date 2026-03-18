<h2>Student API - Routing structure</h2>  


<h3>Description</h3>

<p>This project uses <em>structured routing</em> to organize API endpoints in a modular and maintainable way.</p>

<p>Instead of defining all routes inside the main server file <em>index.mjs</em>, routes are separated into a dedicated file:
<u></u>

<h3>src/routes/studentRoutes.mjs</h3>

<p>This approach keeps the codebase clean and scalable as the application grows.</p>


<h3>ow Routing Works</p>

<p>The main server file connects the routes using:</p>

<p>in index.mjs input:
app.use("/students", studentRoutes);</p>

<p>This means that all routes defined inside `studentRoutes.mjs` are automatically prefixed with `/students`.</p>


### Route Mapping Example

Inside `studentRoutes.mjs`:

```js
router.get("/");
```

Becomes:

```
GET /students
```

---

```js
router.get("/:id");
```

Becomes:

```
GET /students/:id
```

---

### Route Definitions

All student-related endpoints are grouped inside a single router using Express:

```js
import express from "express";
const router = express.Router();
```

The following routes are implemented:

* `GET /students` → Retrieve all students (with filtering and sorting)
* `GET /students/:id` → Retrieve a specific student by ID
* `POST /students` → Create a new student
* `PUT /students/:id` → Replace an existing student
* `PATCH /students/:id` → Update part of a student
* `DELETE /students/:id` → Delete a student

---

### Benefits of Structured Routing

* Keeps the main server file (`index.mjs`) clean and focused
* Groups related routes together
* Improves code readability
* Makes the application easier to maintain
* Allows easy expansion (e.g., adding more route files)
* Follows best practices used in real-world backend development

---

### Request Flow

The routing structure works together with middleware and validation in the following flow:

```
Request
→ index.mjs
→ studentRoutes.mjs
→ middleware (logger / validation)
→ route handler
→ response
```

---

### Summary

The routing structure in this project separates concerns by moving route definitions into a dedicated file. This improves organization, maintainability, and scalability while following professional backend development practices.
