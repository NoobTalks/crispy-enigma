// const controller = require('./controllers/controller');
const redoc = require('redoc-express');
const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, listUsers, signUpAdmin, getAlbums, buyAlbum } = require('./controllers');
const {
  validateSignUpDTO,
  validateSignInDTO,
  validateGetUsersDTO,
  validateAuthentication,
  isAdmin
} = require('./middlewares/validators/user');
const { jsonSwagger } = require('./controllers/documentation');
const { validateAlbum } = require('./middlewares/validators/album');

exports.init = app => {
  app.get('/docs/swagger', jsonSwagger);
  app.get('/docs', redoc({ title: 'API docs', specUrl: '/docs/swagger' }));
  app.get('/health', healthCheck);
  app.get('/users', [validateGetUsersDTO], listUsers);
  app.get('/albums', [validateAuthentication], getAlbums);
  app.get('/albums/:id', [validateAuthentication, validateAlbum], buyAlbum);
  app.post('/users', [validateSignUpDTO], signUp);
  app.post('/users/sessions', [validateSignInDTO], signIn);
  app.post('/admin/users', [validateAuthentication, validateSignUpDTO, isAdmin], signUpAdmin);
};
