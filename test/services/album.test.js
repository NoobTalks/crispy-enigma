const axios = require('axios');
const { ALBUM_SUPPLIER } = require('../../app/constants');
const { AlbumService } = require('../../app/services');
const { listAlbums } = require('../__mocks__');

jest.mock('axios');
axios.get.mockReturnValue({ data: listAlbums });

describe('Album service', () => {
  it('should request to external API', async () => {
    await AlbumService.getAlbums();
    expect(axios.get).toHaveBeenCalledWith(ALBUM_SUPPLIER);
  });

  it('should get a list of albums', async () => {
    const album = await AlbumService.getAlbums();
    expect(album).toEqual(listAlbums);
  });
});
