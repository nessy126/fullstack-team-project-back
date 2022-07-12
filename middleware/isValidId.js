const { isValidObjectId } = require('mongoose');

const { createError } = require('../helpers');

const message = 'Not id.';

const isValidId = (req, res, next) => {
  const { bookId } = req.params;
  if (!isValidObjectId(bookId)) {
    const error = createError(400, message);
    next(error);
    return;
  }
  next();
};

module.exports = isValidId;
