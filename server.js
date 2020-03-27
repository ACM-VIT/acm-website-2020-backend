const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json({ extended: false }));

// Environment Variables
require('dotenv').config();

// Basic Security
app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(morgan('common'));
app.use(cors());

const mail = require('./routes/mail');

app.use('/api', mail);

// Error Middlewares
app.use(require('./middlewares/notFound'));

app.use(require('./middlewares/error'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server online on port ${port}`));
