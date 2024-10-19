const { getAllBooks, saveBooks } = require('../models/bookModel');

const getBooks = (req, res) => {
    const books = getAllBooks();
    res.json(books);
};

const addBook = (req, res) => {
    const books = getAllBooks();
    const newBook = { ...req.body, id: Date.now() };
    books.push(newBook);
    saveBooks(books);
    res.status(201).json(newBook);
};

module.exports = { getBooks, addBook };