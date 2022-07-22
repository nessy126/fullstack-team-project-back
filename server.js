const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 8000 } = process.env;
const SUCCESS_MESSAGE = `Database connection successful`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(8000);
    console.log(SUCCESS_MESSAGE);
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
