import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SudokuNumberBox from "./SudokuNumberBox";


const useStyles = makeStyles((theme) => {
    const light = theme.palette.type === "light";
    const mainbordercolor = light ? theme.palette.info.dark : theme.palette.primary.light;
    return {
        subbox: { textAlign: "center", height: "100%" },
        grid: { borderRight: theme.spacing(0.125) + " solid " + mainbordercolor },
        subgrid: { borderBottom: theme.spacing(0.125) + " solid " + mainbordercolor }
    }
});


const SudokuSubBox = ({ matrix, height}) => {
    const classes = useStyles();
    const box = matrix.submatrix;
    const key = matrix.x + "," + matrix.y;

    return <Grid container justify="center" className={classes.subbox}>
        {box.map((column, x) => {
            const keyx = key + "-" + x;
            return <Grid key={keyx} item xs={4} className={classes.grid}>
                {column.map((row, y) => {
                    const keyy = keyx + "," + y;
                    return <Grid key={keyy} item xs={12} className={classes.subgrid}>
                        <SudokuNumberBox field={row} height={height}/>
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