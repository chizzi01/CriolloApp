import React, { useState } from 'react';

export default function BuyModal({ open, onClose, cedear }) {
    const [quantity, setQuantity] = useState(1);

    const handleBuy = () => {
        // Obtén la lista actual de cedears del localStorage
        let cedears = JSON.parse(localStorage.getItem('cedears')) || [];

        // Si el primer cedear es "Ninguno", elimínalo
        if (cedears[0].name === 'Ninguno') {
            cedears.shift();
        }

        // Busca el cedear en la lista
        let cedearIndex = cedears.findIndex(c => c.name === cedear['01. symbol']);

        // Asegúrate de que cedear['04. current price'] y quantity son números
        // Elimina el signo de dólar del precio y conviértelo a un número
        const cedearPrice = parseFloat(cedear['04. current price'].replace('$', ''));
        const quantityNumber = parseInt(quantity);

        // Calcula el precio total de la compra
        const totalPurchasePrice = cedearPrice * quantityNumber;

        if (cedearIndex !== -1) {
            // Si el cedear ya está en la lista, actualiza su cantidad
            cedears[cedearIndex].quantity += quantityNumber;
        } else {
            // Si el cedear no está en la lista, añádelo
            cedears.push({ name: cedear['01. symbol'], quantity: quantityNumber, price: cedearPrice });

            console.log(cedears);
        }

        // Guarda la lista actualizada en el localStorage
        localStorage.setItem('cedears', JSON.stringify(cedears));

        const total = parseFloat(localStorage.getItem('total')) || 0;
        const saldo = parseFloat(localStorage.getItem('saldo')) || 200000; // Asume un saldo inicial de 200000
        const newTotal = total + totalPurchasePrice;
        const newSaldo = saldo - totalPurchasePrice;

        localStorage.setItem('total', newTotal.toString());
        localStorage.setItem('saldo', newSaldo.toString());

        onClose();
        setQuantity(1);
        window.location.reload();
    };


    if (!open) {
        return null;
    }
    const totalPurchasePrice = quantity * parseFloat(cedear['04. current price'].replace('$', '').replace(',', ''));
    const saldoCheck = parseFloat(localStorage.getItem('saldo')) || 200000;
    return (
        <div className="modal-comprar">
            <div className="modalComprar-content">
                <h2 style={{ color: '#005f37', fontSize: '2rem' }}>
                    Comprar: {cedear['01. symbol']}
                </h2>
                <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Precio por unidad: {cedear['04. current price']}
                </p>
                <p style={{ color: 'green', fontSize: "1.3rem" }}>
                    Total: ${quantity * cedear['04. current price'].replace('$', '').replace(',', '')}
                </p>
                <div className="input-group">
                    <button className='restar' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="number" min='1' value={quantity} onChange={e => setQuantity(e.target.value)} />
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