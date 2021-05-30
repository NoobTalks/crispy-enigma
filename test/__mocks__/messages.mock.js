exports.messages = {
  emailRequired: {
    message: [
      {
        message: '"email" is required',
        path: ['email'],
        type: 'any.required',
        context: {
          label: 'email',
          key: 'email'
        }
      }
    ],
    internal_code: 'badRequest'
  },
  passwordRequired: {
    message: [
      {
        message: '"password" is required',
        path: ['password'],
        type: 'any.required',
        context: {
          label: 'password',
          key: 'password'
        }
      }
    ],
    internal_code: 'badRequest'
  },
  limitNegative: {
    message: [
      {
        message: '"limit" must be greater than or equal to 1',
        path: ['limit'],
        type: 'number.min',
        context: {
          limit: 1,
          value: -2,
          label: 'limit',
          key: 'limit'
        }
      }
    ],
    internal_code: 'badRequest'
  },
  sinceNegative: {
    message: [
      {
        message: '"since" must be greater than or equal to 1',
        path: ['since'],
        type: 'number.min',
        context: {
          limit: 1,
          value: -2,
          label: 'since',
          key: 'since'
        }
      }
    ],
    internal_code: 'badRequest'
  },
  albumBuy: {
    message: 'you already bought this album',
    internal_code: 'conflict'
  },
  tokenEmpty: {
    message: 'Token empty.',
    internal_code: 'unauthorized'
  },
  idNotValid: {
    message: 'el ID ingresado no es valido',
    internal_code: 'badRequest'
  }
};
