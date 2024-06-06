// src/components/UserHeader.js
import React from 'react';
import '../App.css';
import avatar from '../assets/avatar.jpg';
import playIcon from '../assets/playIcon.png';
import trofeoIcon from '../assets/trofeoIcon.png';
import checkIcon from '../assets/checkIcon.png';
import peopleIcon from '../assets/peopleIcon.png';

const UserHeader = () => {
    return (
        <div className="user-header">
            <div className="user-info">
                <img src={avatar} alt="Usuario" className="user-avatar" />
                <div className="user-details">
                    <h2>Usuario</h2>
                    <p>Estudiante de Ingeniería en Informática</p>
                </div>
            </div>
            <div className="user-stats">
                <div className="stat" style={{ backgroundColor: "#FFEEE8" }}>
                    <div className='stat-icon'>
                        <img src={playIcon} alt="" />
                    </div>
                    <div className='stat-data'>
                        <span>146</span>
                        <p>Tutoriales</p>
                    </div>
                </div>
                <div className="stat" style={{ backgroundColor: "#EBEBFF" }}>
                    <div className='stat-icon'>
                        <img src={checkIcon} alt="" />
                    </div>
                    <div className='stat-data'>
                        <span>6</span>
                        <p>En Curso</p>
                    </div>
                </div>
                <div className="stat" style={{ backgroundColor: "#E1F7E3" }}>
                    <div className='stat-icon'>
                        <img src={trofeoIcon} alt="" />
                    </div>
                    <div className='stat-data'>
                        <span>24</span>
                        <p>Completadas</p>
                    </div>
                </div>
                <div className="stat" style={{ backgroundColor: "#FFF2E5" }}>
                    <div className='stat-icon'>
                        <img src={peopleIcon} alt="" />
                    </div>
                    <div className='stat-data'>
                        <span>{parseInt(Math.random(50,200) * 100)}</span>
                        <p>Personas en Línea</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;
