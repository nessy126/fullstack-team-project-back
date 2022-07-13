const errorFunc = errors => {
  errors.forEach(err => {
    console.log(err.code);
    switch (err.code) {
      case 'any.only':
        err.message = `${err.path} contain invalid value`;
        break;
      case 'any.required':
        err.message = `${err.path} required.`;
        break;
      case 'array.min':
        err.message = `${err.path} must contain at least one book.`;
        break;
      case 'date.base':
        err.message = `${err.path} contain wrong format`;
        break;
      case 'date.format':
        err.message = `${err.path} contain wrong format`;
        break;
      case 'number.base':
        err.message = `${err.path} must be a number`;
        break;
      case 'number.positive':
        err.message = `${err.path} must be a positive number`;
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
      default:
        err.message = 'Some error.';
        break;
    }
  });
  return errors;
};

module.exports = errorFunc;
