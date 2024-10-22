const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('../routes/bookRoutes');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/* const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(bodyParser.json());

const booksFilePath = path.join(__dirname, 'books.json');

const readBooksFromFile = () => {
  const data = fs.readFileSync(booksFilePath, 'utf8');
  return JSON.parse(data);
};

const writeBooksToFile = (books) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

// Create a new book
app.post('/books', (req, res) => {
  const { title, genre } = req.body;
  const books = readBooksFromFile();
  const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  const newBook = { id: newId, title, genre };
  books.push(newBook);
  writeBooksToFile(books);
  res.status(201).send(newBook);
});

// Get all books
app.get('/books', (req, res) => {
  const books = readBooksFromFile();
  res.send(books);
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, genre } = req.body;
  const books = readBooksFromFile();
  const bookIndex = books.findIndex(b => b.id == Number(id));
  if (bookIndex !== -1) {
    books[bookIndex] = { id, title, genre };
    writeBooksToFile(books);
    res.send(books[bookIndex]);
  } else {
    res.status(404).send({ message: 'Book not found' });
  }
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  let books = readBooksFromFile();
  books = books.filter(b => b.id !== id);
  writeBooksToFile(books);
  res.status(204).send();
});

// Sample API endpoint
app.get('/hello', (req, res) => {
  res.send({ message: 'Hello from the API!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); */