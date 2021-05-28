const request = require('supertest');
const axios = require('axios');
const app = require('../../app');
const { statusCodes } = require('../../app/helpers');
const { dataUser, listAlbums } = require('../__mocks__');

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
    request(app)
      .get('/albums')
      .set('token', token)
      .then(res => {
        expect(res.body).toEqual(listAlbums);
        done();
      });
  });

  it('should reject for token empty', done => {
    request(app)
      .get('/albums')
      .expect(statusCodes.unauthorized, done);
  });
});
