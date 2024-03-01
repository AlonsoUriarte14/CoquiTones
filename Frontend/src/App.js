import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/About' element={<h1>About Page </h1>} /> {/** Change to About page component */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
