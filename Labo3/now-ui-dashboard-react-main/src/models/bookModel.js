const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, '../api/books.json');

const readBooksFromFile = () => {
  const data = fs.readFileSync(booksFilePath, 'utf8');
  return JSON.parse(data);
};

const writeBooksToFile = (books) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

const getAllBooks = () => {
  return readBooksFromFile();
};

const createBook = (title, genre) => {
  const books = readBooksFromFile();
  const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
const newBook = { id: Number(newId), title, genre };
books.push(newBook);
  writeBooksToFile(books);
  return newBook;
};

const updateBook = (id, title, genre) => {
    const books = readBooksFromFile();
    const bookIndex = books.findIndex(book => book.id === Number(id));
    if (bookIndex !== -1) {
      books[bookIndex] = { id: parseInt(id, 10), title, genre };
      writeBooksToFile(books);
      return books[bookIndex];
    }
    return null;
};

const deleteBook = (id) => {
    let books = readBooksFromFile();
    const bookIndex = books.findIndex(book => book.id === Number(id));
    if (bookIndex !== -1) {
      books = books.filter(book => book.id !== Number(id));
      writeBooksToFile(books);
      return true;
    }
    return false;
};

const getBookById = (id) => {
    const books = readBooksFromFile();
    return books.filter(book => book.id === Number(id));
};

const getFilteredBooks = (genre, isAscending) => {
    const books = readBooksFromFile();
    let filteredBooks = genre && genre.toLowerCase() !== 'null' ? books.filter(book => book.genre.toLowerCase() === genre.toLowerCase()) : books;
    if(filteredBooks.length === 0){
        filteredBooks = books;
    }
    const sortedBooks = filteredBooks.sort((a, b) => {
      if (isAscending === 'true') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    return sortedBooks;
};


module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
  getFilteredBooks
};