const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            
            Product.hasMany(model.Cart, { foreignKey: 'id' });
           // Product.hasMany(model.Order, { foreignKey: 'id' });
            
        }
    }
    Product.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
                
            },
            productId:{
               type:DataTypes.INTEGER,
            },
            productSku: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            productPrice: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            productShortName:{
                type: DataTypes.STRING
            },
            productDescription:{
                type: DataTypes.STRING
            },
            createdDate:{
                type: DataTypes.STRING
            },
            deliveryTimeSpan:{
                type: DataTypes.STRING
            },
            categoryId:{
                type: DataTypes.INTEGER
            },
            productImageUrl:{
                type: DataTypes.TEXT
            }
        },
        {
            sequelize,
            modelName: Product.name,
            tableName: 'Products',
            timestamps: true,
        }
    );

    return Product;
};