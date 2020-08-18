import React from 'react';
import Box from '@material-ui/core/Box';
import SudokuNumber from './SudokuNumber';

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

const SudokuNumberBox = ({ field }) => {

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

    let fontsize = height * .75;
    if (fontsize > 50) {
        fontsize = 50;
    }

    return <Box height={height} width="100%" ref={canvas} fontSize={fontsize} display="flex" alignItems="center" justifyContent="center">
        <SudokuNumber field={field} />
    </Box>
}

export default SudokuNumberBox;