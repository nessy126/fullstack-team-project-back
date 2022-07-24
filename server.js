const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT } = process.env;
const SUCCESS_MESSAGE = `Database connection successful`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(SUCCESS_MESSAGE);
    console.log('PROT: ', PORT);
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
