const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books/:isAscending/:genre', bookController.getFilteredBooks);
router.get('/books/:id', bookController.getBookById);
router.get('/books', bookController.getAllBooks);


router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;