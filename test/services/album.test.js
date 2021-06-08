/* eslint-disable global-require */
const axios = require('axios');
const { ALBUM_SUPPLIER, OPT_SUPPLIER_JP } = require('../../app/constants');
const { AlbumService, UserService } = require('../../app/services');
const { albums, dataUser } = require('../__mocks__');

jest.mock('axios');
axios.get.mockReturnValue({ data: albums.listAlbums });

describe('Album service', () => {
  it('should request to external API', async () => {
    await AlbumService.getAlbums();
    expect(axios.get).toHaveBeenCalledWith(`${ALBUM_SUPPLIER}${OPT_SUPPLIER_JP.albums}`);
  });

  it('should get a list of albums', async () => {
    const album = await AlbumService.getAlbums();
    expect(album).toEqual(albums.listAlbums);
  });

  it('should get a album id 1', async () => {
    axios.get.mockReturnValue({ data: albums.listAlbums[0] });
    const album = await AlbumService.getAlbum(1);
    expect(album.id).toBe(1);
  });

  it('should reject get to album for not exist.', async () => {
    axios.get.mockRejectedValue(new Error({ internalCode: 'notFound' }));
    try {
      await AlbumService.getAlbum(1);
    } catch (err) {
      return expect(err.internalCode).toEqual('notFound');
    }
    throw new Error('Album not found');
  });

  it('should saved a album', async () => {
    await UserService.signUp(dataUser.signUpAdmin);
    const { idUser } = await AlbumService.buyAlbum(albums.saveAlbum);
    expect(idUser).toBe(albums.saveAlbum.idUser);
  });

  it('should reject saved in DB for the user not exist', async () => {
    try {
      await AlbumService.buyAlbum(albums.saveAlbum);
    } catch (err) {
      return expect(err.internalCode).toEqual('databaseError');
    }
    throw new Error('reject.');
  });

  it('should return albums buyed (0)', async () => {
    const res = await AlbumService.getMyAlbums(1);
    expect(res.length).toBe(0);
  });

  it('should reject for DB (data invalid)', async () => {
    try {
      await AlbumService.getMyAlbums('asd');
    } catch (err) {
      return expect(err.internalCode).toBe('databaseError');
    }
    throw new Error('Invalid data');
  });

  it('should get a album (0)', async () => {
    const res = await AlbumService.getMyAlbumForId(1, 1);
    expect(res.error).toBe('You have not bought the album.');
  });

  it('should reject for invalid data', async () => {
    try {
      await AlbumService.getMyAlbumForId(1);
    } catch (err) {
      return expect(err.internalCode).toBe('databaseError');
    }
    throw new Error('Invalid data');
  });
});
