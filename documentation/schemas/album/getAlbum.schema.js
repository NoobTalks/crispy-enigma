exports.GetAlbums = {
  parameters: {
    head: {
      type: 'string',
      description: 'Token'
    }
  },
  responses: {
    200: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              example: 1
            },
            id: {
              type: 'integer',
              example: 1
            },
            title: {
              type: 'string',
              example: 'first title'
            }
          }
        },
        {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              example: 2
            },
            id: {
              type: 'integer',
              example: 2
            },
            title: {
              type: 'string',
              example: 'second title'
            }
          }
        }
      ]
    },
    401: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Token empty.'
        },
        internalCode: {
          type: 'string',
          example: 'unauthorized'
        }
      }
    }
  }
};
