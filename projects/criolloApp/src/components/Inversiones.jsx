import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../App.css';
import bonos from '../assets/bonos.png'
import cedears from '../assets/cedears.png'
import cripto from '../assets/crypto.png'
import letras from '../assets/letras.png'
import plazoFijo from '../assets/plazos.png'
import flecha from '../assets/flecha.png'
import mateCohete from '../assets/mateConCohete.png'

export default function InversionesComponent() {
    const [moving, setMoving] = React.useState(false);
    const [isCentered, setIsCentered] = React.useState(false);
    const imagenes = [
        { src: bonos, color: '#FFC76F', titulo: 'Bonos', texto: 'Explora el mundo de los bonos: aprende sobre estos activos financieros y cómo pueden contribuir a tu estrategia de inversión.' },
        { src: cedears, color: '#E26C48', titulo: 'Cedears', texto: 'Conoce cómo estos valores representativos de acciones extranjeras pueden ser una alternativa interesante para diversificar tu portafolio de inversión.' },
        { src: cripto, color: '#F03F59', titulo: 'Cripto', texto: 'Explora el universo de las criptomonedas: comprende su funcionamiento y cómo pueden ofrecer nuevas oportunidades de inversión en el panorama financiero actual.' },
        { src: letras, color: '#44A8D2', titulo: 'Letras', texto: 'Conoce cómo estos instrumentos de deuda representan una forma segura y rentable de inversión, ofreciendo intereses fijos en un período determinado.' },
        { src: plazoFijo, color: '#76EC4D', titulo: 'Plazo Fijo', texto: 'Sumérgete en el mundo de los plazos fijos: conoce cómo estos productos financieros pueden ofrecer seguridad y crecimiento constante para tus ahorros.' },
    ];

    const [indiceActual, setIndiceActual] = React.useState(0);

    const handlePrevClick = () => {
        setIndiceActual((prevIndice) => (prevIndice - 1 + imagenes.length) % imagenes.length);
        setIsCentered(true);
    };

    const handleNextClick = () => {
        setIndiceActual((prevIndice) => (prevIndice + 1) % imagenes.length);
        setIsCentered(true);
    };

    if (isCentered) {

    }

    return (
        <div className="inversiones-container">
            <div className="image-circle" style={{ backgroundColor: imagenes[indiceActual].color }}>
                <div className="imagenes-circle" style={{ position: 'relative', zIndex: 1 }}>
                    {imagenes.map((imagen, indice) => (
                        <div key={indice} className={`circle-image ${indice !== indiceActual ? 'not-selected' : ''}`}>
                            <img
                                src={imagen.src}
                                alt={imagen.titulo}
                                className={`circle-image ${indice !== indiceActual ? 'not-selected' : ''}`}
                                onClick={() => setIndiceActual(indice)}
                                style={{
                                    transform: indice === indiceActual ? 'scale(1)' : 'scale(0.8)'
                                }}
                            />
                            <div className="circle-text">{imagen.titulo}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='imagenCentral'>
                <img src={imagenes[indiceActual].src} alt='imagen central' />
            </div>
            <div className='textoInversiones-container'>
                <h1 style={{ color: imagenes[indiceActual].color }}>INVERSIONES</h1>
                <h2>{imagenes[indiceActual].titulo}</h2>
                <p>{imagenes[indiceActual].texto}</p>
                <Link to="/tutoriales">
                <button className='AprenderBtn' style={{ backgroundColor: imagenes[indiceActual].color }}>Aprender</button>
                </Link>
            </div>

            <div className='seccionesContainer'>
                <div className='secciones'>
                    <button className='seccion' style={{ backgroundColor: indiceActual === 0 ? '#ffffff' : imagenes[0].color, color: indiceActual === 0 ? imagenes[0].color : '#ffffff' }} onClick={() => setIndiceActual(0)}>Bonos</button>
                    <button className='seccion' style={{ backgroundColor: indiceActual === 1 ? '#ffffff' : imagenes[1].color, color: indiceActual === 1 ? imagenes[1].color : '#ffffff' }} onClick={() => setIndiceActual(1)}>Cedears</button>
                    <button className='seccion' style={{ backgroundColor: indiceActual === 2 ? '#ffffff' : imagenes[2].color, color: indiceActual === 2 ? imagenes[2].color : '#ffffff' }} onClick={() => setIndiceActual(2)}>Cripto</button>
                    <button className='seccion' style={{ backgroundColor: indiceActual === 3 ? '#ffffff' : imagenes[3].color, color: indiceActual === 3 ? imagenes[3].color : '#ffffff' }} onClick={() => setIndiceActual(3)}>Letras</button>
                    <button className='seccion' style={{ backgroundColor: indiceActual === 4 ? '#ffffff' : imagenes[4].color, color: indiceActual === 4 ? imagenes[4].color : '#ffffff' }} onClick={() => setIndiceActual(4)}>Plazo Fijo</button>
                </div>
            </div>

            <div className='flechas-container'>
                <div className='flechas-align'>
                    <button className='flecha' onClick={handlePrevClick} style={{ backgroundColor: imagenes[indiceActual].color }}><img src={flecha} alt="" /></button>
                    <button className='flecha der' onClick={handleNextClick} style={{ backgroundColor: imagenes[indiceActual].color }}><img src={flecha} alt="" /></button>
                </div>
            </div>

            <div className='eslogan-container'>
                <h2 style={{ color: imagenes[indiceActual].color }}>Invertí fácil, hacelo en CRIOLLO</h2>
            </div>

            <img className='imagenInversiones' src={mateCohete} alt="" />

        </div>
    );
};
