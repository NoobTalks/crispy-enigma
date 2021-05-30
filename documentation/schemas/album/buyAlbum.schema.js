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
    409: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'you already bought this album'
        },
        internal_code: {
          type: 'string',
          example: 'conflict'
        }
      }
    }
  }
};
