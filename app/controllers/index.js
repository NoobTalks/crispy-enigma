const user = require('./users');
const admin = require('./admin');
const album = require('./album');

module.exports = {
  ...user,
  ...admin,
  ...album
};
