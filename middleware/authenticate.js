const jwt = require('jsonwebtoken');
const { createError } = require('../helpers');
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const message = 'Not authorized.';

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.params;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      createError(401, message);
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw createError(401, message);
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = message;
    }
    next(error);
  }
};

module.exports = authenticate;
