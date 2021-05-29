const axios = require('axios').default;

class AlbumService {
  static async getAlbums() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums');
    return data;
  }
}

module.exports = AlbumService;
