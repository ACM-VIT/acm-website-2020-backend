// eslint-disable-next-line no-shadow
const error = (error, req, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: error.message,
  });
};

module.exports = error;
