import React, { useState } from 'react';

export default function BuyModal({ open, onClose, cedear }) {
    const [quantity, setQuantity] = useState(1);

    const handleBuy = () => {
        // Obtén la lista actual de cedears y portfolio del localStorage
        let cedears = JSON.parse(localStorage.getItem('cedears')) || [];
        let historyCedears = JSON.parse(localStorage.getItem('historyCedears')) || [];
        let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

        // Si el primer cedear es "Ninguno", elimínalo
        if (cedears[0] && cedears[0].name === 'Ninguno') {
            cedears.shift();
        }

        // Busca el cedear en la lista
        let cedearIndex = cedears.findIndex(c => c.name === cedear['01. symbol']);
        let portfolioIndex = portfolio.findIndex(p => p.name === cedear['01. symbol']);

        // Asegúrate de que quantity es un número
        const cedearPrice = cedear['04. current price'];
        const quantityNumber = parseInt(quantity);

        const performance = (Math.random() * 4 - 2).toFixed(2);

        if (cedearIndex !== -1) {
            // Si el cedear ya está en la lista, actualiza su cantidad y precio
            cedears[cedearIndex].quantity += quantityNumber;
            cedears[cedearIndex].price = cedearPrice;
            cedears[cedearIndex].performance = performance;
        } else {
            // Si el cedear no está en la lista, añádelo
            cedears.push({ 
                name: cedear['01. symbol'], 
                quantity: quantityNumber, 
                price: cedearPrice, 
                performance: performance 
            });
        }

        if (portfolioIndex !== -1) {
            // Si el cedear ya está en el portfolio, actualiza su cantidad y precio
            portfolio[portfolioIndex].quantity += quantityNumber;
            portfolio[portfolioIndex].price = cedearPrice;
        } else {
            // Si el cedear no está en el portfolio, añádelo
            portfolio.push({ 
                name: cedear['01. symbol'], 
                quantity: quantityNumber, 
                price: cedearPrice 
            });
        }

        // Guarda las listas actualizadas en el localStorage
        localStorage.setItem('cedears', JSON.stringify(cedears));
        localStorage.setItem('portfolio', JSON.stringify(portfolio));

        // Actualiza el total y el saldo
        const total = parseFloat(localStorage.getItem('total')) || 0;
        const saldo = parseFloat(localStorage.getItem('saldo')) || 200000; // Asume un saldo inicial de 200000
        const totalPurchasePrice = quantityNumber * cedearPrice;
        const newTotal = total + totalPurchasePrice;
        const newSaldo = saldo - totalPurchasePrice;

        localStorage.setItem('total', newTotal.toString());
        localStorage.setItem('saldo', newSaldo.toString());

        // Cierra el modal y reinicia la cantidad
        onClose();
        setQuantity(1);
        window.location.reload();
    };

    if (!open) {
        return null;
    }

    const cedearPrice = cedear['04. current price'];
    const totalPurchasePrice = quantity * cedearPrice;
    const saldoCheck = parseFloat(localStorage.getItem('saldo')) || 200000;

    return (
        <div className="modal-comprar">
            <div className="modalComprar-content">
                <h2 style={{ color: '#005f37', fontSize: '2rem' }}>
                    Comprar: {cedear['01. symbol']}
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
