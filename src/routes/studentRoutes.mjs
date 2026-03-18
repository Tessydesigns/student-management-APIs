import express from "express";
import validateStudentId from "../../middleware/validateId.mjs";
import validateStudent from "../../middleware/validateStudent.mjs";
import validatePatchStudent from "../../middleware/validatePatchStudent.mjs";

const router = express.Router();

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

router.get("/", (req, res) => {
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

router.get("/:id", validateStudentId, (req, res) => {
  const student = mockStudents.find((s) => s.id === req.studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json({
    message: "Student fetched successfully",
    data: student
  });
});

router.post("/", validateStudent, (req, res) => {
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

router.put("/:id", validateStudentId, validateStudent, (req, res) => {
  const { username, course, module } = req.body;
  const studentIndex = mockStudents.findIndex((s) => s.id === req.studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
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

router.patch("/:id", validateStudentId, validatePatchStudent, (req, res) => {
  const student = mockStudents.find((s) => s.id === req.studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
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

router.delete("/:id", validateStudentId, (req, res) => {
  const studentIndex = mockStudents.findIndex((s) => s.id === req.studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = mockStudents.splice(studentIndex, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    data: deletedStudent
  });
});

export default router;