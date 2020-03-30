const rateLimit = require('express-rate-limit');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json({ extended: false }));

// Environment Variables
require('dotenv').config();

// Basic Security
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(morgan('common'));
app.use(helmet());
app.use(limiter);
app.use(cors());

const mail = require('./routes/mail');

app.use('/api', mail);

// Error Middlewares
app.use(require('./middlewares/notFound'));

app.use(require('./middlewares/error'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server online on port ${port}`));
