'use strict';
const TABLE_USERS = process.env.DB_TABLE_USERS;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    TABLE_USERS,
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        unique: 'compositeIndex',
        validate: {
          isEmail: true
        },
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  // User.associate = models => {
  // associations can be defined here
  // };
  return User;
};
