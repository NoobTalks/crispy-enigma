exports.SignIn = {
  responses: {
    200: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Nn0.6DumY0c0lqcrVpsJRSD3kj_cUcW1j1N3qE6XRmCNYGw'
        }
      }
    },
    400: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: '"first_name" is required'
              },
              path: {
                type: 'array',
                items: {
                  type: 'string',
                  example: 'first_name'
                }
              },
              type: {
                type: 'string',
                example: 'any.required'
              },
              context: {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                    example: 'first_name'
                  },
                  key: {
                    type: 'string',
                    example: 'first_name'
                  }
                }
              }
            }
          }
        },
        internalCode: {
          type: 'string',
          example: 'badRequest'
        }
      }
    },
    401: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Email or password invalid.'
        },
        internalCode: {
          type: 'string',
          example: 'unauthorized'
        }
      }
    },
    409: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User is not registered.'
        },
        internalCode: {
          type: 'string',
          example: 'conflict'
        }
      }
    }
  },
  request: {
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'yesid@wolox.com.co'
        },
        password: {
          type: 'string',
          example: '12345678'
        }
      }
    }
  }
};
