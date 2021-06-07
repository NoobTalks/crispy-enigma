const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RedisService } = require('../services');

exports.encryptPassword = password => {
  const salt = bcryptjs.genSaltSync();
  const passwordEncrypt = bcryptjs.hashSync(password, salt);
  return passwordEncrypt;
};

exports.isValidPassword = (password, passwordEncrypted) => bcryptjs.compareSync(password, passwordEncrypted);

exports.generateToken = payload =>
  new Promise((resolve, reject) => {
    const date = Math.floor(new Date().getTime() / 1000);
    const key = `${payload.id}:${Buffer.from(date.toString()).toString('base64')}`;
    const expiryTime = Number(process.env.JWT_EXPIRY_TIME);
    return jwt.sign(
      payload,
      process.env.JWT_KEY_SECRET,
      {
        jwtid: key,
        expiresIn: expiryTime
      },
      async (err, token) => {
        if (err) {
          reject(err);
        }
        await RedisService.set(key, expiryTime, token);
        resolve(token);
      }
    );
  });

exports.decodedToken = token => jwt.decode(token, process.env.JWT_KEY_SECRET);

exports.isContentEqual = (original, compare) => JSON.stringify(original) === JSON.stringify(compare);
