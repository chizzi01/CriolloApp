// src/components/SearchAndFilter.js
import React from 'react';
import '../App.css';

const SearchAndFilter = () => {
  return (
    <div className="search-and-filter">
      <input type="text" placeholder="Buscar tus prácticas..." className="search-input" />
      <div className="filter-buttons">
        <button className="filter-button">Nuevas</button>
        <button className="filter-button">Solo Nuevas</button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
