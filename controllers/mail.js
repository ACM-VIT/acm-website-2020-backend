const sendMail = (req, res) => {
  res.json({ success: true, msg: "mail content goes here" });
};

module.exports = { sendMail };
