'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    } 
  }
  Users_profile.init({   
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    balance:  DataTypes.INTEGER,
    profile:DataTypes.INTEGER,
    risc:DataTypes.INTEGER,
    age:DataTypes.INTEGER,
    education:DataTypes.INTEGER,
    font:DataTypes.INTEGER,
    loss:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_profile',
  });
  return Users_profile;
};