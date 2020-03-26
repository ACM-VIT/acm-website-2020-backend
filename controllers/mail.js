const sendMessage = (req, res, next) => {
  res.send('Yo');
  next();
};

module.exports = { sendMessage };
