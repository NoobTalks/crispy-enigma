const getAlbums = require('./getAlbums.path');
const buyAlbum = require('./buyAlbum.path');

module.exports = {
  ...getAlbums,
  ...buyAlbum
};
