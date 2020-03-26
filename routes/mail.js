const express = require('express');

const router = express.Router();

// Controllers
const controller = require('../controllers/mail');

router.get('/send', controller.sendMessage);

module.exports = router;
