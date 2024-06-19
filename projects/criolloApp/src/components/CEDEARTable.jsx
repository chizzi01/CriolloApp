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
  const [pageTransactions, setPageTransactions] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCedearForSell, setSelectedCedearForSell] = useState(null);
  const [selectedCedearForReBuy, setSelectedCedearForReBuy] = useState(null);
  const [paginatedCedears, setPaginatedCedears] = useState([]);
  const [paginatedPortfolio, setPaginatedPortfolio] = useState([]);
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [ReBuyModalOpen, setReBuyModalOpen] = useState(false);
  const [actualCedears, setActualCedears] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchPortValue, setSearchPortValue] = useState('');
  const itemsPerPage = 6;


  const fetchData = async () => {
    try {
      let data = [
        { '01. symbol': 'AAPL', '02. description': 'Apple Inc.', '03. conversion ratio': '10:1', '04. current price': 150, '05. commission': '2%', '06. total cost': 153.00 },
        { '01. symbol': 'IBM', '02. description': 'International Business Machines', '03. conversion ratio': '8:1', '04. current price': 250, '05. commission': '2%', '06. total cost': 255.00 },
        { '01. symbol': 'TSLA', '02. description': 'Tesla Inc.', '03. conversion ratio': '5:1', '04. current price': 350, '05. commission': '2%', '06. total cost': 357.00 },
        { '01. symbol': 'GOOGL', '02. description': 'Alphabet Inc.', '03. conversion ratio': '15:1', '04. current price': 2000, '05. commission': '2%', '06. total cost': 2040.00 },
        { '01. symbol': 'AMZN', '02. description': 'Amazon.com Inc.', '03. conversion ratio': '20:1', '04. current price': 3000, '05. commission': '2%', '06. total cost': 3060.00 },
        { '01. symbol': 'MSFT', '02. description': 'Microsoft Corporation', '03. conversion ratio': '10:1', '04. current price': 500, '05. commission': '2%', '06. total cost': 510.00 },
        { '01. symbol': 'FB', '02. description': 'Meta Platforms Inc.', '03. conversion ratio': '8:1', '04. current price': 300, '05. commission': '2%', '06. total cost': 306.00 },
        { '01. symbol': 'NVDA', '02. description': 'NVIDIA Corporation', '03. conversion ratio': '4:1', '04. current price': 700, '05. commission': '2%', '06. total cost': 714.00 },
        { '01. symbol': 'PYPL', '02. description': 'PayPal Holdings Inc.', '03. conversion ratio': '10:1', '04. current price': 200, '05. commission': '2%', '06. total cost': 204.00 },
        { '01. symbol': 'INTC', '02. description': 'Intel Corporation', '03. conversion ratio': '12:1', '04. current price': 50, '05. commission': '2%', '06. total cost': 51.00 }
      ];
      const setInitialDataInLocalStorage = (data) => {
        const storedHistory = localStorage.getItem('historyCedears');
        const storedCedears = localStorage.getItem('actualCedears');
        const storedTransactions = localStorage.getItem('transactions');

        if (!storedHistory) {
          localStorage.setItem('historyCedears', JSON.stringify(data));
        }

        if (!storedCedears) {
          localStorage.setItem('actualCedears', JSON.stringify(data));
        }

        if (!storedTransactions) {
          localStorage.setItem('transactions', JSON.stringify([]));
        }

        else {
          const updatedDataWithProfit = calculateProfit(data);
          setCedears(updatedDataWithProfit);
          setActualCedears(updatedDataWithProfit);
          setTransactions(JSON.parse(storedTransactions));
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
  const totalPagesTransactions = Math.ceil(transactions.length / itemsPerPage);



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

  const handlePageTransactionsClick = (pageNumber) => {
    setPageTransactions(pageNumber);
    const startTransactionsIndex = pageNumber * itemsPerPage;
    const endTransactionsIndex = Math.min((pageNumber + 1) * itemsPerPage, transactions.length);
    const newPaginatedTransactions = transactions.slice(startTransactionsIndex, endTransactionsIndex);
    setPaginatedTransactions(newPaginatedTransactions);
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

    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);


  useEffect(() => {
    handlePageClick(page); // Añadir esta línea
  }, [cedears, page]);

  useEffect(() => {
    handlePageCarteraClick(pageCartera); // Añadir esta línea
  }, [portfolio, pageCartera]);

  useEffect(() => {
    handlePageTransactionsClick(pageTransactions); // Añadir esta línea
  }, [transactions, pageTransactions]);

  useEffect(() => {
    // Filtrar cedears basado en el valor de búsqueda
    const searchValueLower = searchValue.toLowerCase(); // Convertir el valor de búsqueda a minúsculas
    const filteredCedears = cedears.filter(cedear =>
      cedear['01. symbol'].toLowerCase().includes(searchValueLower) ||
      cedear['02. description'].toLowerCase().includes(searchValueLower)
    );
  
    // Actualizar el estado con los cedears filtrados
    setPaginatedCedears(filteredCedears.slice(0, itemsPerPage)); // Asumiendo paginación inicial
    setPage(0); // Reiniciar a la primera página de resultados
  }, [searchValue, cedears]);


  useEffect(() => {
    // Filtrar portfolio basado en el valor de búsqueda
    const searchTermLower = searchTerm.toLowerCase(); // Convertir el valor de búsqueda a minúsculas
    const filteredPortfolio = portfolio.filter(item =>
      item.name && item.name.toLowerCase().includes(searchTermLower)
    );

    // Actualizar el estado con el portfolio filtrado
    setPaginatedPortfolio(filteredPortfolio.slice(0, itemsPerPage)); // Asumiendo paginación inicial
    setPageCartera(0); // Reiniciar a la primera página de resultados
  }, [searchTerm, portfolio]);





  const handleBuyClick = (cedear) => {
    setSelectedCedear(cedear);
    setBuyModalOpen(true);
  };

  const handleReBuyClick = (cedear) => {
    setSelectedCedearForReBuy(cedear);
    setReBuyModalOpen(true);
  };

  const handleSellClick = (cedear) => {
    console.log('cedear:', cedear);
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
                <Tooltip title="Basicamente el 'Apodo' del cedear">
                  <InfoIcon />
                </Tooltip>
                Símbolo
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
              <Tooltip title="Es el 'Nombre completo' de la empresa a la que pertenece el cedear">
                  <InfoIcon />
                </Tooltip>
                Descripción
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Cuantos cedears equivalen a una accion de la empresa">
                  <InfoIcon />
                </Tooltip>
                Ratio de conversión
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del precio actual sin comisiones">
                  <InfoIcon />
                </Tooltip>
                Precio actual
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información de la comisión que te cobran por cada cedear">
                  <InfoIcon />
                </Tooltip>
                Comisión
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la información del precio + la comision">
                  <InfoIcon />
                </Tooltip>
                Costo total
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Podes comprar cedears">
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
              <td>${parseFloat(getCurrentPrice(cedear['01. symbol'])).toFixed(2)}</td>
              <td>{cedear['05. commission']}</td>
              <td>${cedear['06. total cost']}</td>
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
              <Tooltip title="Basicamente el 'Apodo' del cedear">
                  <InfoIcon />
                </Tooltip>
                CEDEAR
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Esta es la cantidad de CEDEARs que compraste">
                  <InfoIcon />
                </Tooltip>
                Cantidad
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="El precio al que en su momento compraste el CEDEAR">
                  <InfoIcon />
                </Tooltip>
                Precio de compra
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="El precio actual por unidad del CEDEAR">
                  <InfoIcon />
                </Tooltip>
                Precio actual
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="El rendimiento actual que tuvo la empresa a la que pertenece el CEDEAR ">
                  <InfoIcon />
                </Tooltip>
                Rendimiento %
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="El rendimiento total de tus CEDEARs desde su compra hasta ahora">
                  <InfoIcon />
                </Tooltip>
                Rendimiento Total
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Podes comprar más o vender tus CEDEARs">
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
              <td>${parseFloat(item.price).toFixed(2)}</td>
              <td>${parseFloat(getCurrentPrice(item.name)).toFixed(2)}</td>
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




      <div className='searchCedears'>
        <h1>Historial de transacciones</h1>
      </div>
      <table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="La accion que realizaste">
                  <InfoIcon />
                </Tooltip>
                Accion
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Sobre que CEDEAR">
                  <InfoIcon />
                </Tooltip>
                Simbolo
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="El nombre de la empresa a la que pertenece el CEDEAR">
                  <InfoIcon />
                </Tooltip>
                Descripcion
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="Fecha y hora de la transaccion">
                  <InfoIcon />
                </Tooltip>
                Fecha y hora
              </div>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <div className="header-icon-text">
                <Tooltip title="La cantidad de dinero total que moviste, ya sea compra o venta">
                  <InfoIcon />
                </Tooltip>
                Monto
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {transactions
            .map(transaction => ({
              ...transaction,
              fechaHoraDate: new Date(transaction.fechaHora)
            }))
            .sort((a, b) => b.fechaHoraDate - a.fechaHoraDate)
            .map((transaction, index) => {
              let rowColor = "";
              switch (transaction.accion) {
                case "Compra":
                  rowColor = "#c8ffc8"; // Color para Compra
                  break;
                case "Recompra":
                  rowColor = "#94ff94"; // Color más oscuro para Recompra
                  break;
                case "Venta":
                  rowColor = "#c7edff"; // Color para Venta
                  break;
                default:
                  rowColor = "white"; // Color por defecto
              }

              return (
                <tr key={index} style={{ backgroundColor: rowColor }}>
                  <td>{transaction.accion}</td>
                  <td>{transaction.simbolo}</td>
                  <td>{transaction.descripcion}</td>
                  <td>{transaction.fechaHora}</td>
                  <td>${parseFloat(transaction.montoTotal).toFixed(2)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='pageSlider'>
        <button onClick={() => handlePageTransactionsClick(pageTransactions - 1)} disabled={pageTransactions === 0} className='flecha' style={{ backgroundColor: "#90ee90" }}>
          <img src={flecha} alt="" />
        </button>
        {Array.from({ length: totalPagesTransactions }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageTransactionsClick(index)}
            className={pageTransactions === index ? 'active' : ''}
            style={{ backgroundColor: "#90ee90", color: "#005f37" }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageTransactionsClick(pageTransactions + 1)} disabled={pageTransactions === totalPagesTransactions - 1} className='flecha der' style={{ backgroundColor: "#90ee90" }}>
          <img src={flecha} alt="" />
        </button>
      </div>

    </div>

  );
};

export default CEDEARTable;
