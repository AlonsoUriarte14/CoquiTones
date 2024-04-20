import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import About from './pages/About';
import NetworkMonitor from './pages/NetworkMonitor'
import Dashboard from './pages/Dashboard';
import Classifier from './pages/Classifier';
import SpectralAnalysis from './pages/SpectralAnalysis';
import theme from './components/shared/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ThemeProvider theme={theme} > <Home /> </ThemeProvider>} />
          <Route path='/Dashboard' element={<ThemeProvider theme={theme} > <Dashboard /> </ThemeProvider>} />
          <Route path='/About' element={<ThemeProvider theme={theme} > <About /> </ThemeProvider>} />
          <Route path='/NetworkMonitor' element={<ThemeProvider theme={theme} > <NetworkMonitor /> </ThemeProvider>} />
          <Route path='/Classifier' element={<ThemeProvider theme={theme} > <Classifier /> </ThemeProvider>} />
          <Route path='/SpectralAnalysis' element={<ThemeProvider theme={theme} > <SpectralAnalysis /> </ThemeProvider>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
