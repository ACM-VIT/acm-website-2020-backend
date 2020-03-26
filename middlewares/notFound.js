const notFound = (req, res, next) => {
  const error = new Error(`'${req.originalUrl}' - Not found`);
  res.status(404);
  next(error);
};

module.exports = notFound;
