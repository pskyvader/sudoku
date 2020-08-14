import React from 'react';
import Box from '@material-ui/core/Box';

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

const SudokuNumber = ({ field }) => {

    const { number, options, i, j, x, y } = field;

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

    const fontsize=height * .75;

    return <Box height={height} width="100%" ref={canvas} fontSize={fontsize}>
        {finalnumber}
    </Box>
}

export default SudokuNumber;