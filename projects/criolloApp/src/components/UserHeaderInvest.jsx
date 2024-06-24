import React, { useState, useEffect } from 'react';
import '../App.css';
import avatar from '../assets/avatar.jpg';
import total from '../assets/total.png';
import saldo from '../assets/saldo.png';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import PieActiveArc from './PieChart';
import AddFundsModal from './AddFundsModal';
import ResetModal from './ResetModal';
import IOL from '../assets/iol.png'

const UserHeaderInvest = () => {
    const [totalInv, setTotalInv] = useState(0);
    const [saldoInv, setSaldoInv] = useState(0);
    const [portfolio, setPortfolio] = useState([]);
    const [rendimientoTotal, setRendimientoTotal] = useState(0);
    const [showAddFundsModal, setShowAddFundsModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const getCurrentPrice = (symbol) => {
        const actualCedears = JSON.parse(localStorage.getItem('actualCedears')) || [];
        const cedearFound = actualCedears.find(c => c['01. symbol'] === symbol);
        return cedearFound ? parseFloat(cedearFound['04. current price']) : 0;
    };

// Primer useEffect para inicializar saldoInv y portfolio
useEffect(() => {
    const storedSaldo = parseFloat(localStorage.getItem('saldo')) || 0;
    setSaldoInv(storedSaldo.toFixed(2));

    const storedPortfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
    setPortfolio(storedPortfolio);
}, []); // Nota: el array de dependencias está vacío, por lo que este useEffect solo se ejecutará una vez

// Segundo useEffect para actualizar totalInv y rendimientoTotal
useEffect(() => {
    const updateTotalAndPerformance = () => {
        // Verificar si el portfolio contiene un item con el nombre "ninguno"
        const hasNoneItem = portfolio.some(item => item.name.toLowerCase() === "ninguno");
        
        let newTotal = 0;
        let currentPerformance = 0;

        if (!hasNoneItem) {
            newTotal = portfolio.reduce((acc, item) => {
                const currentPrice = getCurrentPrice(item.name);
                return !isNaN(currentPrice) && !isNaN(item.quantity) ? acc + (currentPrice * item.quantity) : acc;
            }, 0);

            currentPerformance = portfolio.reduce((acc, item) => {
                const currentPrice = getCurrentPrice(item.name);
                const purchasePrice = parseFloat(item.price);
                const difference = currentPrice - purchasePrice;
                return !isNaN(currentPrice) && !isNaN(item.quantity) ? acc + difference * item.quantity : acc;
            }, 0);
        }

        setTotalInv(newTotal.toFixed(2));
        setRendimientoTotal(currentPerformance);
    };

    // Ejecutar la función al montar el componente y cada vez que portfolio cambia
    updateTotalAndPerformance();

    // Actualizar el rendimiento total cada 10 segundos
    const updateTotalAndPerformanceInterval = setInterval(updateTotalAndPerformance, 10000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(updateTotalAndPerformanceInterval);
}, [portfolio]); // Nota: este useEffect se ejecutará cada vez que el portfolio cambie

    const handleAddFunds = () => {
        setShowAddFundsModal(true);
    };

    const handleReset = () => {
        setShowResetModal(true);
    };

    const addFunds = (amount) => {
        let currentBalance = parseFloat(localStorage.getItem('saldo')) || 0;
        currentBalance += amount;
        localStorage.setItem('saldo', currentBalance.toFixed(2));
        setSaldoInv(currentBalance.toFixed(2));
        setShowAddFundsModal(false);
    };

    const resetFunds = () => {
        localStorage.clear();
        setShowResetModal(false);
        window.location.reload();
    };
    return (
        <div className="user-headerAlign">
            <div className="user-headerInvest">
                <div className="user-info">
                    <img src={avatar} alt="Usuario" className="user-avatar" />
                    <div className="user-details">
                        <h2>Usuario</h2>
                        <p>Estudiante de Ingeniería en Informática</p>
                    </div>
                </div>
                <div className="user-options">
                    <div className="stat" style={{ backgroundColor: "#DDB4EB" }}>
                        <div className='stat-icon'>
                            <img src={saldo} alt="" />
                        </div>
                        <div className='stat-dataInvest'>
                            <span>Saldo disponible</span>
                            <p style={{ color: "#C10BFF" }}>${saldoInv}</p>
                        </div>
                    </div>
                    <div className="stat" style={{ backgroundColor: "#E2FCE0" }}>
                        <div className='stat-icon'>
                            <img src={total} alt="" />
                        </div>
                        <div className='stat-dataInvest'>
                            <span>Total invertido</span>
                            <p style={{ color: "#19911E" }}>${totalInv}</p>
                            <p style={{ color: rendimientoTotal >= 0 ? "#19911E" : "#FF0000" }}>{rendimientoTotal >= 0 ? "+" : "-"}${Math.abs(rendimientoTotal.toFixed(2))}</p>
                        </div>
                    </div>
                </div>
                <div className='user-buttons'>
                    <button className='btn' style={{ backgroundColor: "#A7E0AC", color: "#19911E" }} onClick={handleAddFunds}>
                        <AddCircleOutlineIcon />
                        Ingresar dinero
                    </button>
                    <button className='btn' onClick={handleReset}>
                        <RefreshIcon />
                        Restablecer
                    </button>
                    <button className='btn' onClick={() => window.open('https://www.invertironline.com/', '_blank')} style={{ backgroundColor: "#6439FF", color: "#fff" }}>
                        <img src={IOL} alt="IOL" style={{ width: "3rem" }} />
                    </button>
                    <p style={{ color: "#6439FF", cursor: "pointer", display:"flex", flexDirection:"row", alignContent:"center", alignSelf:"center" }}>
                        <ArrowBackIcon />
                        ¿No sabes donde invertir? ¡Click aquí!
                    </p>
                    {showAddFundsModal && (
                        <AddFundsModal onClose={() => setShowAddFundsModal(false)} onAddFunds={addFunds} />
                    )}
                    {showResetModal && (
                        <ResetModal onClose={() => setShowResetModal(false)} onReset={resetFunds} />
                    )}
                </div>
            </div>
            <div className="user-chart">
                <PieActiveArc />
            </div>
        </div>
    );
};

export default UserHeaderInvest;
