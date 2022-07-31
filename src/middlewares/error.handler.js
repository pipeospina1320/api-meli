function logError(error, req, res, next) {
  console.error(error);
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

module.exports = { logError, errorHandler };
