module.exports = {
  '/albums/{id}': {
    get: {
      tags: ['Albums'],
      summary: 'Buy album',
      description: 'To buy an album you just have to enter the id in the request.',
      operationId: 'BuyAlbum',
      parameters: [
        {
          name: 'token',
          in: 'header',
          required: true,
          description: 'Token generated when authenticating in the system.',
          schema: {
            $ref: '#/components/schemas/BuyAlbum/parameters/head'
          }
        }
      ],
      responses: {
        200: {
          description: 'Purchase successful.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BuyAlbum/responses/200'
              }
            }
          }
        },
        401: {
          description: 'Token empty, the token expired or the data is not valid.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetAlbums/responses/401'
              }
            }
          }
        },
        404: {
          description: 'If the album does not exist or the entered id was not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BuyAlbum/responses/404'
              }
            }
          }
        },
        409: {
          description: 'The album you are trying to buy has already been purchased.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BuyAlbum/responses/409'
              }
            }
          }
        }
      }
    }
  }
};
