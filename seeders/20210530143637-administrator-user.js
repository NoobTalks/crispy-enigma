'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        firstName: 'Administrator',
        lastName: 'Wolox',
        email: 'root@wolox.com.co',
        password: '$2a$10$KMrXhSvJXQB841swc/0.aOV74eh.Nbl9b/UXi4Zk3gWvUhoOCKTfW',
        role: 'administrator'
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
