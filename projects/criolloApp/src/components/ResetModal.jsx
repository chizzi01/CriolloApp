import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const ResetModal = ({ onClose, onReset }) => {
    return (
        <Modal open={true} onClose={onClose} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                padding: '1em', backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '2em',
                alignItems: 'center',
                justifyContent: 'center'

            }}>
                <h2>Restablecer fondos</h2>
                <p>¿Estás seguro de que quieres restablecer tus fondos?</p>
                <div>
                <Button onClick={onReset} style={{ backgroundColor: "#A7E0AC", color: "#19911E", margin:10 }}> Restablecer</Button>
                    <Button onClick={onClose} style={{ backgroundColor: "grey", color: "#FFFF", margin:10 }}>Cancelar</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ResetModal;