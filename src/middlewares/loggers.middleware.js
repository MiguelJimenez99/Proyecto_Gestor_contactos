const logger = (req, res, next) => {
  const now = new Date();
  const timestamp = now.toLocaleString();
  const method = req.method;
  const url = req.originalUrl;

  console.log(`${timestamp}] ${method} ${url}`);

  next();
};

module.exports = logger;
