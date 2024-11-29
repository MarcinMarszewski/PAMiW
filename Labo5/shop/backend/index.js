const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

sequelize.sync({force: true}).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});