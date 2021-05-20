const { errors } = require('../../helpers');
const { CONFIG_JOI, userSchema } = require('../schemas');

const signUpDTO = (req, res, next) => {
  try {
    const { error } = userSchema.signUp.validate(req.body, CONFIG_JOI);
    if (error) {
      throw errors.badRequest(error.details);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signUpDTO
};
