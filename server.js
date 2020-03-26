const express = require('express');

// Basic security
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
// const cors = require('cors');

const app = express();

// Security setup
// app.use(helmet());
// const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// app.use(limiter);
// app.use(morgan('common'));
// app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Environment variables
require('dotenv').config();

// Middlewares
app.use((req, res, next) => {
  const error = new Error(`'${req.originalUrl}' - Not found`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: error.message,
  });
  next();
});

// Routes
const mail = require('./routes/mail');

app.use('/api/mail', mail);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server online on port ${port}`));
