const { logger } = require('express-wolox-logger');
const jwt = require('jsonwebtoken');
const { AUTH_HEADER } = require('../../constants');
const { errors, utils } = require('../../helpers');
const { RedisService } = require('../../services');

const validateToken = async (req, res, next) => {
  try {
    const token = req.header(AUTH_HEADER) ? req.header(AUTH_HEADER).split(' ')[1] : undefined;
    if (!token) {
      throw errors.unauthorized('Token empty.');
    }
    const { jti, ...tokenUser } = jwt.verify(token, process.env.JWT_KEY_SECRET, (error, decoded) => {
      if (error) {
        throw errors.unauthorized(error);
      }
      delete decoded.iat;
      delete decoded.exp;
      return decoded;
    });
    const tokenRedis = await RedisService.get(jti);
    const validToken = await utils.isContentEqual(tokenRedis, token);
    if (!validToken) {
      logger.info(`${tokenUser.email} tried to login with expired token (REDIS)`);
      throw errors.unauthorized('token invalid.');
    }
    res.locals.user = tokenUser;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  validateToken
};
