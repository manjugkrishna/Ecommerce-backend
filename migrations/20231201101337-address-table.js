const { sequelize } = require('../models');
 
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable('Address', {
 
 
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
      },
      userId:{
        type: Sequelize.UUID,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    postalCode:{
        type:Sequelize.BIGINT
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
  },
  updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
  },
 
      }),
    ]);
  },
 
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Address');
  },
};