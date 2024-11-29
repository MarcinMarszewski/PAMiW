const { Order, User, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
	const { userName, productIds } = req.body;
	const user = await User.findOne({ where: { name: userName } });
	if (!user) {
	  return res.status(404).json({ error: 'User not found' });
	}
	const order = await Order.create({ userId: user.id });
	if (productIds && productIds.length > 0) {
	  const products = await Product.findAll({
		where: { name: productIds }
	  });
      await order.addProducts(products);
    }
    const result = await Order.findByPk(order.id, { include: [User, Product] });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [User, Product] });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [User, Product] });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { productIds, userId, ...orderData } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const [updated] = await Order.update({ ...orderData, userId }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const order = await Order.findByPk(req.params.id);
      if (productIds && productIds.length > 0) {
        const products = await Product.findAll({
          where: { id: productIds }
        });
        await order.setProducts(products);
      }
      const result = await Order.findByPk(order.id, { include: [User, Product] });
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};