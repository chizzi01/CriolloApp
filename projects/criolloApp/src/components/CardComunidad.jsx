import React, { useRef } from 'react';
import '../App.css'; // Asegúrate de crear este archivo y agregar los estilos correspondientes
import persona from '../assets/comunidad.png';
import personas from '../assets/personas.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CardComunidad = ({isVisible}) => {
  const [counter, setCounter] = useState(0);
  const personasAnim = useRef(null);


  useEffect(() => {
    if (isVisible) {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        if (count > 20) {
          clearInterval(interval);
        } else {
          setCounter(count);
        }
      }, 80);

      if (personasAnim.current) {
        personasAnim.current.style.animation = 'fadeIn 1s forwards';
      }
      return () => clearInterval(interval);
    }
  }, [isVisible]);



  return (
    <div className="card-container">
      <div className="card floating">
        <img src={persona} alt="Comunidad" className="card-image" />
        <div className="card-content">
          <h2 className="card-title">COMUNIDAD CRIOLLA</h2>
          <p className="card-description">
            Un espacio comunitario para encontrar y aportar respuestas sobre educación financiera. Conéctate con personas que se encuentren aprendiendo y poniendo en práctica sus conocimientos sobre finanzas y compartir tus dudas y conocimientos.
          </p>
          <Link to="/comunidad" >
          <button className="card-button">UNIRME</button>
          </Link>
        </div>
        <div className="card-stats">
          <img src={personas} alt="Personas" className="stats-image" ref={personasAnim}/>
          <p className="stats-number">{counter}K+</p>
          <p className="stats-text">Vidas fueron cambiadas</p>
        </div>
      </div>
    </div>
  );
}

export default CardComunidad;
