import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import { App } from './App';
import DrawerAppBar from './components/Navbar'; // Asegúrate de que la ruta de importación sea correcta
import Novedades from './components/Novedades'; // Asegúrate de que la ruta de importación sea correcta
import InversionesComponent from './components/Inversiones';
import PracticaCedears from './components/PracticaCedears';
import Practica from './components/Practica';
import Tutoriales from './components/Tutoriales';
import Comunidad from './components/Comunidad';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/inversiones" element={<Practica/>} />
        <Route path="/practicas" element={<InversionesComponent/>} />
        <Route path="/cedears" element={<PracticaCedears />} />
        <Route path="/tutoriales" element={<Tutoriales />} />
        <Route path="/comunidad" element={<Comunidad />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);