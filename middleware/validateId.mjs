const validateId = (req, res, next) => {

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid student id"
    });
  }

  req.studentId = id;

  next();
};

export default validateId;