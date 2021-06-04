const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const btoa = require('btoa');
const { RedisService } = require('../services');

const encryptPassword = password => {
  const salt = bcryptjs.genSaltSync();
  const passwordEncrypt = bcryptjs.hashSync(password, salt);
  return passwordEncrypt;
};

const isValidPassword = (password, passwordEncrypted) => bcryptjs.compareSync(password, passwordEncrypted);

const generateToken = payload =>
  new Promise((resolve, reject) => {
    const key = `${payload.id}:${btoa(Math.floor(new Date().getTime() / 1000))}`;
    const expiryTime = Number(process.env.JWT_EXPIRY_TIME);
    return jwt.sign(
      payload,
      process.env.JWT_KEY_SECRET,
      {
        jwtid: key,
        expiresIn: expiryTime
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        RedisService.set(key, expiryTime, token);
        resolve(token);
      }
    );
  });

const isContentEqual = (original, compare) => JSON.stringify(original) === JSON.stringify(compare);

module.exports = {
  encryptPassword,
  isValidPassword,
  generateToken,
  isContentEqual
};
