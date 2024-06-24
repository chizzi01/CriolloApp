import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'; // Asegúrate de que este import refleje la ubicación correcta de tu archivo CSS

const CardNovedades = ({ imagen, titulo, descripcion }) => {
  return (
    <div className="novedad-item">
      <img src={imagen} alt={titulo} className="novedad-imagen" />
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
};

CardNovedades.propTypes = {
  imagen: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
};

export default CardNovedades;