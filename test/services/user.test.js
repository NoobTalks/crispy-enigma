/* eslint-disable global-require */
const UserService = require('../../app/services/user');
const { dataUser } = require('../__mocks__');

describe('User service', () => {
  beforeEach(() => {
    const models = require('../../app/models');
    jest.mock('../../app/models');
    const { User } = models;
    User.create.mockImplementationOnce(user => Promise.resolve(user));
  });

  const oldInfo = { ...dataUser.signUpAdmin };
  const newInfo = { ...oldInfo, email: 'newemail@wolox.com.co' };

  it('should register user', async () => {
    const { email } = await UserService.signUp(dataUser.signUpAdmin);
    expect(email).toBe(dataUser.signUpAdmin.email);
  });

  it('should reject register user', async () => {
    try {
      await UserService.signUp(dataUser.signUpAdmin);
      await UserService.signUp(dataUser.signUpAdmin);
    } catch (err) {
      return expect(err.internalCode).toEqual('databaseError');
    }
    throw new Error('User must be registered.');
  });

  it('should getting users', async () => {
    for (let i = 0; i < 5; i++) {
      dataUser.signUpAdmin.email = `yesid${i}@wolox.com.co`;
      await UserService.signUp(dataUser.signUpAdmin);
    }
    const res = await UserService.getUsers();
    return expect(res.users.length).toBe(5);
  });

  it('should reject getting users', async () => {
    try {
      await UserService.getUsers('assdad');
    } catch (err) {
      return expect(err.internalCode).toEqual('databaseError');
    }
    throw new Error('invalid parameter');
  });

  it('should get a user', async () => {
    await UserService.signUp(dataUser.signUpAdmin);
    const { firstName } = await UserService.getUser({ email: dataUser.signUpAdmin.email });
    return expect(firstName).toBe(dataUser.signUpAdmin.firstName);
  });

  it('should reject when getting a user', async () => {
    try {
      await UserService.getUser('asd');
    } catch (err) {
      return expect(err.internalCode).toBe('databaseError');
    }
    throw new Error('invalid parameter');
  });

  it('should update a user', async () => {
    await UserService.signUp(oldInfo);
    const { id } = await UserService.getUser({ email: oldInfo.email });
    const res = await UserService.updateUser(id, newInfo);
    expect(res).toBeTruthy();
  });

  it('should reject update a user', async () => {
    try {
      await UserService.updateUser(1);
    } catch (err) {
      return expect(err.internalCode).toBe('databaseError');
    }
    throw new Error('Failed to update user, user not exist.');
  });
});
