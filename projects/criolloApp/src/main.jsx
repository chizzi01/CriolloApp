import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import DrawerAppBar from './components/Navbar'; // Asegúrate de que la ruta de importación sea correcta
import Novedades from './components/Novedades'; // Asegúrate de que la ruta de importación sea correcta
import InversionesComponent from './components/Inversiones';
import CEDEARTable from './components/CEDEARTable';
import Practica from './components/Practica';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router basename="/CriolloApp">
    <DrawerAppBar />
      <Routes>
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/" element={<App />} />
        <Route path="/inversiones" element={<InversionesComponent />} />
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        <Route path="/practicas" element={<Practica />} />
        <Route path="/cedears" element={<CEDEARTable />} />
      </Routes>
    </Router>
  </React.StrictMode>
);