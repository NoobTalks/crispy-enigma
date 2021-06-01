const getAlbums = require('./getAlbum.schema');
const buyAlbum = require('./buyAlbum.schema');
const myAlbums = require('./getMyAlbums.schema');

module.exports = {
  ...getAlbums,
  ...buyAlbum,
  ...myAlbums
};
