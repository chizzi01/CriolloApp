import React, { useState } from 'react';
import PracticeCard from './PracticeCard.jsx';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';

const PracticeList = ({ practices }) => {
    const [search, setSearch] = useState('');
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');

    const filteredPractices = practices.filter(practice => {
        const currentYear = new Date().getFullYear();
        const practiceYear = new Date(practice.date).getFullYear();
    
        return practice.title.toLowerCase().includes(search.toLowerCase())
            && (filter1 === '' || (filter1 === 'Recientes' && practiceYear === currentYear) || (filter1 === 'Antiguas' && practiceYear !== currentYear))
            && (filter2 === '' || (filter2 === 'Sin hacer' && practice.progress === 0) || (filter2 === 'En progreso' && practice.progress > 0 && practice.progress < 100) || (filter2 === 'Completado' && practice.progress === 100));
    });

    return (
        <div className='practicelist-container'>
            <div className='search-practica-align'>
            <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
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
              width: '60%',
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
                <select className='select-practica' value={filter1} onChange={e => setFilter1(e.target.value)}>
                    <option value="" hidden>Antiguedad...</option>
                    <option value="">Ninguna</option>
                    <option value="Recientes">Recientes</option>
                    <option value="Antiguas">Antiguas</option>
                </select>
                <select className='select-practica' value={filter2} onChange={e => setFilter2(e.target.value)}>
                    <option value="" hidden>Estatus...</option>
                    <option value="">Ninguna</option>
                    <option value="Sin hacer">Sin hacer</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                </select>
            </div>
            <div className="practice-list">
                {filteredPractices.length > 0 ? (
                    filteredPractices.map((practice, index) => (
                        <PracticeCard
                            key={index}
                            image={practice.image}
                            title={practice.title}
                            description={practice.description}
                            progress={practice.progress}
                        />
                    ))
                ) : (
                    <p>No se encontraron resultados para tu búsqueda.</p>
                )}
            </div>
        </div>

    );
};

export default PracticeList;