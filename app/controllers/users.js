const { logger } = require('express-wolox-logger');
const { errors, statusCodes, utils } = require('../helpers');
const { userMapper } = require('../mappers');
const { UserService, RedisService } = require('../services');

const verifyUser = async req => {
  const userDTO = userMapper.signInDTO(req.body);
  const { error, password, ...user } = await UserService.getUser({
    email: userDTO.email
  });
  if (error) {
    throw errors.unauthorized(error);
  }
  const confirmPassword = utils.isValidPassword(userDTO.password, password);
  if (!confirmPassword) {
    throw errors.unauthorized('Email or password invalid.');
  }
  return user;
};

const signUp = async (req, res, next) => {
  try {
    const userDTO = userMapper.signUpDTO(req.body);
    const { error } = await UserService.getUser({ email: userDTO.email });
    if (!error) {
      const msg = {
        response: 'this email is already in use.',
        user: userDTO.email
      };
      throw errors.conflictServer(msg);
    }
    const { email } = await UserService.signUp(userDTO);
    const msg = {
      response: 'Successful registration.',
      user: email
    };
    logger.info(msg);
    return res.status(statusCodes.created).json(msg);
  } catch (err) {
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await verifyUser(req);
    const token = await utils.generateToken(user);
    logger.info({
      email: user.email,
      token,
      message: 'Token generated'
    });
    return res.status(statusCodes.successful).json({ time: `${process.env.JWT_EXPIRY_TIME}s`, token });
  } catch (err) {
    return next(err);
  }
};

const listUsers = async (req, res, next) => {
  try {
    const listUserDTO = userMapper.listUsersDTO(req.query);
    const { error, ...response } = await UserService.getUsers(listUserDTO);
    if (error) {
      throw errors.conflictServer(error);
    }
    logger.info(response.msg);
    return res.json({ response });
  } catch (err) {
    return next(err);
  }
};

const closeSessions = async (req, res, next) => {
  try {
    const { id, email } = await verifyUser(req);
    const tokens = await RedisService.getTokens(id);
    if (!tokens.length) {
      throw errors.notFound('no active sessions found');
    }
    for (const token of tokens) {
      await RedisService.del(token);
    }
    const msg = {
      message: `${tokens.length} sessions closed`,
      user: email
    };
    logger.info(msg);
    return res.json(msg);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  listUsers,
  closeSessions
};
