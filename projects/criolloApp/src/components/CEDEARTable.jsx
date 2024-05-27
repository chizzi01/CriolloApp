// src/components/CEDEARTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const CEDEARTable = () => {
  const [cedears, setCedears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'GO814BLZ6B4OLJ5H'; // Reemplaza con tu clave de API de Alpha Vantage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbols = ['IBM', 'AAPL', 'TSLA']; // Agrega los símbolos de los CEDEARs que desees consultar
        const requests = symbols.map(symbol => 
          axios.get(`https://www.alphavantage.co/query`, {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol: symbol,
              apikey: API_KEY
            }
          })
        );

        const responses = await Promise.all(requests);
        const data = responses.map(response => response.data['Global Quote']);
        
        setCedears(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Tabla de CEDEARs</h1>
      <table>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Precio</th>
            <th>Variación (%)</th>
          </tr>
        </thead>
        <tbody>
          {cedears.map((cedear, index) => (
            <tr key={index}>
              <td>{cedear['01. symbol']}</td>
              <td>{cedear['05. price']}</td>
              <td>{cedear['10. change percent']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CEDEARTable;
