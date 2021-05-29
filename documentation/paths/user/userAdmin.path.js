module.exports = {
  '/admin/users': {
    post: {
      tags: ['Admin'],
      summary: 'User admin',
      description: 'Register a user as administrator, if exist update the role.',
      operationId: 'userAdmin',
      parameters: [
        {
          name: 'token',
          in: 'header',
          required: true,
          type: 'string',
          description:
            'authentication token as administrator user to be able to register an administrator user.',
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignUp/request/body'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Successful register',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignUpAdmin/responses/201'
              }
            }
          }
        },
        400: {
          description: 'Fields do not meet the conditions imposed.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignUpAdmin/responses/400'
              }
            }
          }
        },
        401: {
          description: 'Insufficient permissions or token empty.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignUpAdmin/responses/401'
              }
            }
          }
        }
      }
    }
  }
};
