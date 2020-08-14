import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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



const useStyles = makeStyles((theme) => ({
    button: {
        height: "100%",
        width: "100%",
        fontSize: "1em",
        fontWeight: "normal",
        minWidth:0
    },
}));



const SudokuNumber = ({ field }) => {
    const classes = useStyles();

    const { number, options, i, j, x, y, locked } = field;

    const canvas = React.useRef(null);

    const [height, setHeight] = React.useState(10);
    const BoxHeight = () => {
        setHeight(canvas.current.clientWidth);
    }

    const debouncedHandleResize = debounce(BoxHeight, 200);
    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        window.addEventListener("load", BoxHeight);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    });


    const finalnumber = number !== 0 ? number : "";

    let fontsize = height * .75;
    if (fontsize > 50) {
        fontsize = 50;
    }

    return <Box height={height} width="100%" ref={canvas} fontSize={fontsize} display="flex" alignItems="center" justifyContent="center">
        {(
            (!locked) ?
                <Button className={classes.button}>{finalnumber}</Button> :
                <Button disabled className={classes.button}>{finalnumber}</Button>
        )}


    </Box>
}

export default SudokuNumber;