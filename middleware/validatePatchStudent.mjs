
  const validatePatchStudent = (req, res, next) => {
  console.log("PATCH validation running");
  console.log(req.body);

  const { username, course, module } = req.body || {};

  if (
    username === undefined &&
    course === undefined &&
    module === undefined
  ) {
    return res.status(400).json({
      message: "Provide at least one field: username, course, or module"
    });
  }

  if (
    (username !== undefined && (typeof username !== "string" || username.trim() === "")) ||
    (course !== undefined && (typeof course !== "string" || course.trim() === "")) ||
    (module !== undefined && (typeof module !== "string" || module.trim() === ""))
  ) {
    return res.status(400).json({
      message: "Any provided field must be a non-empty string"
    });
  }

  next();
};

export default validatePatchStudent;