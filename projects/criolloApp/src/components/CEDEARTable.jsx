// src/components/CEDEARTable.js
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead, TableRow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/ControlPointDuplicate';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import SellIcon from '@mui/icons-material/ArrowOutward';
import axios from 'axios';
import '../App.css';
import BuyModal from './ModalBuy';
import SellModal from './ModalSell';
import flecha from '../assets/flecha.png';

const CEDEARTable = () => {
  const [cedears, setCedears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const API_KEY = 'KAMUMYI1HLBDZCJL'; // Reemplaza con tu clave de API de Alpha Vantage
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedCedear, setSelectedCedear] = useState(null);
  const [page, setPage] = useState(0);
  const [pageCartera, setPageCartera] = useState(0);
  // const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [performance, setPerformance] = useState([]);
  const [selectedCedearForSell, setSelectedCedearForSell] = useState(null);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const itemsPerPage = 6;


  const [portfolio, setPortfolio] = useState(() => {
    const storedPortfolio = localStorage.getItem('cedears');
    return storedPortfolio ? JSON.parse(storedPortfolio) : [];
  });

  const fetchData = async () => {
    try {
      const symbols = ['AAPL', 'IBM', 'TSLA'];
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
      responses.forEach(response => {
        if (response.data) {
          console.log(response.data); // Registra la respuesta de la API en la consola
        }
      });

      let data = responses.map(response => {
        if (response.data && response.data['Global Quote']) {
          const quote = response.data['Global Quote'];
          return {
            '01. symbol': quote['01. symbol'],
            '02. description': 'Description for ' + quote['01. symbol'], // Deberías obtener la descripción de alguna parte
            '03. conversion ratio': 1, // Deberías obtener la ratio de conversión de alguna parte
            '04. current price': '$' + quote['05. price'],
            '05. commission': '2%', // Deberías calcular la comisión de alguna manera
            '06. total cost': '$' + (quote['05. price'] * 1.02).toFixed(2) // Suponiendo que la comisión es del 2%
          };
        } else {
          console.error('response.data is undefined or does not have a property Global Quote');
          return null;
        }
      }).filter(item => item !== null);

      // Si no hay datos, establece valores predeterminados
      if (data.length === 0) {
        data = [
          { '01. symbol': 'AAPL', '02. description': 'Apple Inc.', '03. conversion ratio': 1, '04. current price': '$150', '05. commission': '2%', '06. total cost': '$153.00' },
          { '01. symbol': 'IBM', '02. description': 'International Business Machines', '03. conversion ratio': 1, '04. current price': '$250', '05. commission': '2%', '06. total cost': '$255.00' },
          { '01. symbol': 'TSLA', '02. description': 'Tesla Inc.', '03. conversion ratio': 1, '04. current price': '$350', '05. commission': '2%', '06. total cost': '$357.00' },
          { '01. symbol': 'GOOGL', '02. description': 'Alphabet Inc.', '03. conversion ratio': 1, '04. current price': '$2000', '05. commission': '2%', '06. total cost': '$2040.00' },
          { '01. symbol': 'AMZN', '02. description': 'Amazon.com Inc.', '03. conversion ratio': 1, '04. current price': '$3000', '05. commission': '2%', '06. total cost': '$3060.00' },
          { '01. symbol': 'MSFT', '02. description': 'Microsoft Corporation', '03. conversion ratio': 1, '04. current price': '$500', '05. commission': '2%', '06. total cost': '$510.00' },
          { '01. symbol': 'FB', '02. description': 'Meta Platforms Inc.', '03. conversion ratio': 1, '04. current price': '$300', '05. commission': '2%', '06. total cost': '$306.00' },
          { '01. symbol': 'NVDA', '02. description': 'NVIDIA Corporation', '03. conversion ratio': 1, '04. current price': '$700', '05. commission': '2%', '06. total cost': '$714.00' },
          { '01. symbol': 'PYPL', '02. description': 'PayPal Holdings Inc.', '03. conversion ratio': 1, '04. current price': '$200', '05. commission': '2%', '06. total cost': '$204.00' },
          { '01. symbol': 'INTC', '02. description': 'Intel Corporation', '03. conversion ratio': 1, '04. current price': '$50', '05. commission': '2%', '06. total cost': '$51.00' }
        ];
      }

      setCedears(data);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const storedCedears = localStorage.getItem('cedears');
    if (storedCedears) {
      setPortfolio(JSON.parse(storedCedears));
    }
  }, []);

  const filteredPortfolio = portfolio.filter(item =>
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  let filteredCedears = cedears.filter(cedear =>
    cedear['01. symbol'].toLowerCase().includes(searchValue.toLowerCase()) ||
    cedear['02. description'].toLowerCase().includes(searchValue.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCedears.length / itemsPerPage);
  const totalPagesCartera = Math.ceil(filteredPortfolio.length / itemsPerPage);


  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePageCarteraClick = (pageNumber) => {
    setPageCartera(pageNumber);
  };

  const handleSellClick = (cedear) => {
    setSelectedCedearForSell(cedear);
    setSellModalOpen(true);
    console.log('Vender:', cedear);
  };

  const handleBuyClick = (cedear) => {
    setSelectedCedear(cedear);
    setBuyModalOpen(true);
  };

  return (
    <div className='practicaCedears-container'>
      <div className='searchCedears'>
        <h1>Tabla de CEDEARs disponibles</h1>
        <div className='search-practicaItem-align'>
          <TextField
            value={searchValue}
            label='Buscar CEDEAR'
            variant='outlined'
            placeholder='Buscar por simbolo, descripción...'
            onChange={e => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton sx={{ color: '#32795B' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              width: '60%',
              color: '#32795B',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#32795B',
                },
                '&:hover fieldset': {
                  borderColor: '#32795B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#32795B',
                },
              },
            }}
          />
        </div>
      </div>
      <table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del símbolo">
                  <InfoIcon />
                </Tooltip>
                Símbolo
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información de la descripción">
                  <InfoIcon />
                </Tooltip>
                Descripción
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información de la ratio de conversión">
                  <InfoIcon />
                </Tooltip>
                Ratio de conversión
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del precio actual">
                  <InfoIcon />
                </Tooltip>
                Precio actual
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información de la comisión">
                  <InfoIcon />
                </Tooltip>
                Comisión
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del costo total">
                  <InfoIcon />
                </Tooltip>
                Costo total
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del costo total">
                  <InfoIcon />
                </Tooltip>
                Acciones
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredCedears.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((cedear, index) => (
            <tr key={index}>
              <td>{cedear['01. symbol']}</td>
              <td>{cedear['02. description']}</td>
              <td>{cedear['03. conversion ratio']}</td>
              <td>{cedear['04. current price']}</td>
              <td>{cedear['05. commission']}</td>
              <td>{cedear['06. total cost']}</td>
              <td>
                <button className='comprarCedearsBtn' onClick={() => handleBuyClick(cedear)}><AddIcon />Comprar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pageSlider'>
        <button onClick={() => handlePageClick(page - 1)} disabled={page === 0} className='flecha' style={{ backgroundColor: "#90ee90" }}>
          <img src={flecha} alt="" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index)}
            className={page === index ? 'active' : ''}
            style={{ backgroundColor: "#90ee90", color: "#005f37" }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageClick(page + 1)} disabled={page === totalPages - 1} className='flecha der' style={{ backgroundColor: "#90ee90" }}>
          <img src={flecha} alt="" />
        </button>
      </div>
      {selectedCedear && (
        <BuyModal
          open={buyModalOpen}
          onClose={() => setBuyModalOpen(false)}
          cedear={selectedCedear}
        />
      )}

      <div className='searchCedears'>
        <h1>Mi cartera de CEDEARs</h1>
        <div className='search-practicaItem-align'>
          <TextField
            value={searchTerm}
            label='Buscar CEDEAR'
            variant='outlined'
            placeholder='Buscar por simbolo, descripción...'
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton sx={{ color: '#32795B' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              width: '60%',
              color: '#32795B',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#32795B',
                },
                '&:hover fieldset': {
                  borderColor: '#32795B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#32795B',
                },
              },
            }}
          />
        </div>
      </div>
      <table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del símbolo">
                  <InfoIcon />
                </Tooltip>
                CEDEAR
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del símbolo">
                  <InfoIcon />
                </Tooltip>
                Cantidad
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información de la descripción">
                  <InfoIcon />
                </Tooltip>
                Precio de compra
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información de la ratio de conversión">
                  <InfoIcon />
                </Tooltip>
                Precio actual
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del precio actual">
                  <InfoIcon />
                </Tooltip>
                Rendimiento %
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información de la comisión">
                  <InfoIcon />
                </Tooltip>
                Rendimiento Total
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del costo total">
                  <InfoIcon />
                </Tooltip>
                Acciones
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredPortfolio.filter(item => item.name !== 'Ninguno').map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{(item.price * (1 + item.performance / 100)).toFixed(2)}</td>
              <td style={{ color: item.performance >= 0 ? 'green' : 'red' }}>
                {item.performance >= 0 ? `+${item.performance}%` : `${item.performance}%`}
              </td>
              <td style={{ color: item.performance >= 0 ? 'green' : 'red' }}>
                {item.performance >= 0 ?
                  `+$${((item.price - item.price / (1 + item.performance / 100)) * item.quantity).toFixed(2)}` :
                  `-$${Math.abs(((item.price - item.price / (1 + item.performance / 100)) * item.quantity)).toFixed(2)}`
                }
              </td>
              <td className='tdBtns'>
                <button className='comprarCedearsBtn' onClick={() => handleBuyClick(item)}><AddIcon /> Comprar</button>
                <button className='venderCedearesBtn' onClick={() => handleSellClick(item)}><SellIcon /> Vender</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pageSlider'>
        <button onClick={() => handlePageCarteraClick(pageCartera - 1)} disabled={pageCartera === 0} className='flecha' style={{ backgroundColor: "#90ee90" }}>
          <img src={flecha} alt="" />
        </button>
        {Array.from({ length: totalPagesCartera }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageCarteraClick(index)}
            className={pageCartera === index ? 'active' : ''}
            style={{ backgroundColor: "#90ee90", color: "#005f37" }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageCarteraClick(pageCartera + 1)} disabled={pageCartera === totalPagesCartera - 1} className='flecha der' style={{ backgroundColor: "#90ee90" }}>
          <img src={flecha} alt="" />
        </button>
      </div>
      {selectedCedearForSell && (
        <SellModal open={sellModalOpen}
          onClose={() => setSellModalOpen(false)}
          cedear={selectedCedearForSell} 
          />
      )}

    </div>

  );
};

export default CEDEARTable;
