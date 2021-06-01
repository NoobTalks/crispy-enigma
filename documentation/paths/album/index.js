const getAlbums = require('./getAlbums.path');
const buyAlbum = require('./buyAlbum.path');
const myAlbums = require('./getMyAlbums.path');

module.exports = {
  ...getAlbums,
  ...buyAlbum,
  ...myAlbums
};
