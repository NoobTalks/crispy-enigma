const Joi = require('joi');

const getAlbum = Joi.object({
  id: Joi.number().min(0)
});

module.exports = {
  getAlbum
};
