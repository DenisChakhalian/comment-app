'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: '74d0efa4-2d6f-4220-8f5e-55af04a328f0',
        username: 'John',
        email: 'example@example.com',
        homepage: 'https://fe-jul23-codedynasty.github.io/product_catalog/#/',
      },
      {
        id: 'df2b57e3-1ef7-43a0-a524-6a82ceb46ab4',
        username: 'Aly',
        email: 'aly@example.com',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
