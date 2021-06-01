const { logger } = require('express-wolox-logger');
const { statusCodes, errors, ROLES, utils } = require('../helpers');
const { userMapper } = require('../mappers');
const { UserService } = require('../services');

const signUpAdmin = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    // eslint-disable-next-line no-unused-vars
    const { error, password, ...user } = await UserService.getUser({ id: token.id });
    if (error) {
      throw errors.unauthorized('User does not exist in the DB.');
    }
    const verifyUser = utils.isObjectEqual(token, user);
    if (!verifyUser) {
      throw errors.unauthorized('Token data does not match DB');
    }
    if (user.role !== ROLES.admin) {
      throw errors.unauthorized(`User ${user.email} isn't administrator`);
    }
    const adminDTO = userMapper.signUpAdminDTO(req.body);
    const { id } = await UserService.getUser({ email: adminDTO.email });
    const { email } = id ? await UserService.updateUser(id, adminDTO) : await UserService.signUp(adminDTO);
    const msg = {
      response: 'Successful registration.'
    };
    msg.user = email || adminDTO.email;
    logger.info(msg);
    return res.status(statusCodes.created).json(msg);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signUpAdmin
};
