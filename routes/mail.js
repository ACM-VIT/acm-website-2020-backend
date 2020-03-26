const router = require("express").Router();
const mail = require("../controllers/mail");

router.get("/sendMail", mail.sendMail);

module.exports = router;
