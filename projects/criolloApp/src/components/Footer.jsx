import * as React from 'react';

export function Footer({ tecnologias }) {
    return (
        <footer className='footer-container'>
            <div className='tecnologiesFooter-container'>
                {tecnologias.map((item, index) => (
                    <img key={index}
                        src={item}
                        alt={item}
                        className={item.includes('react') ? 'rotate' : ''}
                        style={{
                            width: '40px',
                            height: item.includes('sap') || item.includes('nodejs') ? '70px' : ''
                        }} />
                ))}

            </div>
            <div className='footer-text'>
                <h2><span style={{ color: '#6CEDFF' }}>Creada y diseñada por_ </span> Agustin Chizzini Melo</h2>
                <p>© 2023 - Todos los derechos reservados</p>
            </div>
        </footer>
    );
}