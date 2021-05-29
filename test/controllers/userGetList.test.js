/* eslint-disable global-require */
const request = require('supertest');
const app = require('../../app');
const { messages } = require('../__mocks__');
const { dataUser } = require('../__mocks__/user.mock');

describe('Get list users', () => {
  beforeEach(() => {
    const models = require('../../app/models');
    jest.mock('../../app/models');
    const { User } = models;
    User.create.mockImplementationOnce(user => Promise.resolve(user));
  });

  it('should get list of 5 users', async done => {
    for (let i = 0; i < 7; i++) {
      dataUser.signUp.email = `yesid${i}@wolox.com.co`;
      await request(app)
        .post('/users')
        .send(dataUser.signUp);
    }
    const res = await request(app).get('/users');
    const compare = JSON.parse(res.text);
    expect(compare.response.users.length).toBe(5);
    done();
  });

  it('should get list of 7 users', async done => {
    for (let i = 0; i < 7; i++) {
      dataUser.signUp.email = `yesid${i}@wolox.com.co`;
      await request(app)
        .post('/users')
        .send(dataUser.signUp);
    }
    const res = await request(app).get('/users?limit=7');
    const compare = JSON.parse(res.text);
    expect(compare.response.users.length).toBe(7);
    done();
  });

  it('should get list last 2 users', async done => {
    for (let i = 0; i < 7; i++) {
      dataUser.signUp.email = `yesid${i}@wolox.com.co`;
      await request(app)
        .post('/users')
        .send(dataUser.signUp);
    }
    const res = await request(app).get('/users?limit=2&since=5');
    const compare = JSON.parse(res.text);
    expect(compare.response.users[0].email).toBe('yesid5@wolox.com.co');
    expect(compare.response.users[1].email).toBe('yesid6@wolox.com.co');
    done();
  });

  it('should reject for limit negative', async done => {
    const res = await request(app).get('/users?limit=-2');
    const compare = JSON.parse(res.text);
    expect(compare).toEqual(messages.limitNegative);
    done();
  });

  it('should reject for since negative', async done => {
    const res = await request(app).get('/users?since=-2');
    const compare = JSON.parse(res.text);
    expect(compare).toEqual(messages.sinceNegative);
    done();
  });

  it('should reject for since negative and limit positive', async done => {
    const res = await request(app).get('/users?since=-2&limit=2');
    const compare = JSON.parse(res.text);
    expect(compare).toEqual(messages.sinceNegative);
    done();
  });

  it('should reject for limit negative and since positive', async done => {
    const res = await request(app).get('/users?since=2&limit=-2');
    const compare = JSON.parse(res.text);
    expect(compare).toEqual(messages.limitNegative);
    done();
  });

  it('should reject with message of since negative', async done => {
    const res = await request(app).get('/users?since=-2&limit=-2');
    const compare = JSON.parse(res.text);
    expect(compare).toEqual(messages.limitNegative);
    done();
  });

  it('should reject with message of limit negative', async done => {
    const res = await request(app).get('/users?since=-2&limit=-2');
    const compare = JSON.parse(res.text);
    expect(compare).toEqual(messages.limitNegative);
    done();
  });
});
