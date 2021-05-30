const jwt = require('jwt-simple');
const { logger } = require('express-wolox-logger');
const { statusCodes, errors } = require('../helpers');
const { adminMapper } = require('../mappers');
const { UserService } = require('../services');

const signUpAdmin = async (req, res, next) => {
  try {
    const token = req.header('token');
    const tokenDecode = jwt.decode(token, process.env.JWT_KEY_SECRET);
    const userInfo = await UserService.getUser({ email: tokenDecode.email });
    if (
      tokenDecode.firstName !== userInfo.firstName ||
      tokenDecode.lastName !== userInfo.lastName ||
      tokenDecode.role !== userInfo.role
    ) {
      throw errors.unauthorized('El token no es válido o es antiguo');
    }
    if (userInfo.role !== 'administrator') {
      throw errors.unauthorized(`User ${userInfo.email} isn't administrator`);
    }
    const adminDTO = adminMapper.signInDTO(req.body);
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
