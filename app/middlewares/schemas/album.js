const Joi = require('joi');

const getAlbum = Joi.object({
  id: Joi.number().min(0)
});

const getMyAlbums = Joi.object({
  user_id: Joi.number().min(0)
});

module.exports = {
  getAlbum,
  getMyAlbums
};
