import React from 'react';
import '../App.css'; // Asegúrate de crear este archivo para los estilos

const PregComunidad = () => {
  const questions = [
    {
      question: "¿La normativa para la compra del bono AL30 sigue siendo comprar a C1 y vender a 48hs?",
      user: "Nicolas Gonzalez",
      avatarUrl: "https://www.appstate.edu/academics/profiles/_images/nathan-smith-400x400.jpg",
    },
    {
      question: "¿Qué broker están utilizando?",
      user: "Marcos Martinez",
      avatarUrl: "https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg",
    },
    {
      question: "¿Qué opinan de invertir en empresas de Inteligencia Artificial? ¿Es el auge del siglo 21?",
      user: "Eugeia Fernandez",
      avatarUrl: "https://www.morganstanley.com/content/dam/msdotcom/people/tiles/wided-sghaier.jpg.img.490.medium.jpg/1594912196352.jpg",
    },
  ];

  return (
    <div className="community-questions">
      <h2>Algunas preguntas de nuestra comunidad</h2>
      <div className="questions-container">
        {questions.map((item, index) => (
          <div key={index} className="question-card">
            <p className="question">{item.question}</p>
            <div className="user-info">
              <img src={item.avatarUrl} alt={item.user} className="avatarQuestion" />
              <p className="user-name">{item.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PregComunidad;
