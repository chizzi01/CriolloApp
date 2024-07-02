import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import mateCohete from '../assets/mateConCohete.png';
import mateCelu from '../assets/mateConCelu.png';
import top1 from '../assets/2.png';
import top2 from '../assets/3.png';
import top3 from '../assets/4.png';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardComunidad from './CardComunidad';
import PregComunidad from './PregComunidad';
import { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Comunidad = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [isCardVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
	return (
		<div className="Comunidad">
			<style>
				@import
				url(`https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap);
			</style>
            <header className="App-header">
                <div className="App-header-content">
                    <div className="App-header-text">
                        <h1 className="App-header-title">¡Bienvenido a la Comunidad de Criollo!</h1>
                        <p className="App-header-description">
                            ¡Conéctate con otros inversores y comparte tus experiencias! En nuestra comunidad, podrás
                            encontrar información, consejos y mucho más.
                        </p>
                    </div>
                    <div className='conectar-container'>
                        <div className='conectar-btn'>
                            <p>Conectar</p>
                        </div>
                        <img src={mateCelu} alt="mate con celular" className="App-header-image" />
                    </div>
                </div>
            </header>
			<Footer />
		</div>
	);
};

export default Comunidad;