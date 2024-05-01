import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export function Textfield({indicador, tipo, name, forceUpdate}) {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
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
    
    useEffect(() => {
      // Reset state values here
      setValue('');
      setError(false);
    }, [forceUpdate]);
    

    const handleChange = (event) => {
        setValue(event.target.value);
        validate(event.target.value);
      };
    
      const validate = (value) => {
        if (tipo === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            setError(true);
          } else {
            setError(false);
          }
        }
        // Agrega aquí más validaciones para otros tipos de campos si es necesario
      };
  
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
          type={tipo}
          required
          value={value}
          name={name}
          onChange={handleChange}
          error={error}
          InputProps={{
            style: {
              color: error ? '#FF4141' : 'white',
              width: '300px',
              height: tipo === 'textfield' ? '100px' : 'auto',
            },
          }}
          InputLabelProps={{
            style: {
              color: error ? '#FF4141' : 'white',
            },
          }}
          helperText={error ? 'Invalid input' : ' '}
          id="demo-helper-text-aligned-no-helper"
          label={indicador}
        />
      </Box>
    </ThemeProvider>
    );
  }