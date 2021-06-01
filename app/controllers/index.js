const user = require('./users');
const admin = require('./admin');

module.exports = {
  ...user,
  ...admin
};
