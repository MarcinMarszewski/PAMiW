import logo from './logo.svg';
import './App.css';

import React from 'react';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
      <UserList />
      <ProductList />
      <OrderList />
    </div>
  );
};

export default App;
