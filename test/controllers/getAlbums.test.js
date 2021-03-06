const request = require('supertest');
const axios = require('axios');
const app = require('../../app');
const { dataUser, listAlbums } = require('../__mocks__');
const { AUTH_HEADER } = require('../../app/constants');
const { statusCodes } = require('../../app/helpers');

jest.mock('axios');

describe('Test get albums', () => {
  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
  });

  it('should get all albums', async done => {
    axios.get.mockResolvedValue({ data: listAlbums });
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(tokenRequest => tokenRequest.body);
    await request(app)
      .get('/albums')
      .set(AUTH_HEADER, token)
      .then(res => {
        expect(res.body).toEqual(listAlbums);
        done();
      });
  });

  it('should reject for token empty', async done => {
    await request(app)
      .get('/albums')
      .then(res => {
        expect(res.statusCode).toBe(statusCodes.unauthorized);
        done();
      });
  });
});
