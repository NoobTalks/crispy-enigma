const request = require('supertest');
const app = require('../../app');
const { utils } = require('../../app/helpers');
const { AlbumService, UserService } = require('../../app/services');
const { albums, dataUser, messages } = require('../__mocks__');

jest.mock('../../app/services/album', () => ({
  getMyAlbums: jest.fn()
}));
AlbumService.getMyAlbums.mockResolvedValue(albums.listAlbums);

describe('Get my albums', () => {
  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
  });

  it('should get my albums', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    await request(app)
      .get('/users/1/albums')
      .set('token', token)
      .then(res => {
        expect(res.body).toEqual(messages.getMyAlbums);
        done();
      });
  });

  it('should reject for token empty', async done => {
    await request(app)
      .get('/users/1/albums')
      .then(res => {
        expect(res.body).toEqual(messages.tokenEmpty);
        done();
      });
  });

  it('should reject for id invalid', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    await request(app)
      .get('/users/asd/albums')
      .set('token', token)
      .then(res => {
        expect(res.body).toEqual(messages.idNotValid);
        done();
      });
  });

  it('should reject for no is my album invalid', async done => {
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn)
      .then(res => res.body);
    await request(app)
      .get('/users/2/albums')
      .set('token', token)
      .then(res => {
        expect(res.body).toEqual(messages.onlyMyAlbums);
        done();
      });
  });

  it('should reject for user token is not register', async done => {
    const token = await utils.generateToken({ email: 'NoExiste' });
    await request(app)
      .get('/users/1/albums')
      .set('token', token)
      .then(res => {
        expect(res.body).toEqual(messages.userNotExist);
        done();
      });
  });

  it('should reject for data user DB is not equal with the token', async done => {
    const token = await utils.generateToken({ email: 'yesid@wolox.com.co', firstName: 'pepito' });
    await request(app)
      .get('/users/2/albums')
      .set('token', token)
      .then(res => {
        expect(res.body).toEqual(messages.dataNotEqual);
        done();
      });
  });

  it('should reject for the user not exist', async done => {
    await UserService.signUp(dataUser.signUpAdmin);
    const { token } = await request(app)
      .post('/users/sessions')
      .send(dataUser.signInAdmin)
      .then(res => res.body);
    await request(app)
      .get('/users/10/albums')
      .set('token', token)
      .then(res => {
        expect(res.body).toEqual(messages.userRequestNotExist);
        done();
      });
  });
});
