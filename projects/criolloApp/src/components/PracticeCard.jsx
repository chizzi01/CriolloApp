// src/components/PracticeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const PracticeCard = ({ image, title, description, progress }) => {
  return (
    <div className="practice-card">
      <img src={image} alt={title} className="practice-image" />
      <div className="practice-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="practice-footer">
        <Link to="/tutoriales">
        <button className="practice-button">{progress === 100 ? 'Completado' : 'Aprender'}</button>
        </Link>
        <span className="practice-progress">{progress}% Completado</span>
      </div>
      <div style={{width: `${progress}%`, height: '5px', backgroundColor: 'green'}}></div>
    </div>
  );
};

export default PracticeCard;
