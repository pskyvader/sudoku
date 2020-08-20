import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Sudoku from "../components/Sudoku";
import SudokuBox from "../components/SudokuBox";



const board = new Sudoku();
board.RandomNumbers(30);



const useStyles = makeStyles((theme) => {
    const border = theme.spacing(0.25) + "px solid " + theme.palette.info.dark;
    return {
        box: {
            maxWidth: "calc(100vh - " + theme.mixins.toolbar.minHeight * 2 + "px)",
            margin: theme.spacing(1, "auto"),
        },
        root: {
            flexGrow: 1,
            borderRight: border,
            borderTop: border,
        },
        grid: {
            borderLeft: border,
        },
        subgrid: {
            borderBottom: border,
        }
    }
});

export default function SpacingGrid() {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Grid container justify="center" className={classes.root} >
                {board.matrix.map((row, x) => (
                    <Grid key={x} item xs={4} className={classes.grid}>
                        {row.map((column, y) => (
                            <Grid key={x + "," + y} item xs={12} className={classes.subgrid}>
                                <SudokuBox matrix={column}></SudokuBox>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}