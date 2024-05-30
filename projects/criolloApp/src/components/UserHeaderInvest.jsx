// src/components/UserHeader.js
import React, { useState } from 'react';
import '../App.css';
import avatar from '../assets/avatar.jpg';
import total from '../assets/total.png';
import saldo from '../assets/saldo.png';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import PieActiveArc from './PieChart';
import AddFundsModal from './AddFundsModal';
import ResetModal from './ResetModal';

const UserHeaderInvest = () => {

    const totalInv = parseFloat(localStorage.getItem('total')) || 0;
    const saldoInv = parseFloat(localStorage.getItem('saldo')) || 0;

    if (totalInv === 0) {
        localStorage.setItem('total', '0');
    }

    if (saldoInv === 0) {
        localStorage.setItem('saldo', '0');
    }

    const [showAddFundsModal, setShowAddFundsModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const handleAddFunds = () => {
        setShowAddFundsModal(true);
    };

    const handleReset = () => {
        setShowResetModal(true);
    };
    const addFunds = (amount) => {
        // Obtiene el saldo actual del localStorage
        let currentBalance = parseFloat(localStorage.getItem('saldo')) || 0;
    
        // Añade la cantidad de dinero a los fondos del usuario
        currentBalance += amount;
        currentBalance = currentBalance.toFixed(2);
    
        // Guarda el nuevo saldo en el localStorage
        localStorage.setItem('saldo', currentBalance.toString());
    
        // Cierra el modal
        setShowAddFundsModal(false);
    };

    const resetFunds = () => {
        // Borra el localStorage
        localStorage.clear();

        // Cierra el modal
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
                    <div className="stat" style={{ backgroundColor: "#E2FCE0" }}>
                        <div className='stat-icon'>
                            <img src={total} alt="" />
                        </div>
                        <div className='stat-dataInvest'>
                            <span>Total invertido</span>
                            <p style={{ color: "#19911E" }}>${totalInv}</p>
                        </div>
                    </div>
                    <div className="stat" style={{ backgroundColor: "#DDB4EB" }}>
                        <div className='stat-icon'>
                            <img src={saldo} alt="" />
                        </div>
                        <div className='stat-dataInvest'>
                            <span>Saldo disponible</span>
                            <p style={{ color: "#C10BFF" }}>${saldoInv}</p>
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
