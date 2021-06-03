const request = require('supertest');
const axios = require('axios');
const app = require('../../app');
const { messages, dataUser, albums } = require('../__mocks__');
const { statusCodes } = require('../../app/helpers');
const { AUTH_HEADER } = require('../../app/constants');

jest.mock('axios');
axios.get.mockReturnValue({ data: albums.listAlbums[1] });

describe('Test buy album', () => {
  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
  });

  it('should buy a album', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    request(app)
      .get('/albums/1')
      .set(AUTH_HEADER, `bearer ${token}`)
      .expect(statusCodes.successful, done);
  });

  it('should reject to buy an album because it is bought', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    await request(app)
      .get('/albums/2')
      .set(AUTH_HEADER, `bearer ${token}`);
    request(app)
      .get('/albums/2')
      .set(AUTH_HEADER, `bearer ${token}`)
      .then(res => {
        expect(res.body).toEqual(messages.albumBuy);
        done();
      });
  });

  it('should reject for token empty', done => {
    request(app)
      .get('/albums/2')
      .then(res => {
        expect(res.body).toEqual(messages.tokenEmpty);
        done();
      });
  });

  it('should reject for not having a valid id', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    request(app)
      .get('/albums/-1')
      .set(AUTH_HEADER, `bearer ${token}`)
      .then(res => {
        expect(res.body).toEqual(messages.idNotValid);
        done();
      });
  });
});
