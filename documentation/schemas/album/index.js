const getAlbums = require('./getAlbum.schema');
const buyAlbum = require('./buyAlbum.schema');

module.exports = {
  ...getAlbums,
  ...buyAlbum
};
