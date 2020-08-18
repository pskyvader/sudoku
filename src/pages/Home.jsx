import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Sudoku from "../components/Sudoku";
import SudokuBox from "../components/SudokuBox";

const board1 = new Sudoku();
board1.RandomNumbers(30);



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
    const [Board, setBoard] = React.useState(board1);
    return (
        <Box className={classes.box}>
            <Grid container justify="center" className={classes.root} >
                {Board.matrix.map((row,valuex) => (
                    <Grid key={valuex} item xs={4} className={classes.grid}>
                        {row.map((column,valuey) => (
                            <Grid key={valuex + "," + valuey} item xs={12} className={classes.subgrid}>
                                <SudokuBox Board={Board} setBoard={setBoard} x={valuex} y={valuey}></SudokuBox>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}