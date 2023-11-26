'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        require: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        require: true,
      },
      homepage: {
        type: DataTypes.STRING,
        require: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
