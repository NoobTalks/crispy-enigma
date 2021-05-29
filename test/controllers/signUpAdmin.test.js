/* eslint-disable global-require */
const request = require('supertest');
const app = require('../../app');
const { statusCodes } = require('../../app/helpers');
const { dataUser } = require('../__mocks__');

describe('Register a administrator user', () => {
  beforeEach(async () => {
    const { UserService } = require('../../app/services');
    dataUser.signUpAdmin.password = '12345678';
    await UserService.signUp(dataUser.signUpAdmin);
  });

  it('should sign up a administrator user', async done => {
    const logInAdmin = await request(app)
      .post('/users/sessions')
      .send(dataUser.signInAdmin);
    const { token } = JSON.parse(logInAdmin.text);
    const res = await request(app)
      .post('/admin/users')
      .set('token', token)
      .send(dataUser.signUp);
    expect(res.statusCode).toBe(statusCodes.created);
    done();
  });

  it('should update an existing user and grant the admin role', async done => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
    const logInAdmin = await request(app)
      .post('/users/sessions')
      .send(dataUser.signInAdmin);
    const { token } = JSON.parse(logInAdmin.text);
    const res = await request(app)
      .post('/admin/users')
      .set('token', token)
      .send(dataUser.signUp);
    expect(res.statusCode).toBe(statusCodes.created);
    done();
  });

  it('should reject to created for permissions', async done => {
    await request(app)
      .post('/users')
      .send(dataUser.signUp);
    const logInUser = await request(app)
      .post('/users/sessions')
      .send(dataUser.signIn);
    const { token } = JSON.parse(logInUser.text);
    const res = await request(app)
      .post('/admin/users')
      .set('token', token)
      .send(dataUser.signUp);
    expect(res.statusCode).toBe(statusCodes.unauthorized);
    done();
  });

  it('should reject for token empty', async done => {
    const res = await request(app)
      .post('/admin/users')
      .set('token', '')
      .send(dataUser.signInAdmin);
    expect(res.statusCode).toBe(statusCodes.unauthorized);
    done();
  });

  it('should reject for data user empty', async done => {
    const logInAdmin = await request(app)
      .post('/users/sessions')
      .send(dataUser.signInAdmin);
    const { token } = JSON.parse(logInAdmin.text);
    const res = await request(app)
      .post('/admin/users')
      .set('token', token);
    expect(res.statusCode).toBe(statusCodes.badRequest);
    done();
  });
});
