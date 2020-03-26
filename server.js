require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const mail = require("./routes/mail");

app.use(cors());

app.use("/api", mail);

app.use((req, res, next) => {
  const error = new Error(`'${req.originalUrl}' - Not found`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: error.message
  });
  next();
});

app.listen(port, () => console.log(`Server online on port ${port}`));
