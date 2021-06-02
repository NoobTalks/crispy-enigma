const { logger } = require('express-wolox-logger');
const { utils, errors } = require('../helpers');
const { AlbumService, UserService } = require('../services');

const getAlbums = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    const { error, ...user } = await UserService.getUser({ id: token.id }, ['password']);
    if (error) {
      throw errors.unauthorized('User does not exist in the DB.');
    }
    const verifyUser = utils.isObjectEqual(token, user);
    if (!verifyUser) {
      throw errors.unauthorized('Token data does not match DB');
    }
    const albums = await AlbumService.getAlbums();

    logger.info(`User ${user.email} request to bring all the albums`);
    return res.json(albums);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAlbums
};
