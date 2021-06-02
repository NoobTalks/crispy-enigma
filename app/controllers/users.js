const { logger } = require('express-wolox-logger');
const { errors, statusCodes } = require('../helpers');
const { isValidPassword, generateToken } = require('../helpers/utils');
const { userMapper } = require('../mappers');
const { UserService } = require('../services');

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
    const userDTO = userMapper.signInDTO(req.body);
    const { error, password, ...user } = await UserService.getUser({
      email: userDTO.email
    });
    if (error) {
      throw errors.unauthorized(error);
    }
    const confirmPassword = isValidPassword(userDTO.password, password);
    if (!confirmPassword) {
      throw errors.unauthorized('Email or password invalid.');
    }
    const token = generateToken(user);
    logger.info({
      email: userDTO.email,
      token,
      message: 'Token generated'
    });
    return res.status(statusCodes.successful).json({ token });
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

module.exports = {
  signUp,
  signIn,
  listUsers
};
