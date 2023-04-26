'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assets extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Assets.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img_path: DataTypes.STRING,
    img_name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    profile:DataTypes.INTEGER,
    variation:DataTypes.INTEGER,
    isPositive:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Assets',
  });
  return Assets;
};