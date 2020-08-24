import React from 'react';
import Box from '@material-ui/core/Box';
import SudokuNumber from './SudokuNumber';


const SudokuNumberBox = (props) => {
    const {height}=props;
    let fontsize = height * .75;
    if (fontsize > 50) {
        fontsize = 50;
    }

    return <Box height={height} width="100%"  fontSize={fontsize} display="flex" alignItems="center" justifyContent="center">
        <SudokuNumber {...props} />
    </Box>
}

export default SudokuNumberBox;