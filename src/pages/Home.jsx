import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Sudoku from "../components/Sudoku";
import SudokuBox from "../components/SudokuBox";

const board = new Sudoku();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1, 0),
        borderRight: theme.spacing(0.25) + "px solid " + theme.palette.info.dark,
        borderBottom: theme.spacing(0.25) + "px solid " + theme.palette.info.dark,
    },
    box: {
        maxWidth: "calc(100vh - " + theme.mixins.toolbar.minHeight * 2 + "px)",
        margin: theme.spacing(0, "auto"),
    },
    grid: {
        borderLeft: theme.spacing(0.25) + "px solid " + theme.palette.info.dark,
    },
    subgrid: {
        borderTop: theme.spacing(0.25) + "px solid " + theme.palette.info.dark,
    }
}));

export default function SpacingGrid() {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Grid container justify="center" className={classes.root} >
                {[0, 1, 2].map((valuex) => (
                    <Grid key={valuex} item xs={4} className={classes.grid}>
                        {[0, 1, 2].map((valuey) => (
                            <Grid key={valuex + "," + valuey} item xs={12} className={classes.subgrid}>
                                <SudokuBox board={board} x={valuex} y={valuey}></SudokuBox>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}