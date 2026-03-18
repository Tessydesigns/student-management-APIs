const validateStudent = (req, res, next) => {
  const { username, course, module } = req.body;

  if (!username || !course || !module) {
    return res.status(400).json({
      message: "username, course and module are required"
    });
  }

  next();
};

export default validateStudent;