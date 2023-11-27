const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
       
        static associate(model) {
            Cart.belongsTo(model.User, { foreignKey: 'userId' });
            Cart.belongsTo(model.Product, { foreignKey: 'productId' });
           // Cart.hasOne(model.Order, { foreignKey: 'cartId'});
        }
    }
    Cart.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
                

            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
              },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
              },
              userId:{
                type: DataTypes.UUID,
                allowNull: false,
              }
        },
        {
            sequelize,
            modelName: Cart.name,
            tableName: 'Cart',
            timestamps: true,
        }
    );

    return Cart;
};