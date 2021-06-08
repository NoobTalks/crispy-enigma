const { logger } = require('express-wolox-logger');
const { errors } = require('../helpers');
const { albumMapper } = require('../mappers');
const { AlbumService } = require('../services');

const getAlbums = async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const albums = await AlbumService.getAlbums();
    logger.info(`User ${email} request to bring all the albums`);
    return res.json(albums);
  } catch (err) {
    return next(err);
  }
};

const buyAlbum = async (req, res, next) => {
  try {
    const { params } = req;
    const { id, email } = res.locals.user;
    const { error } = await AlbumService.getMyAlbumForId(id, params.id);
    if (!error) {
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
