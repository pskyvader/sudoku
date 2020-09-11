import React, { lazy, Suspense } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


import SudokuBox from "../components/SudokuBox";
import LocalStorage from "../logic/LocalStorage";


// import Modal from '@material-ui/core/Modal';
// import Typography from '@material-ui/core/Typography';
// import { DifficultyButtons } from "../components/Buttons";

const Modal = lazy(() => import('@material-ui/core/Modal'));
const Typography = lazy(() => import('@material-ui/core/Typography'));
const DifficultyButtons = lazy(() => import('../components/buttons/DifficultyButtons'));


const useStyles = makeStyles((theme) => {
    const light = theme.palette.type === "light";
    const mainbordercolor = light ? theme.palette.info.dark : theme.palette.primary.light;
    const mainborder = theme.spacing(0.25 + 0.125) + "px solid " + mainbordercolor;
    const border = theme.spacing(0.25) + "px solid " + mainbordercolor;
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
        },
        paper: {
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
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}


const Home = (props) => {
    const { board } = props;
    const classes = useStyles();
    const canvas = React.useRef(null);
    const [height, setHeight] = React.useState(LocalStorage.get("box_height", 100));
    const [OptionsActive, setOptionsActive] = React.useState(LocalStorage.get("options_active", false));

    const [Success, setSuccess] = React.useState(board.success);
    board.setSuccess = setSuccess;
    board.success = Success;


    const handleClose = () => {
        setSuccess(false);
    };

    const BoxHeight = () => {
        if(canvas.current.clientWidth>0){
            setHeight(canvas.current.clientWidth / 3 - 3);// x / 3 (3 squares) -3 (3px borders ) 
        }else{
            setTimeout(() => BoxHeight, 100);
        }
    }
    const Save = () => {
        LocalStorage.set("box_height", height);
        LocalStorage.set("sudoku_board", board.CloneBoard());
        LocalStorage.set("options_active", OptionsActive);
    }

    const debouncedHandleResize = debounce(BoxHeight, 100);
    React.useLayoutEffect(debouncedHandleResize, []);
    React.useEffect(() => {
        window.addEventListener("resize", debouncedHandleResize);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    });
    React.useEffect(() => {
        window.addEventListener("beforeunload", Save);
        return () => window.removeEventListener("beforeunload", Save);
    });


    const renderLoader = () => "loading...";
    const modal = (
        <Modal
            open={Success}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Suspense fallback={renderLoader()}>
                <div className={classes.paper}>
                    <Typography id="modal-title" variant="h4" gutterBottom> Ganaste por la CTM! </Typography>
                    <Typography id="modal-description" variant="h5" gutterBottom> Nueva partida? </Typography>
                    <DifficultyButtons {...props} />
                    <p>pd:uwu</p>
                </div>
            </Suspense>
        </Modal>
    );




    return (
        <Box className={classes.box} ref={canvas}>
            {modal}
            <Grid container justify="center" className={classes.root} >
                {board.matrix.map((row, x) => (
                    <Grid key={x} item xs={4} className={classes.grid}>
                        {row.map((column, y) => (
                            <Grid key={x + "," + y} item xs={12} className={classes.subgrid}>
                                <SudokuBox matrix={column} height={height} OptionsActive={OptionsActive} setOptionsActive={setOptionsActive} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Home;