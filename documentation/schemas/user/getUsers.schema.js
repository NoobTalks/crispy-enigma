exports.GetUsers = {
  parameters: {
    limit: {
      type: 'integer'
    },
    since: {
      type: 'integer'
    }
  },
  responses: {
    200: {
      type: 'object',
      properties: {
        response: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Users listed with limit=2 since=0'
            },
            users: {
              type: 'array',
              items: [
                {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: '1'
                    },
                    firstName: {
                      type: 'string',
                      example: 'Yesid'
                    },
                    lastName: {
                      type: 'string',
                      example: 'Hernandez'
                    },
                    email: {
                      type: 'string',
                      example: 'yesid1@wolox.com.co'
                    },
                    password: {
                      type: 'string',
                      example: '$2a$10$XsbC9B7jwDETC7evYDoR5OB.S8ZXHoDXAdYCavTgXkNo/AdKLYH0W'
                    },
                    createdAt: {
                      type: 'date',
                      example: '2021-05-21T13:18:38.244Z'
                    },
                    updatedAt: {
                      type: 'date',
                      example: '2021-05-21T13:18:38.244Z'
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: '2'
                    },
                    firstName: {
                      type: 'string',
                      example: 'Yesid'
                    },
                    lastName: {
                      type: 'string',
                      example: 'Hernandez'
                    },
                    email: {
                      type: 'string',
                      example: 'yesid1@wolox.com.co'
                    },
                    password: {
                      type: 'string',
                      example: '$2a$10$XsbC9B7jwDETC7evYDoR5OB.S8ZXHoDXAdYCavTgXkNo/AdKLYH0W'
                    },
                    createdAt: {
                      type: 'date',
                      example: '2021-05-21T13:18:38.244Z'
                    },
                    updatedAt: {
                      type: 'date',
                      example: '2021-05-21T13:18:38.244Z'
                    }
                  }
                }
              ]
            }
          }
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
                example: 'limit" must be a positive number'
              },
              path: {
                type: 'array',
                items: [
                  {
                    type: 'string',
                    example: 'limit'
                  }
                ]
              },
              type: {
                type: 'string',
                example: 'number.positive'
              },
              context: {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                    example: 'limit'
                  },
                  value: {
                    type: 'integer',
                    example: -1
                  },
                  key: {
                    type: 'string',
                    example: 'limit'
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
    }
  }
};
