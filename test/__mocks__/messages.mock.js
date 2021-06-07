exports.messages = {
  userNotRegister: {
    message: 'User is not registered.',
    internalCode: 'unauthorized'
  },
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
    internalCode: 'badRequest'
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
    internalCode: 'badRequest'
  },
  emailAndPasswordRequired: {
    message: [
      {
        message: '"email" is required',
        path: ['email'],
        type: 'any.required',
        context: {
          label: 'email',
          key: 'email'
        }
      },
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
    internalCode: 'badRequest'
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
    internalCode: 'badRequest'
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
    internalCode: 'badRequest'
  },
  albumBuy: {
    message: 'you already bought this album',
    internalCode: 'conflict'
  },
  tokenEmpty: {
    message: 'Token empty.',
    internalCode: 'unauthorized'
  },
  idNotValid: {
    message: 'el ID ingresado no es valido',
    internalCode: 'badRequest'
  },
  tokenExpired: {
    message: 'token invalid.',
    internalCode: 'unauthorized'
  },
  dataInvalid: {
    message: 'Email or password invalid.',
    internalCode: 'unauthorized'
  },
  closeSessions: {
    message: '1 sessions closed',
    user: 'yesid@wolox.com.co'
  },
  sessionsNotFound: {
    message: 'no active sessions found',
    internalCode: 'notFound'
  }
};
