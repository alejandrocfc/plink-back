'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async transaction => {
      await  queryInterface.createTable('Criptos', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          userId: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'Users',
              key: 'id',
              as: 'userId',
            },
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        }, {transaction});
      await queryInterface.addConstraint('Criptos', ['userId', 'name'], {
        type: 'unique', name: 'unique_constraint_name'}, {transaction});
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Criptos');
  }
};
