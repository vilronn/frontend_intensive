'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { name: 'Alice', role: 'waiter', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bob', role: 'client', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Carol', role: 'waiter', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Anna', role: 'client', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
