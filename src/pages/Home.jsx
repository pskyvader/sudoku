import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import SudokuResolver from "../logic/SudokuResolver";
import SudokuBox from "../components/SudokuBox";


var t0 = performance.now();
const board = new SudokuResolver(30);
var t1 = performance.now();
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")


const useStyles = makeStyles((theme) => {
    const mainborder = theme.spacing(0.25+0.125) + "px solid " + theme.palette.info.main;
    const border = theme.spacing(0.25) + "px solid " + theme.palette.info.main;
    return {
        box: {
            maxWidth: "calc(100vh - " + theme.mixins.toolbar.minHeight * 2 + "px)",
            margin: theme.spacing(1, "auto"),
        },
        root: {
            flexGrow: 1,
            borderLeft: mainborder,
            borderTop: mainborder,
        },
        grid: {
            borderRight: border,
        },
        subgrid: {
            borderBottom: border,
        }
    }
});

function debounce(fn, ms) {
    let timer;
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

const Home = (props) => {
    const canvas = React.useRef(null);
    const [height, setHeight] = React.useState(null);
    const BoxHeight = () => {
        setHeight(canvas.current.clientWidth / 3 - 3);// x / 3 (3 squares) -3 (3px borders ) 
    }

    const debouncedHandleResize = debounce(BoxHeight, 100);
    React.useEffect(BoxHeight, []);
    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    });

    const classes = useStyles();
    return (
        <Box className={classes.box} ref={canvas}>
            <Grid container justify="center" className={classes.root} >
                {board.matrix.map((row, x) => (
                    <Grid key={x} item xs={4} className={classes.grid}>
                        {row.map((column, y) => (
                            <Grid key={x + "," + y} item xs={12} className={classes.subgrid}>
                                <SudokuBox matrix={column} height={height}></SudokuBox>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}



export default Home;