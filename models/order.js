const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {

        static associate(model) {
        }
    }
    Order.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            items: {
                type: DataTypes.JSONB,
                allowNull: false,

            },
            total: {
                type: DataTypes.BIGINT
            },
            status: {
                type: DataTypes.ENUM("PENDING", "SUCCESS"),
                defaultValue: "PENDING"
            }
        },
        {
            sequelize,
            modelName: Order.name,
            tableName: 'Order',
            timestamps: true,
        }
    );

    return Order;
};