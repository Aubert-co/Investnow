'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Assets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Assets.belongsTo(models.Users_profile, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
        sourceKey: 'userId'
      });
    
    }
  }
  User_Assets.init({
    userId: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    purchaseDate: DataTypes.DATE,
    name:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Assets',
  });
  return User_Assets;
};