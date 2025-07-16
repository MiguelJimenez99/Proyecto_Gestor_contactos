const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "Token vencido o invalido",
    });
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verify.user;
    next();
  } catch (error) {
    res.status(404).json({
      message: "Token no proporcionado",
    });
  }
};
