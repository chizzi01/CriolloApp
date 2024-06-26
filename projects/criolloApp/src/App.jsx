import "./App.css";
// import { DrawerAppBar } from './components/Navbar'
import { useState, useEffect } from "react";
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import mateCohete from "./assets/mateConCohete.png";
import mateCelu from "./assets/mateConCelu.png";
import top1 from "./assets/2.png";
import top2 from "./assets/3.png";
import top3 from "./assets/4.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CardComunidad from "./components/CardComunidad";
import PregComunidad from "./components/PregComunidad";
// import Tutoriales from './Tutoriales';

const theme = createTheme({
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"& fieldset": {
						borderColor: "white",
					},
					"&:hover fieldset": {
						borderColor: "white",
					},
					"&.Mui-focused fieldset": {
						borderColor: "white",
					},
				},
			},
		},
	},
});

export function App() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isCardVisible, setIsVisible] = useState(false);
	const cardRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			}
		);

		if (cardRef.current) {
			observer.observe(cardRef.current);
		}

		return () => {
			if (cardRef.current) {
				observer.unobserve(cardRef.current);
			}
		};
	}, []);

	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
		const newResults = [
			"Tutorial de Cedears",
			"Tutorial de Criptomonedas",
			"Tutorial de ETFs",
			"Tutorial de Fondos Comunes de Inversión",
			"Tutorial de Renta Fija",
			"Tutorial de Renta Variable",
			"Tutorial de Trading",
			"Practica de Cedears",
			"Practica de Criptomonedas",
			"Practica de ETFs",
			"Practica de Fondos Comunes de Inversión",
			"Practica de Renta Fija",
			"Practica de Renta Variable",
			"Practica de Trading",
		].filter((item) =>
			item.toLowerCase().includes(event.target.value.toLowerCase())
		);
		setResults(newResults);
	};

	return (
		<div className="App">
			<style>
				@import
				url(`https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap);
			</style>
			<section id="home-section">
				<img src={mateCohete} alt="" className="homeImgs" />
				<div className="homeSearch">
					<h1 className="title">CRIOLLO</h1>
					<h2 className="subtitle">
						Aprendé fácil, hacelo en Criollo
					</h2>
					<TextField
						value={search}
						onChange={handleSearchChange}
						placeholder="Busca tutoriales, practicas y más..."
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton sx={{ color: "#32795B" }}>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{
							width: "80%",
							marginTop: "2rem",
							color: "#32795B",
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "#32795B",
								},
								"&:hover fieldset": {
									borderColor: "#32795B",
								},
								"&.Mui-focused fieldset": {
									borderColor: "#32795B",
								},
							},
						}}
					/>

					{search && results.length > 0 && (
						<div className="dropdown">
							{results.map((result, index) => (
								<Link
									to={
										result.startsWith("Tutorial")
											? "/tutoriales"
											: "/cedears"
									}
									key={index}
								>
									<div className="item">{result}</div>
								</Link>
							))}
						</div>
					)}
				</div>
				<img src={mateCelu} alt="" className="homeImgs" />
			</section>
			<div style={{ position: "relative" }}>
				<section id="topCriollo">
					<Carousel
						autoPlay
						interval={2000}
						infiniteLoop
						showThumbs={false}
						showIndicators={false}
					>
						<div>
							<img src={top1} alt="Top 1" />
						</div>
						<div>
							<img src={top2} alt="Top 2" />
						</div>
						<div>
							<img src={top3} alt="Top 3" />
						</div>
					</Carousel>
					<div id="comunidad" ref={cardRef}>
						<CardComunidad isVisible={isCardVisible} />
					</div>
				</section>

				<div
					id="top3Array"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						overflow: "hidden",
						whiteSpace: "nowrap",
						width: "100%",
					}}
				>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontFamily: "Inter",
							fontSize: "30px",
							color: "white",
							padding: "10px",
						}}
					>
						{Array(7)
							.fill()
							.map((_, i) => (
								<div
									key={i}
									style={{
										marginRight: "100px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									TOP 3 MÁS BUSCADOS EN CRIOLLO
								</div>
							))}
					</div>
				</div>
			</div>

			<section id="preguntasComunidad-section">
				<PregComunidad />
			</section>

			<Footer />
		</div>
	);
}
