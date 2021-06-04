const { ROLES } = require('../../constants');
const { errors, utils } = require('../../helpers');
const { CONFIG_JOI, userSchema } = require('../schemas');
const { UserService } = require('../../services');

const validateSignUpDTO = (req, res, next) => {
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

const validateSignInDTO = (req, res, next) => {
  try {
    const { error } = userSchema.signIn.validate(req.body, CONFIG_JOI);
    if (error) {
      throw errors.badRequest(error.details);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

const validateGetUsersDTO = (req, res, next) => {
  try {
    const { error } = userSchema.getUsers.validate(req.query, CONFIG_JOI);
    if (error) {
      throw errors.badRequest(error.details);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

const validateAuthentication = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { error, ...userDB } = await UserService.getUser({ id: user.id }, ['password']);
    if (error) {
      throw errors.unauthorized('User does not exist in the DB.');
    }
    const verifyUser = utils.isContentEqual(user, userDB);
    if (!verifyUser) {
      throw errors.unauthorized('Token data does not match DB');
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { role, email } = res.locals.user;
    if (role !== ROLES.admin) {
      throw errors.unauthorized(`User ${email} isn't administrator`);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  validateSignUpDTO,
  validateSignInDTO,
  validateGetUsersDTO,
  validateAuthentication,
  isAdmin
};
