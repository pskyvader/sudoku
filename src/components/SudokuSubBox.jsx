import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import SudokuNumber from "./SudokuNumber";


const useStyles = makeStyles((theme) => ({
    subbox: {
        padding: theme.spacing(0.5),
        textAlign: "center"
    }
}));



export default function SudokuBox({ board, x, y }) {
    const classes = useStyles();
    let box = board.matrix[x][y].submatrix;
    const key = x + "," + y;



    return <Box height="100%" className={classes.subbox}>
        <Grid container justify="center" spacing={0}>
            {box.map((row, valuex) => {
                const keyx = key + "-" + valuex;
                return <Grid key={keyx} item xs={4}>
                    {row.map((column, valuey) => {
                        const keyy = keyx + "," + valuey;
                        return <Grid key={keyy} item xs={12}>
                            <SudokuNumber>
                            {column.number}</SudokuNumber>
                        </Grid>
                    })}
                </Grid>
            })}
        </Grid>
    </Box>

}
