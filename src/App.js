import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/request/Products';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    document.title = 'Food Inventory App';
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
