import React, { useState } from 'react';

export default function BuyModal({ open, onClose, cedear }) {
    const [quantity, setQuantity] = useState(1);

    const handleBuy = () => {
        let cedears = JSON.parse(localStorage.getItem('cedears')) || [];
        let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
        // Paso 1: Recuperar el array de transacciones actual o inicializarlo como un array vacío
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];


        if (cedears[0] && cedears[0].name === 'Ninguno') {
            cedears.shift();
        }

        let cedearIndex = cedears.findIndex(c => c.name === cedear['01. symbol']);
        let portfolioIndex = portfolio.findIndex(p => p.name === cedear['01. symbol']);

        const cedearPrice = parseFloat(cedear['04. current price']);
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
            const currentPrice = parseFloat(item.price);
            return acc + (currentPrice * item.quantity);
        }, 0);

        const saldo = parseFloat(localStorage.getItem('saldo')) || 200000;
        const totalPurchasePrice = quantityNumber * cedearPrice;
        const newSaldo = saldo - totalPurchasePrice;


        // Paso 2: Crear el objeto de la transacción
        const transaction = {
            accion: "Compra",
            simbolo: cedear['01. symbol'], // Asumiendo que cedear es el objeto del cedear que estás recomprando
            descripcion: cedear['02. description'], // Asumiendo que tienes una descripción en tu objeto cedear
            fechaHora: new Date().toLocaleString(), // Obtiene la fecha y hora actual
            montoTotal: totalPurchasePrice // El monto total gastado en la transacción
        };

        // Paso 3: Añadir este objeto al array de transacciones
        transactions.push(transaction);

        // Paso 4: Guardar el array actualizado de nuevo en el localStorage
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('total', newTotal.toFixed(2));
        localStorage.setItem('saldo', newSaldo.toFixed(2));

        onClose();
        setQuantity(1);
        window.location.reload();
    };

    if (!open) {
        return null;
    }

    const cedearPrice = parseFloat(cedear['04. current price']);
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
