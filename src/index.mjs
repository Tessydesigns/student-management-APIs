import express from 'express';
import dotenv from 'dotenv';
import validateStudentId from "./middleware/validateId.mjs";
import validateStudent from "./middleware/validateStudent.mjs";
import logger from "./middleware/logger.mjs";
import validatePatchStudent from "./middleware/validatePatchStudent.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

let mockStudents = [
  { id: 1, username: "jburns", course: "information technology", module: "A001" },
  { id: 2, username: "rsmith", course: "political sciences", module: "C001" },
  { id: 3, username: "tbrown", course: "business administration", module: "D001" },
  { id: 4, username: "sjane", course: "information technology", module: "A001" },
  { id: 5, username: "mtiller", course: "education", module: "F003" },
  { id: 6, username: "afoxy", course: "mechatronics", module: "E002" },
  { id: 7, username: "pmcdonald", course: "architecture", module: "B101" },
  { id: 8, username: "sfraser", course: "art", module: "A611" }
];

app.get("/", (req, res) => {
  res.send("Student API is working");
});

// Get all students + query with filter + sorting
app.get("/students", (req, res) => {
  let results = [...mockStudents];
  const { username, course, module, sortBy, order } = req.query;

  if (username) {
    results = results.filter(student =>
      student.username.toLowerCase().includes(username.toLowerCase())
    );
  }

  if (course) {
    results = results.filter(student =>
      student.course.toLowerCase().includes(course.toLowerCase())
    );
  }

  if (module) {
    results = results.filter(student =>
      student.module.toLowerCase() === module.toLowerCase()
    );
  }

  const allowedFields = ["id", "username", "course", "module"];

  if (sortBy) {
    if (!allowedFields.includes(sortBy)) {
      return res.status(400).json({
        message: `sortBy must be one of: ${allowedFields.join(", ")}`
      });
    }

    const sortOrder = order === "desc" ? "desc" : "asc";

    results.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if (typeof valueA === "string") valueA = valueA.toLowerCase();
      if (typeof valueB === "string") valueB = valueB.toLowerCase();

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  res.status(200).json({
    message: "Students retrieved successfully",
    count: results.length,
    data: results
  });
});

// GET one student by id
app.get("/students/:id", validateStudentId, (req, res) => {
  const student = mockStudents.find((s) => s.id === req.studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json({
    message: "Student fetched successfully",
    data: student
  });
});

// Create a new student
app.post("/students", validateStudent, (req, res) => {
  const { username, course, module } = req.body;

  const maxId = mockStudents.length > 0
    ? Math.max(...mockStudents.map((student) => student.id))
    : 0;

  const newStudent = {
    id: maxId + 1,
    username,
    course,
    module
  };

  mockStudents.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    data: newStudent
  });
});

// Replace all details of a student
app.put("/students/:id", validateStudentId, validateStudent, (req, res) => {
  const { username, course, module } = req.body;
  const studentIndex = mockStudents.findIndex((s) => s.id === req.studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const updatedStudent = {
    id: req.studentId,
    username,
    course,
    module
  };

  mockStudents[studentIndex] = updatedStudent;

  res.status(200).json({
    message: "Student replaced successfully",
    data: updatedStudent
  });
});

app.patch("/students/:id", validateStudentId, validatePatchStudent, (req, res) => {
  const student = mockStudents.find((s) => s.id === req.studentId);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { username, course, module } = req.body || {};

  if (username !== undefined) student.username = username;
  if (course !== undefined) student.course = course;
  if (module !== undefined) student.module = module;

  res.status(200).json({
    message: "Student updated successfully",
    data: student
  });
});

app.delete("/students/:id", validateStudentId, (req, res) => {
  const studentIndex = mockStudents.findIndex((s) => s.id === req.studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = mockStudents.splice(studentIndex, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    data: deletedStudent
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});