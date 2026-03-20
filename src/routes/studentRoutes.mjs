import express from "express";
import Student from "../models/Student.mjs";
import validateStudentId from "../../middleware/validateId.mjs";
import validateStudent from "../../middleware/validateStudent.mjs";
import validatePatchStudent from "../../middleware/validatePatchStudent.mjs";
import authMiddleware from "../../middleware/auth.mjs";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const { username, course, module, sortBy, order } = req.query;

    const filter = {};

    if (username) {
      filter.username = { $regex: username, $options: "i" };
    }

    if (course) {
      filter.course = { $regex: course, $options: "i" };
    }

    if (module) {
      filter.module = module;
    }

    const allowedFields = ["username", "course", "module", "createdAt"];
    const sort = {};

    if (sortBy) {
      if (!allowedFields.includes(sortBy)) {
        return res.status(400).json({
          message: `sortBy must be one of: ${allowedFields.join(", ")}`
        });
      }

      sort[sortBy] = order === "desc" ? -1 : 1;
    }

    const students = await Student.find(filter).sort(sort);

    res.status(200).json({
      message: "Students retrieved successfully",
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// GET one student by id
router.get("/:id", validateStudentId, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student fetched successfully",
      data: student
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// POST create student
router.post("/", authMiddleware, validateStudent, async (req, res) => {
  try {
    const { username, course, module } = req.body;

    const newStudent = await Student.create({
      username,
      course,
      module
    });

    res.status(201).json({
      message: "Student created successfully",
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// PUT replace student
router.put("/:id", authMiddleware, validateStudentId, validateStudent, async (req, res) => {
  try {
    const { username, course, module } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.studentId,
      { username, course, module },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student replaced successfully",
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// PATCH update student
router.patch("/:id", authMiddleware, validateStudentId, validatePatchStudent, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.studentId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// DELETE student
router.delete("/:id", authMiddleware, validateStudentId, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      data: deletedStudent
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

export default router;