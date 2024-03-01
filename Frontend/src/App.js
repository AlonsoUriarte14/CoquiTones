import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import About from './pages/About';
import CDN from './pages/CDN'
import Dashboard from './pages/Dashboard';
import Classifier from './pages/Classifier';
import SpectralAnalysis from './pages/SpectralAnalysis';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/About' element={<About />} />
          <Route path='/CDN' element={<CDN />} />
          <Route path='/Classifier' element={<Classifier />} />
          <Route path='/SpectralAnalysis' element={<SpectralAnalysis />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
