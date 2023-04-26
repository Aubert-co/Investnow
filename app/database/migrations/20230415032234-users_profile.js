'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
        await queryInterface.createTable('Users_profiles', {
          id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER
          }, 
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          balance: {
            type: Sequelize.INTEGER,
            allowNull: false
          }, 
          profile: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          risc: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          age: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          education: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          font: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          loss: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        });
      },
    
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
