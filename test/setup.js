const axios = require('axios');
const models = require('../app/models');
const { albums } = require('./__mocks__');

const tables = Object.values(models.sequelize.models);

jest.mock('redis', () => jest.requireActual('redis-mock'));
jest.mock('axios');
axios.get.mockReturnValue({ data: albums.listAlbums[1] });
const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

global.beforeEach(async () => {
  await truncateDatabase();
});
