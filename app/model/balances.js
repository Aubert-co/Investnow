'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    static associate(models) {
      // define association here
      Balance.belongsTo(models.Users_profile, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  };
  Balance.init({
    user_id: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL(10,2),
    month: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Balance',
  });
  return Balance;
};
