const { logger } = require('express-wolox-logger');
const { utils, errors } = require('../helpers');
const { compareData } = require('../helpers/utils');
const { albumMapper } = require('../mappers');
const { AlbumService, UserService } = require('../services');

const getAlbums = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    const { error, email, firstName, lastName, role } = await UserService.getUser({ email: token.email });
    if (error) {
      throw errors.unauthorized('User is not register in the DB.');
    }
    const verifyUser = compareData(token, { firstName, lastName, role, email });
    if (!verifyUser) {
      throw errors.unauthorized('the data of token it does not match with the data of the DB');
    }
    const albums = await AlbumService.getAlbums();

    logger.info(`Usuario ${email} request get to all albums`);
    return res.json(albums);
  } catch (err) {
    return next(err);
  }
};

const buyAlbum = async (req, res, next) => {
  try {
    const token = utils.decodeToken(req.header('token'));
    const { error, id, email, firstName, lastName, role } = await UserService.getUser({
      email: token.email
    });
    if (error) {
      throw errors.unauthorized('User is not register in the DB.');
    }
    const verifyUser = compareData(token, { firstName, lastName, role, email });
    if (!verifyUser) {
      throw errors.unauthorized('the data of token it does not match with the data of the DB');
    }
    const { params } = req;
    const { errorAlbum } = await AlbumService.getMyAlbumForId(id, params.id);
    if (!errorAlbum) {
      throw errors.conflictServer('you already bought this album');
    }
    const album = await AlbumService.getAlbum(params.id);
    const albumDTO = albumMapper.albumDTO({ idUser: id, album });
    await AlbumService.buyAlbum(albumDTO);
    logger.info(`${email} buy the album ${id}`);
    return res.json({ state: 'buy', album });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAlbums,
  buyAlbum
};
