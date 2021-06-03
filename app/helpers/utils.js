const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const btoa = require('btoa');

const encryptPassword = password => {
  const salt = bcryptjs.genSaltSync();
  const passwordEncrypt = bcryptjs.hashSync(password, salt);
  return passwordEncrypt;
};

const isValidPassword = (password, passwordEncrypted) => bcryptjs.compareSync(password, passwordEncrypted);

const generateToken = payload =>
  new Promise((resolve, reject) => {
    const key = `${payload.id}:${btoa(Math.floor(new Date().getTime() / 1000))}`;
    return jwt.sign(
      payload,
      process.env.JWT_KEY_SECRET,
      {
        jwtid: key,
        expiresIn: Number(process.env.JWT_EXPIRY_TIME)
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });

const decodeToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }
      delete decoded.iat;
      delete decoded.exp;
      resolve(decoded);
    });
  });

const isObjectEqual = (original, compare) => JSON.stringify(original) === JSON.stringify(compare);

module.exports = {
  encryptPassword,
  isValidPassword,
  generateToken,
  decodeToken,
  isObjectEqual
};
