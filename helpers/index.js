const { createError, errorFunc } = require('./errors');
const sendMail = require('./sendMail');

module.exports = {
  createError,
  errorFunc,
  sendMail,
};
