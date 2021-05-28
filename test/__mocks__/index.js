const messages = require('./messages.mock');
const dataUser = require('./user.mock');
const album = require('./album.mock');

module.exports = {
  ...messages,
  ...dataUser,
  ...album
};
