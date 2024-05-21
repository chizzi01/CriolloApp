import './App.css'
import { DrawerAppBar } from './components/Navbar'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import  Footer  from './components/Footer'
import mateCohete from './assets/mateConCohete.png'
import mateCelu from './assets/mateConCelu.png'
import top1 from './assets/2.png'
import top2 from './assets/3.png'
import top3 from './assets/4.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CardComunidad from './components/CardComunidad';
import PregComunidad from './components/PregComunidad';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      },
    },
  },
});






export function App() {

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='App'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
      </style>
      <DrawerAppBar />
      <section id='home-section'>
        <img src={mateCohete} alt="" className='homeImgs' />
        <div className='homeSearch'>
          <h1 className='title'>CRIOLLO</h1>
          <h2 className='subtitle'>Aprendé fácil, hacelo en Criollo</h2>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton sx={{ color: '#32795B' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: '80%',
              marginTop: '2rem',
              color: '#32795B',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#32795B',
                },
                '&:hover fieldset': {
                  borderColor: '#32795B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#32795B',
                },
              },
            }}
          />
        </div>
        <img src={mateCelu} alt="" className='homeImgs' />
      </section>
      <div id='top3Array' style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
        <div style={{
          display: 'inline-block',
          animation: 'marquee 10s linear infinite',
          width: '100%',
        }}>
          <div style={{ marginRight: '100px', display: 'inline' }}>
            <span role="img" aria-label="attention">⚠️</span> TOP 3 MÁS BUSCADOS EN CRIOLLO
          </div>
          <div style={{ marginRight: '100px', display: 'inline' }}>
            <span role="img" aria-label="attention">⚠️</span> TOP 3 MÁS BUSCADOS EN CRIOLLO
          </div>
          <div style={{ marginRight: '100px', display: 'inline' }}>
            <span role="img" aria-label="attention">⚠️</span> TOP 3 MÁS BUSCADOS EN CRIOLLO
          </div>
          <div style={{ marginRight: '100px', display: 'inline' }}>
            <span role="img" aria-label="attention">⚠️</span> TOP 3 MÁS BUSCADOS EN CRIOLLO
          </div>
          <div style={{ marginRight: '100px', display: 'inline' }}>
            <span role="img" aria-label="attention">⚠️</span> TOP 3 MÁS BUSCADOS EN CRIOLLO
          </div>
          <div style={{ marginRight: '100px', display: 'inline' }}>
            <span role="img" aria-label="attention">⚠️</span> TOP 3 MÁS BUSCADOS EN CRIOLLO
          </div>
          <div style={{ marginRight: '100px', display: 'inline' }}>
            <span role="img" aria-label="attention">⚠️</span> TOP 3 MÁS BUSCADOS EN CRIOLLO
          </div>
        </div>
      </div>

      <section id='topCriollo'>
        <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false} showIndicators={false}>
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
        <div id='comunidad'>
          <CardComunidad />
        </div>
      </section>

      <section id='preguntasComunidad-section'>
        <PregComunidad />
      </section>

      <Footer />

    </div>

  )
}

