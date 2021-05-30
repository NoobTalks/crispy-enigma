const axios = require('axios').default;

const albumSupplier = 'https://jsonplaceholder.typicode.com/albums';

class AlbumService {
  static async getAlbums() {
    const { data } = await axios.get(albumSupplier);
    return data;
  }
}

module.exports = AlbumService;
