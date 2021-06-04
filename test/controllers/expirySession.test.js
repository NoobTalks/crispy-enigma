const request = require('supertest');
const app = require('../../app');
const { AUTH_HEADER } = require('../../app/constants');
const { statusCodes, utils } = require('../../app/helpers');
const { RedisService } = require('../../app/services');
const { dataUser, albums, messages } = require('../__mocks__');

const backUpTimeExpiry = process.env.JWT_EXPIRY_TIME;

beforeEach(async () => {
  await request(app)
    .post('/users')
    .send(dataUser.signUp);
});

afterEach(() => {
  process.env.JWT_EXPIRY_TIME = backUpTimeExpiry;
});

describe('Expiry session', () => {
  it('should get the albums', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    request(app)
      .get('/albums')
      .set(AUTH_HEADER, `bearer ${token}`)
      .then(res => {
        expect(res.body).toEqual(albums.listAlbums[1]);
        done();
      });
  });

  it('should reject for token expired natural', async done => {
    process.env.JWT_EXPIRY_TIME = 0;
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn);
    request(app)
      .get('/albums')
      .set(AUTH_HEADER, `bearer ${token}`)
      .then(res => {
        expect(res.statusCode).toBe(statusCodes.unauthorized);
        done();
      });
  });

  it('should reject for token expired for redis', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    const { jti } = utils.decodedToken(token);
    await RedisService.del(jti);
    request(app)
      .get('/albums')
      .set(AUTH_HEADER, `beare ${token}`)
      .then(res => {
        expect(res.body).toEqual(messages.tokenExpired);
        done();
      });
  });
});
