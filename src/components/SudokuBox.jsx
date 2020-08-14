import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import SudokuSubBox from "../components/SudokuSubBox";


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1, 0),
    }
}));


function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}


export default function SudokuBox({ board, x, y }) {
    const classes = useStyles();
    const canvas = React.useRef(null);

    const [height, setHeight] = React.useState(10);
    const BoxHeight = () => {
        setHeight(canvas.current.clientWidth);
    }

    const debouncedHandleResize = debounce(BoxHeight, 10);
    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        window.addEventListener("load", BoxHeight);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    });

    return <Paper className={classes.paper}>
        <Box height={height} bgcolor="grey.300" width="100%" ref={canvas} display="inline-block">
            <SudokuSubBox board={board} x={x} y={y} />
        </Box>
    </Paper>;
}
