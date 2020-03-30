const { check } = require('express-validator');
const router = require('express').Router();

// Controllers
const mail = require('../controllers/mail');

// Routes
router.get('/', mail.landing);
router.post(
  '/sendMail',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('Name cannot be empty.')
      .trim()
      .escape(),
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    check('message')
      .isLength({ min: 5 })
      .withMessage('Message should have more than 5 characters.')
      .trim()
      .escape(),
  ],
  mail.sendMail
);

module.exports = router;
