import React, { useState } from 'react';

export default function SellModal({ open, onClose, cedear }) {
    const [quantity, setQuantity] = useState(1);

    const handleSell = () => {
        let cedears = JSON.parse(localStorage.getItem('cedears')) || [];

        let cedearIndex = cedears.findIndex(c => c.name === cedear.name);

        const quantityNumber = parseInt(quantity);

        const totalSalePrice = cedear.price * quantityNumber;


        if (cedearIndex !== -1 && cedears[cedearIndex].quantity >= quantityNumber) {
            cedears[cedearIndex].quantity -= quantityNumber;

            if (cedears[cedearIndex].quantity === 0) {
                cedears.splice(cedearIndex, 1);
            }
        } else {
            alert('No tienes suficientes cedears para vender');
            return;
        }

        localStorage.setItem('cedears', JSON.stringify(cedears));

        const total = parseFloat(localStorage.getItem('total')) || 0;
        const saldo = parseFloat(localStorage.getItem('saldo')) || 200000;
        const newTotal = total - totalSalePrice;
        const newSaldo = saldo + totalSalePrice;

        localStorage.setItem('total', newTotal.toString());
        localStorage.setItem('saldo', newSaldo.toString());

        onClose();
        setQuantity(1);
        window.location.reload();
    };
    if (!open) {
        return null;
    }
    const precioPorUnidad =(cedear.price * (1 + cedear.performance / 100)).toFixed(2)

    let totalSalePrice = 0;
    if (cedear && cedear.price) {
        totalSalePrice = (quantity * parseFloat(precioPorUnidad)).toFixed(2);
    }

    const saldoCheck = parseFloat(localStorage.getItem('saldo')) || 200000;

    return (
        <div className="modal-comprar">
            <div className="modalComprar-content">
                <h2 style={{ color: '#005f37', fontSize: '2rem' }}>
                    Vender: {cedear.name}
                </h2>
                <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Precio por unidad: {precioPorUnidad}
                </p>
                <p style={{ color: 'green', fontSize: "1.3rem" }}>
                    Total: ${totalSalePrice}
                </p>
                <div className="input-group">
                    <button className='restar' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="number" min='1' value={quantity} onChange={e => setQuantity(e.target.value)} />
                    <button className='sumar' onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div className='buttons-comprar'>
                    <button onClick={onClose}>Cancelar</button>
                    <button
                        onClick={handleSell}
                        style={{ backgroundColor: totalSalePrice > saldoCheck ? "#999999" : "#90ee90", color: "rgb(0, 90, 12)" }}
                        disabled={totalSalePrice > saldoCheck}
                    >
                        Vender
                    </button>
                </div>
            </div>
        </div>
    );
}