import React, { useState } from 'react';

export default function ReBuyModal({ open, onClose, cedear }) {
    const [quantity, setQuantity] = useState(1);
    const actualCedears = JSON.parse(localStorage.getItem('actualCedears')) || [];


    const handleBuy = () => {
        let cedears = JSON.parse(localStorage.getItem('cedears')) || [];
        let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

        let cedearIndex = cedears.findIndex(c => c.name === cedear.name);
        let portfolioIndex = portfolio.findIndex(p => p.name === cedear.name);

        const cedearPrice = getCurrentPrice(cedear.name);
        const quantityNumber = parseInt(quantity);

        const performance = (Math.random() * 4 - 2).toFixed(2);

        if (cedearIndex !== -1) {
            cedears[cedearIndex].quantity += quantityNumber;
            cedears[cedearIndex].price = cedearPrice;
            cedears[cedearIndex].performance = performance;
        } else {
            cedears.push({
                name: cedear['01. symbol'],
                quantity: quantityNumber,
                price: cedearPrice,
                performance: performance
            });
        }

        if (portfolioIndex !== -1) {
            portfolio[portfolioIndex].quantity += quantityNumber;
            portfolio[portfolioIndex].price = cedearPrice;
        } else {
            portfolio.push({
                name: cedear['01. symbol'],
                quantity: quantityNumber,
                price: cedearPrice
            });
        }

        localStorage.setItem('cedears', JSON.stringify(cedears));
        localStorage.setItem('portfolio', JSON.stringify(portfolio));

        const newTotal = portfolio.reduce((acc, item) => {
            const currentPrice = getCurrentPrice(item.name);
            return acc + (currentPrice * item.quantity);
        }, 0);

        const saldo = parseFloat(localStorage.getItem('saldo')) || 200000;
        const totalPurchasePrice = quantityNumber * cedearPrice;
        const newSaldo = saldo - totalPurchasePrice;

        // Actualiza el total invertido
        const totalInvested = parseFloat(localStorage.getItem('total')) || 0;
        const newTotalInvested = totalInvested + totalPurchasePrice;
        localStorage.setItem('total', newTotalInvested.toFixed(2));

        const rendimientoTotal = newTotal - newTotalInvested;
        localStorage.setItem('rendimientoTotal', rendimientoTotal.toFixed(2));
        localStorage.setItem('total', newTotal.toFixed(2));
        localStorage.setItem('saldo', newSaldo.toFixed(2));

        onClose();
        setQuantity(1);
        window.location.reload();
    };
    const getCurrentPrice = (symbol) => {
        const cedear = actualCedears.find(c => c['01. symbol'] === symbol);
        return cedear ? cedear['04. current price'] : 0;
    };

    if (!open) {
        return null;
    }

    const cedearPrice = getCurrentPrice(cedear.name);
    const totalPurchasePrice = quantity * cedearPrice;
    const saldoCheck = parseFloat(localStorage.getItem('saldo')) || 200000;

    return (
        <div className="modal-comprar">
            <div className="modalComprar-content">
                <h2 style={{ color: '#005f37', fontSize: '2rem' }}>
                    Comprar: {cedear.name}
                </h2>
                <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Precio por unidad: ${cedearPrice.toFixed(2)}
                </p>
                <p style={{ color: 'green', fontSize: "1.3rem" }}>
                    Total: ${totalPurchasePrice.toFixed(2)}
                </p>
                <div className="input-group">
                    <button className='restar' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="number" min='1' value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />
                    <button className='sumar' onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div className='buttons-comprar'>
                    <button onClick={onClose}>Cancelar</button>
                    <button
                        onClick={handleBuy}
                        style={{ backgroundColor: totalPurchasePrice > saldoCheck ? "#999999" : "#90ee90", color: "rgb(0, 90, 12)" }}
                        disabled={totalPurchasePrice > saldoCheck}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}
