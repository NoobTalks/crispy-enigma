const userPath = require('./user');
const albumPath = require('./album');

module.exports = {
  ...userPath,
  ...albumPath
};
