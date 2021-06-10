'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      idAlbum: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Sale.associate = models => {
    Sale.belongsTo(models.User, {
      foreignKey: 'idUser'
    });
  };
  return Sale;
};
