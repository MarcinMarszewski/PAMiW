const bookModel = require('../models/bookModel');

const getAllBooks = (req, res) => {
  const books = bookModel.getAllBooks();
  res.send(books);
};

const createBook = (req, res) => {
  const { title, genre } = req.body;
  const newBook = bookModel.createBook(title, genre);
  res.status(201).send(newBook);
};

const updateBook = (req, res) => {
    const { id } = req.params;
    const { title, genre } = req.body;
    const updatedBook = bookModel.updateBook(id, title, genre);
    if (updatedBook) {
      res.send(updatedBook);
    } else {
      res.status(404).send({ message: 'Book not found' });
    }
};

const deleteBook = (req, res) => {
    const { id } = req.params;
    const success = bookModel.deleteBook(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Book not found' });
    }
};

const getBookById = (req, res) => {
    const { id } = req.params;
    const book = bookModel.getBookById(id);
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({ message: 'Book not found' });
    }
};

const getFilteredBooks = (req, res) => {
    const { isAscending, genre } = req.params;
    const books = bookModel.getFilteredBooks(genre, isAscending);
    res.send(books);
};



module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
  getFilteredBooks
};