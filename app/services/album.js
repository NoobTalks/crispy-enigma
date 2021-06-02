const axios = require('axios').default;
const { ALBUM_SUPPLIER } = require('../constants');

class AlbumService {
  static async getAlbums() {
    const { data } = await axios.get(ALBUM_SUPPLIER);
    return data;
  }
}

module.exports = AlbumService;
