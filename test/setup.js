const models = require('../app/models');

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));
jest.mock('redis', () => jest.requireActual('redis-mock'));

global.beforeEach(async () => {
  await truncateDatabase();
});
