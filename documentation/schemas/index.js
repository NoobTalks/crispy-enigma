const userSchemas = require('./user');
const albumSchemas = require('./album');

module.exports = {
  ...userSchemas,
  ...albumSchemas,
  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      },
      internal_code: {
        type: 'string'
      }
    }
  }
};
