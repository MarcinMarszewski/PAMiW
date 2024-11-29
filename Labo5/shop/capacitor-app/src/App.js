import logo from './logo.svg';
import './App.css';

import React from 'react';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';

function App() {
  return (
    <div className="App">
      <div>
      <h1>Online Store</h1>
      <UserList />
      <ProductList />
      <OrderList />
    </div>
    </div>
  );
}

export default App;
