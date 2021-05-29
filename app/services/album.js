const axios = require('axios').default;
const { errors } = require('../helpers');
const db = require('../models');

class AlbumService {
  static async getAlbums() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums');
    return data;
  }

  static async getAlbum(id) {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
    return data;
  }

  static async buyAlbum(data) {
    try {
      const saleRecord = await db.Sale.create(data);
      return saleRecord;
    } catch (err) {
      throw errors.databaseError(err);
    }
  }

  static async getMyAlbums(idUser) {
    try {
      const album = await db.Sale.findAll({ where: { idUser } });
      return album;
    } catch (err) {
      throw errors.databaseError(err);
    }
  }

  static async getMyAlbumForId(idUser, idAlbum) {
    try {
      const album = await db.Sale.findOne({ where: { idUser, idAlbum } });
      return album || { errorAlbum: 'You have not bought the album.' };
    } catch (err) {
      throw errors.databaseError(err);
    }
  }
}

module.exports = AlbumService;
