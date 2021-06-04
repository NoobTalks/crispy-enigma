const redis = require('redis');
const { errors } = require('../helpers');

class RedisService {
  static get(key) {
    return new Promise((resolve, reject) => {
      const client = redis.createClient();
      client.get(key, (err, reply) => {
        if (err) {
          reject(errors.unauthorized(err));
        }
        resolve(reply);
      });
      client.quit();
    });
  }

  static set(key, time, value) {
    const client = redis.createClient();
    client.setex(key, time, value);
    client.quit();
  }

  static del(key) {
    return new Promise((resolve, reject) => {
      const client = redis.createClient();
      client.del(key, (err, reply) => {
        if (err) {
          reject(errors.conflictServer(err));
        }
        resolve(reply);
      });
      client.quit();
    });
  }
}

module.exports = RedisService;
