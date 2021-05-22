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

exports.signInResponseDTO = (params = {}) => {
  const { id } = params;
  return {
    id
  };
};
