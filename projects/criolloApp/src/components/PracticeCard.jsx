// src/components/PracticeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const PracticeCard = ({ image, title, description, progress, isPatrocinado }) => {
  return (
    <div className="practice-card" style={isPatrocinado ? {boxShadow: '0 0 10px 5px #759FFF'} : {}}>
      <img src={image} alt={title} className="practice-image" />
      <div className="practice-info">
      {isPatrocinado && <span className="patrocinado">*Patrocinado*</span>}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="practice-footer">
        <Link to="/tutoriales">
        <button className="practice-button">{progress === 100 ? 'Completado' : progress === 0 ? 'Empezar' : 'Continuar'}</button>
        </Link>
        <span className="practice-progress">{progress}% Completado</span>
      </div>
      <div style={{width: `${progress}%`, height: '5px', backgroundColor: 'green'}}></div>
    </div>
  );
};

export default PracticeCard;
