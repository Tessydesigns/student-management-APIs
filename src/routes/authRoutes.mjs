import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Student from "../models/Student.mjs";

const router = express.Router();

// mock user (with hashed password)
const mockUser = {
  username: "TessyT",
  password: bcrypt.hashSync("BabyT123", 10) // hashed version
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // check if both fields exist
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  // check username first
  if (username !== mockUser.username) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  // compare password with hashed password
  const isMatch = await bcrypt.compare(password, mockUser.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  // create token
  const token = jwt.sign(
    { username: mockUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login successful",
    token
  });
});

export default router;