import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SudokuNumberBox from "./SudokuNumberBox";


const useStyles = makeStyles((theme) => ({
    subbox: { textAlign: "center", height: "100%" },
    grid: { borderRight: theme.spacing(0.125) + "px solid " + theme.palette.info.main, },
    subgrid: { borderBottom: theme.spacing(0.125) + "px solid " + theme.palette.info.main, }
}));


const SudokuSubBox = ({ matrix, height, Checked, setChecked }) => {
    const classes = useStyles();
    const box = matrix.submatrix;
    const key = matrix.x + "," + matrix.y;

    return <Grid container justify="center" className={classes.subbox}>
        {box.map((row, x) => {
            const keyx = key + "-" + x;
            return <Grid key={keyx} item xs={4} className={classes.grid}>
                {row.map((column, y) => {
                    const keyy = keyx + "," + y;
                    return <Grid key={keyy} item xs={12} className={classes.subgrid}>
                        <SudokuNumberBox field={column} height={height} Checked={Checked} setChecked={setChecked} />
                    </Grid>
                })}
            </Grid>
        })}
    </Grid>
}

const SudokuBox = (props) => {
    const { height } = props;
    const subheight = height / 3 - 1; // x / 3 (3 squares) -1 (1px borders ) 
    return <Box height={height} width="100%">
        <SudokuSubBox {...props} height={subheight} />
    </Box>;
}

export default SudokuBox;