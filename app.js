const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const authRouter = require('./routes/api/auth');
const booksRouter = require('./routes/api/books');
const trainingRouter = require('./routes/api/training');
// import swaggerUi from "swagger-ui-express";
// import * as swaggerDocument from '../swager/openapi.json';

app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/training', trainingRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message: err.message });
});

// app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app;
