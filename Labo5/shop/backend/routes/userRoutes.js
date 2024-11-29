const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Create a new user with profile
router.post('/', userController.createUser);

// Get all users with profiles
router.get('/', userController.getAllUsers);

// Get a single user by ID with profile
router.get('/:id', userController.getUserById);

// Update a user by ID with profile
router.put('/:id', userController.updateUser);

// Delete a user by ID with profile
router.delete('/:id', userController.deleteUser);

module.exports = router;