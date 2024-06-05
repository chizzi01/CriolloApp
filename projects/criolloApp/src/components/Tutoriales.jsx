import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mateCohete from '../assets/mateConCohete.png';
import choose from '../assets/choose.png';
import '../App.css';

export default function Tutoriales() {
  const [page, setPage] = useState(1);

  const totalPages = 4;

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="cedear-container">
      <header className="cedear-header">
        <div className="header-left">
          <Link to="/inversiones">
            <button style={{ backgroundColor: "#E26C48" }}>INVERSIONES</button>
          </Link>
          <Link to="/cedears">
            <button style={{ backgroundColor: "#4caf50" }}>PRACTICA</button>
          </Link>
        </div>
        <div className="header-right">
          <button style={{ backgroundColor: "#625A45" }} onClick={() => setPage(totalPages)} >GLOSARIO CRIOLLO</button>
        </div>
      </header>
      <div className="progress-bar">
        <img src={mateCohete} className="mateCohete" style={{ left: `${(page / totalPages) * 100}%` }} />
        <div className="progress" style={{ width: `${(page / totalPages) * 100}%` }}></div>
      </div>
      <main className="cedear-main">
        {page === 1 && (
          <>
            <h1>¿Qué es un CEDEAR?</h1>
            <img className='logo animationCedear' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1200px-Tesla_logo.png"} alt="Tesla" style={{ position: 'absolute', top: '50%', left: '5%', width: '100px' ,animationDuration: `${Math.random() * 5 + 5}s` }} />
            <img className='logo animationCedear' src={"https://guiaimpresion.com/wp-content/uploads/2022/12/4-1.png"} alt="MercadoLibre" style={{ position: 'absolute', top: '30%', left: '20%', width: '80px',animationDuration: `${Math.random() * 5 + 5}s` }} />
            <img className='logo animationCedear' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"} alt="Google" style={{ position: 'absolute', top: '70%', left: '60%', width: '120px',animationDuration: `${Math.random() * 5 + 5}s` }} />
            <img className='logo animationCedear' src={"https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"} alt="Amazon" style={{ position: 'absolute', top: '70%', left: '80%', width: '90px',animationDuration: `${Math.random() * 5 + 5}s` }} />
            <img className='logo animationCedear' src={"https://cdn.icon-icons.com/icons2/2699/PNG/512/apple_logo_icon_169566.png"} alt="Apple" style={{ position: 'absolute', top: '70%', right: '80%', width: '110px' ,animationDuration: `${Math.random() * 5 + 5}s`}} />
            <img className='logo animationCedear' src={"https://i.pinimg.com/originals/ae/a6/f5/aea6f543a891c8bb4708ed55bdb4cef0.png"} alt="Netflix" style={{ position: 'absolute', top: '30%', right: '20%', width: '100px' ,animationDuration: `${Math.random() * 5 + 5}s`}} />
            <img className='logo animationCedear' src={"https://dwglogo.com/wp-content/uploads/2016/03/1500px_Coca_Cola_logo.png"} alt="CocaCola" style={{ position: 'absolute', top: '60%', right: '10%', width: '80px' ,animationDuration: `${Math.random() * 5 + 5}s`}} />
            <div className='listaCedears-card'>
              <p><strong>CEDEAR</strong> significa CErificados de DEpósito ARgentinos</p>
              <p>
                Este <strong>instrumento de inversión</strong> es un certificado que representa una cierta
                cantidad de <strong>acciones</strong> o valores que no se venden públicamente ni se cotizan
                en el mercado argentino.
              </p>
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <h1>¿Qué debo tener en cuenta al comprar?</h1>
            <div className='listaCedears-card'>
              <ul>
                <li>Cuando compras un CEDEAR, estás accediendo a acciones que se venden en mercados internacionales. Además, obtienes todos los derechos de esas acciones, como los <strong>dividendos</strong> y los cambios en su precio.</li>
                <li>Es posible generar rendimientos por los <strong>dividendos</strong>, es decir, pagos que una empresa hace a sus <strong>accionistas</strong> o por la <strong>variación de cotización</strong>, es decir, el precio actual al que se venden y compran los CEDEARs.</li>
              </ul>
            </div>
            <img className='tutorialPersonaje' src={choose} alt="" />
          </>
        )}
        {page === 3 && (
          <>
            <ul>
              <li>Este es un instrumento de renta variable, es decir, su precio puede subir y bajar mucho en el corto plazo. Es por esto, que son utilizados para inversiones a largo plazo, aproximadamente 5 años.</li>
              <li>En este tipo de instrumentos lo ideal es utilizar fondos que sabemos que no vamos a necesitar utilizar en el corto plazo.</li>
            </ul>
          </>
        )}
        {page === 4 && (
          <>
            <h1>Glosario Criollo</h1>
            <p><strong>CEDEAR</strong> significa CErificados de DEpósito ARgentinos</p>
            <p>
              Este <strong>instrumento de inversión</strong> es un certificado que representa una cierta
              cantidad de <strong>acciones</strong> o valores que no se venden públicamente ni se cotizan
              en el mercado argentino.
            </p>
          </>
        )}
      </main>
      {/* <aside className="cedear-aside">
        <div className="aside-content">
          <div className="aside-section">
            <p>SON CERTIFICADOS QUE REPRESENTAN ACCIONES QUE COTIZAN EN WALL STREET.</p>
          </div>
          <div className="aside-section">
            <p>ESTÁN PENSADOS PARA QUE SEAN TRANSACCIONADOS EN ARGENTINA.</p>
          </div>
          <div className="aside-section">
            <p>LA COMPRAVENTA NO ESTÁ ALCANZADA POR GANANCIAS.</p>
          </div>
          <div className="aside-section">
            <p>SE PUEDEN COMPRAR TÍTULOS DE APPLE, GOOGLE O NETFLIX, PERO TAMBIÉN DE MERCADO LIBRE, GLOBANT Y DESPEGAR.</p>
          </div>
          <div className="aside-section">
            <p>SE ADQUIEREN EN PESOS A TRAVÉS DE PLATAFORMAS ONLINE.</p>
          </div>
        </div>
      </aside> */}
      <footer className="cedear-footer">
        <button className='pageButtons' onClick={handlePrevious} disabled={page === 1}>Anterior</button>
        <div className="page-indicator">
          {Array.from({ length: totalPages }, (_, i) => (
            <span key={i} className={`page-number ${page === i + 1 ? 'active' : ''}`}>{i + 1}</span>
          ))}
        </div>
        <button className='pageButtons' onClick={handleNext} disabled={page === totalPages}>Siguiente</button>
      </footer>
    </div>
  );
};
