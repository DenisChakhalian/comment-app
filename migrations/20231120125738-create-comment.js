'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        require: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
        require: true,
      },
      parentId: {
        type: DataTypes.UUID,
        require: false,
      },
      creationDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        require: true,
      },
      fileUrl: {
        type: DataTypes.STRING,
        require: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  },
};
