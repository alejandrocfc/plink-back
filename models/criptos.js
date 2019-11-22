'use strict';
module.exports = (sequelize, DataTypes) => {
  const Criptos = sequelize.define('Criptos', {
    name: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    source: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {});
  Criptos.associate = function(models) {
    Criptos.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Criptos;
};
