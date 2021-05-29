const { logger } = require('express-wolox-logger');
const { utils, errors } = require('../helpers');
const { compareData } = require('../helpers/utils');
const { AlbumService, UserService } = require('../services');

const getAlbums = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    const { error, id, email, firstName, lastName, role } = await UserService.getUser({ id: token.id });
    if (error) {
      throw errors.unauthorized('Usuario no existe en la DB.');
    }
    const verifyUser = compareData(token, { id, firstName, lastName, role, email });
    if (!verifyUser) {
      throw errors.unauthorized('Los datos del token no coinciden con los de la DB');
    }
    const albums = await AlbumService.getAlbums();

    logger.info(`Usuario ${email} solicito traer todos los albums`);
    return res.json(albums);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAlbums
};
