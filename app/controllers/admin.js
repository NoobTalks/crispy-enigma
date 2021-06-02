const { logger } = require('express-wolox-logger');
const { statusCodes } = require('../helpers');
const { userMapper } = require('../mappers');
const { UserService } = require('../services');

const signUpAdmin = async (req, res, next) => {
  try {
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
