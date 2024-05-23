import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import Novedades from './components/Novedades'; // Asegúrate de que la ruta de importación sea correcta
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router basename="/CriolloApp">
      <Routes>
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);