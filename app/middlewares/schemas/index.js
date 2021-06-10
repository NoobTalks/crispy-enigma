const configJoi = require('./config');
const userSchema = require('./user');
const albumSchema = require('./album');

module.exports = {
  ...configJoi,
  userSchema,
  albumSchema
};
