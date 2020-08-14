import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Sudoku from "../components/Sudoku";
import SudokuBox from "../components/SudokuBox";

const board=new Sudoku();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
        maxWidth: "calc(100vh - " + theme.mixins.toolbar.minHeight * 2 + "px)",
        margin: "0 auto",
    }
}));

export default function SpacingGrid() {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Grid container justify="center" className={classes.root} spacing={2}>
                {[0, 1, 2].map((valuex) => (
                    <Grid key={valuex} item xs={4}>
                        {[0, 1, 2].map((valuey) => (
                            <Grid key={valuex + "," + valuey} item xs={12}>
                                <SudokuBox board={board} x={valuex} y={valuey}></SudokuBox>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}