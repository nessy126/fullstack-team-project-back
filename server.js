const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 3002 } = process.env;
const SUCCESS_MESSAGE = `Database connection successful`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(SUCCESS_MESSAGE);
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
