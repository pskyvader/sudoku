import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import SudokuResolver from "../logic/SudokuResolver";
import SudokuBox from "../components/SudokuBox";
import LocalStorage from "../logic/LocalStorage";





const cacheboard = LocalStorage.get("sudoku_board", null);


const useStyles = makeStyles((theme) => {
    const mainborder = theme.spacing(0.25 + 0.125) + "px solid " + theme.palette.info.main;
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


const Home = ({Number}) => {
    console.log(Number);
    let baseboard = new SudokuResolver(Number, cacheboard);
    const [board, setBoard] = React.useState(baseboard);


    const canvas = React.useRef(null);
    const [height, setHeight] = React.useState(LocalStorage.get("box_height", 100));
    const BoxHeight = () => {
        setHeight(canvas.current.clientWidth / 3 - 3);// x / 3 (3 squares) -3 (3px borders ) 
    }
    const Save = () => {
        LocalStorage.set("box_height", height);
        LocalStorage.set("sudoku_board", board.CloneBoard());
    }

    const debouncedHandleResize = debounce(BoxHeight, 100);
    React.useEffect(BoxHeight, []);
    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    });
    React.useEffect(() => {
        window.addEventListener("beforeunload", Save);
        return () => window.removeEventListener("beforeunload", Save);
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