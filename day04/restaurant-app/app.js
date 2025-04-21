const express = require('express');
const app = express();

//Importing connections and models from the models folder
const db = require('./models');

//Checking the connection to the database
db.sequelize.authenticate()
  .then(() => console.log('+ Successful connection to the database'))
  .catch(err => console.error('X Error connecting to database:', err));

const PORT = process.env.PORT || 3000;

//Middleware for JSON processing
app.use(express.json());

//Endpoint to get all menu items
app.get('/menu', async (req, res) => {
    try {
      const menuItems = await db.MenuItem.findAll();
      res.json(menuItems);
    } catch (error) {
      console.error('Error getting menu:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

//Endpoint for receiving all orders
app.get('/orders', async (req, res) => {
    try {
      const orders = await db.Order.findAll({
        include: [
          {
            model: db.User,
            as: 'user',
          },
          {
            model: db.MenuItem,
            as: 'items',
          },
        ],
      });
      res.json(orders);
    } catch (error) {
      console.error('Error receiving orders:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/orders', async (req, res) => {
    const { userId, menuItemIds, isActive } = req.body;
  
    try {
      //Create an order with userId and isActive
      const newOrder = await db.Order.create({
        userId,
        isActive,
      });
  
      //Find menuItems by the passed id
      const menuItems = await db.MenuItem.findAll({
        where: {
          id: menuItemIds,
        },
      });
  
      //Add menuItems to the order (via many-to-many connection)
      await newOrder.addItems(menuItems);
  
      res.json({ message: 'Order created', orderId: newOrder.id });
    } catch (error) {
      console.error('Error when creating an order:', error);
      res.status(500).json({ error: 'Error when creating an order' });
    }
  });
  
  app.put('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    const { menuItemIds, isActive } = req.body;
  
    try {
      const order = await db.Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      //Update the status if it is transferred
      if (typeof isActive === 'boolean') {
        order.isActive = isActive;
        await order.save();
      }
  
      //If a list of menuItems is passed, we update the links
      if (Array.isArray(menuItemIds)) {
        const menuItems = await db.MenuItem.findAll({
          where: { id: menuItemIds }
        });
        await order.setItems(menuItems);
      }
  
      //Receiving an order with attachments to return updated data
      const updatedOrder = await db.Order.findByPk(orderId, {
        include: [
          { model: db.User, as: 'user' },
          { model: db.MenuItem, as: 'items' }
        ]
      });
  
      res.json(updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  app.delete('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const order = await db.Order.findByPk(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      if (order.isActive === true) {
        order.isActive = false;
        await order.save();
      }
  
      res.json({ message: 'Order marked as inactive' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.post('/waiters', async (req, res) => {
    const { name } = req.body;
  
    try {
      const newWaiter = await db.User.create({
        name,
        role: 'waiter',
      });
  
      res.json({ message: 'Waiter added', waiter: newWaiter });
    } catch (error) {
      console.error('Error adding waiter:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
 
//Starting the server
app.listen(PORT, () => {
  console.log(`+ The server is running on http://localhost:${PORT}`);
});
