const signUp = require('./signUp');
const login = require('./login');
const current = require('./current');
const logOut = require('./logOut');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
  signUp,
  login,
  current,
  logOut,
  verifyEmail,
  resendVerifyEmail,
};
