// const controller = require('./controllers/controller');
const redoc = require('redoc-express');
const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, listUsers, signUpAdmin, getAlbums } = require('./controllers');
const {
  validateSignUpDTO,
  validateSignInDTO,
  validateGetUsersDTO
} = require('./middlewares/validators/user');
const { validateToken } = require('./middlewares/validators/token');
const { jsonSwagger } = require('./controllers/documentation');

exports.init = app => {
  app.get('/docs/swagger', jsonSwagger);
  app.get('/docs', redoc({ title: 'API docs', specUrl: '/docs/swagger' }));
  app.get('/health', healthCheck);
  app.get('/users', [validateGetUsersDTO], listUsers);
  app.get('/albums', [validateToken], getAlbums);
  app.post('/users', [validateSignUpDTO], signUp);
  app.post('/users/sessions', [validateSignInDTO], signIn);
  app.post('/admin/users', [validateToken, validateSignUpDTO], signUpAdmin);
};
