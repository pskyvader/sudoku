import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SudokuNumberBox from "./SudokuNumberBox";


const useStyles = makeStyles((theme) => ({
    subbox: {
        textAlign: "center",
        height:"100%"
    },
    
    grid: {
        borderLeft: theme.spacing(0.125) +"px solid " + theme.palette.info.light,
    },
    
    subgrid: {
        borderTop: theme.spacing(0.125) +"px solid " + theme.palette.info.light,
    }
}));



export default function SudokuBox({ board, x, y }) {
    const classes = useStyles();
    let box = board.matrix[x][y].submatrix;
    const key = x + "," + y;



    return <Grid container justify="center" className={classes.subbox}>
        {box.map((row, valuex) => {
            const keyx = key + "-" + valuex;
            return <Grid key={keyx} item xs={4} className={classes.grid}>
                {row.map((column, valuey) => {
                    const keyy = keyx + "," + valuey;
                    return <Grid key={keyy} item xs={12}  className={classes.subgrid}>
                        <SudokuNumberBox field={column}/>
                    </Grid>
                })}
            </Grid>
        })}
    </Grid>

}
