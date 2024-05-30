import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoginIcon from '@mui/icons-material/Login';

const AddFundsModal = ({ onClose, onAddFunds }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddFunds(parseFloat(amount));
        setAmount('');
    };

    return (
        <Modal open={true} onClose={onClose} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ padding: '1em', backgroundColor: 'white' }}>
                <h2 style={{padding:10, color:"#1e824c"}}>Ingresar dinero</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
                    <TextField
                        label="Cantidad"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                    />
                    <div>
                    <Button type="submit" style={{ backgroundColor: "#A7E0AC", color: "#19911E", margin:10 }}>
                        <LoginIcon style={{ paddingRight: 10 }} />
                        Ingresar dinero
                    </Button>
                    <Button onClick={onClose} style={{ backgroundColor: "grey", color: "#FFFF", margin:10 }}>Cancelar</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddFundsModal;