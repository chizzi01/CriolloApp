import React from 'react';
import '../App.css'; // Asegúrate de crear este archivo y agregar los estilos correspondientes

const CardComunidad = () => {
  return (
    <div className="card-container">
      <div className="card floating">
        <div className="card-content">
          <h2 className="card-title">COMUNIDAD CRIOLLA</h2>
          <p className="card-description">
            Un espacio comunitario para encontrar y aportar respuestas sobre educación financiera. Conéctate con personas que se encuentren aprendiendo y poniendo en práctica sus conocimientos sobre finanzas y compartir tus dudas y conocimientos.
          </p>
          <button className="card-button">UNIRME</button>
        </div>
        <div className="card-stats">
          <p className="stats-number">20K+</p>
          <p className="stats-text">Vidas fueron cambiadas</p>
        </div>
      </div>
    </div>
  );
}

export default CardComunidad;
