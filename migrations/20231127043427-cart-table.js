// eslint-disable-next-line no-unused-vars
const { sequelize } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable('Cart', {

            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            productId:{
               type:Sequelize.UUID,
            },
            quantity: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            userId:{
              type: Sequelize.UUID,
              allowNull: false,
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
        return queryInterface.dropTable('Cart');
    },
};