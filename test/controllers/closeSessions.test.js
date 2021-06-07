const request = require('supertest');
const app = require('../../app');
const { messages } = require('../__mocks__/messages.mock');
const { dataUser } = require('../__mocks__/user.mock');

describe('Close sessions', () => {
  it('should close all connections', async done => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
    await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn);

    request(app)
      .post('/users/sessions/invalidate_all')
      .send(dataUser.signIn)
      .then(res => {
        expect(res.body).toEqual(messages.closeSessions);
        done();
      });
  });

  it('should reject for not found sessions', async done => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
    request(app)
      .post('/users/sessions/invalidate_all')
      .send(dataUser.signIn)
      .then(res => {
        expect(res.body).toEqual(messages.sessionsNotFound);
        done();
      });
  });

  it('should reject close sessions for data invalid', async done => {
    dataUser.signIn.password = '123123123';
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
    request(app)
      .post('/users/sessions/invalidate_all')
      .send(dataUser.signIn)
      .then(res => {
        expect(res.body).toEqual(messages.dataInvalid);
        done();
      });
  });

  it('should reject for user not exist', done => {
    request(app)
      .post('/users/sessions/invalidate_all')
      .send(dataUser.signIn)
      .then(res => {
        expect(res.body).toEqual(messages.userNotRegister);
        done();
      });
  });

  it('should reject for fields empty', done => {
    request(app)
      .post('/users/sessions/invalidate_all')
      .then(res => {
        expect(res.body).toEqual(messages.emailAndPasswordRequired);
        done();
      });
  });
});
