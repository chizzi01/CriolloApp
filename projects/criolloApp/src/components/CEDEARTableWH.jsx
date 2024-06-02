// src/components/CEDEARTable.js
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { TableCell, TableHead, TableRow } from '@mui/material';
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
  const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCedearForSell, setSelectedCedearForSell] = useState(null);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const itemsPerPage = 6;

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

      let data = responses.map(response => {
        if (response.data && response.data['Global Quote']) {
          const quote = response.data['Global Quote'];
          return {
            '01. symbol': quote['01. symbol'],
            '02. description': 'Description for ' + quote['01. symbol'], // Deberías obtener la descripción de alguna parte
            '03. conversion ratio': 1, // Deberías obtener la ratio de conversión de alguna parte
            '04. current price': parseFloat(quote['05. price']),
            '05. commission': '2%', // Deberías calcular la comisión de alguna manera
            '06. total cost': (parseFloat(quote['05. price']) * 1.02).toFixed(2) // Suponiendo que la comisión es del 2%
          };
        } else {
          return null;
        }
      }).filter(item => item !== null);

      // Si no hay datos, establece valores predeterminados
      if (data.length === 0) {
        data = [
          { '01. symbol': 'AAPL', '02. description': 'Apple Inc.', '03. conversion ratio': 1, '04. current price': 150, '05. commission': '2%', '06. total cost': 153.00 },
          { '01. symbol': 'IBM', '02. description': 'International Business Machines', '03. conversion ratio': 1, '04. current price': 250, '05. commission': '2%', '06. total cost': 255.00 },
          { '01. symbol': 'TSLA', '02. description': 'Tesla Inc.', '03. conversion ratio': 1, '04. current price': 350, '05. commission': '2%', '06. total cost': 357.00 },
          { '01. symbol': 'GOOGL', '02. description': 'Alphabet Inc.', '03. conversion ratio': 1, '04. current price': 2000, '05. commission': '2%', '06. total cost': 2040.00 },
          { '01. symbol': 'AMZN', '02. description': 'Amazon.com Inc.', '03. conversion ratio': 1, '04. current price': 3000, '05. commission': '2%', '06. total cost': 3060.00 },
          { '01. symbol': 'MSFT', '02. description': 'Microsoft Corporation', '03. conversion ratio': 1, '04. current price': 500, '05. commission': '2%', '06. total cost': 510.00 },
          { '01. symbol': 'FB', '02. description': 'Meta Platforms Inc.', '03. conversion ratio': 1, '04. current price': 300, '05. commission': '2%', '06. total cost': 306.00 },
          { '01. symbol': 'NVDA', '02. description': 'NVIDIA Corporation', '03. conversion ratio': 1, '04. current price': 700, '05. commission': '2%', '06. total cost': 714.00 },
          { '01. symbol': 'PYPL', '02. description': 'PayPal Holdings Inc.', '03. conversion ratio': 1, '04. current price': 200, '05. commission': '2%', '06. total cost': 204.00 },
          { '01. symbol': 'INTC', '02. description': 'Intel Corporation', '03. conversion ratio': 1, '04. current price': 50, '05. commission': '2%', '06. total cost': 51.00 }
        ];
      }

      setInitialDataInLocalStorage(data);

      const dataWithProfit = calculateProfit(data);
      setCedears(dataWithProfit);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const setInitialDataInLocalStorage = (data) => {
    const storedHistory = localStorage.getItem('historyCedears');
    const storedCedears = localStorage.getItem('actualCedears');

    if (!storedHistory) {
      localStorage.setItem('historyCedears', JSON.stringify(data));
    }

    if (!storedCedears) {
      localStorage.setItem('actualCedears', JSON.stringify(data));
    }
  };

  const updateCedearPrices = () => {
    const storedCedears = JSON.parse(localStorage.getItem('actualCedears'));

    // Hacer una copia de actualCedears en historyCedears
    localStorage.setItem('historyCedears', JSON.stringify(storedCedears));

    const updatedCedears = storedCedears.map(cedear => {
      const randomChange = (Math.random() * 20 - 10).toFixed(2);
      const updatedPrice = parseFloat(cedear['04. current price']) + parseFloat(randomChange);
      return { ...cedear, '04. current price': updatedPrice };
    });

    localStorage.setItem('actualCedears', JSON.stringify(updatedCedears));

    const updatedDataWithProfit = calculateProfit(updatedCedears);
    setCedears(updatedDataWithProfit);
  };

  const calculateProfit = (currentCedears) => {
    const historyCedears = JSON.parse(localStorage.getItem('historyCedears'));

    return currentCedears.map(cedear => {
      const historyCedear = historyCedears.find(hCedear => hCedear['01. symbol'] === cedear['01. symbol']);
      if (historyCedear) {
        const profit = (((cedear['04. current price'] - historyCedear['04. current price']) / historyCedear['04. current price']) * 100).toFixed(2);
        return { ...cedear, profit };
      }
      return { ...cedear, profit: 0 };
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateCedearPrices, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const storedCedears = localStorage.getItem('actualCedears');
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

  const paginatedCedears = filteredCedears.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  const paginatedPortfolio = filteredPortfolio.slice(pageCartera * itemsPerPage, (pageCartera + 1) * itemsPerPage);

  const handleOpenBuyModal = (cedear) => {
    setSelectedCedear(cedear);
    setBuyModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    setBuyModalOpen(false);
  };

  const handleOpenSellModal = (cedear) => {
    setSelectedCedearForSell(cedear);
    setSellModalOpen(true);
  };

  const handleCloseSellModal = () => {
    setSellModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="container">
      <div className="cedear-list">
        <h2 className="titulo">
          LISTADO DE CEDEARS
          <Tooltip title="Buscar cedear por símbolo o descripción">
            <InfoIcon fontSize="small" style={{ marginLeft: '0.5rem' }} />
          </Tooltip>
        </h2>
        <TextField
          label="Buscar"
          value={searchValue}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <div className="table-container">
          <table className="cedear-table">
            <TableHead>
              <TableRow>
                <TableCell className="bold-cell">Símbolo</TableCell>
                <TableCell className="bold-cell">Descripción</TableCell>
                <TableCell className="bold-cell">Ratio Conversión</TableCell>
                <TableCell className="bold-cell">Precio Actual</TableCell>
                <TableCell className="bold-cell">Comisión</TableCell>
                <TableCell className="bold-cell">Costo Total</TableCell>
                <TableCell className="bold-cell">Profit (%)</TableCell>
                <TableCell className="bold-cell">Comprar</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {paginatedCedears.map((cedear, index) => (
                <TableRow key={index}>
                  <TableCell>{cedear['01. symbol']}</TableCell>
                  <TableCell>{cedear['02. description']}</TableCell>
                  <TableCell>{cedear['03. conversion ratio']}</TableCell>
                  <TableCell>{cedear['04. current price'].toFixed(2)}</TableCell>
                  <TableCell>{cedear['05. commission']}</TableCell>
                  <TableCell>{cedear['06. total cost']}</TableCell>
                  <TableCell>{cedear.profit} %</TableCell>
                  <TableCell>
                    <Tooltip title="Comprar CEDEAR">
                      <IconButton onClick={() => handleOpenBuyModal(cedear)}>
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </table>
          <BuyModal open={buyModalOpen} onClose={handleCloseBuyModal} cedear={selectedCedear} />
        </div>
      </div>
      <div className="cedear-portfolio">
        <h2 className="titulo">
          CARTERA DE CEDEARS
          <Tooltip title="Buscar cedear por nombre">
            <InfoIcon fontSize="small" style={{ marginLeft: '0.5rem' }} />
          </Tooltip>
        </h2>
        <TextField
          label="Buscar en cartera"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <div className="table-container">
          <table className="portfolio-table">
            <TableHead>
              <TableRow>
                <TableCell className="bold-cell">Nombre</TableCell>
                <TableCell className="bold-cell">Cantidad</TableCell>
                <TableCell className="bold-cell">Precio Compra</TableCell>
                <TableCell className="bold-cell">Precio Actual</TableCell>
                <TableCell className="bold-cell">Variación</TableCell>
                <TableCell className="bold-cell">Vender</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {paginatedPortfolio.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.purchasePrice}</TableCell>
                  <TableCell>{item.currentPrice}</TableCell>
                  <TableCell>
                    {(((item.currentPrice - item.purchasePrice) / item.purchasePrice) * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Vender CEDEAR">
                      <IconButton onClick={() => handleOpenSellModal(item)}>
                        <SellIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </table>
          <SellModal open={sellModalOpen} onClose={handleCloseSellModal} cedear={selectedCedearForSell} />
        </div>
      </div>
    </div>
  );
};

export default CEDEARTable;
