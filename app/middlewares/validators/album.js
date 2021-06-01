const { errors } = require('../../helpers');
const { albumSchema, CONFIG_JOI } = require('../schemas');

const validateAlbum = (req, res, next) => {
  try {
    const { error } = albumSchema.getAlbum.validate(req.params, CONFIG_JOI);
    if (error) {
      throw errors.badRequest('el ID ingresado no es valido');
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

const validateGetMyAlbums = (req, res, next) => {
  try {
    const { error } = albumSchema.getMyAlbums.validate(req.params, CONFIG_JOI);
    if (error) {
      throw errors.badRequest('el ID ingresado no es valido');
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  validateAlbum,
  validateGetMyAlbums
};
