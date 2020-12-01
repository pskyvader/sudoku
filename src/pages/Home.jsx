import React, { lazy, Suspense, useContext } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';


import SudokuBox from "../components/SudokuBox";
import LocalStorage from "../logic/LocalStorage";
import Text from '../languages/Language';

import { BoardContext } from '../ContextProviders/BoardContext';
import { TimerContext } from '../ContextProviders/TimerContext';

const DifficultyButtons = lazy(() => import('../components/buttons/DifficultyButtons'));

const useStyles = makeStyles((theme) => {
    const light = theme.palette.mode === "light";
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
        hidebox:{
            opacity:0.01,
            display:"none"
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


const ModalMessage=()=>{
    const { Success, setSuccess } = useContext(BoardContext);
    const classes = useStyles();

    const handleClose = () => {
        setSuccess(false);
    };

    const renderLoader = () => Text("loading");
    const victory=Text("victory" + (Math.round(Math.random() * 9) + 1));
    const victorycomment=Text("victorycomment" + (Math.round(Math.random() * 9) + 1));
    const newgame=Text("newgame");

    const modal = (
        <Modal open={Success} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
            <Suspense fallback={renderLoader()}>
                <div className={classes.modal}>
                    <Typography id="modal-title" variant="h4" gutterBottom>
                        {victory}
                    </Typography>
                    <Typography id="modal-description" variant="h5" gutterBottom>
                        {newgame}
                    </Typography>
                    <DifficultyButtons />
                    <p> ... {victorycomment}</p>
                </div>
            </Suspense>
        </Modal>
    );
    return modal;
}

const Home = () => {
    const { board, Success } = useContext(BoardContext);
    const { IsTimerActive,IsFocused,ToggleTimer } = useContext(TimerContext);
    const classes = useStyles();
    const canvas = React.useRef(null);
    const [height, setHeight] = React.useState(LocalStorage.get("box_height", 100));



    React.useEffect(() => {
        if(IsTimerActive && Success){
            ToggleTimer();
        }
    });

    


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




    return (
        <Box className={clsx(classes.box , { [classes.hidebox]: !IsFocused || !IsTimerActive, })} ref={canvas}>
            <ModalMessage/>
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
        </Box>
    )
}

export default Home;