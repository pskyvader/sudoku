import React from 'react';
import Grid from '@material-ui/core/Grid';

const SudokuOptions=({options})=>{
    const a= <Grid container justify="center">
        {options.forEach((row) => {
            console.log(row);
            return <Grid key={row} item xs={4}>
                {row}
            </Grid>
        })}
    </Grid>
    console.log(a);
    return a;
}

export default SudokuOptions;