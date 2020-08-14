import React from 'react';
import Box from '@material-ui/core/Box';

import SudokuSubBox from "../components/SudokuSubBox";


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
    const canvas = React.useRef(null);

    const [height, setHeight] = React.useState(10);
    const BoxHeight = () => {
        setHeight(canvas.current.clientWidth);
    }

    const debouncedHandleResize = debounce(BoxHeight, 100);
    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        window.addEventListener("load", BoxHeight);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    });

    return  <Box height={height} width="100%" ref={canvas}>
            <SudokuSubBox board={board} x={x} y={y} />
        </Box>;
}
