const { Model } = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
       
        static associate(model) {
            Address.belongsTo(model.User, { foreignKey: 'userId' });
        }
    }
    Address.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            userId:{
                type: DataTypes.UUID,
                allowNull: false,
              },
            address: {
                type: DataTypes.STRING,
            },
            city: {
                type: DataTypes.STRING,
            },
            country: {
                type: DataTypes.STRING,
            },
            state: {
                type: DataTypes.STRING,
            },
            postalCode:{
                type:DataTypes.BIGINT
            },
        },
        {
            sequelize,
            modelName: Address.name,
            tableName: 'Address',
            timestamps: true,
        }
    );
 
    return Address;
};