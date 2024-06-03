import React, { useState } from 'react';

export default function SellModal({ open, onClose, cedear }) {
    const [quantity, setQuantity] = useState(1);

        const handleSell = () => {
            let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
            let cedearIndex = portfolio.findIndex(c => c['01. symbol'] === cedear['01. symbol']);

            const quantityNumber = parseInt(quantity, 10);
            const totalSalePrice = cedear['04. current price'] * quantityNumber;

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

                localStorage.setItem('total', newTotal.toString());
                localStorage.setItem('saldo', newSaldo.toString());

                onClose();
                setQuantity(1);
                window.location.reload();
            } else {
                alert('No tienes suficientes CEDEARs para vender');
            }
        };

    if (!open) {
        return null;
    }

    const actualCedears = JSON.parse(localStorage.getItem('actualCedears')) || [];

    const getCurrentPrice = (symbol) => {
        const cedear = actualCedears.find(c => c['01. symbol'] === symbol);
        return cedear ? cedear['04. current price'] : 0;
      };


    const precioPorUnidad = getCurrentPrice(cedear.name);
    const totalSalePrice = parseFloat(quantity * parseFloat(precioPorUnidad)).toFixed(2);
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