'use strict';

exports.USERS_TABLE = 'User';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    exports.USERS_TABLE,
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
        unique: true,
        validate: {
          isEmail: true
        },
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        defaultValue: 'regular',
        type: DataTypes.STRING
      }
    },
    {}
  );
  /*
  User.associate = models => {
    // associations can be defined here
  };
  */
  return User;
};
