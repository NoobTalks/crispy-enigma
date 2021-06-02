const { logger } = require('express-wolox-logger');
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

module.exports = {
  getAlbums
};
