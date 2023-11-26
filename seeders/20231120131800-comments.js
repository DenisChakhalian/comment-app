'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        id: '9b68f593-21e1-441c-8ec2-571f12b7c8fe',
        userId: '74d0efa4-2d6f-4220-8f5e-55af04a328f0',
        content: 'hello every one!',
        creationDate: '2023-11-20 15:35:28.989 +02:00',
        fileUrl: 'https://randomwordgenerator.com/img/picture-generator/g09c51d6247f88abd6e9145c1fc2af08348ea95ceb3334a3ac87087f6c92fdb3c25a4ea29f42ede7b17dbb77aca344108_640.jpg'
      },
      {
        id: 'e0d9e3ce-c425-4119-83a9-a67dedcfbd9b',
        userId: 'df2b57e3-1ef7-43a0-a524-6a82ceb46ab4',
        content: 'Hallo, John!',
        parentId: '9b68f593-21e1-441c-8ec2-571f12b7c8fe',
        creationDate: '2023-11-20 15:40:56.134 +02:00',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', null, {});
  },
};
