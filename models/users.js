'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    lastname: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    currency: {
      type:DataTypes.ENUM('eur','usd','cop'),
      allowNull:false
    }
  }, {});
  Users.associate = (models) => {
    Users.hasMany(models.Criptos, {
      foreignKey: 'userId',
      as: 'userCriptos',
    });
  };
  return Users;
};

