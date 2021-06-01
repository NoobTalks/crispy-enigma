exports.MyAlbums = {
  responses: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
          example: 'yesid@wolox.com.co'
        },
        albums: {
          type: 'array',
          items: [
            {
              type: 'object',
              properties: {
                idAlbum: {
                  type: 'integer',
                  example: 1
                },
                userId: {
                  type: 'integer',
                  example: 1
                },
                title: {
                  type: 'string',
                  example: 'quidem molestiae enim'
                }
              }
            },
            {
              type: 'object',
              properties: {
                idAlbum: {
                  type: 'integer',
                  example: 14
                },
                userId: {
                  type: 'integer',
                  example: 2
                },
                title: {
                  type: 'string',
                  example: 'ducimus molestias eos animi atque nihil'
                }
              }
            }
          ]
        }
      }
    },
    400: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'el ID ingresado no es valido'
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
          example: 'You can only see your album, Direct to http://localhost:8081/users/1/albums'
        },
        internalCode: {
          type: 'string',
          example: 'unauthorized'
        }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'user with ID 20 not found'
        },
        internalCode: {
          type: 'string',
          example: 'notFound'
        }
      }
    }
  }
};
