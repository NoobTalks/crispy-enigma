const bcryptjs = require('bcryptjs');
const jwt = require('jwt-simple');

const encryptPassword = password => {
  const salt = bcryptjs.genSaltSync();
  const passwordEncrypt = bcryptjs.hashSync(password, salt);
  return passwordEncrypt;
};

const isValidPassword = (password, passwordEncrypted) => bcryptjs.compareSync(password, passwordEncrypted);

const generateToken = payload => jwt.encode(payload, process.env.JWT_KEY_SECRET);

const decodeToken = token => jwt.decode(token, process.env.JWT_KEY_SECRET);

const isObjectEqual = (original, compare) => JSON.stringify(original) === JSON.stringify(compare);

module.exports = {
  encryptPassword,
  isValidPassword,
  generateToken,
  decodeToken,
  isObjectEqual
};
