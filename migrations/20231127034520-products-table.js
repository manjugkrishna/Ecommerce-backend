// eslint-disable-next-line no-unused-vars
const { sequelize } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable('Products', {

            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            productId:{
               type:Sequelize.INTEGER,
            },
              productSku: {
                  type: Sequelize.STRING,
                  allowNull: false,
              },
              category: {
                  type: Sequelize.STRING,
              },
              productName: {
                  type: Sequelize.STRING,
                  allowNull: false,
              },
              productPrice: {
                  type: Sequelize.STRING,
                  allowNull: false,
              },
              productShortName:{
                  type: Sequelize.STRING
              },
              productDescription:{
                  type: Sequelize.STRING
              },
              createdDate:{
                  type: Sequelize.STRING
              },
              deliveryTimeSpan:{
                  type: Sequelize.STRING
              },
              categoryId:{
                  type: Sequelize.INTEGER
              },
              productImageUrl:{
                  type: Sequelize.TEXT
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
        return queryInterface.dropTable('Products');
    },
};