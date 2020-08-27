import React from 'react';
import Grid from '@material-ui/core/Grid';

const SudokuOptions=({options})=>{
    return <Grid container justify="center">
        {options.forEach((row) => {
            return row+"a";
        })}
    </Grid>
}

export default SudokuOptions;