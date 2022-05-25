const { InvalidArgumentError } = require('./erros');


module.exports = {
  notNull: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`It is necessary to fill in the field ${name}!`);
  },

  minSize: (value, name, min) => {
    if (value.length < min)
      throw new InvalidArgumentError(
        `The field ${name} must be greater than ${min} characters!`
      );
  },

  maxSize: (value, name, max) => {
    if (value.length > max)
      throw new InvalidArgumentError(
        `The field ${name} must be less than ${max} characters!`
      );
  }
};