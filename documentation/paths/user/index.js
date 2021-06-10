const signIn = require('./signIn.path');
const signUp = require('./signUp.path');
const getUsers = require('./getUsers.path');
const userAdmin = require('./signUpAdmin.path');

module.exports = {
  ...signIn,
  ...signUp,
  ...getUsers,
  ...userAdmin
};
