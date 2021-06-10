exports.BuyAlbum = {
  parameters: {
    head: {
      type: 'string'
    }
  },
  responses: {
    200: {
      type: 'object',
      properties: {
        state: {
          type: 'string',
          example: 'buy'
        },
        album: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              example: 1
            },
            id: {
              type: 'integer',
              example: 10
            },
            title: {
              type: 'string',
              example: 'distinctio laborum qui'
            }
          }
        }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Album not found'
        },
        internalCode: {
          type: 'string',
          example: 'notFound'
        }
      }
    },
    409: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'you already bought this album'
        },
        internalCode: {
          type: 'string',
          example: 'conflict'
        }
      }
    }
  }
};
