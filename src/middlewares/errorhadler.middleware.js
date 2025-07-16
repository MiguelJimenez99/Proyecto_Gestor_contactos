const errorHadler = (error, req, res, next) => {
  console.error(`Error: ${error.message}`);
  console.error(error.stack);

  const statusCode = error.statusCode || error.status || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Error en el servidor",
  });
};

module.exports = errorHadler;
