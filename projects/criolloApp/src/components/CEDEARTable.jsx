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
import ReBuyModal from './ModalReBuy';

const CEDEARTable = () => {
  const [cedears, setCedears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  // const API_KEY = 'KAMUMYI1HLBDZCJL';
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedCedear, setSelectedCedear] = useState(null);
  const [page, setPage] = useState(0);
  const [pageCartera, setPageCartera] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCedearForSell, setSelectedCedearForSell] = useState(null);
  const [selectedCedearForReBuy, setSelectedCedearForReBuy] = useState(null);
  const [paginatedCedears, setPaginatedCedears] = useState([]);
  const [paginatedPortfolio, setPaginatedPortfolio] = useState([]);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [ReBuyModalOpen, setReBuyModalOpen] = useState(false);
  const [actualCedears, setActualCedears] = useState([]);
  const itemsPerPage = 6;


  const fetchData = async () => {
    try {
      let data = [
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
      const setInitialDataInLocalStorage = (data) => {
        const storedHistory = localStorage.getItem('historyCedears');
        const storedCedears = localStorage.getItem('actualCedears');

        if (!storedHistory) {
          localStorage.setItem('historyCedears', JSON.stringify(data));
        }

        if (!storedCedears) {
          localStorage.setItem('actualCedears', JSON.stringify(data));
        }
        else {
          const updatedDataWithProfit = calculateProfit(data);
          setCedears(updatedDataWithProfit);
          setActualCedears(updatedDataWithProfit);
        }
      };
      if (!localStorage.getItem('actualCedears') || !localStorage.getItem('historyCedears')) {
        setInitialDataInLocalStorage(data);
      }
      else {
        data = JSON.parse(localStorage.getItem('actualCedears'));
      }
      const dataWithProfit = calculateProfit(data);
      setCedears(dataWithProfit);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };
  const calculateTotalInvested = (symbol, quantity) => {
    const cedear = actualCedears.find(c => c['01. symbol'] === symbol);
    return cedear ? parseFloat(cedear['04. current price']) * quantity : 0;
  };
  
  


  const updateCedearPrices = () => {
    const storedCedears = JSON.parse(localStorage.getItem('actualCedears'));
  
    // Hacer una copia de actualCedears en historyCedears
    localStorage.setItem('historyCedears', JSON.stringify(storedCedears));
  
    const updatedCedears = storedCedears.map(cedear => {
      const randomChange = (Math.random() * 10 - 5).toFixed(2);
      const updatedPrice = parseFloat(cedear['04. current price']) + parseFloat(randomChange);
      return { ...cedear, '04. current price': updatedPrice };
    });
  
    localStorage.setItem('actualCedears', JSON.stringify(updatedCedears));
  
    const updatedDataWithProfit = calculateProfit(updatedCedears);
    setCedears(updatedDataWithProfit);
    setActualCedears(updatedDataWithProfit);
  };
  
  
  
  const calculateProfit = (currentCedears) => {
    const historyCedears = JSON.parse(localStorage.getItem('historyCedears'));
  
    const updatedCedears = currentCedears.map(cedear => {
      const historyCedear = historyCedears.find(hCedear => hCedear['01. symbol'] === cedear['01. symbol']);
      if (historyCedear) {
        const initialPrice = parseFloat(historyCedear['04. current price']);
        const currentPrice = parseFloat(cedear['04. current price']);
        let profit = (((currentPrice - initialPrice) / initialPrice) * 100).toFixed(2);
  
        return { ...cedear, profit };
      }
      return { ...cedear, profit: 0 };
    });
  
    localStorage.setItem('actualCedears', JSON.stringify(updatedCedears));
  
    return updatedCedears;
  };
  

  const filteredPortfolio = portfolio.filter(item =>
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let filteredCedears = cedears.filter(cedear =>
    cedear['01. symbol'].toLowerCase().includes(searchValue.toLowerCase()) ||
    cedear['02. description'].toLowerCase().includes(searchValue.toLowerCase())
  );


  const totalPages = Math.ceil(filteredCedears.length / itemsPerPage);
  const totalPagesCartera = Math.ceil(filteredPortfolio.length / itemsPerPage);



  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    const startCedearIndex = pageNumber * itemsPerPage;
    const endCedearIndex = Math.min((pageNumber + 1) * itemsPerPage, filteredCedears.length);
    const newPaginatedCedears = filteredCedears.slice(startCedearIndex, endCedearIndex);
    setPaginatedCedears(newPaginatedCedears);
  };

  const handlePageCarteraClick = (pageNumber) => {
    setPageCartera(pageNumber);
    const startPortfolioIndex = pageNumber * itemsPerPage;
    const endPortfolioIndex = Math.min((pageNumber + 1) * itemsPerPage, filteredPortfolio.length);
    const newPaginatedPortfolio = filteredPortfolio.slice(startPortfolioIndex, endPortfolioIndex);
    setPaginatedPortfolio(newPaginatedPortfolio);
  };



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateCedearPrices, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const storedCedears = localStorage.getItem('portfolio');
    if (storedCedears) {
      setPortfolio(JSON.parse(storedCedears));
    }

    const storedActualCedears = localStorage.getItem('actualCedears');
    if (storedActualCedears) {
      setActualCedears(JSON.parse(storedActualCedears));
    }
  }, []);


  useEffect(() => {
    handlePageClick(page); // Añadir esta línea
  }, [cedears, page]);

  useEffect(() => {
    handlePageCarteraClick(pageCartera); // Añadir esta línea
  }, [portfolio, pageCartera]);



  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;




  const handleBuyClick = (cedear) => {
    setSelectedCedear(cedear);
    setBuyModalOpen(true);
  };

  const handleReBuyClick = (cedear) => {
    setSelectedCedearForReBuy(cedear);
    setReBuyModalOpen(true);
  };

  // const handleCloseBuyModal = () => {
  //   setBuyModalOpen(false);
  // };

  // const handleOpenSellModal = (cedear) => {
  //   setSelectedCedearForSell(cedear);
  //   setSellModalOpen(true);
  // };

  // const handleCloseSellModal = () => {
  //   setSellModalOpen(false);
  // };

  // const handleSearchChange = (e) => {
  //   setSearchValue(e.target.value);
  // };

  const handleSellClick = (cedear) => {
    setSelectedCedearForSell(cedear);
    setSellModalOpen(true);
  };

  // console.log('paginatedCedears2:', paginatedCedears);


  const getCurrentPrice = (symbol) => {
    const cedear = actualCedears.find(c => c['01. symbol'] === symbol);
    return cedear ? cedear['04. current price'] : 0;
  };

  const getCurrentProfit = (symbol) => {
    const cedear = actualCedears.find(c => c['01. symbol'] === symbol);
    return cedear ? cedear.profit : 0;

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
          {paginatedCedears.map((cedear, index) => (

            <tr key={index}>
              <td>
                {cedear['01. symbol']}{" "}
                <span style={{ color: cedear.profit > 0 ? 'green' : 'red' }}>
                  {cedear.profit}%
                </span>
              </td>
              <td>{cedear['02. description']}</td>
              <td>{cedear['03. conversion ratio']}</td>
              <td>{parseFloat(getCurrentPrice(cedear['01. symbol'])).toFixed(2)}</td>
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
          {paginatedPortfolio.filter(item => item.name !== 'Ninguno').map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{parseFloat(item.price).toFixed(2)}</td>
              <td>{parseFloat(getCurrentPrice(item.name)).toFixed(2)}</td>
              <td style={{ color: getCurrentProfit(item.name) >= 0 ? 'green' : 'red' }}>
                {getCurrentProfit(item.name) >= 0 ? `+${parseFloat(getCurrentProfit(item.name)).toFixed(2)}%` : `${parseFloat(getCurrentProfit(item.name)).toFixed(2)}%`}
              </td>
              <td style={{ color: (getCurrentPrice(item.name) - item.price) >= 0 ? 'green' : 'red' }}>
                {(getCurrentPrice(item.name) - item.price) >= 0 ?
                  `+$${((getCurrentPrice(item.name) - item.price) * item.quantity).toFixed(2)}` :
                  `-$${Math.abs((getCurrentPrice(item.name) - item.price) * item.quantity).toFixed(2)}`
                }
              </td>
              <td className='tdBtns'>
                <button className='comprarCedearsBtn' onClick={() => handleReBuyClick(item)}><AddIcon /> Comprar</button>
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

      {selectedCedearForReBuy && (
        <ReBuyModal open={ReBuyModalOpen}
          onClose={() => setReBuyModalOpen(false)}
          cedear={selectedCedearForReBuy}
        />
      )}

    </div>

  );
};

export default CEDEARTable;
