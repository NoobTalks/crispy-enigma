const { Op } = require('sequelize');
const { errors, utils } = require('../helpers');
const db = require('../models');

class UserService {
  static async signUp(user) {
    try {
      user.password = utils.encryptPassword(user.password);
      const userRecord = await db.User.create(user);
      return userRecord;
    } catch (err) {
      throw errors.databaseError(err);
    }
  }

  static async getUsers(params = {}) {
    try {
      if (typeof params !== 'object') {
        throw errors.conflictServer('the params must be an object.');
      }
      const { limit = 5, since = 0, ...paramQuery } = params;
      const res = { message: `Users listed with limit=${limit} since=${since}` };
      const query = paramQuery ? { where: { [Op.or]: params } } : {};
      res.users = await db.User.findAll({ limit, offset: since, query });
      return res;
    } catch (err) {
      throw errors.databaseError(err);
    }
  }

  static async getUser(params = {}) {
    try {
      const user = await db.User.findOne({ where: { [Op.or]: params } });
      return user ? user.dataValues : { error: 'User is not registered.' };
    } catch (err) {
      throw errors.databaseError(err);
    }
  }

  static async updateUser(id, user) {
    try {
      if (user.password) {
        user.password = utils.encryptPassword(user.password);
      }
      const userUpdate = await db.User.update(user, { where: { id } });
      return userUpdate;
    } catch (err) {
      throw errors.databaseError(err);
    }
  }
}

module.exports = UserService;
