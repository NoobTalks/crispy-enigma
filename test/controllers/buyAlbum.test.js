const request = require('supertest');
const axios = require('axios');
const app = require('../../app');
const { listAlbums } = require('../__mocks__/album.mock');
const { dataUser } = require('../__mocks__/user.mock');
const { statusCodes } = require('../../app/helpers');

jest.mock('axios');
axios.get.mockReturnValue({ data: listAlbums[1] });

describe('Test buy album', () => {
  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
  });

  it('should buy a album', async done => {
    const token = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(value => value);
    request(app)
      .post('/album/1')
      .set('token', token)
      .expect(statusCodes.successful, done);
  });
});
