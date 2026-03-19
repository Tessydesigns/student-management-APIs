import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// simple login (mock user)
router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Username is required"
    });
  }

  // create token
  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login successful",
    token
  });
});

export default router;