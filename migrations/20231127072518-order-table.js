// eslint-disable-next-line no-unused-vars
const { sequelize } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable('Order', {


        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
      },
      userId:{
        type: Sequelize.UUID,
        allowNull: false,
      },
        items: {
          type: Sequelize.JSONB
        },
        total: {
          type: Sequelize.BIGINT
        },
        status: {
          type: Sequelize.ENUM,
          values: ["PENDING", "SUCCESS"],
          defaultValue: "PENDING"
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
    return queryInterface.dropTable('Order');
  },
};