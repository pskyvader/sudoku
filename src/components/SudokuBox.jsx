import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import SudokuSubBox from "../components/SudokuSubBox";


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 0),
    }
}));


export default function SudokuBox({board, x, y }) {
    const classes = useStyles();
    const canvas = React.useRef(null);

    const [height, setHeight] = React.useState(10);
    const BoxHeight = () => {
        setTimeout(() => {
            setHeight(canvas.current.clientWidth);
        }, 100);
    }

    React.useEffect(() => {
        window.addEventListener("resize", BoxHeight);
        window.addEventListener("load", BoxHeight);
        return () => window.removeEventListener("resize", BoxHeight);
    });

    return <Paper className={classes.paper}>
        <Box height={height} bgcolor="grey.300" width="100%" ref={canvas} display="inline-block">
            <SudokuSubBox board={board} x={x} y={y}/>
        </Box>
    </Paper>;
}
