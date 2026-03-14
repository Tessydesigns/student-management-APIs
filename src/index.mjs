import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
 

app.get("/students", (req, res) => {
  res.status(200).json({
    message: "All students fetched successfully",
    data: mockStudents
  });
});

// GET one student by id
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = mockStudents.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json({
    message: "Student fetched successfully",
    data: student
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});