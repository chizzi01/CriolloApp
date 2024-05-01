import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ value, valuewidthprog }) => ({
    height: 30,
    width: valuewidthprog,
    borderRadius: 5,
    boxShadow: '0 0 32.1 0 #6C8DFF',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "transparent",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        boxShadow: '0 0 32.1 0 #6C8DFF',
        background: `linear-gradient(90deg, #6C8DFF ${value}%, rgba(120, 150, 255, 0.00) 99.99%, rgba(108, 141, 255, 0.00) 100%)`,
    },
}));



export function CustomizedProgressBars({ title, valueMount, valueWidth }) {
    return (

        <Box sx={{ flexGrow: 1, margin: 0, padding:0}}>
            <div className='bar-align'>
                <div className='title-align'>
                <p>{title}</p>
                </div>
                <div className='progressBar'>
                    <BorderLinearProgress variant="determinate" value={valueMount} valuewidthprog={valueWidth} />
                </div>
                <div className='percent-align'>
                <p>{valueMount}%</p>
                </div>
            </div>
        </Box>

    );
}