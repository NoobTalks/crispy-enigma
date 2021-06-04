const jwt = require('jsonwebtoken');
const { AUTH_HEADER } = require('../../constants');
const { errors } = require('../../helpers');

const validateToken = (req, res, next) => {
  try {
    const token = req.header(AUTH_HEADER) ? req.header(AUTH_HEADER).split(' ')[1] : undefined;
    if (!token) {
      throw errors.unauthorized('Token empty.');
    }
    res.locals.user = jwt.verify(token, process.env.JWT_KEY_SECRET, (error, decoded) => {
      if (error) {
        errors.unauthorized(error);
      }
      delete decoded.jti;
      delete decoded.iat;
      delete decoded.exp;
      return decoded;
    });
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  validateToken
};
