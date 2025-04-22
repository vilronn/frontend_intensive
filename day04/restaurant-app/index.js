const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, MenuItem, Order, User } = require('./models');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

//Test route
app.get('/', (req, res) => {
  res.send('The server is running!');
});

//Get all items
app.get('/menu-items', async (req, res) => {
  const items = await MenuItem.findAll();
  res.json(items);
});

//Starting the server
app.listen(PORT, async () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('+ Connection to database successful!');
  } catch (error) {
    console.error('X Error connecting to database:', error);
  }
});
