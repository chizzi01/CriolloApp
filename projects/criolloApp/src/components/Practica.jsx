// src/App.js
import React, { useState } from 'react';
import '../App.css';
import UserHeader from './UserHeader.jsx';
import PracticeList from './PracticeList.jsx';

const practicesData = [
  {
    image: 'https://media.a24.com/p/7294274500ddce6b41263e55994ae984/adjuntos/296/imagenes/009/217/0009217993/1200x675/smart/cedears-al-alza-que-lo-eligen-los-argentinos-que-rendimiento-tienen-y-cuales-son-los-mejores.png',
    title: 'CEDEARs',
    description: 'Curso sobre CEDEARs',
    progress: 75,
    date: '2021-10-01',
  },
  {
    image: 'data:image/jpeg;base64,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',
    title: 'Futuros',
    description: 'Curso sobre Futuros',
    progress: 50,
    date: '2021-10-01',
  },
  {
    image: 'https://media.viajando.travel/p/a9e94c75961ae668988d2c7e6ed8f4e2/adjuntos/236/imagenes/000/547/0000547367/1200x675/smart/dolar-mep-agencias-viajes-grieta.jpg',
    title: 'Dolar MEP',
    description: 'Curso sobre Dolar MEP',
    progress: 25,
    date: '2024-10-01',
  },
  {
    image: 'https://www.dwglobalinvestments.com/wp-content/uploads/2017/07/Bono-320x254.png',
    title: 'Bonos',
    description: 'Curso sobre Bonos',
    progress: 10,
    date: '2024-20-01',
  },
  {
    image: 'https://blog.selfbank.es/wp-content/uploads/2019/10/GettyImages-942840398.jpg',
    title: 'Análisis Fundamental',
    description: 'Curso sobre Análisis Fundamental',
    progress: 100,
    date: '2024-20-01',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58VMW3RShRdFJIx-s6KhICcY5Fto51fmCcTBQV0RtUA&s',
    title: 'ETFs',
    description: 'Curso sobre ETFs',
    progress: 0,
    date: '2024-20-01',
  },
  {
    image: 'https://media.revistagq.com/photos/6322fc70504ebd882c04f46a/16:9/w_2560%2Cc_limit/Criptomenedas.jpeg',
    title: 'Criptomonedas',
    description: 'Curso sobre Criptomonedas',
    progress: 0,
    date: '2024-20-01',
  },
  {
    image: 'https://media.cdn.puntobiz.com.ar/022023/1677080280108.webp?cw=984&ch=553&extw=jpg',
    title: 'Forex',
    description: 'Curso sobre Forex',
    progress: 0,
    date: '2024-20-01',
  },
  {
    image: 'https://media.ambito.com/p/ea4b4bd74213be1ee278093c33ead5dc/adjuntos/239/imagenes/038/648/0038648905/1200x675/smart/ranking-fondos-comunes-inversionjpg.jpg',
    title: 'Fondos Comunes de Inversión',
    description: 'Curso sobre Fondos Comunes de Inversión',
    progress: 0,
    date: '2024-20-01',
  },
  {
    image: 'https://i.ytimg.com/vi/6OEjy0hHvxk/maxresdefault.jpg',
    title: 'Mercado de Capitales',
    description: 'Curso sobre Mercado de Capitales',
    progress: 0,
    date: '2024-20-01',
  }
  // Agrega más objetos de prácticas aquí
];

function Practica() {
  const [practices, setPractices] = useState(practicesData);

  return (
    <div className="practica-container">
      <UserHeader />
      <PracticeList practices={practices} />
    </div>
  );
}

export default Practica;
