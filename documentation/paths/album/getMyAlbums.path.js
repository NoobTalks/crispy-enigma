module.exports = {
  '/users/{user_id}/albums': {
    get: {
      tags: ['Users', 'Albums'],
      summary: 'Get albums',
      description: 'Returns a list of purchased albums.',
      operationId: 'GetMyAlbums',
      parameter: [
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
          description: 'Return the list of albums buyed.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MyAlbums/responses/200'
              }
            }
          }
        },
        400: {
          description: 'Invalid requestor id with parameters (Must be numeric).',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MyAlbums/responses/400'
              }
            }
          }
        },
        401: {
          description:
            'The requested id is not from the requestor and the requestor is not an administrator.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MyAlbums/responses/401'
              }
            }
          }
        },
        404: {
          description: 'The requested id does not exist.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MyAlbums/responses/404'
              }
            }
          }
        }
      }
    }
  }
};
