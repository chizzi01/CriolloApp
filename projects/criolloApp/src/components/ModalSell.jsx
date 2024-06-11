import React, { useState, useEffect } from 'react';

export default function SellModal({ open, onClose, cedear }) {
    const [quantity, setQuantity] = useState(1);
    const [precioPorUnidad, setPrecioPorUnidad] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);

    const getCurrentPrice = (symbol) => {
        const actualCedears = JSON.parse(localStorage.getItem('actualCedears')) || [];
        const cedearFound = actualCedears.find(c => c['01. symbol'] === symbol);
        return cedearFound ? parseFloat(cedearFound['04. current price']) : 0;
    };

    const getDescription = (symbol) => {
        const actualCedears = JSON.parse(localStorage.getItem('actualCedears')) || [];
        const cedearFound = actualCedears.find(c => c['01. symbol'] === symbol);
        return cedearFound ? cedearFound['02. description'] : '';
    }

    useEffect(() => {
        if (cedear) {
            const currentPrice = getCurrentPrice(cedear.name);
            console.log('Precio actual:', currentPrice); // Depuración: Verifica el precio obtenido

            setPrecioPorUnidad(currentPrice);
            setTotalSalePrice((quantity * currentPrice).toFixed(2));
        }
    }, [cedear, quantity]);

    const handleSell = () => {
        let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
        let cedearIndex = portfolio.findIndex(c => c['01. symbol'] === cedear['01. symbol']);
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        const quantityNumber = parseInt(quantity, 10);
        const totalSalePrice = precioPorUnidad * quantityNumber;

        if (cedearIndex !== -1 && portfolio[cedearIndex].quantity >= quantityNumber) {
            portfolio[cedearIndex].quantity -= quantityNumber;

            if (portfolio[cedearIndex].quantity === 0) {
                portfolio.splice(cedearIndex, 1);
            }

            localStorage.setItem('portfolio', JSON.stringify(portfolio));

            const total = parseFloat(localStorage.getItem('total')) || 0;
            const saldo = parseFloat(localStorage.getItem('saldo')) || 200000;
            const newTotal = total - totalSalePrice;
            const newSaldo = saldo + totalSalePrice;


            // Paso 2: Crear el objeto de la transacción
            const transaction = {
                accion: "Venta",
                simbolo: cedear.name, // Asumiendo que cedear es el objeto del cedear que estás recomprando
                descripcion: getDescription(cedear.name), // Asumiendo que tienes una descripción en tu objeto cedear
                fechaHora: new Date().toLocaleString(), // Obtiene la fecha y hora actual
                montoTotal: totalSalePrice // El monto total gastado en la transacción
            };

            // Paso 3: Añadir este objeto al array de transacciones
            transactions.push(transaction);

            // Paso 4: Guardar el array actualizado de nuevo en el localStorage
            localStorage.setItem('transactions', JSON.stringify(transactions));
            localStorage.setItem('total', newTotal.toFixed(2));
            localStorage.setItem('saldo', newSaldo.toFixed(2));

            onClose();
            setQuantity(1);
            // Actualiza el precio después de vender
            const currentPrice = getCurrentPrice(cedear.name);
            setPrecioPorUnidad(currentPrice);
            setTotalSalePrice((1 * currentPrice).toFixed(2)); // Reset totalSalePrice to reflect one unit price after sell
        } else {
            alert('No tienes suficientes CEDEARs para vender');
        }

        window.location.reload();
    };


    if (!open) {
        return null;
    }

    const saldoCheck = parseFloat(localStorage.getItem('saldo')) || 200000;

    return (
        <div className="modal-comprar">
            <div className="modalComprar-content">
                <h2 style={{ color: '#005f37', fontSize: '2rem' }}>
                    Vender: {cedear.name}
                </h2>
                <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Precio por unidad: {precioPorUnidad.toFixed(2)}
                </p>
                <p style={{ color: 'green', fontSize: "1.3rem" }}>
                    Total: ${totalSalePrice}
                </p>
                <div className="input-group">
                    <button className='restar' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="number" min='1' value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} />
                    <button className='sumar' onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div className='buttons-comprar'>
                    <button onClick={onClose}>Cancelar</button>
                    <button
                        onClick={handleSell}
                        style={{ backgroundColor: parseFloat(totalSalePrice) > saldoCheck ? "#999999" : "#90ee90", color: "rgb(0, 90, 12)" }}
                        disabled={parseFloat(totalSalePrice) > saldoCheck}
                    >
                        Vender
                    </button>
                </div>
            </div>
        </div>
    );
}
