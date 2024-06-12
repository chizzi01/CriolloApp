import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

// const defaultCedears = [
//   { name: 'CEDEAR 1', quantity: 10 },
//   { name: 'CEDEAR 2', quantity: 15 },
//   { name: 'CEDEAR 3', quantity: 20 },
// ];

if (!localStorage.getItem('cedears')) {
    // Si no existen, establece "Ninguno" como el dato por defecto
    localStorage.setItem('cedears', JSON.stringify([{ name: 'Ninguno', quantity: 1 }]));
  }

export default function PieActiveArc() {
  const [cedears, setCedears] = useState([]);

  const handleStorageChange = () => {
    let storedCedears = JSON.parse(localStorage.getItem('portfolio'));
    if (storedCedears.length === 0) {
      storedCedears = [{ name: 'Ninguno', quantity: 1 }];
    }
    setCedears(storedCedears);
  };

  useEffect(() => {
    handleStorageChange(); // Llama a la función al montar el componente

    // Agrega el event listener al montar el componente
    window.addEventListener('storage', handleStorageChange);

    // Elimina el event listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let storedCedears = JSON.parse(localStorage.getItem('portfolio'));
    if (storedCedears.length === 0) {
      storedCedears = [{ name: 'Ninguno', quantity: 1 }];
    }
    setCedears(storedCedears);
  }, []);

  const colorPalette = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  
  const series = cedears.map((cedear, index) => ({
    id: index,
    value: cedear.quantity,
    label: cedear.name,
    color: cedear.name === 'Ninguno' ? 'gray' : colorPalette[index % colorPalette.length],
  }));
  
  return (
    <div style={{ width: '100%' }}>
      <PieChart
        series={[
          {
            data: series,
            highlightScope: { faded: 'global', highlighted: 'item' },
            radius: { inner: 0.5, outer: 1 },
            color: { scheme: 'paired' },
            arc: { cornerRadius: 10 },
            tooltip: { align: 'center' },
            legend: { position: 'bottom' },
            highlight: { innerRadius: 30, outerRadius: 50 },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={200}
        width={500}
      />
    </div>
  );
}