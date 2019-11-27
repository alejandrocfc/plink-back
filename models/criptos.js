'use strict';
module.exports = (sequelize, DataTypes) => {
  const Criptos = sequelize.define('Criptos', {
    name: {
      type:DataTypes.TEXT,
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
