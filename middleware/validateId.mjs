import mongoose from "mongoose";

const validateStudentId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid student id"
    });
  }

  req.studentId = id;
  next();
};

export default validateStudentId;