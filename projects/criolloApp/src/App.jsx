import './App.css'
import { DrawerAppBar } from './components/Navbar'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Footer } from './components/Footer'
import mateCohete from './assets/mateConCohete.png'
import mateCelu from './assets/mateConCelu.png'

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

    </div>

  )
}

