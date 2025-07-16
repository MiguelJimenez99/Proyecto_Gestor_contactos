const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: error.array(),
    });
  }
  next();
};
