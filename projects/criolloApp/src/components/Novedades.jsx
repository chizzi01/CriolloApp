import React from 'react';
import CardNovedades from './CardNovedades'; // Asegúrate de que la ruta de importación sea correcta
import '../App.css'; // Asegúrate de que este import refleje la ubicación correcta de tu archivo CSS
import Footer from './Footer'; // Asegúrate de que la ruta de importación sea correcta

export default function Novedades() {
  return (
    <div className="novedades-container">
      <ul className="novedades-list">
        <CardNovedades 
          imagen="https://media.ambito.com/p/59c769680fbceb9f2c78e225ad77b021/adjuntos/239/imagenes/041/326/0041326748/criptomonedas-bitcoinjpg.jpg" // Reemplaza con la ruta de imagen correcta
          titulo="Inversión en Criptomonedas"
          descripcion="Explora cómo la inversión en criptomonedas está cambiando el panorama financiero."
        />
        <CardNovedades 
          imagen="https://media.ambito.com/p/fa41e1f5d699451c9df5908ad187f210/adjuntos/239/imagenes/041/485/0041485445/mercados-vivo-acciones-bolsas.jpg" // Reemplaza con la ruta de imagen correcta
          titulo="Tendencias en el Mercado de Acciones"
          descripcion="Descubre las últimas tendencias y cómo pueden impactar en tu estrategia de inversión."
        />
        <CardNovedades 
          imagen="https://www.zonaprop.com.ar/noticias/wp-content/uploads/2024/03/B2B-B2C-Invertir-en-bienes-raices-de-forma-rentable-en-Argentina-Oportunidades-de-inversion-con-buen-retorno.jpeg" // Reemplaza con la ruta de imagen correcta
          titulo="Oportunidades en Bienes Raíces"
          descripcion="Conoce las oportunidades de inversión más prometedoras en el sector inmobiliario."
        />
        <CardNovedades 
          imagen="https://media.revistagq.com/photos/5ca5f29be6e7b756afe88f0a/master/w_1600%2Cc_limit/novedades_tecnologia_2019_1453.jpg" // Reemplaza con la ruta de imagen correcta
          titulo="Innovación en Tecnología"
          descripcion="Mantente al tanto de las últimas innovaciones tecnológicas y cómo pueden impulsar tu cartera de inversión."
        />
        <CardNovedades
          imagen="https://www.cronista.com/files/image/471/471294/62e2b5149e2d6.jpg" // Reemplaza con la ruta de imagen correcta
          titulo="Bonos argentinos al alza"
          descripcion="Conoce las últimas tendencias en bonos argentinos y cómo pueden impactar en tu cartera de inversión."
        />

      </ul>
      <Footer />
    </div>
  );
}