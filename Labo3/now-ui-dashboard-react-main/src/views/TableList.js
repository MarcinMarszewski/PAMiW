/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Col,
  Input,
  Button
} from 'reactstrap';

import PanelHeader from "components/PanelHeader/PanelHeader.js";

const TableList = () => {
  const [books, setBooks] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const searchBookById = async () => {
    if (!searchId) {
      setBooks(books);
      return;
    }
    try {
      const response = await axios.get(`/api/books/${searchId}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching book by ID:', error);
      setBooks([]);
    }
  };

  const searchBooksByGenreAndSort = async () => {
    try {
      const genre = searchGenre ? searchGenre : 'null';
      const response = await axios.get(`/api/books/${isAscending}/${genre}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books by genre and sorting:', error);
      setBooks([]);
    }
  };

  const addBook = async (book) => {
    if(!book.title || !book.genre) {
      return;
    }
    try {
      const response = await axios.post('/api/books', book);
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    if(!updatedBook.title || !updatedBook.genre) {
      return;
    }
    try {
      const response = await axios.put(`/api/books/${id}`, updatedBook);
      setBooks(books.map(book => (book.id === id ? response.data : book)));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const [newBook, setNewBook] = useState({ title: '', genre: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = () => {
    addBook(newBook);
    setNewBook({ title: '', genre: '' });
  };

  const [editingBook, setEditingBook] = useState(null);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBook({ ...editingBook, [name]: value });
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleSaveEditBook = () => {
    updateBook(editingBook.id, editingBook);
    setEditingBook(null);
  };

  return (
    <>
    <PanelHeader size="sm" />
    <Col xs={12}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Books Table</CardTitle>
          <p className="category"> List of all the books within the database</p>
          <Input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button onClick={searchBookById}>Search</Button>
          <Input
            type="text"
            placeholder="Search by Genre"
            value={searchGenre}
            onChange={(e) => setSearchGenre(e.target.value)}
          />
          <Input
            style={{ marginTop: '5px' }}
            type="select"
            value={isAscending}
            onChange={(e) => setIsAscending(e.target.value === 'true')}
          >
            <option value="true">Title Ascending</option>
            <option value="false">Title Descending</option>
          </Input>
          <Button onClick={searchBooksByGenreAndSort}>Search by Genre and Sort</Button>
        </CardHeader>
        <CardBody>
          <div>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={newBook.title}
              onChange={handleInputChange}
            />
            <Input
              style={{ marginTop: '5px' }}
              type="text"
              name="genre"
              placeholder="Genre"
              value={newBook.genre}
              onChange={handleInputChange}
            />
            <Button onClick={handleAddBook}>Add Book</Button>
          </div>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, key) => (
                <tr key={key}>
                  <td>{book.id}</td>
                  <td>
                    {editingBook && editingBook.id === book.id ? (
                      <Input
                        type="text"
                        name="title"
                        value={editingBook.title}
                        onChange={handleEditInputChange}
                      />
                    ) : (
                      book.title
                    )}
                  </td>
                  <td>
                    {editingBook && editingBook.id === book.id ? (
                      <Input
                        type="text"
                        name="genre"
                        value={editingBook.genre}
                        onChange={handleEditInputChange}
                      />
                    ) : (
                      book.genre
                    )}
                  </td>
                  <td className="text-right">
                    {editingBook && editingBook.id === book.id ? (
                      <Button onClick={handleSaveEditBook}>Save</Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEditBook(book)} >Edit</Button>
                        <Button onClick={() => deleteBook(book.id)} style={{ marginLeft: '5px' }}>Delete</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
    </>
  );
};

export default TableList;