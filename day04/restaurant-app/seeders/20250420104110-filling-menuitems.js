'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MenuItems', [
      {
        title: 'Pizza Margherita',
        picture: 'http://localhost:3000/images/pizza.jpg',
        cost: 350,
        callQuantity: 250,
        description: 'Classic pizza with tomato sauce and mozzarella',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pasta Carbonara',
        picture: 'http://localhost:3000/images/carbonara.jpg',
        cost: 470,
        callQuantity: 500,
        description: 'Italian Pasta with Bacon and Creamy Sauce',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Homemade lemonade',
        picture: 'http://localhost:3000/images/lemonade.jpg',
        cost: 150,
        callQuantity: 120,
        description: 'Fresh lemonade with mint and lemon',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuItems', null, {});
  }
};