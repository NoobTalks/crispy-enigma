const signInDTO = (params = {}) => {
  const { first_name, last_name, email, password } = params;
  return {
    firstName: first_name,
    lastName: last_name,
    email,
    password,
    role: 'administrator'
  };
};

module.exports = {
  signInDTO
};
