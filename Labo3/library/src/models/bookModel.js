const fs = require('fs');
const path = require('path');

const booksFile = path.join(__dirname, '../data/books.json');

const getAllBooks = () => {
    const data = fs.readFileSync(booksFile);
    return JSON.parse(data);
};

const saveBooks = (books) => {
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
};

module.exports = { getAllBooks, saveBooks };