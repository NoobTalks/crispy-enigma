module.exports = {
  '/albums': {
    get: {
      tags: ['Albums'],
      summary: 'Get all albums',
      description: 'Returns all registered albums from the provider.',
      operationId: 'GetAlbums',
      parameters: [
        {
          name: 'token',
          in: 'header',
          required: true,
          description: 'Token generated when authenticating in the system.',
          schema: {
            $ref: '#/components/schemas/GetAlbums/parameters/head'
          }
        }
      ],
      responses: {
        200: {
          description: 'Get the list of albums successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetAlbums/responses/200'
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
        }
      }
    }
  }
};
