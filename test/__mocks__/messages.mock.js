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
  getMyAlbums: {
    user: 'yesid@wolox.com.co',
    albums: [
      { userId: 1, id: 1, title: 'first title' },
      { userId: 2, id: 2, title: 'second title' }
    ]
  },
  onlyMyAlbums: {
    message: 'You can only see your album, Direct to http://localhost:8081/users/1/albums',
    internalCode: 'unauthorized'
  },
  userNotExist: {
    message: 'User is not register in the DB.',
    internalCode: 'notFound'
  },
  dataNotEqual: {
    message: 'the data of token it does not match with the data of the DB',
    internalCode: 'unauthorized'
  },
  userRequestNotExist: {
    message: 'user with ID 10 not found',
    internalCode: 'notFound'
  }
};
