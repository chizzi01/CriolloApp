import './App.css'
import { Avatar } from './components/Avatar'
import { CustomizedProgressBars } from './components/ProgressBar'
import { DrawerAppBar } from './components/Navbar'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Textfield } from './components/Textfield'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Footer } from './components/Footer'

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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100,200,300,400,500,600,700,800&display=swap');
      </style>
      <DrawerAppBar currentSection={seccionActual} />
      
          </div>

  )
}

