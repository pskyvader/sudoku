import React, { lazy, Suspense, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';


import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';


import SudokuBox from "../components/SudokuBox";
import LocalStorage from "../logic/LocalStorage";
import Text from '../languages/Language';

import { BoardContext } from '../ContextProviders/BoardContext';

const DifficultyButtons = lazy(() => import('../components/buttons/DifficultyButtons'));

const useStyles = makeStyles((theme) => {
    const light = theme.palette.type === "light";
    const mainbordercolor = light ? theme.palette.primary.main : theme.palette.primary.light;
    const mainborder = theme.spacing(0.25 + 0.125) + " solid " + mainbordercolor;
    const border = theme.spacing(0.25) + " solid " + mainbordercolor;
    return {
        box: {
            maxWidth: "calc(100vh - " + theme.mixins.toolbar.minHeight * 2 + "px)",
            margin: theme.spacing(1, "auto"),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        rootgrid: {
            flexGrow: 1,
            borderLeft: mainborder,
            borderTop: mainborder,
        },
        grid: {
            borderRight: border,
        },
        subgrid: {
            borderBottom: border,
        },
        modal: {
            top: "50%",
            left: "50%",
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(8),
            transform: `translate(-50%, -50%)`,
            outline: "none",
        },
    }
});

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}


const Home = () => {
    const { board, Success, setSuccess, Loading } = useContext(BoardContext);
    const classes = useStyles();
    const canvas = React.useRef(null);
    const [height, setHeight] = React.useState(LocalStorage.get("box_height", 100));

    const handleClose = () => {
        setSuccess(false);
    };

    const BoxHeight = () => {
        if (canvas.current.clientWidth > 0) {
            const finalheight = canvas.current.clientWidth / 3 - 3;// x / 3 (3 squares) -3 (3px borders ) 
            setHeight(finalheight);
            LocalStorage.set("box_height", finalheight);
        } else {
            setTimeout(BoxHeight, 100);
        }
    }
    const debouncedHandleResize = debounce(BoxHeight, 100);


    React.useLayoutEffect(debouncedHandleResize, [debouncedHandleResize]);

    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    });

    const renderLoader = () => Text("loading");
    const modal = (
        <Modal open={Success} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
            <Suspense fallback={renderLoader()}>
                <div className={classes.modal}>
                    <Typography id="modal-title" variant="h4" gutterBottom>
                        {Text("victory" + (Math.round(Math.random() * 9) + 1))}
                    </Typography>
                    <Typography id="modal-description" variant="h5" gutterBottom>
                        {Text("newgame")}
                    </Typography>
                    <DifficultyButtons />
                    <p> ... {Text("victorycomment" + (Math.round(Math.random() * 9) + 1))}</p>
                </div>
            </Suspense>
        </Modal>
    );
    return (
        <Box className={classes.box} ref={canvas}>
            {modal}
            {Loading ?
                <Fade in={Loading} style={{ transitionDelay: Loading ? '800ms' : '0ms', }} unmountOnExit >
                    <CircularProgress />
                </Fade>
                :
                <Grid container justify="center" className={classes.rootgrid}>
                    {board.matrix.map((column, x) => (
                        <Grid key={x} item xs={4} className={classes.grid}>
                            {column.map((row, y) => (
                                <Grid key={x + "," + y} item xs={12} className={classes.subgrid}>
                                    <SudokuBox matrix={row} height={height} />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            }
        </Box>
    )
}

export default Home;