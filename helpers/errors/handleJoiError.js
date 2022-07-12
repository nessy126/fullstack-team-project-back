const errorFunc = errors => {
  errors.forEach(err => {
    switch (err.code) {
      case 'any.only':
        err.message = `${err.path} contain invalid value`;
        break;
      case 'string.base':
        err.message = `${err.path} must be a string`;
        break;
      case 'string.empty':
        err.message = `${err.path} is required`;
        break;
      case 'string.pattern.base':
        err.message = `${err.path} contains an invalid data type`;
        break;
      case 'number.base':
        err.message = `${err.path} must be a number`;
        break;
      default:
        err.message = 'Some error.';
        break;
    }
  });
  return errors;
};

module.exports = errorFunc;
