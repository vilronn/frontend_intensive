'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
              Order.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      
        Order.belongsToMany(models.MenuItem, {
          through: 'OrderMenuItem',
          as: 'items',
          foreignKey: 'orderId',
        });
      };
    }
  Order.init({
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};