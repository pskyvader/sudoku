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


export default function SudokuBox(props) {
    const canvas = React.useRef(null);

    const [height, setHeight] = React.useState(null);
    const BoxHeight = () => {
        console.log("asdf",canvas.current.clientWidth);
        setHeight(canvas.current.clientWidth);
    }

    const debouncedHandleResize = debounce(BoxHeight, 100);
    BoxHeight();
    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        }
    });

    return  <Box height={height} width="100%" ref={canvas}>
            <SudokuSubBox {...props} />
        </Box>;
}
