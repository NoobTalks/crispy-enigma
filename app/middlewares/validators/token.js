const { errors } = require('../../helpers');

const validateToken = (req, res, next) => {
  try {
    const token = req.header('token');
    if (!token) {
      throw errors.unauthorized('Token empty.');
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateToken
};
