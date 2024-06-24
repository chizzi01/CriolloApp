import { useState } from "react";
import { Link } from "react-router-dom";
import mateCohete from "../assets/mateConCohete.png";
import choose from "../assets/choose.png";
import "../App.css";

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
						<button style={{ backgroundColor: "#E26C48" }}>
							IR A TUTORIALES
						</button>
					</Link>
					<Link to="/cedears">
						<button style={{ backgroundColor: "#4caf50" }}>
							IR A PRACTICA DE CEDEAR
						</button>
					</Link>
				</div>
				<div className="header-right">
					<button
						style={{ backgroundColor: "#625A45" }}
						onClick={() => setPage(totalPages)}
					>
						GLOSARIO CRIOLLO
					</button>
				</div>
			</header>
			<div className="progress-bar">
				<img
					src={mateCohete}
					className="mateCohete"
					style={{ left: `${(page / totalPages) * 100}%` }}
				/>
				<div
					className="progress"
					style={{ width: `${(page / totalPages) * 100}%` }}
				></div>
			</div>
			<main className="cedear-main">
				{page === 1 && (
					<>
						<div className="tutorial-container">
							<h1>¿Qué es un CEDEAR?</h1>
							<div className="listaCedears-card">
								<p>
									<strong>CEDEAR</strong> significa{" "}
									<strong>CE</strong>rificados de{" "}
									<strong>DE</strong>pósito{" "}
									<strong>AR</strong>gentinos
								</p>
								<p>
									Son certificados que representan una cierta
									cantidad de acciones o valores que no se
									venden públicamente ni se cotizan en el
									mercado argentino.
								</p>
								<p>
									Cuando compras un CEDEAR, estás accediendo a
									acciones que se venden en mercados
									internacionales. Además, obtienes todos los
									derechos de esas acciones, como los
									dividendos y los cambios en su precio.
								</p>
								<p>
									A través de su compra es posible acceder a
									títulos de empresas internacionales en
									crecimiento como Google, Netflix, Apple o
									también empresas nacionales que cotizan en
									Wall Street como Mercado Libre, Globant o
									Despegar. Estos certificados se adquieren en
									pesos o dólares a través de plataformas como
									brokers o tu banco.
								</p>
							</div>
						</div>
					</>
				)}
				{page === 2 && (
					<>
						<div className="tutorial-container">
							<h1>¿Qué debo tener en cuenta al comprar?</h1>
							<div className="listaCedears-card">
								<ul>
									<p>
										Este es un instrumento de renta
										variable, es decir, su precio puede
										subir y bajar mucho en el corto plazo.
										Es por esto que:
									</p>
									<li className="cedears-items">
										Son utilizados para inversiones a largo
										plazo, aproximadamente 5 años.
									</li>
									<li className="cedears-items">
										En este tipo de instrumentos lo ideal es
										utilizar fondos que sabemos que no vamos
										a necesitar utilizar en el corto plazo
									</li>

									<li className="cedears-items">
										Podemos disponer de ellos con PESOS o
										DOLARES
									</li>
									<li className="cedears-items">
										Es una buena opcion para poder generar
										rendimientos con dinero que no vamos a
										utilizar en el corto plazo y no queremos
										dejar ‘parado’
									</li>
								</ul>
							</div>
							<img
								className="tutorialPersonaje"
								src={choose}
								alt=""
							/>
						</div>
					</>
				)}
				{page === 3 && (
					<>
						<div className="tutorial-container">
							<h1>¿Como genero rendimientos con un CEDEAR?</h1>
							<div className="listaCedears-card">
								<p>
									Es posible generar rendimientos de dos
									formas{" "}
								</p>

								<p>
									{" "}
									Por <strong>dividendos</strong>: pagos que
									una empresa hace a sus accionistas. Estos
									pagos dependen del tipo de cedear comprado.
								</p>
								<p>
									Por la{" "}
									<strong>variación de cotización</strong>: el
									precio actual al que se venden y compran los
									CEDEARs. Si compro a un precio puedo
									controlar su cotización y venderlo a un
									precio mayor.
								</p>
							</div>
						</div>
					</>
				)}
				{page === 4 && (
					<>
						<div className="tutorial-container">
							<h1>Glosario Criollo</h1>
							<div className="glosario-criollo-container">
								<div className="div1 glosario-text">
									<h2>Acciones</h2>
									<p>
										Las acciones son como pedacitos de una
										empresa que podés comprar. Imaginate que
										cada acción es como una rebanada de
										pizza y la empresa es la pizza entera.
										Cuando comprás una acción, te estás
										quedando con un trocito de esa pizza y,
										si la pizza se vende bien, tu trozo
										puede valer más con el tiempo.
									</p>
								</div>
								<div className="div2 glosario-text">
									<h2>Accionistas</h2>
									<p>
										Los accionistas son como socios de una
										empresa. Si tenés acciones de una
										empresa, sos dueño de una parte de esa
										empresa y podés tener derecho a recibir
										dividendos y a votar en decisiones
										importantes. Es como si fueras parte de
										un club exclusivo donde tus opiniones
										importan.
									</p>
								</div>
								<div className="div3 glosario-text">
									<h2>Brokers</h2>
									<p>
										Son como tus socios financieros que te
										ayudan a comprar y vender acciones y
										bonos en el mercado. Son guías que te
										ayudan a navegar por el mundo de las
										inversiones y a tomar las mejores
										decisiones para tu plata. Es como tener
										un amigo experto que te asesora en cómo
										invertir tu dinero de la mejor manera.s
									</p>
								</div>
								<div className="div4 glosario-text">
									<h2>Dividendos</h2>
									<p>
										Los dividendos son como las propinas que
										recibís por ser parte de un equipo de
										trabajo exitoso. Cuando una empresa gana
										plata, a veces decide compartir una
										parte de esas ganancias con sus
										accionistas en forma de dividendos. Es
										como si te dieran un premio extra por
										ser parte de la empresa y ayudarla a
										crecer.
									</p>
								</div>
								<div className="div5 glosario-text">
									<h2>Instrumento de inversión</h2>
									<p>
										Son las herramientas que usás para hacer
										crecer tu dinero. Son como las semillas
										que plantás en un huerto, donde cada una
										representa una forma diferente de
										invertir, como acciones, bonos o fondos
										mutuos. La idea es plantar tus pesos en
										estos instrumentos para que puedan
										crecer y darte más plata con el tiempo,
										como si fuera una plantita que da
										frutos.
									</p>
								</div>
								<div className="div6 glosario-text">
									<h2>Variación de cotización</h2>
									<p>
										Es como el sube y baja del precio de un
										producto en un mercado. Si vas al
										supermercado, podés ver que el precio de
										la fruta puede cambiar todos los días
										dependiendo de la oferta y la demanda.
										Lo mismo pasa en el mercado de acciones
										y bonos, donde los precios pueden subir
										y bajar según lo que pase en la economía
										y en las empresas.
									</p>
								</div>
								<div className="div7 glosario-text">
									<h2>Wall Street</h2>
									<p>
										Es como la avenida principal donde se
										toman muchas decisiones importantes
										sobre empresas y dinero. Si imaginás el
										mercado financiero como una ciudad, Wall
										Street sería como el barrio más
										importante donde ocurren la mayoría de
										las cosas.
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</main>

			<footer className="cedear-footer">
				<button
					className="pageButtons"
					onClick={handlePrevious}
					disabled={page === 1}
				>
					Anterior
				</button>
				<div className="page-indicator">
					{Array.from({ length: totalPages }, (_, i) => (
						<span
							key={i}
							className={`page-number ${
								page === i + 1 ? "active" : ""
							}`}
						>
							{i + 1}
						</span>
					))}
				</div>
				<button
					className="pageButtons"
					onClick={handleNext}
					disabled={page === totalPages}
				>
					Siguiente
				</button>
			</footer>
		</div>
	);
}
