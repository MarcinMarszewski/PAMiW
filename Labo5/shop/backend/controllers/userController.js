const { User, Profile, Order } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body, {
      include: [Profile]
    });
	const profile = await Profile.create({ userId: user.id, ...req.body.profile });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [Profile] });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: [Profile] });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
      include: [Profile]
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id, { include: [Profile] });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await Profile.destroy({
    where: { userId: user.id }
    });
    await Order.destroy({
    where: { userId: user.id }
    });
    const deleted = await User.destroy({
    where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};