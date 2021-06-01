exports.SignUpAdmin = {
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
        internal_code: {
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
          example: "User yesid09@wolox.com.co isn't administrator"
        },
        internal_code: {
          type: 'string',
          example: 'unauthorized'
        }
      }
    }
  },
  request: {
    head: {
      type: 'object',
      properties: {
        token: {
          type: 'string'
        }
      }
    },
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
