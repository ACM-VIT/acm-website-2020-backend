const router = require('express').Router();

// Controllers
const mail = require('../controllers/mail');

// Routes
router.get('/sendMail', mail.sendMail);

module.exports = router;
