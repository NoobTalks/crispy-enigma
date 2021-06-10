exports.SignUp = {
  responses: {
    201: {
      type: 'object',
      properties: {
        response: {
          type: 'string',
          example: 'Successful registration.'
        },
        user: {
          type: 'string',
          example: 'yesid@wolox.com.co'
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
    409: {
      type: 'object',
      properties: {
        message: {
          type: 'object',
          properties: {
            response: {
              type: 'string',
              example: 'this email is already in use.'
            },
            user: {
              type: 'string',
              example: 'yesid@wolox.com.ar'
            }
          }
        },
        internalCode: {
          type: 'string',
          example: 'badRequest'
        }
      }
    }
  },
  request: {
    body: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
          example: 'yesid'
        },
        last_name: {
          type: 'string',
          example: 'hernandez'
        },
        email: {
          type: 'string',
          example: 'yesid@wolox.com.co'
        },
        password: {
          type: 'string',
          example: '123456ab'
        }
      }
    }
  }
};
