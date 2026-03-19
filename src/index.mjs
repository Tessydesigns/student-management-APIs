import express from "express";
import dotenv from "dotenv";
import logger from "../middleware/logger.mjs";
import studentRoutes from "./routes/studentRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Student API is working");
});

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});