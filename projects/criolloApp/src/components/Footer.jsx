import React from 'react';
import '../App.css'; // Asegúrate de crear este archivo para los estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Criollo</h3>
          <ul>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#why-us">Por qué elegirnos</a></li>
            <li><a href="#subscriptions">Suscripciones</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="#privacy-policy">Políticas de privacidad</a></li>
            <li><a href="#terms-conditions">Términos y Condiciones</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contáctanos</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Tutoriales</h3>
          <ul>
            <li><a href="#intro-finances">Introducción a las Finanzas</a></li>
            <li><a href="#basic-concepts">Conceptos Básicos</a></li>
            <li><a href="#savings">Ahorros</a></li>
            <li><a href="#investments">Inversiones</a></li>
            <li><a href="#financial-planning">Planificación Financiera</a></li>
          </ul>
        </div>
        <div className="footer-column newsletter">
          <h3>Suscríbete en nuestro boletín informativo.</h3>
          <form>
            <input type="email" placeholder="Ingrese su correo" />
            <button type="submit">Suscríbete</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright Criollo 2024</p>
        <div className="social-icons">
          <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#twitter"><i className="fab fa-twitter"></i></a>
          <a href="#instagram"><i className="fab fa-instagram"></i></a>
          <a href="#linkedin"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
