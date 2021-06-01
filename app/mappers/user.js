const { ROLES } = require('../helpers');

exports.signUpDTO = (params = {}) => {
  const { first_name, last_name, email, password } = params;
  return {
    firstName: first_name,
    lastName: last_name,
    email,
    password
  };
};

exports.signInDTO = (params = {}) => {
  const { email, password } = params;
  return {
    email,
    password
  };
};

exports.listUsersDTO = (params = {}) => {
  const { limit, since } = params;
  return {
    limit,
    since
  };
};

exports.signUpAdminDTO = (params = {}) => {
  const { first_name, last_name, email, password } = params;
  return {
    firstName: first_name,
    lastName: last_name,
    email,
    password,
    role: ROLES.admin
  };
};
